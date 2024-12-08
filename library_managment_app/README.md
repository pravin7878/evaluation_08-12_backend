# mvc-express-setup

**mvc-express-setup** is a simple and customizable backend setup for building web applications using **Express.js** and **MongoDB** with **Mongoose** in a **Model-View-Controller (MVC)** architecture. This package provides a ready-to-use project structure with essential configuration files, making it easier to get started with backend development.

---

## 🛠 Features

- 🚀 Fully configured **Express.js** server setup
- 🗄 MongoDB connection with **Mongoose**
- 🔑 Basic **MVC** architecture (Models, Views, Controllers)
- 🌱 Simple API setup for easy extension
- 🔒 Environment configuration with **dotenv**
- ⚡ Supports **nodemon** for automatic reloading during development
- 🖥 Easy project setup via CLI

---

## 🚀 Installation

### Global Installation

You can install **mvc-express-setup** to globally to easily create an Express.js app setup from anywhere on your system.

1. **Install Globally**:

   Run the following command to install the package globally:

   ```bash
   npm install -g mvc-express-setup

* After installing, you can use the
   ```
    setup-express-app
  ```
  command from anywhere to set up a new Express.js project.

## ⚡️ How It Works
#### Run the Setup Command:
  After Runing the `npx setup-express-app` comand in the desired directory.
- The tool will prompt you to specify a directory. 
   #### You can either:
- Enter a directory name to create and set up the project there.
- Enter . to set up the project in the current directory.
#### Automatic Project Setup:
- The tool will create the required files to your selected directory, initialize package.json if it doesn't already exist, and install the necessary dependencies.

#### Start Coding:
- After running the setup, you'll have a basic Express.js app ready with the MVC architecture in place. From here, you can focus on writing your actual application logic.

## 📂 Project Structure
- After setting up, your project will have the following structure:
   ```
    my-project/
    ├── src/
    │   ├── config/
    │   │   └── db.js            # MongoDB connection configuration
    │   ├── controllers/
    │   │   └── exampleController.js  # Controller for handling API logic
    │   ├── models/
    │   │   └── exampleModel.js   # Mongoose model
    │   ├── routes/
    │      └── exampleRoutes.js  # API routes
    ├──.env                  # Environment variables (e.g., DB URI)
    ├── server.js             # Main server file
    └── package.json              # Project dependencies and scripts
    ```
#### Setup and Configuration
 - Environment Configuration
   - This package uses a .env file to configure environment variables. The .env file is required for       storing sensitive information like the MongoDB connection URI and other configuration values.
    Example .env file:
    ```
     PORT = <you can run on any port>
     MONGO_URI = <your mongo db connection string>
    ```
  - Make sure to set up your MongoDB URI (MONGO_URI) and any other necessary environment variables.

#### Starting the Server
- You can start the server by running the following command and If you want to change this command you can change by package.json     
    ```
       npm run start
    ```
- This will start the server using the nodemon package for automatic reloading during development.

#### 🔧 Usage
  -  After setting up the project, you can start building your backend by adding your own routes, controllers, and models.
 - The mvc-express-setup package provides the base structure, allowing you to skip setting up the same basic configuration every time you start a new project.

#### 📝 Available Scripts
  - Start the server: Run npm start to start the server.
  - Run with nodemon: For automatic server reloading, run npx nodemon server.js.
  - Run tests: You can add tests to your project (optional).

#### 📦 Available Dependencies
  - express: Web framework for Node.js
  - mongoose: MongoDB object modeling for Node.js
  - dotenv: Loads environment variables from a .env file
  - nodemon: Automatically restarts the server during development

### ⚙️ Customization
- You can extend the project by adding more models, controllers, routes, and other configurations as per your needs. The project is structured in a way that supports modular and scalable development.

### 🎉 Conclusion
With mvc-express-setup, you can quickly set up a fully functional Express.js backend project. The tool automates the repetitive setup process, allowing you to focus on building your application rather than configuring basic settings.