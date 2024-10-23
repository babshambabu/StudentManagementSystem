Student Management System

The Student Management System is a robust web application built to streamline administrative tasks within educational institutions, focusing on the effective management of student, staff, and librarian data. It simplifies tasks such as handling student enrollment, tracking academic performance, and managing fee structures. The system also features a library management module, allowing users to monitor book usage and reviews. Role-Based Access Control (RBAC) ensures that only authorized personnel can access specific features: administrators have overall control, while staff and librarians can access relevant functions based on their roles. This design enhances security, promotes efficiency, and reduces manual workload by automating core operations in schools or universities.

Key Features

- Role-Based Access Control : Provides different access levels for School Admins, Office Staff, and Librarians.
- CRUD Operations : Allows Create, Read, Update, and Delete operations for student records, library activities, and fee history.
- Confirmation Dialogs : Prevents unintentional deletions or modifications with user confirmation prompts.
- Library Review : Includes the ability to add and manage library reviews.

Technology Stack

- Frontend : React with Redux for state management.
- Backend : Node.js with Express.
- Database : MongoDB (hosted on MongoDB Atlas).
- State Management : Redux is used for global state management.

etup Guide

Prerequisites

Ensure you have the following installed:

- Node.js
- MongoDB Atlas
- Git
- VS Code

Backend Setup

1. Clone the Repository:  
   Clone the backend repository using Git:

   ```bash
   git clone https://github.com/babshambabu/StudentManagementSystem.git
   cd server
   ```

2. Install Dependencies:  
   Install the necessary packages:

   ```bash
   npm install
   ```

3. Environment Configuration:  
   Create a `.env` file in the server directory with the following configuration variables:

   ```bash
   MONGO_URI="mongodb+srv://babshambabu:One2three@smscluster.rcw3r.mongodb.net/studentms"
   SALT="$2a$10$dJKu2vyko4R8EELcD41sYe"
   JWT_SECRET='studentmanagementsystem'
   SECRET_KEY='studentmanagementsystem'
   ```

4. Start the Server:  
   Run the backend server:

   ```bash
   npm run dev
   ```

Frontend Setup

1. Navigate to Frontend Directory:  
   Change to the frontend directory:

   ```bash
   cd client
   ```

2. Install Dependencies:  
   Install all the required frontend packages:

   ```bash
   npm install
   ```

3.Start the React Application:  
   Run the frontend application:

   ```bash
   npm start
   ```

Libraries Used

Backend Libraries:

- express
- mongoose
- dotenv
- jsonwebtoken
- bcryptjs

Frontend Libraries:

- react
- react-dom
- react-router-dom
- redux
- axios
- tailwindcss
- react-toastify

Theme:

DaisyUI : Used for styling the frontend components.
