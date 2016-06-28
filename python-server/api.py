from flask import Flask 
from flask_restful import reqparse, Api, Resource
from validators import url as is_valid_url
from bs4 import BeautifulSoup
from textblob import TextBlob
from urllib.request import urlopen

app = Flask(__name__)
api = Api(app)

parser = reqparse.RequestParser()
parser.add_argument('message')

class Message(Resource):
  def post(self):
    args = parser.parse_args()
    text = args['message']
    if is_valid_url(text):
      html = BeautifulSoup(urlopen(text), "html.parser")
      [html_text.extract() for html_text in html('script')]
      blobbed_text = TextBlob(html.get_text())
    else:
      blobbed_text = TextBlob(text)
    return {
      'message': text,
      'polarity': blobbed_text.polarity,
      'subjectivity': blobbed_text.subjectivity,
      'length': len(blobbed_text)
    }

api.add_resource(Message, '/api/messages') 

@app.after_request
def after_request(response):
  response.headers.add('Access-Control-Allow-Origin', '*')
  response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
  response.headers.add('Access-Control-Allow-Methods', 'POST')
  return response

if __name__ == '__main__':
  app.run(debug=True, port=3001) 