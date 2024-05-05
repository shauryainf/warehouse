import openai
from dotenv import load_dotenv
import os

load_dotenv()
openai.api_key = os.getenv('OPENAI_API_KEY')

task_prompt = """
"""
# TODO
# Classify whether we are dealing with a customer or Tina
def classify_task(query):
    pass

picking_process_prompt = """
You are a classifier for identifying the type of query in the process of picking orders. You have to evaluate the query and classify 
into the following categories, thus helping the employee, Tina, to fullfill purchase orders:

0. Order Change: Tina wants to work on a different order. She doesn't want to pick sequentially anymore and chose one on her own.
1. Start of Order Picking Process: Tina wants to start the order picking process.
2. Order Query: Tina has a query about the order.
3. Order End: Tina has finished the order picking process.
4. General Query: Tina has a general query that doesn't fit into any of the other categories.
5. Update Quantity: Tina wants to update the quantity of a product.
6. Reset Order: Tina wants to reset a product order and start over.
7. Cancel Order: Tina wants to cancel the order.
8. Modify Order: Tina wants to modify the order. In a situation such as where quantity of product request is higher than its stock.

Provided the following query from the user:
{query}

which of the above categories does the query best fall into? Only return the number of the category. If the query doesn't fit into any of the categories, return 4.
"""

def classify_picking_process_query_type(query, current_state : int):
    # TODO - Add the current state to the prompt
    picking_process_prompt_updated = picking_process_prompt.format(query=query)

    model="gpt-3.5-turbo"
    # model="gpt-4-0125-preview"

    response = openai.chat.completions.create(
        model=model,
        temperature=0, 
        messages=[{"role": "system", "content": picking_process_prompt_updated}]
    )

    return response.choices[0].message.content

# Testing:
query = 'i would like to change '
label = classify_picking_process_query_type(query, 'start')
print(label)