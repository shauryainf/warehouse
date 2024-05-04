import openai
import os
import json
from dotenv import load_dotenv

load_dotenv()
openai_api_key = os.getenv('OPENAI_API_KEY')

extract_labels_prompt = """

"""

def extract_labels(extract_labels_prompt):

    response = openai.chat.completions.create(
        model="gpt-3.5-turbo",
        temperature=0, 
        response_format={ "type": "json_object" },
        messages=[{"role": "system", "content": extract_labels_prompt}]
    )
    
    return response.choices[0].message.content

## Testing
