# from flask import Flask, render_template,jsonify
# from werkzeug.wrappers import request

# app = Flask(__name__)

# @app.route('/',methods=['GET','POST'])
# def main():
#     return render_template('index.html')

# @app.route('/add/<string:username>/<string:email>/<string:password>')
# def add(username,email,password):
#     print(username)
#     return "string example"


# if __name__=='__main__':
#     app.run(debug=True)



# import pymysql


# def givecursor(user,password,dbname=None):
#     db=pymysql.connect(
#         host="database-1.c21gc9hxoi2v.ap-south-1.rds.amazonaws.com",
#         user=user,
#         password=password,
#         port=3306,
#         database=dbname
#         )

#     return db.cursor()


# cursor = givecursor("admin",'qwertpoiuy')
# # cursor = givecursor("yash","redhat")

# #to see all databases 
# cursor.execute('show databases;')
# t=cursor.fetchall()
# for i in t:
#     print(i)


#########
# for generating password 
# import secrets

# print(secrets.token_urlsafe(10))

################

# # To create use with all privileges power.
# cursor.execute("CREATE USER '{}'@'%' IDENTIFIED BY '{}';".format("yash","redhat"))
# cursor.execute("GRANT {} ON `mydb`.*  TO {}@'%';".format("ALL PRIVILEGES","yash"))
# cursor.execute("flush privileges;")



# To see user and pass
# cursor.execute("select User, password_last_changed from mysql.user;")
# d = cursor.fetchall()
# for i in d:
#     print(i)

# # To see grants for user.
# cursor.execute("show grants for yash;")
# t= cursor.fetchall()
# for i in t:
#     print(t)
# cursor.execute("show grants for 'yash'@'%';")
# t = cursor.fetchall()
# for i in t:
#     print(t)


# # to drop user 
# cursor.execute("drop user yash;")

# # to create database

# #cursor.execute("create database mydb;")




###############################################################################################

#test for gitlab code .

# import gitlab
# gl = gitlab.Gitlab('http://15.10.0.196:9000/', private_token='-ULKwhyj3Nz71HYAbjf2')
# projects = gl.projects.list()
# print()
# for project in projects:
#     print(project.name," ",project.id)
#     print()

# p=gl.projects.get(4137)


# print(p)


# usrs = gl.users.list()
# for i in usrs:
#     print(i.id," ",i.name)



# """

# gitlab.GUEST_ACCESS: 10

# gitlab.REPORTER_ACCESS: 20

# gitlab.DEVELOPER_ACCESS: 30

# gitlab.MAINTAINER_ACCESS: 40

# gitlab.OWNER_ACCESS: 50


# """
# p.members.create({'user_id': 32, 'access_level': gitlab.GUEST_ACCESS})

    



