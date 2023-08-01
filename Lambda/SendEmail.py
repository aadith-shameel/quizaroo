import boto3
import json

sqs_client = boto3.client('sqs')
ses_client = boto3.client('ses')

queue_url = "https://sqs.us-east-1.amazonaws.com/981263172079/QuizarooNotificationsQueue"
def lambda_handler(event, context):
    response = sqs_client.receive_message(
        QueueUrl = queue_url,
        MaxNumberOfMessages = 1,
        MessageAttributeNames=['All']
    )
    
    if 'Messages' in response:
        sqs_message_body = json.loads(response['Messages'][0]['Body'])
        required_json = json.loads(sqs_message_body['Message'])
        name = required_json['Name']
        user_email = required_json['Email']
        
        receipt_handle = response['Messages'][0]['ReceiptHandle']
        
        email_subject = "Welcome to Quizaroo!"
        email_body = f"Welcome to Quizaroo {name}! Hope you enjoy the game!"
        
        ses_client.send_email(
            Source='quizaroo@yahoo.com',
            Destination={
                'ToAddresses': [user_email]
            },
            Message={
                'Subject': {'Data': email_subject},
                'Body': {'Text': {'Data': email_body}}
            }
        )

        sqs_client.delete_message(
            QueueUrl=queue_url,
            ReceiptHandle=receipt_handle
        )