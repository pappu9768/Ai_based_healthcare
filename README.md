# Project Setup Guide

## 1. Frontend Setup (`./client`)

1. Navigate to the client directory:

   ```bash
   cd client
   ```

2. Create a `.env` file in the root of the `client` folder and add the following:

   ```env
   VITE_API_BASE_URL=http://localhost:8080
   ```

3. Install all required dependencies:

   ```bash
   npm install
   ```

4. Start the frontend development server:

   ```bash
   npm run dev
   ```

---

## 2. Backend Setup (`./server`)

1. Navigate to the server directory:

   ```bash
   cd server
   ```

2. Create a `.env` file in the root of the `server` folder and add the following:

   ```env
   MONGO_URI=your_mongodb_connection_string
   PORT=8080
   SECRET_KEY=Web-12345
   ```

   **Example:**

   * `MONGO_URI` → Your MongoDB connection string
   * `PORT` → `8080` (or any available port)
   * `SECRET_KEY` → Any secure random string (e.g., `Web-12345`)

3. Install all required dependencies:

   ```bash
   npm install
   ```

4. *(Optional but recommended)* Install **Nodemon** for automatic server restarts during development:

   ```bash
   npm install -D nodemon
   ```

5. Start the backend development server:

   ```bash
   npm run dev
   ```

---

## 3. Run the Project

Open two separate terminal windows:

* **Terminal 1**

  ```bash
  cd client
  npm run dev
  ```

* **Terminal 2**

  ```bash
  cd server
  npm run dev
  ```

Once both servers are running, your application will be ready for development.
