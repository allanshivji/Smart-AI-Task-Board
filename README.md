# 🤖 Smart Task Board - AI-Powered Task Management System

An intelligent task management application that leverages Google's Gemini AI to automatically analyze, categorize, and prioritize tasks. Built with React, Node.js, and TypeScript for a modern, type-safe development experience.

![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![AI](https://img.shields.io/badge/Google_Gemini-4285F4?style=for-the-badge&logo=google&logoColor=white)

## ✨ Features

### 🤖 AI-Powered Analysis
- **Automatic Categorization**: AI classifies tasks as frontend, backend, design, devops, etc.
- **Intelligent Prioritization**: Smart priority scoring based on task impact and urgency
- **Time Estimation**: AI-generated time estimates for task completion
- **Smart Tagging**: Automatic generation of relevant technical tags
- **Project Insights**: AI-driven recommendations and project health analysis

### 🎯 Task Management
- **Drag & Drop Kanban Board**: Move tasks between To Do, In Progress, and Done columns
- **Real-time Updates**: Changes are saved instantly
- **Task Creation**: Beautiful form with AI analysis preview
- **Multiple Views**: Switch between Kanban board and detailed list view
- **Visual Priority Indicators**: Color-coded priority levels and progress tracking

### 💻 Technical Features
- **Full TypeScript**: Type-safe development across frontend and backend
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Modern UI**: Clean, professional interface with Bootstrap styling
- **RESTful API**: Well-structured backend with proper error handling
- **AI Fallbacks**: Graceful degradation when AI services are unavailable

## 🛠️ Tech Stack

### Frontend
- **React 19** with TypeScript
- **Bootstrap & Reactstrap** for UI components
- **@hello-pangea/dnd** for drag & drop functionality
- **Responsive design** with modern CSS

### Backend
- **Node.js** with Express.js
- **TypeScript** for type safety
- **Google Gemini AI** for intelligent task analysis
- **JSON file storage** (easily upgradeable to databases)
- **CORS enabled** for cross-origin requests

### Development Tools
- **Create React App** with TypeScript template
- **Nodemon** for development auto-reload
- **ESLint & Prettier** for code quality
- **Hot reloading** for both frontend and backend

## 🚀 Getting Started

### Prerequisites
- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **Google Gemini API Key** ([Get it here](https://makersuite.google.com/app/apikey))

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/smart-task-board.git
   cd smart-task-board
   ```

2. **Install Backend Dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Install Frontend Dependencies**
   ```bash
   cd ../frontend
   npm install
   ```

4. **Set up Environment Variables**
   
   Create a `.env` file in the `backend` directory:
   ```env
   PORT=8080
   NODE_ENV=development
   GEMINI_API_KEY=your_gemini_api_key_here
   ```

   To get your Gemini API key:
   - Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
   - Sign in with your Google account
   - Click "Create API Key"
   - Copy the generated key to your `.env` file

### Running the Application

1. **Start the Backend Server**
   ```bash
   cd backend
   npm run dev
   ```
   The backend will run on `http://localhost:8080`

2. **Start the Frontend (in a new terminal)**
   ```bash
   cd frontend
   npm start
   ```
   The frontend will run on `http://localhost:3000`

3. **Open your browser**
   Navigate to `http://localhost:3000` to use the application

## 📖 Usage

### Creating Tasks
1. Fill in the task title and description in the form
2. Click "Create Task with AI Analysis"
3. Watch as AI automatically categorizes and analyzes your task
4. View the AI-generated category, priority, time estimate, and tags

### Managing Tasks
- **Kanban Board**: Drag tasks between columns or use the move buttons
- **List View**: Toggle to see detailed task information
- **AI Insights**: Check the insights panel for project-level recommendations

### AI Features in Action
- **"Fix login bug on mobile Safari"** → Category: `frontend`, Priority: `high`, Tags: `mobile`, `authentication`, `safari`
- **"Set up CI/CD pipeline"** → Category: `devops`, Priority: `medium`, Tags: `automation`, `deployment`
- **"Design user dashboard"** → Category: `design`, Priority: `medium`, Tags: `ui`, `wireframes`

## 🏗️ Project Structure

```
smart-task-board/
├── frontend/                 # React TypeScript application
│   ├── src/
│   │   ├── components/      # React components
│   │   │   ├── TaskForm.tsx
│   │   │   ├── TaskList.tsx
│   │   │   ├── KanbanBoard.tsx
│   │   │   └── AIInsights.tsx
│   │   ├── types/          # TypeScript interfaces
│   │   ├── services/       # API service functions
│   │   └── App.tsx
│   └── package.json
├── backend/                  # Node.js TypeScript server
│   ├── src/
│   │   ├── routes/         # API route handlers
│   │   ├── services/       # Business logic & AI integration
│   │   ├── types/          # TypeScript interfaces
│   │   ├── data/           # JSON data storage
│   │   └── server.ts
│   ├── .env                # Environment variables
│   └── package.json
└── README.md
```

## 🔧 API Endpoints

- `GET /api/health` - Health check endpoint
- `GET /api/tasks` - Retrieve all tasks
- `POST /api/tasks` - Create new task with AI analysis
- `PUT /api/tasks/:id` - Update existing task
- `GET /api/tasks/insights` - Get AI-generated project insights

## 📱 Demo

### Key Features Showcase

**AI Task Analysis:**
```
Input: "Login button doesn't work on iPhone Safari"
AI Output:
├── Category: frontend
├── Priority: high
├── Estimated Hours: 6
├── Tags: mobile, authentication, safari, ios
└── Reasoning: "Mobile login issues affect user access and require browser-specific debugging"
```

**Project Insights:**
```
AI analyzes your entire project and provides:
├── "You have 3 high priority tasks that need immediate attention"
├── "Frontend tasks are dominating your backlog - consider backend focus"
├── "Bug cluster detected in authentication module"
└── "Recommended: Complete Task #12 first to unblock 3 other tasks"
```

**Built with ❤️, ☕, and AI**
