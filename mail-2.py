import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.base import MIMEBase
from email import encoders
from email.mime.text import MIMEText


def email(user,mail,password):        
    mail_content = '''Hello,
    user is created successfully, please find the attachments. The mail is sent using Python SMTP library.
    
    user: {}
    password: {}
    
    Thank You
    '''.format(user,password)

    sender_address = 'ash143732@gmail.com'
    sender_pass = 'Yash@202000'
    receiver_address = mail

    message = MIMEMultipart()
    message['From'] = sender_address
    message['To'] = receiver_address
    message['Subject'] = "Cograts!! here your password:)"
    message.attach(MIMEText(mail_content, 'plain'))
    

    session = smtplib.SMTP('smtp.gmail.com', 587)
    session.starttls() 
    session.login(sender_address, sender_pass) 
    text = message.as_string()
    session.sendmail(sender_address, receiver_address, text)
    session.quit()
    print('Mail Sent')


import sys
print(sys.argv[1],sys.argv[2],sys.argv[3])

email(sys.argv[1],sys.argv[2],sys.argv[3])
