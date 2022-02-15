import gitlab,time


gl = gitlab.Gitlab('http://15.10.0.196:9000/', private_token='TeFWoWYxxZGJp5CiEyBZ')
projects = gl.projects.list(all=True)
print(projects)


project  = gl.projects.get(4902)

gl2 = gitlab.Gitlab('https://gitlab.com/', private_token='glpat-yAjP19CB2KaCV7BHfj_J',api_version=4,ssl_verify=False)

t=project.remote_mirrors.list()


"""
# code to test project mirrors... or missing 
"""
# output = []
# for j in projects:
#     project = gl.projects.get(j.id)
#     l=project.remote_mirrors.list()
#     if len(l)==0:
#         output.append(j.name)
#     else:
#         output.append('')
# print(output)
#     # return jsonify()



"""
# code to test project compare.. table to see status... 
"""







"""
code to export project with project id
"""
# p = gl.projects.get(4157)
# export = p.exports.create()

# # Wait for the 'finished' status
# export.refresh()
# while export.export_status != 'finished':
#     time.sleep(1)
#     export.refresh()

# # Download the result
# with open('./export.tgz', 'wb') as f:
#     export.download(streamed=True, action=f.write)





"""
code to import project with project id
"""

# output = gl2.projects.import_project(open('./export.tgz', 'rb'), p.name)
# # Get a ProjectImport object to track the import status
# project_import = gl2.projects.get(output['id'], lazy=True).imports.get()
# while project_import.import_status != 'finished':
#     time.sleep(1)
#     project_import.refresh()



# mirroirng
mirrors = project.remote_mirrors.list()
print(mirrors)

# git@15.10.0.196:cnbaluramesh/imllatenightjson.git

mirror = project.remote_mirrors.create({'url': 'https://ash_p:glpat-yAjP19CB2KaCV7BHfj_J@gitlab.com/ash_p/{}.git'.format('test-1'),'enabled': True})
mirrors = project.remote_mirrors.list()
print(mirrors)



