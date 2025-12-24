# DwellBook Clone - Setup Guide

This guide will help you set up and run the DwellBook Clone project locally.

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher) or yarn
- MongoDB Atlas account (for cloud database) or MongoDB Community Server installed locally

## Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd Backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the `Backend` directory with the following content:
   ```
   PORT=5000
   MONGO_URL=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   FRONTEND_URL=http://localhost:3000
   ```

4. Start the backend server:
   ```bash
   npm start
   ```

   The backend server will be available at `http://localhost:5000`

## Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd ../DwellBook-frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the `DwellBook-frontend` directory with the following content:
   ```
   REACT_APP_API_URL=http://localhost:5000/api
   REACT_APP_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
   REACT_APP_CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   REACT_APP_CLOUDINARY_UPLOAD_PRESET=your_cloudinary_upload_preset
   ```

4. Start the development server:
   ```bash
   npm start
   ```

   The frontend will be available at `http://localhost:3000`

## Available Scripts

### Backend
- `npm start` - Start the backend server
- `npm run dev` - Start the backend server in development mode with nodemon
- `npm test` - Run tests

### Frontend
- `npm start` - Start the development server
- `npm test` - Launch the test runner
- `npm run build` - Build the app for production
- `npm run eject` - Eject from create-react-app (irreversible)

## Environment Variables

### Backend
- `PORT` - Port on which the backend server will run (default: 5000)
- `MONGO_URL` - MongoDB connection string
- `JWT_SECRET` - Secret key for JWT token generation
- `CLOUDINARY_CLOUD_NAME` - Cloudinary cloud name
- `CLOUDINARY_API_KEY` - Cloudinary API key
- `CLOUDINARY_API_SECRET` - Cloudinary API secret
- `FRONTEND_URL` - URL of the frontend application (for CORS)

### Frontend
- `REACT_APP_API_URL` - Backend API URL
- `REACT_APP_GOOGLE_MAPS_API_KEY` - Google Maps API key
- `REACT_APP_CLOUDINARY_CLOUD_NAME` - Cloudinary cloud name
- `REACT_APP_CLOUDINARY_UPLOAD_PRESET` - Cloudinary upload preset

## Troubleshooting

### Backend won't start
- Make sure MongoDB is running and the connection string in `.env` is correct
- Check if the port is not already in use
- Run `npm install` to ensure all dependencies are installed

### Frontend can't connect to backend
- Ensure the backend server is running
- Verify the `REACT_APP_API_URL` in the frontend `.env` file matches the backend URL
- Check the browser's developer console for CORS errors

### Database connection issues
- Verify your MongoDB connection string
- Make sure your IP is whitelisted in MongoDB Atlas if using the cloud service
- Check if MongoDB service is running if using a local installation
