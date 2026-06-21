# AI Travel Planner ✈️

An AI-powered travel planning platform that generates personalized travel itineraries, budget estimates, hotel recommendations, and travel suggestions based on user preferences.

---

# Live Demo

## Frontend Application

Frontend URL:

https://ai-travel-planner-vasanthgondrala-7s-projects.vercel.app

Login Page:

https://ai-travel-planner-vasanthgondrala-7s-projects.vercel.app/login

---

## Backend API

Backend Service URL:

https://ai-travel-planner-backend-gy6l.onrender.com

Health Endpoint:

https://ai-travel-planner-backend-gy6l.onrender.com/api/health

---

## Deployment Platforms

Frontend Deployment:

Vercel

Backend Deployment:

Render

Database:

MongoDB Atlas

AI Provider:

Google Gemini 2.5 Flash

---

# Project Overview

AI Travel Planner helps travelers create complete travel plans in seconds using Generative AI.

Users can enter a destination, trip duration, budget preference, and interests, and the system automatically generates:

* Day-by-day travel itinerary
* Budget breakdown
* Hotel recommendations
* Travel suggestions
* Personalized travel experience

The platform combines modern web technologies with Google's Gemini AI to provide intelligent travel planning assistance.

---

# Features

### User Authentication

* User Registration
* User Login
* JWT Authentication
* Protected Routes

### AI Trip Generation

* Destination-based planning
* Personalized itineraries
* Interest-based recommendations
* Budget-aware suggestions

### Budget Planning

* Flight estimation
* Accommodation estimation
* Food expenses
* Activity expenses
* Transportation expenses
* Total trip cost estimation

### Hotel Recommendations

* AI-generated hotel suggestions
* Price category recommendations
* Detailed descriptions

### Trip Management

* Create Trips
* View Trips
* Delete Trips
* Dashboard Management

### Modern User Interface

* Responsive Design
* Mobile Friendly
* Dark Theme
* Modern Dashboard
* Interactive Cards

---

# Tech Stack

## Frontend

* Next.js 16
* React
* TypeScript
* Tailwind CSS
* Axios
* React Hot Toast
* Lucide React Icons

### Why Next.js?

Next.js provides optimized performance, routing, scalability, and seamless deployment through Vercel.

---

## Backend

* Node.js
* Express.js
* TypeScript
* JWT Authentication
* Express Middleware

### Why Express.js?

Express provides a lightweight and scalable architecture for building REST APIs and integrating AI services.

---

## Database

* MongoDB Atlas
* Mongoose ODM

### Why MongoDB?

MongoDB allows flexible storage of dynamic AI-generated travel data and personalized itineraries.

---

## AI Integration

* Google Gemini API
* Gemini 2.5 Flash Model

### Why Gemini?

Gemini provides fast response generation, strong reasoning capabilities, and high-quality travel recommendations.

---

# High-Level Architecture

```text
User
 │
 ▼
Next.js Frontend (Vercel)
 │
 ▼
Express API (Render)
 │
 ├── Authentication Layer
 │
 ├── Trip Management Service
 │
 ├── Gemini AI Service
 │
 └── MongoDB Atlas
```

---

# Authentication & Authorization

The application uses JWT (JSON Web Token) based authentication.

### Authentication Flow

1. User registers using email and password.
2. Password is securely stored.
3. User logs in and receives a JWT token.
4. Token is stored on the client side.
5. Protected routes validate the token before granting access.

### Authorization Rules

* Unauthenticated users cannot access protected pages.
* Only authenticated users can create trips.
* Users can manage only their own trips.
* Protected API endpoints require a valid JWT token.

---

# AI Agent Design & Purpose

The AI component is powered by Google Gemini 2.5 Flash.

### Purpose

The AI agent acts as an intelligent travel assistant that converts user preferences into a complete travel plan.

### Inputs

* Destination
* Duration
* Budget Tier
* Interests

### Outputs

* Day-wise itinerary
* Hotel recommendations
* Budget estimation
* Travel suggestions

### Benefits

* Personalized planning
* Faster decision making
* Reduced manual research
* Better travel experience

---

# Creative / Custom Feature

### One-Click AI Travel Planning

Unlike traditional travel platforms that require searching across multiple websites, AI Travel Planner automatically generates:

* Complete itinerary
* Hotel recommendations
* Budget breakdown
* Travel suggestions

from a single user input form.

Additional custom features include:

