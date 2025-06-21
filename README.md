# Company Query Tool - Full Stack Application

A monorepo containing a NestJS backend with Perplexity AI integration and a React frontend for querying company information.

## Project Structure

```
redcar-qa-project-v2/
├── backend/                 # NestJS API server
│   ├── src/
│   │   ├── app.controller.ts
│   │   ├── app.service.ts
│   │   └── app.module.ts
│   ├── package.json
│   └── README.md
├── frontend/               # React single-page application
│   ├── src/
│   │   ├── App.tsx
│   │   ├── index.tsx
│   │   └── index.css
│   ├── public/
│   ├── package.json
│   └── README.md
├── package.json           # Root package.json for monorepo scripts
└── README.md             # This file
```

## Features

- **Backend**: NestJS API with Perplexity AI integration
- **Frontend**: Modern React app with beautiful UI
- **Monorepo**: Easy management of both frontend and backend
- **Proxy**: Frontend automatically proxies API calls to backend

## Quick Start

### 1. Install Dependencies

```bash
# Install all dependencies for both frontend and backend
npm run install:all
```

### 2. Set Up Environment Variables

Create a `.env` file in the `backend/` directory:

```bash
cd backend
echo PERPLEXITY_API_KEY=your_api_key_here > .env
```

**Get your Perplexity API key:**
- Sign up at https://www.perplexity.ai/
- Navigate to your API settings
- Copy your API key

### 3. Run the Application

#### Option A: Run Both Together (Recommended)
```bash
npm run dev
```

#### Option B: Run Separately
```bash
# Terminal 1 - Backend (port 3000)
npm run backend

# Terminal 2 - Frontend (port 3001)
npm run frontend
```

### 4. Access the Application

- **Frontend**: http://localhost:3001
- **Backend API**: http://localhost:3000

## Usage

1. Open http://localhost:3001 in your browser
2. Enter a company domain (e.g., "google.com", "microsoft.com")
3. Ask a question about the company
4. Click "Submit Query" to get AI-powered analysis

## Example Queries

- "What does this company do?"
- "Who is the CEO?"
- "What are their main products?"
- "What is their revenue?"
- "How many employees do they have?"

## Development

### Backend Development
```bash
cd backend
npm run start:dev    # Development mode with hot reload
npm run build        # Build for production
npm test            # Run tests
```

### Frontend Development
```bash
cd frontend
npm start           # Development server
npm run build       # Build for production
npm test           # Run tests
```

### Monorepo Scripts
```bash
npm run dev         # Run both frontend and backend
npm run build       # Build both applications
npm run test        # Run tests for both applications
```

## API Endpoints

- `POST /query` - Submit a query to Perplexity AI
  - Body: `{ "query": "your question here" }`
  - Response: `{ "result": "AI response" }`

## Technologies Used

### Backend
- **NestJS**: Modern Node.js framework
- **TypeScript**: Type-safe JavaScript
- **Perplexity AI**: AI-powered company analysis
- **Axios**: HTTP client for API calls

### Frontend
- **React 18**: Modern React with hooks
- **TypeScript**: Type-safe JavaScript
- **CSS3**: Modern styling with gradients and animations
- **Fetch API**: HTTP requests to backend

## Deployment

### Backend Deployment
```bash
cd backend
npm run build
npm run start:prod
```

### Frontend Deployment
```bash
cd frontend
npm run build
# Deploy the build/ folder to your hosting service
```

## Troubleshooting

### Common Issues

1. **"Perplexity API key not configured"**
   - Make sure you've set the `PERPLEXITY_API_KEY` environment variable
   - Check that the `.env` file is in the `backend/` directory

2. **Frontend can't connect to backend**
   - Ensure the backend is running on port 3000
   - Check that the proxy configuration in `frontend/package.json` is correct

3. **Port conflicts**
   - Backend runs on port 3000
   - Frontend runs on port 3001
   - Make sure these ports are available

### Getting Help

- Check the console for error messages
- Verify all dependencies are installed
- Ensure environment variables are set correctly
- Check that both services are running on the correct ports
