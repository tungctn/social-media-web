import boto3
import requests

def detect_moderation_labels_from_url(image_url):
    response = requests.get(image_url)
    image_bytes = response.content
    client = boto3.client('rekognition')
    response = client.detect_moderation_labels(
        Image={
            'Bytes': image_bytes
        }
    )

    return response['ModerationLabels']

image_url = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTu0gQ2u4YQPIh-xl0lewRNMkuHCBkGOzYcyHALieeu&s'
labels = detect_moderation_labels_from_url(image_url)
print(labels)
