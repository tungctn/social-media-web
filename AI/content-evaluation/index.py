from transformers import BartForConditionalGeneration, BartTokenizer

# Tải mô hình và tokenizer của BART
model_name = "facebook/bart-large-cnn"
model = BartForConditionalGeneration.from_pretrained(model_name)
tokenizer = BartTokenizer.from_pretrained(model_name)

def analyze_post(post_text):
    # Use BART to classify the sentiment of the caption
    sentiment_prompt = f"Is the following caption negative or not?\n{post_text}\n"
    sentiment_input = tokenizer(sentiment_prompt, return_tensors="pt", truncation=True)
    sentiment_output = model.generate(sentiment_input["input_ids"], num_beams=4, max_length=1000, early_stopping=True)
    sentiment_result = tokenizer.decode(sentiment_output[0], skip_special_tokens=True)
    
    # Determine the sentiment label (0 for negative, 1 for positive)
    sentiment_label = 0 if sentiment_result == "Negative" else 1

    # Initialize content summarization and animal name variables
    content_summarization = None
    animal_name = None

    # If the sentiment is not negative, summarize the content and find the animal name
    if sentiment_label == 1:
        # Use BART model to summarize the content
        summary_input = tokenizer(post_text, return_tensors="pt", truncation=True)
        summary_output = model.generate(summary_input["input_ids"], num_beams=4, min_length=30, max_length=1000, early_stopping=True)
        content_summarization = tokenizer.decode(summary_output[0], skip_special_tokens=True)

        # Identify the name of the animal mainly discussed in the post using BART
        animal_prompt = f"What is the name of the animal mainly discussed in the post? Return the name of the animal only:\n{post_text}\n"
        animal_input = tokenizer(animal_prompt, return_tensors="pt", truncation=True)
        animal_output = model.generate(animal_input["input_ids"], num_beams=4, max_length=1000, early_stopping=True)
        animal_name = tokenizer.decode(animal_output[0], skip_special_tokens=True).strip()

    # Create and return the result dictionary
    result = {
        "label": sentiment_label,
        "content_summarization": content_summarization,
        "animal": animal_name,
    }
    return result

# Example post text
post_text = """
Đánh bắt cá quá mức đang đe dọa sự tồn vong của nhiều loài cá.
"""

# Analyze the post
result = analyze_post(post_text)

# Print the result
print(result)
