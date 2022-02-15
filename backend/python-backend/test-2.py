import gitlab
import time



# server = gitlab.Gitlab("https://", "glpat-yAjP19CB2KaCV7BHfj_J", api_version=4, ssl_verify=False)
# project = server.projects.get('')

# gl = gitlab.Gitlab('https://gitlab.com/', private_token='glpat-yAjP19CB2KaCV7BHfj_J',api_version=4,ssl_verify=False)

gl = gitlab.Gitlab('http://15.10.0.196:9000/', private_token='TeFWoWYxxZGJp5CiEyBZ')
project = gl.projects.list(all=True)
for i in project:
    print(i.name)


# project  = gl.projects.get(4157)
# print(project.id,project.name)
# print()
# print(project)


# mir = project.remote_mirrors.list()
# print(mir)
# for i in mir:
#    print(i)