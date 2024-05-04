system_prompt_purchase_order = """
+ The goal is to end the Purchase Order process
with a list of products and quantities correctly
stored in the system.
• During the purchase order generation some issues could appear (correction quantity,
correction of product, reset, cancel, etc) and
the system should have the conversational
ability to solve them
• The usual order generation process:
• Start the order process
• Say the product and quantity
• Hear the product and quantity
• Confi rm the order line
• Based on the usual process add any
conversational improvement you conside
"""

system_prompt_process_tipps = """
• The system should listen to a purchase order
number and recover the picking list
• The picking list should include the product
names, quantities and locations of the
products in the warehouse
• During picking process, some issues could appear (wrong location, no stock on location,
wrong product code, etc) the system should
have conversational capabilities to report
and/or solve those issues.
• The usual picking process is:
• Start picking process
• Hear the next location
• Say the product or code
• Hear the quantity to collect
• Confirm the quantity collected
• Based on the usual process add any
conversational improvement you consider
"""