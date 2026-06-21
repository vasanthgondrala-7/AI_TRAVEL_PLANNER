# AI Travel Planner ✈️

An AI-powered travel planning platform that generates personalized travel itineraries, budget estimates, hotel recommendations, and packing suggestions based on user preferences.

---

## Overview

AI Travel Planner helps travelers create complete travel plans in seconds using Generative AI. Users can enter a destination, trip duration, budget preference, and interests, and the system automatically generates:

* Day-by-day travel itinerary
* Budget breakdown
* Hotel recommendations
* Travel suggestions
* Smart trip planning experience

The platform combines modern web technologies with Google's Gemini AI to provide personalized travel planning assistance.

---

# Live Demo

## Frontend Application

Access the live AI Travel Planner application:

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
* Total trip cost

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

## Backend

* Node.js
* Express.js
* TypeScript
* MongoDB
* Mongoose
* JWT Authentication
* Express Middleware

## AI Integration

* Google Gemini API
* Gemini 2.5 Flash Model

# Deployment Guide

## Production Deployment

### Frontend (Vercel)

Live URL:
https://ai-travel-planner-vasanthgondrala-7s-projects.vercel.app

### Backend (Render)

Live API:
https://ai-travel-planner-backend-gy6l.onrender.com

### Production API Base URL

https://ai-travel-planner-backend-gy6l.onrender.com/api

### Production Login Page

https://ai-travel-planner-vasanthgondrala-7s-projects.vercel.app/login

---

## Backend Deployment (Render)

1. Push repository to GitHub.
2. Create Render Web Service.
3. Select Root Directory:
   backend
4. Configure Environment Variables.
5. Deploy.

Required Variables:

MONGO_URL=
JWT_SECRET=
GEMINI_API_KEY=
CLIENT_URL=https://ai-travel-planner-vasanthgondrala-7s-projects.vercel.app

---

## Frontend Deployment (Vercel)

1. Import GitHub repository.
2. Set Root Directory:

frontend

3. Add Environment Variable:

NEXT_PUBLIC_API_URL=https://ai-travel-planner-backend-gy6l.onrender.com/api

4. Deploy.

---

# Project Architecture

```text
User
 │
 ▼
Next.js Frontend (Vercel)
 │
 ▼
Express API (Render)
 │
 ├── Authentication
 │
 ├── Trip Management
 │
 ├── Gemini AI Service
 │
 └── MongoDB Atlas
```

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

Trip is stored in MongoDB.

### Step 6

User can view, manage, or delete trips from the dashboard.

---

# Local Development Setup

## Clone Repository

```bash
git clone https://github.com/your-username/AI_TRAVEL_PLANNER.git

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

MONGODB_URI=your_mongodb_connection_string

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

1. Push backend to GitHub.
2. Create Render Web Service.
3. Connect GitHub repository.
4. Add Environment Variables.
5. Deploy.

Required Variables:

```env
MONGODB_URI=
JWT_SECRET=
GEMINI_API_KEY=
CLIENT_URL=
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
NEXT_PUBLIC_API_URL=https://your-backend.onrender.com/api
```

4. Deploy.

---

# Future Improvements

* Google Maps Integration
* Real-time Weather Forecasts
* Flight API Integration
* Hotel Booking APIs
* AI Chat Travel Assistant
* Multi-language Support
* Travel Sharing Features
* PDF Itinerary Export
* Email Trip Reports

---

# Security Features

* JWT Authentication
* Protected Routes
* Environment Variable Protection
* API Validation
* Rate Limiting
* Error Handling Middleware

---

# Author

Vasanth G

Full Stack Developer | MERN Stack Developer

GitHub:
https://github.com/vasanthgondrala-7

---

# License

This project is developed for educational, internship, and portfolio purposes.
