from flask import Flask, request, jsonify
import torch
import torchvision.models as models
from torchvision.transforms import transforms
from PIL import Image
import torch.nn as nn
import io 
from flask_cors import CORS
import imghdr

# Khởi tạo Flask app
app = Flask(__name__)
CORS(app)  

# Định nghĩa các lớp và hàm
num_classes = 10
classes = [
    "cane", "cavallo", "elefante", "farfalla", "gallina",
    "gatto", "mucca", "pecora", "scoiattolo","ragno"
]
resnet = models.resnet50(pretrained=False)  # Lưu ý: không tải trọng số tiền huấn luyện
resnet.fc = nn.Linear(resnet.fc.in_features, num_classes)
device = 'cuda' if torch.cuda.is_available() else 'cpu'

resnet.to(device)

sd = torch.load("resnet_animal_classifier.pth", map_location=torch.device('cpu'))
resnet.load_state_dict(sd)
resnet.eval()

@app.route('/predict', methods=['POST'])

def predict():
    transform = transforms.Compose([
        transforms.Resize((224, 224)),
        transforms.ToTensor(),
        transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225]),
    ])
    if 'file' not in request.files:
        return jsonify({'error': 'No file uploaded'}), 400
    file = request.files['file']
    img_bytes = file.read()
    image = Image.open(io.BytesIO(img_bytes)).convert('RGB')
    img_format = imghdr.what(None, h=img_bytes)
    if img_format != 'jpeg':
        img_bytes_io = io.BytesIO()
        image.save(img_bytes_io, format="JPEG")
        image = Image.open(img_bytes_io)
    image = image.convert('RGB')
    image = transform(image).unsqueeze(0) 
    output = resnet(image)
    probs = torch.nn.functional.softmax(output)
    _, prob = torch.max(probs, 1)
    print(torch.nn.functional.softmax(output))
    _, predicted_class = torch.max(output, 1)
    # if prob > 0.85:
    return jsonify({'prediction': classes[predicted_class.item()]})
    # else:
    #     return jsonify({"error": "Không nhận diện được"})

if __name__ == '__main__':
    app.run(debug=True, port=5001)