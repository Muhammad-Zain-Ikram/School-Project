# School Management System

A modern web application for managing school operations built with React, Tailwind CSS, and Material-UI.

## Project Structure

### Core Components
- `App.jsx` - Root component and entry point
- `main.jsx` - Router configuration and app initialization 
- `index.html` - HTML template
- `index.css` - Global styles with Tailwind

### Authentication & Context
- `AuthContext.jsx` - User authentication and role management
- `AttendenceContext.jsx` - Attendance tracking and management
- `stats_context.jsx` - Statistical data management
- `PrivateRoute.jsx` - Protected route handling
- `sendJson.js` - API request utilities

### Admin Components
- `Admin.jsx` - Admin dashboard layout
- `Side.jsx` - Admin sidebar navigation
- `Session.jsx` - Academic session management
- `students.jsx` - Student management interface
- `teachers.jsx` - Teacher management interface
- `manageClasses.jsx` - Class management
- `Substitution.jsx` - Teacher substitution handling
- `test.jsx` - Test/exam management
- `Teacherattend.jsx` - Teacher attendance tracking

### Teacher Components
- `teachers.jsx` - Teacher dashboard
- `attendance.jsx` - Student attendance marking
- `addmarks.jsx` - Test scores entry
- `viewmarks.jsx` - View student marks
- `ownattend.jsx` - View personal attendance

### Headmaster Components 
- `Dashboard.jsx` - Principal dashboard with statistics
- `ClassesLists.jsx` - Class-wise attendance overview
- `TeacherList.jsx` - Teacher attendance monitoring
- `studentAttend.jsx` - Student attendance monitoring
- `view.jsx` - Test results overview

### Utility Components
- `backbtn.jsx` - Navigation back button
- `Popups.jsx` - Success/error notifications
- `layoutattendance.jsx` - Attendance UI layout
- `redirect.jsx` - Navigation utility

### Landing Page
- `Landing.jsx` - Public landing page
- `Footer.jsx` - Site footer
- `GetStarted.jsx` - Login interface

## Setup & Installation

1. Clone repository
2. Install dependencies: `npm install`
3. Configure environment variables in `.env`
4. Start development server: `npm run dev`

## Features

- Role-based access control (Admin/Teacher/Principal)
- Student & teacher attendance management
- Test creation and score management 
- Academic session handling
- Class management and teacher substitution
- Statistical dashboards
- Responsive design for tablets and desktop

## Technologies

- React
- React Router
- Tailwind CSS
- Material-UI
- Axios
- DayJS