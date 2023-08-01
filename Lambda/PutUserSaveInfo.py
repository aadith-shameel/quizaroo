import boto3
import json

def lambda_handler(event, context):
    dynamodb = boto3.resource('dynamodb')
    table = dynamodb.Table('UserInfo')
    
    email = event['Email']
    last_question = event['LastQuestion']
    last_score = event['LastScore']

    response = table.update_item(
        Key={'Email': email},
        UpdateExpression="SET LastQuestion = :q, LastScore = :s",
        ExpressionAttributeValues={
            ':q': last_question,
            ':s': last_score
        }
    )
    
    return {
        'status': 'success',
        'message': 'Save successful'
    }
