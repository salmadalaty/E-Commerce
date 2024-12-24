
<h1># E-Commerce Website</h1>

This is an e-commerce website built using **React**, **Node.js**, and **MongoDB**. The project features product displays, a shopping cart, and the ability to add products to the cart. It includes both a frontend and a backend with user authentication, product management, and a simple cart functionality.

<h1>## Features</h1>

- **Frontend**: Built with React
  - Product listing page
  - Product detail page with breadcrumbs
  - Add to Cart functionality
  - User authentication (login and registration)

- **Backend**: Built with Node.js and Express
  - API endpoints for fetching products
  - User authentication with JWT
  - Database management using MongoDB

<h1>## Installation</h1>

<h1>### Prerequisites</h1>

- Node.js (v12 or later)
- MongoDB (local or cloud instance like MongoDB Atlas)
  
### Setup Instructions

1. **Clone the repository**:

   ```bash
   git clone https://github.com/yourusername/ecommerce-website.git
   cd ecommerce-website
Install dependencies:

For the frontend:

bash
Copy code
cd frontend
npm install
For the backend:

bash
Copy code
cd backend
npm install
Configure MongoDB:

Create a MongoDB cluster (or use a local MongoDB instance).
Set up the MONGODB_URI in the backend configuration file (e.g., config.js) with your MongoDB connection string.
Start the backend:

In the backend directory, run:

bash
Copy code
npm start
Start the frontend:

In the frontend directory, run:

bash
Copy code
npm start
Visit http://localhost:3000 to view the website.

Technologies Used
Frontend: React, React Router, Axios
Backend: Node.js, Express.js, JWT Authentication
Database: MongoDB
