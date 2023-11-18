import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import classification_report
import joblib

# Đọc dữ liệu từ tệp CSV
data = pd.read_csv('./comment.csv')

# # Hiển thị một số dòng đầu tiên để kiểm tra
print(data.head())

# # data = data.dropna(subset=['text'])
data['text'] = data['text'].fillna('')

# # Chia dữ liệu thành tập huấn luyện và tập kiểm thử
X_train, X_test, y_train, y_test = train_test_split(data['text'], data['label'], test_size=0.2, random_state=42)

# # Khởi tạo TF-IDF Vectorizer
tfidf_vectorizer = TfidfVectorizer(max_features=1000)

# # Huấn luyện TF-IDF Vectorizer và chuyển đổi dữ liệu huấn luyện
X_train_tfidf = tfidf_vectorizer.fit_transform(X_train)

# # Chuyển đổi dữ liệu kiểm thử dùng TF-IDF Vectorizer đã huấn luyện
X_test_tfidf = tfidf_vectorizer.transform(X_test)

# # Khởi tạo mô hình Logistic Regression
model = LogisticRegression()

# # Huấn luyện mô hình với dữ liệu huấn luyện
model.fit(X_train_tfidf, y_train)

# # Dự đoán nhãn trên tập kiểm thử
y_pred = model.predict(X_test_tfidf)

# # In ra báo cáo phân loại
print(classification_report(y_test, y_pred))

# # Lưu mô hình
joblib.dump(model, 'sentiment_model.joblib')

# # Lưu TF-IDF Vectorizer
joblib.dump(tfidf_vectorizer, 'tfidf_vectorizer.joblib')