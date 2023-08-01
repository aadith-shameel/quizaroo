import boto3

def load_questions_to_dynamodb(filename, table_name):
    dynamodb = boto3.resource('dynamodb')
    table = dynamodb.Table(table_name)

    with open(filename, 'r') as file:
        lines = file.readlines()

    question_number = 0

    for i in range(0, len(lines), 2):
        question = lines[i].strip()
        answer = lines[i + 1].strip()
        question_number += 1

        item = {
            'QuestionNumber': question_number,
            'Question': question,
            'Answer': answer
        }

        table.put_item(Item=item)
        print("All Questions Uploaded!")

load_questions_to_dynamodb('questions.txt', 'Questions')

# Questions taken from https://thoughtcatalog.com/january-nelson/2020/04/easy-trivia-questions-answers/