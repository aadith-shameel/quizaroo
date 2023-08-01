import boto3
import json

dynamodb = boto3.resource('dynamodb')

def lambda_handler(event, context):
    email = event['Email']
    password = event['Password']
    
    table = dynamodb.Table('UserInfo')
    
    table_response = table.get_item(Key={'Email': email})
    
    
    if 'Item' in table_response:
        user = table_response['Item']
        if user['Password'] == password:
            response = {
                'status': 'success',
                'message': 'Logged In!'
            }
            return response
        else:
            response = {
                'status': 'failed',
                'message': 'Invalid Credentials!'
            }
            return response
    
    return {
        "status": "failed",
        "message": "Internal server error"
    }