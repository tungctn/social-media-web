from transformers import BertTokenizer, BertForSequenceClassification
from transformers import pipeline
from googletrans import Translator
import torch

translator = Translator()

def translate_to_english(text, src_lang="vi"):
    translated_text = translator.translate(text, src=src_lang, dest='en').text
    return translated_text

post_text = "Sau khi chị N. chết, Khanh đã lấy dao phân xác nạn nhân thành nhiều phần rồi cho toàn bộ các phần thi thể vào bên trong thùng xốp màu trắng, dùng băng dính dán kín lại."

model_name = "textattack/bert-base-uncased-imdb"
model = BertForSequenceClassification.from_pretrained(model_name)
tokenizer = BertTokenizer.from_pretrained(model_name)
classifier = pipeline("zero-shot-classification", model="facebook/bart-large-mnli")

def is_animal_related(post_text):
    post_text = translate_to_english(post_text)
    candidate_labels = ["animal-related", "non-animal-related"]
    
    result = classifier(post_text, candidate_labels)
    print(result)
    
    return result["labels"][0] == "animal-related"

def analyze_post(post_text):
    post_text = translate_to_english(post_text)
    inputs = tokenizer.encode_plus(post_text, return_tensors="pt", max_length=512, truncation=True, padding='max_length')
    input_ids = inputs["input_ids"]
    attention_mask = inputs["attention_mask"]
    
    with torch.no_grad():
        outputs = model(input_ids, attention_mask=attention_mask)
        logits = outputs.logits
        predicted_class = torch.argmax(logits, dim=1).item()

    if predicted_class == 0:
        sentiment = "negative"
    else:
        sentiment = "positive"
    
    return {
        "label": sentiment,
        "content_summarization": post_text
    }

result = analyze_post(post_text)
print(is_animal_related(post_text))
print(result)
