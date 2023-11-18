from transformers import pipeline
from googletrans import Translator

translator = Translator()

def translate_to_english(text, src_lang="vi"):
    translated_text = translator.translate(text, src=src_lang, dest='en').text
    return translated_text

post_text = "Các nghiên cứu chỉ ra rằng các con cáo đã được thuần phục thường sẽ có hành vi cười há há há, đuôi vẫy như chó và nhảy tưng tưng như con khùng. Hành động này được cho rằng là bọn chúng dùng để thu hút sự chú ý của con người cũng như là một cách khiến chủ của chúng vui vẻ."
classifier = pipeline("zero-shot-classification", model="facebook/bart-large-mnli")

def is_animal_related(post_text):
    post_text = translate_to_english(post_text)
    candidate_labels = ["animal-related", "non-animal-related"]
    
    result = classifier(post_text, candidate_labels)
    print(result)
    
    return result["labels"][0] == "animal-related"

def analyze_post(post_text):
    post_text = translate_to_english(post_text)
    candidate_labels = ["toxic", "non-toxic"]
    
    result = classifier(post_text, candidate_labels)
    
    return {
        "label": result["labels"][0],
        "content_summarization": post_text
    }

result = analyze_post(post_text)
print(is_animal_related(post_text))
print(result)
