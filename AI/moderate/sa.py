import torch
from transformers import RobertaForSequenceClassification, AutoTokenizer

model = RobertaForSequenceClassification.from_pretrained("wonrax/phobert-base-vietnamese-sentiment")

tokenizer = AutoTokenizer.from_pretrained("wonrax/phobert-base-vietnamese-sentiment", use_fast=False)

# Just like PhoBERT: INPUT TEXT MUST BE ALREADY WORD-SEGMENTED!

def comment_analysis(comment):

  input_ids = torch.tensor([tokenizer.encode(comment)])

  with torch.no_grad():
      out = model(input_ids)
      probabilities = out.logits.softmax(dim=-1).tolist()[0]
      labels = ["NEG", "POS", "NEU"]
      predicted_label = labels[probabilities.index(max(probabilities))]
  return predicted_label

if __name__ == '__main__':
    sentence = 'Ngu vãi'  
    print(comment_analysis(sentence))
