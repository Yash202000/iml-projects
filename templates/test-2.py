import pymysql
db = pymysql.connect(
        host='3.17.192.84',
        user='yash',
        password='Yash@123',
        database='s3_devops'
        )
cursor = db.cursor()
# #
# cursor.execute('create database s3_devops;')
# db.commit()

# cursor.execute('create table envs (customer varchar(255), envname varchar(255), access_key varchar(255), secret_key varchar(255), region varchar(255));')
# db.commit()

# cursor.execute('insert into envs values ("iml","UAT","define here","define here","ap-south-1");')
# cursor.execute('insert into envs values ("iml","PROD","define here","define here","ap-south-1");')
# cursor.execute('insert into envs values ("neu","PROD","define here","define here","us-east-1");')
# db.commit()


#cursor.execute('create table aliases (customer varchar(255), names varchar(255))')

# cursor.execute('insert into aliases values ("aiingov-backup", "AIINGOV BACKUP");')
# cursor.execute('insert into aliases values ("brightup-dev", "BRIGHTUP DEV");')
# cursor.execute('insert into aliases values ("brightup-qa-env", "BRIGHTUP QA");')
# cursor.execute('insert into aliases values ("kymtelemeds", "KYM TELEMEDS");')
# cursor.execute('insert into aliases values ("rauat","RA UAT");')
# cursor.execute('insert into aliases values ("northeastern.university","NORTHEASTERN UNIVERSITY");')



#cursor.execute('create table neualiases (customer varchar(255), names varchar(255))')

# cursor.execute('insert into neualiases values ("aiingov-backup", "AIINGOV BACKUP");')
# cursor.execute('insert into neualiases values ("brightup-dev", "BRIGHTUP DEV");')
# cursor.execute('insert into neualiases values ("brightup-qa-env", "BRIGHTUP QA");')

#cursor.execute('ALTER TABLE  aliases RENAME imlaliases;')


db.commit()

print('here values is updated!')



# cursor.execute('select envname from envs where customer="neu";')
# t=cursor.fetchall()
# print(t)
# print(tuple(set(list(t))))
# for i in t:
#         print(i)
