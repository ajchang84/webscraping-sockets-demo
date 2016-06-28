from flask import Flask 
from flask_restful import reqparse, Api, Resource

app = Flask(__name__)
api = Api(app)

parser = reqparse.RequestParser()
parser.add_argument('message')

class Message(Resource):
  def post(self):
    print("posting")
    args = parser.parse_args()
    return args['message'] + ' from python!'

api.add_resource(Message, '/api/messages') 

@app.after_request
def after_request(response):
  response.headers.add('Access-Control-Allow-Origin', '*')
  response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
  response.headers.add('Access-Control-Allow-Methods', 'POST')
  return response

if __name__ == '__main__':
  app.run(debug=True, port=3001) 