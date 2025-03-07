# Contacts Web App

A simple web application for managing contacts, built with a React (Vite) frontend and a Django backend.

🚀 Getting Started:
  ---
  
  1. Ensure you have Git installed: https://git-scm.com/download
  2. Run the command "git clone https://github.com/Tha1widsol/Contacts-Web-App.git" on your terminal
  3. Go into the app folder
  
You can set up and run the application in two ways:
 
---

## 🐳 1. Running the App with Docker (Recommended)

1. Install Docker and ensure it's running on your machine - https://www.docker.com/
2. Navigate to the project directory and run the following command to build and start the app: "docker-compose up --build".
3. Wait for all dependencies to install and for the containers to start.
4. Once it's up and running, copy the local URL from the terminal (e.g., http://localhost:5173/) and open it in your browser.
   
---

## 🛠 2. Manual Installation

  1. Ensure you have Node.js, Python, and Pip setup
  2. Go into backend directory and install the required dependencies: "pip install -r requirements.txt"
  3. Run: "python manage.py migrate"
  4. Start the Django server: "python manage.py runserver"
  
  Frontend Setup (React + Vite)
  
  4. Open a new terminal and navigate to the frontend directory
  5. Install the required dependencies using the command "npm install"
  6. Start the React development server with the command "npm run dev"
  7. Copy the local URL from the terminal (e.g., http://localhost:5173/) and open it in your browser.


## Instructions to deploy to production using AWS

### 1. Set up backend

1. Ensure requirements.txt or Pipfile is up to date
2. Set up Gunicorn for WSGI server
3. Configure CORS to allow requests from the frontend domain
4. Set up Django ALLOWED_HOSTS properly
5. Use env variables for secrets (DB, API keys)

 #### Deploy Via (AWS Elastic Beanstalk)

1. Install AWS CLI & EB CLI (pip install awsebcli)
2. Initialize Elastic Beanstalk (eb init)
3. Deploy App (eb create my-django-api)
4. Attach RDS Database (PostgreSQL/MySQL)
5. Configure Environment Variables in AWS (e.g., DATABASE_URL, SECRET_KEY)
6. Enable HTTPS with an SSL certificate

### 2. Set up frontend

Run vite build → Generates static files in dist/ and minify, optimize assets

#### Deploy Via (AWS S3 + CloudFront)
1. Create an S3 Bucket (Enable public read or use CloudFront)
2. Upload the dist/ folder to S3
3. Enable Static Website Hosting on S3
4. Set Up AWS CloudFront (CDN for better performance)
5. Attach a custom domain with Route 53
6. Enable HTTPS using AWS Certificate Manager


