# Warehouse
## Inspiration
Some of our group members have gathered firsthand experience working in warehouses and could relate well to this problem. We saw a tremendous value proposition from having an AI assistant to simplify the tasks for both the customers and the employees at the warehouse.
## What it does
Our main focus was on the picking process tips part of the project. We leveraged the RAG pipeline to build an AI assistant to guide warehouse workers to complete product orders. 
## How we built it
On the backend, we experimented with different frameworks such as LangChain for the RAG architecture. After pre-processing the CSV file about different products, we further created embeddings in our vector database, MongoDB. This was followed by a retrieval layer, where we performed similarity search using euclidean distance to retrieved the mostl likely product. The final layer involved prompt engineering for different types of queries Tina may have.
On the other hand for the frontend we worked with next.js, tailwind.css and scadcn. For speech-to-text we used deepgram and for text-to-speech we used speech synthesis. We even managed to train our model to wake up on certian words with picovoice api. We even worked with google chrome experimental features making it possible to connect to bluetooth through the webapp.

## Challenges we ran into
We had a long battle in making work the speech-to-text because we wanted to have little no latency. We wanted the model to listen and respond seamlessly without any big silence part. In fact this made us try different apis (google, whisper and deepgram)

## Accomplishments that we're proud of
We are proud of managing the task on time, taking different meetings on project meanwhile hacking between backend and frontend. We are happy that we made a working webapp with a stunning UI and happy using RAG pipeline and learning during the process.

## What's next for THE WAREHOUSE
It was not possible for us to explore all the possible prompt scenarios due to time constraints, which can in the future allow us to integrate more generic queries and exceptions. We also currently mocked the purchase orders and would like to also build an assistant for the consumer side. 
