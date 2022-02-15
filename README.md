# *********************** USER CREATION SCRIP ***********************/

description: This script helps to create remote user on the server.

software requirements:
	1. python3
	2. ansible

other requirements:
	1. .pem file with permission 400
	2. bastion ips.. (alias :  instance as bastion..)


senarios: 
 	1. bastion host and app server.
	2. only bastion host.

configuratoin methods:
	1. ssh based.
	2. password based.

files and directories:
ansible.cfg      cmd-script.py  hosts      mail.py       __pycache__  templates  userWpass.txt  workstation
cmd-script-2.py  files          mail-2.py  playbook.yml  README.md    test.yml   vars.yml

Introduction to files and directories.

1. ansible.cfg:
	This is the main configuration file for ansible.
	recomended changes while use...
	1. change remote_user with user who has sudo permission on bastion.
	2. store .pem file in workstation directory only.
	3. change private_key_file with .pem file location i.e ./workstation/TEST-KEY.pem
	
2. cmd-script.py:
	This script will execute when user choose method ssh
	don't make any changes in script.

3. hosts:
	This is inventory file for ansible.
	recomended changes while use...
	1. add all bastion host ips under [server] section

4. templates:
	basic template folder which contain generic template which helps script to make appropriate changes.
	don't make any changes 

5. userWpass.txt:
	backup file for users with pass
	This file will generate when script execution is done. or already present 

6. workstation:
	directory in which all .pem file should be stored...
	please refer 2nd step in introduction to ansible.cfg. file

7. cmd-script-2.py:
	This script will execute when user choose method pass
	please don't make any changes.

8. files:
	this directory is used to store privatekeys, publickeys and essential scripts.

9. playbook.yml:
	run this final playbook to execute all the tasks.
	command : ansible-playbook playbook.yml

10. vars.yml:
	this is the most important file in all script.
	recomemded changes...
	1. user must have to provide all information regarding username and there email in there respective section.
	2. update bastion ip ( require change if method is ssh )
	3. update app ip is  ( require changes if method is ssh ) 
	4. update app private key file location ( require changes if method is ssh )
	5. update bastion private key file location . ( must )
	6. method : choose ( ssh , pass )
	7. update ips section with all server ips same as hosts file ( inventory )

11. test.yml
	test file for plays..  
	

NOTE:
1. This script is configured to send email. but for now its execution line is commented.. in cmd-script*.py 
REQUIRE FORMAT FOR VARS.YML FILE;

**************

users:
  - {
    username: 'yash' ,
    email: 'yash###@gmail.com'
  }
  - {
    username: 'pratik',
    email: 'pratk###@gmail.com'
  }
  - {
    username: 'rohit',
    email: 'pratik###@gmail.com'
  }





# pass for passwordbased
# ssh for ssh based
# same for same password to use
method: 'pass'

bastion_ip: 3.109.217.195

bastion_server_pem_file: "TEST-key.pem"

app_server_pem_file: "final-key.pem"

app_ip: 15.207.249.159

ips:
  - 65.0.91.156

*****************
 

