import openai
import os
import json
from dotenv import load_dotenv

load_dotenv()
openai.api_key = os.getenv("OPENAI_API_KEY")

#--------------------------------- Functions ---------------------------------#

def get_response_for_chatprompt(message, version=3, chat_history=None):
    # SEMANTIC SEARCH 
    # TODO
    print("Chat History: " + str(chat_history))
    # chat_history_as_string = message
    # if len(chat_history) > 0:
    #     chat_history_as_string =  " ".join([chat["content"] for chat in chat_history])

    context_list = []
    # context_list = similarity_search(chat_history_as_string)
    # print("Documents Recieved : " + str(len(context_list)))

    # PROMPT PROCESSING
    processed_chat_prompt = "You are a friendly AI assistant here to help you with any questions you have. Ask me anything!"
    processed_user_prompt = message
    #   processed_chat_prompt = chat_prompt.format(chat_history=str(chat_history))
    #   processed_user_prompt = user_prompt.format(message=message, context=str(context_list))
    messages = []
    messages.append({"role": "system", "content": processed_chat_prompt})
    if chat_history:
        for chat in chat_history:
            messages.append(chat)
    messages.append({"role": "user", "content": processed_user_prompt})

    # OPENAI API CALL
    model = "gpt-3.5-turbo"
    if version == 4:
        model = "gpt-4-0125-preview"

    response = openai.chat.completions.create(
        model=model,
        messages=messages
    )

    return (response.choices[0].message.content), context_list, response.usage.prompt_tokens, response.usage.total_tokens




#--------------------------------- Testing ---------------------------------#

# message = "What is the capital of the United States?"
# response, sources, prompt_tokens, total_tokens = get_response_for_chatprompt(message)
# print("Response: " + response + "\nSources: " + str(sources) + "\nPrompt Tokens: " + str(prompt_tokens) + "\nTotal Tokens: " + str(total_tokens))