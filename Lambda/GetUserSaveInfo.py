import json
import boto3

def lambda_handler(event, context):
    dynamodb = boto3.resource('dynamodb')
    table = dynamodb.Table('UserInfo')

    userEmail = event['Email']

    response_table = table.get_item(Key={'Email': userEmail})
    
    if 'Item' in response_table:
        item = response_table['Item']
        lastQuestion = item['LastQuestion']
        lastScore = item['LastScore']
        return {
            'LastQuestion': lastQuestion,
            'LastScore': lastScore
        }
    else:
        return {
            'status': 'failed',
            'message': 'User not found'
        }
