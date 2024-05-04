import azure.functions as func
import logging
import json

from server_funcs import get_response_for_chatprompt

app = func.FunctionApp(http_auth_level=func.AuthLevel.ANONYMOUS)

@app.route(route="query", methods=["POST"])
def thesalesman_api(req: func.HttpRequest) -> func.HttpResponse:
    ip_address = req.headers.get('X-Forwarded-For')
    logging.info(f'{ip_address} - FUNCTION TRIGGRED.')
    data = req.get_json()
    query_param = data.get('query')
    if not query_param:
        return func.HttpResponse(body=json.dumps({'error': 'query parameter is required'}, status_code=400, mimetype='application/json'))

    print(f"API Called with query: {query_param}")
    
    previous_messages = data.get('previous_messages', [])
    version = data.get('version', 3)
    if isinstance(previous_messages, str):
        previous_messages = json.loads(previous_messages)

    try:
        response, sources, prompt_tokens, total_tokens = get_response_for_chatprompt(query_param, version=version, chat_history=previous_messages)
    except Exception as e:
        logging.error(f'Error occurred: {e}')
        return func.HttpResponse(body=json.dumps({'error': 'An error occurred while processing the request'}), status_code=500, mimetype='application/json')

    return func.HttpResponse(body=json.dumps({'response': response, 'sources': sources, 'prompt_tokens': prompt_tokens, 'total_tokens': total_tokens}), mimetype='application/json', status_code=200)