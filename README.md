# Task Scheduler App

## Overview

This Node.js application is a Task Scheduler that allows users to manage tasks, set reminders, and receive notifications via email. It includes features for user authentication, task management, and customizable reminders.

## Features

- **User Authentication**

  - Users can sign up, log in, and manage their accounts securely.
  - JWT (JSON Web Token) is used for authentication.

- **Task Management**

  - Create, update, delete tasks.
  - View tasks with details such as title, description, scheduled date, priority, and status.

- **Email Notifications**

  - Users receive email notifications for task reminders and other relevant updates.
  - Nodemailer is used to send emails.
  - Customizable email templates.

- **Task Reminders**

  - Set reminders for pending tasks.
  - Customizable reminder settings (frequency, time).
  - Use of node-cron for scheduling reminders.

- **Database and ORM**

  - SQLite database with Sequelize ORM.
  - Models for User and Task with associations.

- **API Endpoints**

  - RESTful APIs for user authentication and task management.
  - Examples:
    - `/api/auth/signup`: User registration endpoint.
    - `/api/auth/login`: User login endpoint.
    - `/api/tasks`: CRUD operations for tasks.

- **Error Handling**

  - Comprehensive error handling for API requests.
  - Validation and error responses.

- **Middleware**

  - Authentication middleware with JWT verification.
  - Authorization middleware for role-based access control.

## Technologies Used

- Node.js
- Express.js
- Sequelize (with SQLite)
- JWT for authentication
- Nodemailer for email notifications
- node-cron for task scheduling

## Getting Started

1. Clone the repository.
2. Install dependencies: `npm install`.
3. Set up environment variables (`.env` file).
4. Run migrations (if necessary): `npx sequelize-cli db:migrate`.
5. Start the server: `npm start`.

## Usage

- Register a new user, log in, and start managing tasks.
- Set reminders for tasks and receive email notifications based on your settings.
- Explore the API endpoints for task management.
