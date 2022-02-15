import pymysql
import random,string

def generate_random_password():
    characters = list(string.ascii_letters + string.digits + "!@#$%^&*()")
    length = 10
    random.shuffle(characters)
    password = []
    for i in range(length):
        password.append(random.choice(characters))
        
    random.shuffle(password)
    return "".join(password)

db = pymysql.connect(
        host='',
        user='',
        password='',
        ssl={'ssl':{'ca': 'DigiCertGlobalRootG2.crt.pem'
                }
            }
        )


list_user = ['bc_dev_db_mehulk', 'bc_dev_db_aquifi', 'bc_dev_db_harshc', 'bc_dev_db_ashishg', 'bc_dev_db_kiranl',
'bc_dev_db_swarups',
'bc_dev_db_palashd',
'bc_dev_db_architc',
'bc_dev_db_riddishk']

# db = pymysql.connect(
#     host='database-1.crewf9jbpd79.ap-south-1.rds.amazonaws.com',
#     user='pratik',
#     password='Pratik@123',
#     database='mydb'
# )


cursor = db.cursor()


# cursor.execute('drop user nitin@localhost;')
# cursor.execute('Select User from mysql.user;')
# t=cursor.fetchall()
# for i in t:
#     print(i)


# print(list_user)


with open('backup.txt','w') as f:
    for user in list_user:
        # password = generate_random_password()
        
        cursor.execute("GRANT SELECT PRIVILEGES ON *.* TO {}@'%';".format(user))
        # cursor.execute("CREATE USER {}@'%' IDENTIFIED BY '{}'".format(user,password))
        print('user is created .. {}'.format(user))

        # f.write('{} : {}\n'.format(user,password))
        # f.write('')

    f.close()


# print(generate_random_password())
# cursor.execute('Select User from mysql.user;')
# t=cursor.fetchall()
# for i in t:
#     print(i)

# cursor.execute("CREATE USER bc_dev_db_karthik@'%' IDENTIFIED BY 'eHG%@qtV1X'")
# cursor.execute("GRANT SELECT ON mydb.* TO 'nitin'@'%';")

# cursor.execute("CREATE USER Rohit@'%' IDENTIFIED BY 'Rohit@123'")
# cursor.execute("GRANT ALL PRIVILEGES ON *.* TO Rohit@'%';")





# cursor.execute('Select * from mysql.user;')
# t=cursor.fetchall()
# for i in t:
#     print(i)



# cursor.execute('create database mydb;')
# db.commit()

# cursor.execute('show databases;')
# t=cursor.fetchall()
# for i in t:
#     print(i)




# with open('backup.txt','w') as f:
#     temppass = generate_random_password()
