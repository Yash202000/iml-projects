import os
import boto3
import botocore
import json
from flask import render_template, Flask,request, jsonify,make_response,send_file


from flask_cors import CORS
import pymysql



app = Flask(__name__)
CORS(app)
app.config['SECRET_KEY'] = 'asdlkvno23ekndf30kdn230irjlkc'

db = pymysql.connect(
        host='3.17.192.84',
        user='yash',
        password='Yash@123',
        database='s3_devops'
        )

cursor = db.cursor()

# s3 = boto3.resource('s3')

@app.route('/')
def home():
    return render_template("index.html")


@app.route('/getnames/<string:customer>/<string:envs>', methods = ['GET'])
def getbuckets(customer,envs):
    cursor.execute('select access_key, secret_key,region from envs where envname="{}" and customer="{}";'.format(envs,customer))
    t = cursor.fetchall()
    s3 = boto3.resource('s3',aws_access_key_id=t[0][0],aws_secret_access_key=t[0][1],region_name=t[0][2])
    if request.method == 'GET':
        buckets = s3.buckets.all()
        bucketNames = [ x.name for x in buckets]
        return json.dumps(bucketNames)


@app.route('/getfiles/<string:envs>/<string:bucket>',methods = ['GET'])
# @cross_origin(supports_credentials=True)
def getfiles(envs,bucket):
    cursor.execute('select access_key, secret_key,region from envs where envname="{}";'.format(envs))
    t = cursor.fetchall()
    print(t)
    s3 = boto3.resource('s3',aws_access_key_id=t[0][0],aws_secret_access_key=t[0][1],region_name=t[0][2])
    if request.method == 'GET':
        my_bucket = s3.Bucket(name=bucket)
        files = my_bucket.objects.all()
        output = [i.key for i in files]
        
        return jsonify(output)


@app.route('/getdirectory/<string:envs>/<string:bucketname>')
def getdirectory(envs,bucketname):
    cursor.execute('select access_key, secret_key,region from envs where envname="{}";'.format(envs))
    t = cursor.fetchall()
    print(t)
    s3 = boto3.resource('s3',aws_access_key_id=t[0][0],aws_secret_access_key=t[0][1],region_name=t[0][2])
    visited = []
    directory = {}
    my_bucket = s3.Bucket(name=bucketname)
    files = my_bucket.objects.all()
    
    for i in files:
        t = i.key.split('/')
        
        for j in range(len(t)):
            if j not in directory.keys():
                directory[j] = [t[j]]
            else:
                if t[-1]!=t[j] and t[j] not in visited:
                    directory[j].append(t[j])
                    visited.append(t[j])
                elif t[-1]==t[j]:
                    directory[j].append(t[j])           
    return directory



@app.route('/getalldir/<string:customer>/<string:envs>/<string:bucketname>/<string:prefix>')
def getalldir(customer,envs,bucketname,prefix=''):
    l = prefix.split(',')
    prefix = '/'.join(l)
    output = []
    cursor.execute('select access_key, secret_key,region from envs where envname="{}" and customer="{}";'.format(envs,customer))
    t = cursor.fetchall()
    client = boto3.client('s3',aws_access_key_id=t[0][0],aws_secret_access_key=t[0][1],region_name=t[0][2])
    if prefix=='_root':
        response = client.list_objects(
            Bucket = bucketname,
            Prefix = '',
        )
        l = response['Contents']
        
        
        for i in l:
            if i['Key'].split('/')[0] not in output:
                output.append(i['Key'].split('/')[0])
       

    else:
        try:
            response = client.list_objects(
                Bucket = bucketname,
                Prefix = prefix,
            )
            l = response['Contents']
                
            for i in l:
                output.append(i['Key'].split(prefix)[1].split('/')[0])
            return jsonify(output)
        except:
            l.pop()
            tempprefix = ",".join(l)
            return download(customer,envs,bucketname,tempprefix)

    return jsonify(output)




@app.route('/download/<string:customer>/<string:envs>/<string:bucket>/<string:key>',methods = ['GET'])
def download(customer,envs,bucket,key):
    l=key.split(',')
    key='/'.join(l)
    file=l[-1]
    #print(urllib.urlencode(file))
    if request.method == 'GET':
        cursor.execute('select access_key, secret_key,region from envs where envname="{}" and customer="{}";'.format(envs,customer))
        t = cursor.fetchall()
        s3 = boto3.resource('s3',aws_access_key_id=t[0][0],aws_secret_access_key=t[0][1],region_name=t[0][2])
        #s3 = boto3.resource('s3')
        if os.path.isfile('downloaded_files/'+file):
            return jsonify('success')
        else:                
            try:
                s3.Bucket(bucket).download_file(key,'downloaded_files/'+file)
                return jsonify('success')
            except botocore.exceptions.ClientError as e:
                if e.response['Error']['Code'] == "404":
                    return jsonify('danger')
            finally:
                ext = key.split('.')[-1]
                print(key.split('.'))
                if os.path.isfile('downloaded_files/what.{}'.format(ext)):
                    print("file exist... removing... it ")
                    os.remove('downloaded_files/what.{}'.format(ext))
                    print('file removed...')
                s3.Bucket(bucket).download_file(key,'downloaded_files/what.{}'.format(ext))
                return jsonify('success')



@app.route('/send_file/<string:filename>')
def send_files(filename):
    try:
        return send_file('./downloaded_files/'+filename,download_name=filename)
    except:
        print(filename.split('.'))
        return send_file('./downloaded_files/what.pdf','what.pdf')



@app.route('/getenvname/<string:customername>')
def getenvname(customername):
    cursor.execute('select envname from envs where customer="{}";'.format(customername))
    temp_name = cursor.fetchall() 
    return jsonify(temp_name)


@app.route('/getcustomers')
def getcustomers():    
    cursor.execute("select customer from envs;")
    t=cursor.fetchall()
    return jsonify(tuple(set(list(t))))



@app.route('/previous/<string:customer>/<string:envs>/<string:bucket>/<string:prefix>')
def getprevious(customer,envs,bucket,prefix):
    output =  getalldir(customer,envs,bucket,prefix)
    return output


@app.route('/getaliases/<string:customer>')
def getaliases(customer):
    cursor.execute('select * from {}aliases;'.format(customer))
    t = cursor.fetchall()

    return jsonify(t)





if __name__ == '__main__':
    app.run(debug=True)

