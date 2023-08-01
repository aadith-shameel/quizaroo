import json
import boto3

def lambda_handler(event, context):
    dynamodb = boto3.resource('dynamodb')
    table = dynamodb.Table('Questions')

    question_number = event['QN']

    response_table = table.get_item(Key={'QuestionNumber': question_number})
    
    if 'Item' in response_table:
        item = response_table['Item']
        question = item['Question']
        answer = item['Answer']
        return {
            'Question': question,
            'Answer': answer
        }
    else:
        return {
            'status': 'failed',
            'message': 'Question not found'
        }
