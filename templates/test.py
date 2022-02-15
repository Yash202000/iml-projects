import boto3

s3 = boto3.resource('s3',region_name='us-west-2')
s3.Bucket('northeastern.university').download_file('Resume Sample_V0.8_NEU -Mon Oct 11 11:41:30 IST 2021.pdf','what.pdf')