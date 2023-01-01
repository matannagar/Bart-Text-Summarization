# Bart-Text-Summarization Tool

Welcome to the Bart-Text-Summarization tool, a full stack web application for summarizing text via files or links. The application includes a React.js frontend, a Node.js backend server, and a Python backend application for the summarization engine.

## Running the Project

To run the project locally, follow these steps:

1. Clone the repository to your local machine.  
`git clone https://github.com/[USERNAME]/Bart-Text-Summarization-tool.git`
2. Navigate to the root directory of the project.  
`cd Bart-Text-Summarization-tool`
3. Install the required dependencies for each project.  
`npm install`

### Frontend (React.js)

1. Navigate to the frontend directory.  
`cd front`
2. Start the React development server.  
`npm start`
The frontend will be running on http://localhost:3000.  

### Backend Server (Node.js)

1. Navigate to the server directory.  
`cd server`
2. Start the Node.js server.  
`npm start`
The backend server will be running on http://localhost:3001.

### Summarization Engine (Python)

1. Navigate to the parser directory.  
`cd parser`
2. Create a virtual environment and activate it.  
`python3 -m venv env
`source env/bin/activate`
3. Install the required Python packages.  
`pip install -r requirements.txt`
4. Start the Python backend application.  
`python app.py`
The summarization engine will be running on http://localhost:3002.

## Features

The Bart-Text-Summarization tool allows users to register, login, and view their history of summarizations. The summarization engine uses the BART transformer to generate summaries of the input text. The user can share the summarization via email, LinkedIn, WhatsApp, or Facebook.

## Contributing

We welcome contributions to the Bart-Text-Summarization tool. If you have an idea for a new feature or have found a bug, please open an issue on the repository. If you would like to contribute code, please create a pull request with a detailed description of your changes.

## License

The Bart-Text-Summarization tool is licensed under the MIT License. See [LICENSE](LICENSE) for more information.
