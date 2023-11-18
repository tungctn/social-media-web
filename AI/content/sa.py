import joblib

# Tải mô hình
loaded_model = joblib.load('sentiment_model.joblib')

# Tải TF-IDF Vectorizer
loaded_tfidf_vectorizer = joblib.load('tfidf_vectorizer.joblib')

# Sử dụng mô hình đã tải để dự đoán
def predict_sentiment(text):
    # Chuyển đổi văn bản thành dạng vector
    text_tfidf = loaded_tfidf_vectorizer.transform([text])
    # Dự đoán cảm xúc
    prediction = loaded_model.predict(text_tfidf)
    return prediction[0]

# Dùng mô hình để dự đoán một văn bản mới
print(predict_sentiment("Địt mẹ mày"))





