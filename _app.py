from flask import Flask, render_template,request,jsonify
from flask_cors import CORS

from logging import  error


import gitlab



app = Flask(__name__)
CORS(app)



@app.route("/")
def project_members():
    return render_template('index.html')


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


app.route('/requests')
def requests():
    
    pass


if __name__ == "__main__":
    app.run(debug=True)

# gl = gitlab.Gitlab('http://15.10.0.196:9000/', private_token='-ULKwhyj3Nz71HYAbjf2')
# projects = gl.projects.list()
# print(projects)

# for i in projects:
#     print(i.id,' ',i.name, end=" ")
    
#     #print(type(i.last_activity_at[:10]))
#     #print()
#     import datetime
#     t=datetime.datetime.strptime(i.last_activity_at[:10],'%Y-%m-%d')
#     #print(t)

#     diff = datetime.datetime.today()-t
#     print(diff.days)
#     print()


# #p=gl.projects.get(4137)



# # usrs = gl.users.list()
# # for i in usrs:
# #     print(i.id," ",i.name)



# """

# gitlab.GUEST_ACCESS: 10

# gitlab.REPORTER_ACCESS: 20

# gitlab.DEVELOPER_ACCESS: 30

# gitlab.MAINTAINER_ACCESS: 40

# gitlab.OWNER_ACCESS: 50


# """
# # p.members.create({'user_id': 32, 'access_level': gitlab.GUEST_ACCESS})

    



