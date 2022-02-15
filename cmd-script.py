import sys
import os
import yaml

from cryptography.hazmat.primitives import serialization as crypto_serialization
from cryptography.hazmat.primitives.asymmetric import rsa
from cryptography.hazmat.backends import default_backend as crypto_default_backend

from mail import email

from jinja2 import Environment, FileSystemLoader
env = Environment(loader=FileSystemLoader('templates'))


class generateKeyPair:
    def __init__(self,*argv):
        
        if len(sys.argv)==3:
            try:
                self.username = sys.argv[1]
                self.emailid = sys.argv[2]
            except IndexError as e:
                print(e)

        elif len(argv)==0 and len(sys.argv)<3:
            with open('./vars.yml','r') as vars:
                try:
                    userdata = yaml.safe_load(vars)
                except yaml.YAMLError as exc:
                    print(exc)
            self.userdata = userdata

        elif len(argv)==1:
            print("username/email id is required.")
        
        elif len(argv)==2:
            self.username = argv[0]
            self.emailid = argv[1]

        else:
            print('this is insufficient')



    def pripubgen(self):       

        key = rsa.generate_private_key(
            backend=crypto_default_backend(),
            public_exponent=65537,
            key_size=2048
        )

        for i in range(len(self.userdata['users'])):
            
            username = self.userdata['users'][i]['username']

            if not os.path.exists('./files/id_'+username+'_rsa'):
                private_key = key.private_bytes(
                    crypto_serialization.Encoding.PEM,
                    crypto_serialization.PrivateFormat.TraditionalOpenSSL,
                    crypto_serialization.NoEncryption()
                )

                public_key = key.public_key().public_bytes(
                    crypto_serialization.Encoding.OpenSSH,
                    crypto_serialization.PublicFormat.OpenSSH
                )

                with open('./files/id_'+username+'_rsa','wb') as f:
                    f.write(private_key)
                    f.close()

                with open('./files/id_'+username+'_rsa.pub','wb') as f:
                    f.write(public_key)
                    f.close()

                print('key id_'+username+'_rsa pri/.pub created successfully!')

    
    def generateScript(self,instance='app'):
        if instance=='app':
            template = env.get_template('app_server.j2')
            with open('./files/'+instance+'_script.bash','w') as f:
                f.write("ssh ec2-user@{} -i ./workstation/{}  -o StrictHostKeyChecking=No 'mkdir -p ./workstation'".format(self.userdata[instance+'_ip'],self.userdata[instance+'_server_pem_file']))
                f.write('\n')
                f.write('\n')
                #f.write("scp -i ./workstation/{} -o StrictHostKeyChecking=No -r  ./workstation/{} ec2-user@{}:./workstation/".format(self.userdata[instance+'_server_pem_file'],'files',self.userdata[instance+'_ip']))
                f.write('\n')
                f.write('\n')
                
                # # f.write('\n')
                # f.write('\n')
                # #f.write("for i in $(ls ./files | grep pub); do scp -i {} -o StrictHostKeyChecking=No ./files/$i ec2-user@{}:./files/  ;done".format(self.userdata['app_server_pem_file'],self.userdata['app_ip'])) 
        
                for i in range(len(self.userdata['users'])):    
                    output_from_parsed_template = template.render(username = self.userdata['users'][i]['username'],ip_addr = self.userdata[instance+'_ip'],app_server_pem_file = self.userdata[instance+'_server_pem_file'])        
                    f.write(output_from_parsed_template)
                    f.write("\n")
        
                f.write("ssh ec2-user@{} -i ./workstation/{}  -o StrictHostKeyChecking=No  'sudo systemctl restart sshd'".format(self.userdata[instance+'_ip'],self.userdata[instance+'_server_pem_file']))
                f.close()

        else:
            template = env.get_template('app_server.j2')
            with open('./files/'+instance+'_script.bash','w') as f:
                f.write("ssh ec2-user@{} -i ./workstation/{} -o StrictHostKeyChecking=No  'mkdir -p ./workstation'".format(sys.argv[1], self.userdata[instance+'_server_pem_file']))
                f.write('\n')
                f.write('\n')
                f.write("scp -i ./workstation/{} -o StrictHostKeyChecking=No ./workstation/{} ec2-user@{}:./workstation/".format(self.userdata['bastion_server_pem_file'],self.userdata['app_server_pem_file'],sys.argv[1]))
                f.write('\n')
                f.write('\n')
                f.write("ssh ec2-user@{} -i ./workstation/{} -o StrictHostKeyChecking=No  'chmod 400 ./workstation/{}' ".format(sys.argv[1], self.userdata[instance+'_server_pem_file'],self.userdata['app_server_pem_file']))
                f.write('\n')
                f.write('\n')
                # f.write('\n')
                # f.write('\n')
                # #f.write("for i in $(ls ./files | grep pub); do scp -i {} -o StrictHostKeyChecking=No ./files/$i ec2-user@{}:./files/  ;done".format(self.userdata['app_server_pem_file'],self.userdata['app_ip'])) 
                f.write("scp -i ./workstation/{} -o StrictHostKeyChecking=No -r ./files ec2-user@{}:./workstation/".format(self.userdata[instance+'_server_pem_file'],sys.argv[1]))
                f.write('\n')
                f.write('\n')
        
                for i in range(len(self.userdata['users'])):    
                    output_from_parsed_template = template.render(username = self.userdata['users'][i]['username'],ip_addr = sys.argv[1],app_server_pem_file = self.userdata[instance+'_server_pem_file'])        
                    f.write(output_from_parsed_template)
                    f.write("\n")
        
                f.write("ssh ec2-user@{} -i ./workstation/{}  -o StrictHostKeyChecking=No  'sudo systemctl restart sshd'".format(sys.argv[1],self.userdata[instance+'_server_pem_file']))
                f.write('\n')
                f.write('\n')
                self.generateScript()
                #f.write("scp -i ./workstation/{} -o StrictHostKeyChecking=No ./files/{} ec2-user@{}:. ".format(self.userdata['bastion_server_pem_file'],"app_script.bash",self.userdata['bastion_ip']))
                f.write('\n')
                f.write('\n')
                #f.write("ssh ec2-user@{} -i ./workstation/{} -o StrictHostKeyChecking=No  'sudo bash ./app_script.bash'".format(self.userdata[instance+'_ip'],self.userdata[instance+'_server_pem_file']))
                f.close()

            
            print("files are updated successfully!")
    
    
    def convertinppk(self):
        # specific to linux
        os.system("yum install puttygen -y")
        for i in range(len(self.userdata['users'])):
            if not os.path.exists('./files/'+self.userdata['users'][i]['username']+'.ppk'):
                os.system('puttygen {} -o {} '.format('id_'+self.userdata['users'][i]['username']+'_rsa',self.userdata['users'][i]['username']+'.ppk'))
                print("key : "+self.userdata['users'][i]['username']+'.ppk successfully created.')

        print("creation of key into .ppk format: done ")


    def sendemail(self):
        for i in range(len(self.userdata['users'])):
            if os.path.exists("./files/"+self.userdata['users'][i]['username']+'.ppk') and os.path.exists("./files/id_"+self.userdata['users'][i]['username']+'_rsa'):
                email(self.userdata['users'][i]['username'],self.userdata['users'][i]['email'],self.userdata['users'][i]['username']+'.ppk','id_'+self.userdata[i]['users'][i]['username']+'_rsa')
                print("email sent to : ",self.userdata['users'][i]['username'])

          


def main():
    obj = generateKeyPair()
    obj.pripubgen()
    obj.generateScript(instance='bastion')
    os.system('bash ./files/bastion_script.bash')
    



if __name__ == '__main__':
    main()
