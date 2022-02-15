ssh ec2-user@app_ip -i Test-file.pem  -o StrictHostKeyChecking=No 'mkdir -p ./workstation'

scp -i Test-file.pem -o StrictHostKeyChecking=No -r ./workstation/files ec2-user@bastion_ip:./workstation/

ssh ec2-user@app_ip -i ./workstation/Test-file.pem  -o StrictHostKeyChecking=No  "sudo useradd yash"
ssh ec2-user@app_ip -i ./workstation/Test-file.pem  -o StrictHostKeyChecking=No  "sudo mkdir -p /home/yash/.ssh"
ssh ec2-user@app_ip -i ./workstation/Test-file.pem  -o StrictHostKeyChecking=No  "sudo touch /home/yash/.ssh/authorized_keys"
ssh ec2-user@app_ip -i ./workstation/Test-file.pem  -o StrictHostKeyChecking=No  "sudo cat ./workstation/files/id_yash_rsa.pub >>  /home/yash/.ssh/authorized_keys"
ssh ec2-user@app_ip -i ./workstation/Test-file.pem  -o StrictHostKeyChecking=No  "sudo chmod 700 /home/yash/.ssh"
ssh ec2-user@app_ip -i ./workstation/Test-file.pem  -o StrictHostKeyChecking=No  "sudo chmod 600 /home/yash/.ssh/authorized_keys"




ssh ec2-user@app_ip -i ./workstation/Test-file.pem  -o StrictHostKeyChecking=No  "sudo useradd pratik"
ssh ec2-user@app_ip -i ./workstation/Test-file.pem  -o StrictHostKeyChecking=No  "sudo mkdir -p /home/pratik/.ssh"
ssh ec2-user@app_ip -i ./workstation/Test-file.pem  -o StrictHostKeyChecking=No  "sudo touch /home/pratik/.ssh/authorized_keys"
ssh ec2-user@app_ip -i ./workstation/Test-file.pem  -o StrictHostKeyChecking=No  "sudo cat ./workstation/files/id_pratik_rsa.pub >>  /home/pratik/.ssh/authorized_keys"
ssh ec2-user@app_ip -i ./workstation/Test-file.pem  -o StrictHostKeyChecking=No  "sudo chmod 700 /home/pratik/.ssh"
ssh ec2-user@app_ip -i ./workstation/Test-file.pem  -o StrictHostKeyChecking=No  "sudo chmod 600 /home/pratik/.ssh/authorized_keys"




ssh ec2-user@app_ip -i ./workstation/Test-file.pem  -o StrictHostKeyChecking=No  "sudo useradd tanmay"
ssh ec2-user@app_ip -i ./workstation/Test-file.pem  -o StrictHostKeyChecking=No  "sudo mkdir -p /home/tanmay/.ssh"
ssh ec2-user@app_ip -i ./workstation/Test-file.pem  -o StrictHostKeyChecking=No  "sudo touch /home/tanmay/.ssh/authorized_keys"
ssh ec2-user@app_ip -i ./workstation/Test-file.pem  -o StrictHostKeyChecking=No  "sudo cat ./workstation/files/id_tanmay_rsa.pub >>  /home/tanmay/.ssh/authorized_keys"
ssh ec2-user@app_ip -i ./workstation/Test-file.pem  -o StrictHostKeyChecking=No  "sudo chmod 700 /home/tanmay/.ssh"
ssh ec2-user@app_ip -i ./workstation/Test-file.pem  -o StrictHostKeyChecking=No  "sudo chmod 600 /home/tanmay/.ssh/authorized_keys"




ssh ec2-user@app_ip -i Test-file.pem  -o StrictHostKeyChecking=No  'sudo systemctl restart sshd'