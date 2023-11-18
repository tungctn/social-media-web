import requests
from PIL import Image
from io import BytesIO
from transformers import pipeline

def load_image_from_url(url):
    response = requests.get(url)
    return Image.open(BytesIO(response.content))

vqa_pipeline = pipeline("visual-question-answering")

def predict(url):
    question = "Is there any animals in the photo?"
    image = load_image_from_url(url)
    result = vqa_pipeline(image, question, top_k=2)
    return result


url = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTu0gQ2u4YQPIh-xl0lewRNMkuHCBkGOzYcyHALieeu&s"
print(predict(url));
