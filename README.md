# NARWAL AUTH API

This project implements zero-knowledge password authentication (ZKPA) for secure user login and signup processes. Using React for the frontend and Express.js with MongoDB for the backend, this system ensures that password information remains secure and private. The project includes an API for generating and verifying authentication challenges, providing a robust solution for modern web applications

## Key Features

- **Zero-Knowledge Proofs:** Leverages advanced cryptographic techniques to ensure that password information is never exposed or stored, enhancing security and privacy.
- **Modern Tech Stack:** Built with React for a responsive and dynamic frontend, and Express.js with MongoDB for a robust and scalable backend.
- **Comprehensive API:** Includes a well-documented API for generating and verifying authentication challenges, making integration with existing systems seamless.
- **Security First:** Designed with security as a primary focus, providing a reliable solution for protecting user credentials in modern web applications.
- **User-Friendly Dashboard:** Features a user-friendly dashboard for managing and interacting with the authentication API, facilitating easy monitoring and administration.


## Getting Started

- Clone the repository and follow the setup instructions to get the project up and running.
- Explore the API documentation to understand how to integrate zero-knowledge authentication into your applications.

### Prerequisites

1. Install MongoDB
2. Node.js and npm should be installed on your machine.

### Installing Dependencies

```bash
npm install
npm install mongoose mongoose-sequence cors bn.js express axios multer react react-router-dom bootstrap react-bootstrap vite @vitejs/plugin-react vite nodemon
```

### Running the Project

To run the project, open two terminals (Visual Studio Code):

Terminal 1 (Database)
Navigate to the database directory: NarwalAuth/project/Database
start MongoDB: `npm Start`

Terminal 2 (App)
Navigate to the app directory: NarwalAuth/project/website
Start the app: `npm run dev`
