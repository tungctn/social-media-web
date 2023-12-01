from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse
from moderation import detect_moderation_labels_from_url
from vqa import predict
from bert import is_animal_related, analyze_post
from sa import comment_analysis
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"], 
    allow_headers=["*"],
)


@app.post('/predict')
async def predict_route(request: Request):
    data = await request.json()
    if 'url' in data:
        url = data['url']
        moderation_labels = detect_moderation_labels_from_url(url)
        if len(moderation_labels) > 0:
            return {'success': False, 'message': 'Ảnh không phù hợp tiêu chuẩn', 'url': url}
        vqa_prediction = predict(url)
        if vqa_prediction[0]['score'] < 0.8 or vqa_prediction[0]['answer'] == 'no':
            return {'success': False, 'message': 'Ảnh không liên quan đến động vật', 'url': url}
        return {'success': True, 'message': 'Ảnh phù hợp tiêu chuẩn', 'url': url}
    else:
        return {'success': False, 'message': 'Không tìm thấy url'}

@app.post("/predict/text")
async def predict_text_route(request: Request):
    data = await request.json()
    if 'caption' in data:
        caption = data['caption']
        analyze_post_eval = analyze_post(caption)
        if analyze_post_eval['label'] == 'toxic':
            return {'success': False, 'message': 'Caption không phù hợp tiêu chuẩn', 'caption': caption}
        if not is_animal_related(caption):
            return{'success': False, 'message': 'Caption không liên quan đến động vật', 'caption': caption}
        return {'success': True, 'message': 'Caption phù hợp tiêu chuẩn', 'caption': caption}
    else:
        return {'success': False, 'message': 'Không tìm thấy text'}


@app.post('/predict/comment')   
async def predict_comment_route(request: Request):
    data = await request.json()
    if 'comment' in data:
        comment = data['comment']
        comment_analysis_eval = comment_analysis(comment)
        return {'success': True, 'message': comment_analysis_eval, 'comment': comment}
    else:
        return {'success': False, 'message': 'Không tìm thấy comment'}
