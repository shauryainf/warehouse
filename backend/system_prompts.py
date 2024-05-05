system_prompt_purchase_order = """
You are a helpful warehouse assistant, you are help the customer to generate a purchase order
with a list of products and quantities correctly stored in the system.

The usual order generation is as follows:
• Customer: Start the order process
• Customer: Say the product and quantity
• Assistant: Hear the product and quantity
• Assistant Confirm the order line

During the purchase order generation some issues could appear (correction quantity, correction of product, reset, cancel, etc), and the system should have the conversational ability to solve them.
"""

system_prompt_process_tips = """
You a are a helpful warehouse assistant, you are helping the Tina to collect a customer's products from a warehouse.

The following is the chat_history of the conversation so far with Tina:
{chat_history}

The following picking list was retrieved for the customer for their purchase order. The picking list includes names, quantities and locations of the
products in the warehouse:
{picking_list} 

The usual picking process conversation is as follows:
• Tina: Start the picking process
• Assistant: Tell the next location
• Assistant: Say the product name or code or description
• Assistant: Tell the quantity to collect from warehouse
• Tina: Confirm the quantity collected

In simple terms, for every product in the list, you inform Tina about the name, location and quantity to collect. Once Tina confirms, you move on to the next product. 
You only do so until you have covered all the products present in the picking_list in the chat_history.
During picking process, some issues could appear (wrong location, no stock on location, wrong product code, etc). The system should respond according to these issue to help Tina solve them.
"""
all_order_list=[
            {
                "order_number": 1,
                "items": [
                    {
                        "id": 1,
                        "quantity": 1
                    },
                    {
                        "id": 12,
                        "quantity": 2
                    },
                    {
                        "id": 3,
                        "quantity": 3
                    }
                ]
            },
            {
                "order_number": 2,
                "items": [
                    {
                        "id": 4,
                        "quantity": 1
                    },
                    {
                        "id": 5,
                        "quantity": 2
                    },
                    {
                        "id": 6,
                        "quantity": 3
                    }
                ]
            },
            {
                "order_number": 3,
                "items": [
                    {
                        "id": 7,
                        "quantity": 1
                    },
                    {
                        "id": 8,
                        "quantity": 2
                    },
                    {
                        "id": 9,
                        "quantity": 3
                    }
                ]
            }
        ]

prompt_0_order_change = """
Identify the order number based in the query:
{query}
Below is the list of orders, order number starts from 1:
{order_list}

Only return the order number of type integer. If the order number from the query is not present in order_list, return -1.
"""
prompt_1_start_order = """
Given the picking list: 
{picking_list}
Initiate the order process by informing the customer about the location of the first product in the list. 
"""
prompt_2_order_query = """
You are provided the the following query from the user:
{query}

Following is context from the vector database: 
{context}

Use this information to answer the query and recommend products to the user where possible. If the context is not sufficient or relevant to the query, ask the user for more information.
"""
prompt_3_order_end = """
The order picking process has now finished. Politely end the conversation and ask if there are any further queries.
"""
prompt_4_general_query = """
"""
prompt_5_update_quantity = """
"""
prompt_6_reset_order = """
"""
prompt_7_cancel_order = """
"""
prompt_8_modify_order = """
"""


def get_prompt(number):
    if number == 0:
        return prompt_0_order_change
    elif number == 1:
        return prompt_1_start_order
    elif number == 2:
        return prompt_2_order_query
    elif number == 3:
        return prompt_3_order_end
    elif number == 4:
        return prompt_4_general_query
    elif number == 5:
        return prompt_5_update_quantity
    elif number == 6:
        return prompt_6_reset_order
    elif number == 7:
        return prompt_7_cancel_order
    elif number == 8:
        return prompt_8_modify_order
    else:
        return ""
    

def get_order_list(number):
    # retireve an item from all_order_list where order_number is equal to number
    for order in all_order_list:
        if order["order_number"] == number:
            return order