* Trip History Management
* AI-Powered Recommendations
* Trip Deletion
* Personalized Dashboard
* Fully Responsive Interface

---

# Key Design Decisions & Trade-Offs

### Gemini AI Integration

Chosen for fast response generation and high-quality travel recommendations.

Trade-Off:

AI responses may vary slightly depending on prompts and context.

---

### MongoDB Database

Chosen because AI-generated travel content is dynamic and flexible.

Trade-Off:

Less strict schema enforcement compared to relational databases.

---

### JWT Authentication

Chosen for stateless and scalable authentication.

Trade-Off:

Requires proper token expiration management.

---

### Separate Frontend & Backend Deployments

Frontend deployed on Vercel and backend deployed on Render.

Trade-Off:

Requires CORS configuration and environment variable management.

---

# Folder Structure

```text
AI_TRAVEL_PLANNER
│
├── backend
│   ├── src
│   │   ├── config
│   │   ├── controllers
│   │   ├── middleware
│   │   ├── models
│   │   ├── routes
│   │   ├── services
│   │   ├── utils
│   │   └── validators
│   │
│   ├── tests
│   ├── package.json
│   └── tsconfig.json
│
├── frontend
│   ├── app
│   ├── components
│   ├── context
│   ├── lib
│   ├── services
│   ├── public
│   └── package.json
│
└── README.md
```

---

# System Workflow

### Step 1

User logs in or registers.

### Step 2

User creates a trip by entering:

* Destination
* Duration
* Budget Tier
* Interests

### Step 3

Backend receives the request.

### Step 4

Gemini AI generates:

* Itinerary
* Budget Breakdown
* Hotel Recommendations

### Step 5

Trip data is stored in MongoDB Atlas.

### Step 6

User can view, manage, or delete trips from the dashboard.

---

# Local Development Setup

## Clone Repository

```bash
git clone https://github.com/vasanthgondrala-7/AI_TRAVEL_PLANNER.git

cd AI_TRAVEL_PLANNER
```

---

## Backend Setup

```bash
cd backend

npm install

npm run dev
```

### Backend Environment Variables

Create `.env`

```env
PORT=5000

MONGO_URL=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

GEMINI_API_KEY=your_gemini_api_key

CLIENT_URL=http://localhost:3000
```

---

## Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

### Frontend Environment Variables

Create `.env.local`

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

---

# API Endpoints

## Authentication

### Register

```http
POST /api/auth/register
```

### Login

```http
POST /api/auth/login
```

---

## Trips

### Create Trip

```http
POST /api/trips
```

### Get All Trips

```http
GET /api/trips
```

### Get Single Trip

```http
GET /api/trips/:id
```

### Delete Trip

```http
DELETE /api/trips/:id
```

---

# Deployment Guide

## Backend Deployment (Render)

1. Push repository to GitHub.
2. Create Render Web Service.
3. Select Root Directory:

```text
backend
```

4. Configure Environment Variables.
5. Deploy.

Required Variables:

```env
NODE_ENV=production

PORT=10000

MONGO_URL=

JWT_SECRET=

GEMINI_API_KEY=

CLIENT_URL=https://ai-travel-planner-vasanthgondrala-7s-projects.vercel.app
```

---

## Frontend Deployment (Vercel)

1. Import GitHub repository.
2. Set Root Directory:

```text
frontend
```

3. Add Environment Variables.

```env
NEXT_PUBLIC_API_URL=https://ai-travel-planner-backend-gy6l.onrender.com/api
```

4. Deploy.

---

# Security Features

* JWT Authentication
* Protected Routes
* Environment Variable Protection
* API Validation
* Rate Limiting
* Error Handling Middleware

---

# Known Limitations

* Hotel recommendations are AI-generated and not connected to booking providers.
* Flight prices are estimated and not fetched from airline APIs.
* Weather information may not always be real-time.
* Free-tier hosting may introduce cold-start delays.
* Generated recommendations depend on AI response quality.

---

# Future Improvements

* Google Maps Integration
* Real-Time Weather Forecasts
* Flight API Integration
* Hotel Booking APIs
* AI Travel Chat Assistant
* Multi-Language Support
* Travel Sharing Features
* PDF Itinerary Export
* Email Trip Reports

---

# Author

Vasanth G

Full Stack Developer | MERN Stack Developer

GitHub:

https://github.com/vasanthgondrala-7

---

# License

This project is developed for educational, internship, hackathon, and portfolio purposes.

