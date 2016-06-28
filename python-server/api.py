from flask import Flask 
from flask_restful import reqparse, Api, Resource

app = Flask(__name__)
api = Api(app)

parser = reqparse.RequestParser()
parser.add_argument('message')

class Message(Resource):
  def post(self):
    args = parser.parse_args()
    return args['message']

api.add_resource(Message, '/api/messages') 

if __name__ == '__main__':
  app.run(debug=True, port=3001) 