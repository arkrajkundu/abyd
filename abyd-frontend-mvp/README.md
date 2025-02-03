# ABYD Frontend

Welcome to the ABYD Frontend repository! This project is part of the ABYD application and is responsible for the user interface (UI). Follow the steps below to get started with running the frontend locally on your machine and using the app.

## Prerequisites

Before you begin, ensure that you have the following installed:

- [Node.js](https://nodejs.org/) (version 14.x or higher)
- [npm](https://www.npmjs.com/) (Node Package Manager, typically installed with Node.js)

## Steps to Run the Frontend

1. **Clone the Repository**

   First, you need to clone the ABYD Frontend repository to your local machine. Run the following command in your terminal:

   ```bash
   git clone <repository-url>
   ```

   Replace `<repository-url>` with the actual URL of the ABYD frontend repository.

2. **Navigate to the Project Directory**

   After cloning the repository, move into the `abyd-frontend-mvp` directory:

   ```bash
   cd abyd-frontend-mvp
   ```

3. **Install Dependencies**

   To install the necessary dependencies for the project, run:

   ```bash
   npm install
   ```

   This will install all the required libraries and packages listed in the `package.json` file.

4. **Start the Development Server**

   Once the dependencies are installed, you can start the development server by running:

   ```bash
   npm run dev
   ```

   This will start a local server, and you can view the application in your browser at `http://localhost:5173`.

## How to Use the App

After starting the development server, you can interact with the application using the following steps:

1. **Create a New User**

   - Open `http://localhost:5173/signup` in your browser to create a new user.
   - Fill in the required details:
     - **Username**
     - **Email**
     - **Password**
   - Submit the form to create your account.

2. **Sign In**

   - After creating the user, go to `http://localhost:5173/login` to sign in.
   - Enter the credentials you just created (username and password).
   - Upon successful login, you will receive an authentication token.

3. **Access the Dashboard**

   - After logging in, navigate to `http://localhost:5173/dashboard` to access the dashboard.
   - This page provides the main functionality of the app.

4. **Access the Questionnaire**

   - To access the questionnaire, go to `http://localhost:5173/questionnaire`.
   - Complete the questionnaire as needed.