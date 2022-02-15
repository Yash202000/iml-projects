from flask import Flask, render_template, jsonify, request
from flask_cors import CORS
import jwt
import gitlab
from sqlalchemy import false

app = Flask(__name__)
CORS(app)



body = {
    "URL1": "http://15.10.0.196:9000/",
    "PVTOKEN1": "TeFWoWYxxZGJp5CiEyBZ",
    "URL2": "https://gitlab.com/",
    "PVTOKEN2": "glpat-yAjP19CB2KaCV7BHfj_J",
    "URL2_USER": "ash_p",
    "ID": 4902
}

@app.route("/", methods=['GET','POST'])
def home():
    if request.method=='POST':
        print(request)
       
        jsonbody = request.json["key"]
        information = jwt.decode(jsonbody,"secret",algorithms=['HS256'])
        
        
        gl = gitlab.Gitlab(information['URL1'], private_token=information['PVTOKEN1'])
        project = gl.projects.get(information['ID'])

        tempSplit = information['URL2'].split('://')
        print(tempSplit)
        if tempSplit[0]=='http':
            url =  "http://"+information['URL2_USER']+':'+information['PVTOKEN2']+'@'+tempSplit[-1]+'/'+information['URL2_USER']+'/'+project.name+'.git'
            
        elif tempSplit[0]=='https':
            url =  "https://"+information['URL2_USER']+':'+information['PVTOKEN2']+'@'+tempSplit[-1]+'/'+information['URL2_USER']+'/'+project.name+'.git'
           
        mirror = project.remote_mirrors.create({'url': url,'enabled': True})
        if mirror:
            print(mirror)
            return "success"
        else:
            return "failure"

    
            
        


app.run(debug=True,port=5001)

