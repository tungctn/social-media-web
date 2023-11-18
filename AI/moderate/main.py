from flask import Flask, request, jsonify
from flask_cors import CORS
from moderation import detect_moderation_labels_from_url
from vqa import predict
from bert import is_animal_related, analyze_post
from sa import comment_analysis

app = Flask(__name__)
CORS(app)

@app.route('/predict', methods=['POST'])
def predict_route():
    data = request.get_json()

    if 'url' in data:
        url = data['url']
        moderation_labels = detect_moderation_labels_from_url(url)
        if len(moderation_labels) > 0:
            return jsonify({
                'success': False,
                'message': 'Ảnh không phù hợp tiêu chuẩn',
                'url': url,
            })
        vqa_prediction = predict(url)
        if vqa_prediction[0]['score'] < 0.8 or vqa_prediction[0]['answer'] == 'no':
            return jsonify({
                'success': False,
                'message': 'Ảnh không liên quan đến động vật',
                'url': url,
            })
        return jsonify({
            'success': True,
            'message': 'Ảnh phù hợp tiêu chuẩn',
            'url': url
        })
    else:
        return jsonify({
            'success': False,
            'message': 'Không tìm thấy url',
        })
        
@app.route("/predict/text", methods=['POST'])
def predict_text_route():
    data = request.get_json()
    print(data['caption'])
    if 'caption' in data:
        caption = data['caption']
        print(caption)
        analyze_post_eval = analyze_post(caption)
        if analyze_post_eval['label'] == 'toxic':
            return jsonify({
                'success': False,
                'message': 'Caption không phù hợp tiêu chuẩn',
                'caption': caption,
            })
        if is_animal_related(caption) == False:
            return jsonify({
                'success': False,
                'message': 'Caption không liên quan đến động vật',
                'caption': caption,
            })
        return jsonify({
            'success': True,
            'message': 'Caption phù hợp tiêu chuẩn',
            'caption': caption
        })
    else:
        return jsonify({
            'success': False,
            'message': 'Không tìm thấy text',
        })


@app.route('/predict/comment', methods=['POST'])
def predict_comment_route():
    data = request.get_json()
    if 'comment' in data:
        comment = data['comment']
        comment_analysis_eval = comment_analysis(comment)
        return jsonify({
            'success': True,
            'message': comment_analysis_eval,
            'comment': comment
        })
    else:
        return jsonify({
            'success': False,
            'message': 'Không tìm thấy comment',
        })

if __name__ == '__main__':
    app.run(debug=True, port=8000, host='0.0.0.0')
