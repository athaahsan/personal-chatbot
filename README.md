# Personal Chatbot

A personal AI assistant chatbot that answers questions about Atha Ahsan Xavier Haris while also handling general queries, with support for web search, multimodal input, and real-time streaming responses.

## Features

- **Personal Q&A**: Provides detailed answers about Atha’s background, education, projects, and interests.
- **General Knowledge**: Handles a wide range of user questions beyond personal context.
- **Web Search Integration**: Retrieves up-to-date information using Tavily via an n8n-based LLM query pipeline (powered by Grok 4.1 Fast).
- **Multimodal Input**: Supports both text and image inputs for richer interactions.
- **Real-Time Streaming**: Delivers low-latency responses using Netlify Edge Functions.
- **Responsive Interface**: Clean and responsive chat UI for smooth user experience.

## Technologies Used

- **Frontend**: React.js, Vite  
- **Styling**: Tailwind CSS, DaisyUI  
- **LLM**: OpenAI GPT-5.2-Chat via OpenRouter  
- **Web Search Pipeline**: Tavily API + n8n (LLM-based query generation with Grok 4.1 Fast)  
- **Hosting & Backend**: Netlify (Functions + Edge Functions)

## Live Demo

This project is hosted on Netlify:  
👉 https://atha-personal-chatbot.netlify.app/