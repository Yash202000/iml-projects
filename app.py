from logging import error
from typing import Type
import pymysql
import string
import secrets
import datetime

import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

from flask import Flask, json, render_template,request,jsonify
from flask_cors import CORS

import gitlab



app = Flask(__name__)
CORS(app)

########################################################################################

def email(user,password,mail,access,database):        
    mail_content = '''Hello,
    This is a simple mail. There is only text, no attachments are there The mail is sent using Python SMTP library.
    
    user: {}
    password: {}
    access: {}
    database: {}

    Thank You
    '''.format(user,password,access,database)

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

def createpass():    # add symbol note 1
    return secrets.token_urlsafe(10)



#db connection.
def giveCursor(user,passwd,dburl,database=None):
    return pymysql.connect(
        host=dburl,
        user=user,
        password=passwd,
        database=database
        ).cursor()


#####################################################################################


@app.route('/')
def main():
    return render_template('index.html')


@app.route("/testcon/<string:dburl>")
def testConnection(dburl):
    try:
        giveCursor("admin","qwertpoiuy",dburl=dburl)
        return "connected."
    except:
        return "not connected."
    
    
#to create password ref : https://docs.python.org/3/library/secrets.html

@app.route('/addUserWithPass/<string:username>/<string:useremail>/<string:access>/<string:dburl>/<string:database>')
def add(username,useremail,access,dburl,database):
    try:
        password = createpass()    
        cursor = giveCursor("admin","qwertpoiuy",dburl,database)
        cursor.execute("CREATE USER '{}'@'%' IDENTIFIED BY '{}';".format(username,password))
        cursor.execute("GRANT {} ON `{}`.*  TO {}@'%';".format(access,database,username))
        cursor.execute("flush privileges;")
        print(password," : is created")
        email(username,password,useremail,access,database)
        return jsonify({"output" : "success"}) #code 0 for success
    except:
        return jsonify({"output": "failure"})



@app.route("/searchdbs/<string:dburl>")
def searchdbs(dburl):
    try:
        cursor = giveCursor("yash","redhat",dburl)
        cursor.execute("show databases;")
        response = jsonify({"output" : cursor.fetchall()})
        # if we don't use CORS(app) statement then we need to add this in first.
        # response.headers.add('Access-Control-Allow-Origin', '*')
        return response
    except:
        return jsonify({"output": ["please check internet connection"]})



@app.route("/project-members")
def project_members():
    return render_template('usersPrjPerm.html')


@app.route("/listgitlabprojects/<string:gitlaburl>")
def listgitlabprojects(gitlaburl):
    try:
        gl = gitlab.Gitlab("http://"+gitlaburl, private_token='-ULKwhyj3Nz71HYAbjf2')
        projects = gl.projects.list()
        l = [[project.id,project.name] for project in projects]
        return jsonify({
            "output": l
        })
    except error:
        return jsonify({
            "output": [error]
        })


@app.route("/listgitlabusers/<string:gitlaburl>")
def listgitlabusers(gitlaburl):
    try:
        gl = gitlab.Gitlab("http://"+gitlaburl,private_token='-ULKwhyj3Nz71HYAbjf2')
        users = gl.users.list()
        l = [[user.id,user.name] for user in users]
        return jsonify({
            "output": l
        })
    except:
        return jsonify({
            "output": [error]
        })

@app.route("/applypolicy/<string:gitlaburl>/<string:projectid>/<string:userid>/<string:access>")
def applypolicy(gitlaburl,projectid,userid,access):
    try:
        gl = gitlab.Gitlab("http://"+gitlaburl, private_token='-ULKwhyj3Nz71HYAbjf2')
        p=gl.projects.get(int(projectid))
        p.members.create({'user_id': int(userid), 'access_level': int(access)})
        return jsonify({
            "output": "success"
        })
    except:
        return jsonify({
            "output": "member already present please check management console."
        })


    

# cursor.execute("select User, password_last_changed from mysql.user;")
# d = cursor.fetchall()
# today = datetime.datetime.today()
# for i in d:
#     if (i[1]-today).days >=30:
#         password = createpass()
#         print(password)
#         cursor.execute("alter user '{}' identified by '{}'".format(i[0],password))
#         email(i[0],password,mail)

# # db apna hoga.. **


# #drop user
# cursor.execute("select User, password_last_changed from mysql.user;")
# l = cursor.fetchall()
# for i in l:
#     print(i)
# print()
# print()
# cursor.execute("drop user yash;")
# cursor.execute("select * from mysql.user;")
# l = cursor.fetchall()
# for i in l:
#     print(i)

#####################################################################################

if __name__ == "__main__":
    app.run(debug=True)



