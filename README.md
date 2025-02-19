# Contacts Web App

A simple web application for managing contacts, built with a React (Vite) frontend and a Django backend.

🚀 Getting Started:
  ---
  
  Ensure you have Git installed: https://git-scm.com/downloads
  
  Run the command "git clone https://github.com/Tha1widsol/Contacts-Web-App.git" on your terminal
  
  Go into the app folder
  
You can set up and run the application in two ways:
 
---

## 🐳 1. Running the App with Docker (Recommended)

Install Docker and ensure it's running on your machine - https://www.docker.com/

Navigate to the project directory.
Run the following command to build and start the app:
"docker-compose up --build".

Wait for all dependencies to install and for the containers to start.
Once it's up and running, copy the local URL from the terminal (e.g., http://localhost:5173/) and open it in your browser.

---

## 🛠 2. Manual Installation

  Ensure you have Node.js, Python, and Pip setup

  Go into backend directory and install the required dependencies: "pip install -r requirements.txt"

  Start the Django server: "python manage.py runserver"
  
  Frontend Setup (React + Vite)
  Open a new terminal and navigate to the frontend directory
  
  Install the required dependencies using the command "npm install"
  
  Start the React development server with the command "npm run dev"
  
  Copy the local URL from the terminal (e.g., http://localhost:5173/) and open it in your browser.

## Instructions to deploy to production using AWS

### 1. Set up backend

Package your Django app into a Docker container.
Configure Elastic Beanstalk or EC2 to host the backend.
Use AWS Systems Manager Parameter Store or Secrets Manager for environment variables.
Set up PostgreSQL on RDS, migrate your database, and update DATABASE_URL.

### 2. Set up frontend

Build the frontend (npm run build).
Upload the build files to an S3 bucket.
Use CloudFront as a CDN for performance.
Update API requests to use the deployed backend URL.

### 3. CI/CD Pipeline

Use GitHub Actions, AWS CodePipeline, or Amplify CI/CD to automate deployments.


### 4. Security & Monitoring

Use AWS IAM roles for permissions.
Enable CloudWatch logs for monitoring.
Use AWS WAF and Shield for security.


