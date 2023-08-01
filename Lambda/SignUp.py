import json
import boto3

dynamodb = boto3.resource('dynamodb')
sns = boto3.client('sns')

def lambda_handler(event, context):
    name = event['Name']
    email = event['Email']
    password = event['Password']

    table = dynamodb.Table('UserInfo')

    user_info = {
        'Email': email,
        'Name': name,
        'Password': password,
        'LastQuestion': 1,
        'LastScore': 0
    }

    table.put_item(Item=user_info)
    
    email_info = {
        'Email': email,
        "Name": name
    }
    
    sns.publish(
        TopicArn = "arn:aws:sns:us-east-1:981263172079:QuizarooNotificationsTopic",
        Message = json.dumps(email_info)
        )

    response = {
        'status': 'success',
        'message': 'Sign Up Successful'
    }

    return response