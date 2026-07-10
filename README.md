# Personal Chatbot

A personal AI assistant chatbot that answers questions about Atha Ahsan Xavier Haris using retrieval-augmented generation (RAG), while also handling general queries, web search, multimodal input, and real-time streaming responses.

## Features

- **Personal Q&A with RAG**: Retrieves relevant structured knowledge about Atha from Supabase Vector before generating grounded answers.
- **General Knowledge**: Handles a wide range of user questions beyond personal context.
- **Web Search Integration**: Retrieves up-to-date information using Tavily through a Netlify Edge Function query-planning flow.
- **Multimodal Input**: Supports both text and image inputs for richer interactions.
- **Real-Time Streaming**: Delivers low-latency responses using Netlify Edge Functions.
- **Responsive Interface**: Clean and responsive chat UI for smooth user experience.

## Technologies Used

- **Frontend**: React.js, Vite
- **Styling**: Tailwind CSS, DaisyUI
- **LLM**: `openai/gpt-5.4` via OpenRouter
- **Embeddings & RAG**: OpenAI text-embedding-3-large via OpenRouter + Supabase Vector
- **Web Search Pipeline**: Tavily API + Netlify Edge Functions
- **Hosting & Backend**: Netlify (Functions + Edge Functions)

## Live Demo

This project is hosted on Netlify:
https://chatbot.athaahsan.com/
