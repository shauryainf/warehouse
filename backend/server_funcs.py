import openai
import os
import json
from dotenv import load_dotenv
import system_prompts
from classifiers import classify_picking_process_query_type, classify_task 
from semantic_search_db import similarity_search

load_dotenv()
openai.api_key = os.getenv("OPENAI_API_KEY")

#--------------------------------- Functions ---------------------------------#

def get_response_for_chatprompt(message, version=3, chat_history=None):
    if message == "":
        return "Didn't catch that.", [], 0, 0
    # CLASSIFICATION

    classification = classify_picking_process_query_type(message)
    print("\nClassification: " + str(classification))
    if classification is not None and classification.isdigit():
        classification = int(classification)
    else:        
        return "Didn't catch that. Could you repeat that", [], 0, 0
    orders_list = []
    prompt = ""
    prompt = system_prompts.get_prompt(classification)
    if prompt == "":
        return "Didn't catch that. Could you repeat that", [], 0, 0
    prompt = prompt.format(query=message, order_list=str(system_prompts.all_order_list))
    print("Prompt: " + prompt)
    if classification == 0:
        # ORDER CHANGE

        new_order_number = openai.chat.completions.create(
            model='gpt-4-0125-preview',
            temperature=0,
            messages=[
                {
                    "role": "system",
                    "content":prompt
                }
            ]).choices[0].message.content
        # print('Prompt: ' + prompt)
        print('New Order Number: ' + new_order_number)
        if (new_order_number is not None and not new_order_number.isdigit()) or new_order_number == "-1":
            return "Please provide me with an order number.", [], 0, 0
        else:
            # get order list where order_number key is new_order_number, new_order_number can be a string
            new_order_number = int(new_order_number)  
            message = f"Display the order details for order {str(system_prompts.get_order_list(new_order_number))} in a markdown format."


        
        print("Order Change")


    # SEMANTIC SEARCH 
    print("Chat History: " + str(chat_history))
    chat_history_as_string = message
    if len(chat_history) > 0:
        chat_history_as_string =  " ".join([chat["content"] for chat in chat_history])

    context_list = []
    context_list = similarity_search(chat_history_as_string)
    print("Documents Recieved : " + str(len(context_list)))

    # PROMPT PROCESSING
    # processed_chat_prompt = system_prompts.system_prompt_process_tips.format(chat_history=str(chat_history), picking_list=str(system_prompts.get_order_list(new_order_number)))
    processed_chat_prompt = system_prompts.prompt_2_order_query.format(query=message, context_list=str(context_list))
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