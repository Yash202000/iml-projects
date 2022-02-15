import yaml
import random
import string
import os
from jinja2 import Environment, FileSystemLoader
env = Environment(loader=FileSystemLoader('templates'))


with open('./vars.yml','r') as vars:
    try:
        userdata = yaml.safe_load(vars)
    except yaml.YAMLError as exc:
        print(exc)

def generate_random_password():
    characters = list(string.ascii_letters + string.digits + "!@#$%^&*()")
    length = 10
    random.shuffle(characters)
    password = []
    for i in range(length):
        password.append(random.choice(characters))
        
    random.shuffle(password)
    return "".join(password)

def main():
    with open('userWpass.txt','w') as f:
        for i in userdata['users']:
            temp = generate_random_password() 
            f.write(i['username']+':'+temp)
            #os.system('python3 mail-2.py {} {} {}'.format(i['username'],i['email'],temp))
            f.write('\n')
        f.close()
    


if __name__ == '__main__':
    main()
