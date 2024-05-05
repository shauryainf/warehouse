import json
from server_funcs import get_response_for_chatprompt
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/', methods=['GET'])
def hello_world():
    return 'Hello, World!'

@app.route('/query', methods=['POST'])
def query():
    data = request.get_json()
    query_param = data.get('query')
    if not query_param:
        return jsonify({'error': 'query parameter is required'}), 400
    
    previous_messages = data.get('previous_messages', [])
    version = data.get('version', 3)
    if isinstance(previous_messages, str):
        previous_messages = json.loads(previous_messages)

    response, sources, prompt_tokens, total_tokens = get_response_for_chatprompt(query_param, version=version, chat_history=previous_messages)
    return jsonify({'response': response, 'sources': sources, 'prompt_tokens': prompt_tokens, 'total_tokens': total_tokens})


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001, debug=False)