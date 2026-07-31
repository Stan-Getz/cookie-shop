# Cookie Shop Web Application

> **Course Hand-in Documentation**  
> **Live App Engine URL:** [https://cookie-shop-stan-g.ey.r.appspot.com](https://cookie-shop-stan-g.ey.r.appspot.com)

Hi, this is a Cookie Shop website to practice setting up and using a server with Express.js. _*(Note: This deployment was the result of a 3-hour nightmare trying to first deploy on Heroku and then playing around with Gcloud hitting error after error in the terminal, but it's finally live! Also, please note there was no time for proper (any?) UI design yet—more styling and features are going to follow later.)*_

---

## 1. What's the Project?

**Cookie Shop** is a full-stack web application built to allow users to browse products, manage cookie catalog items, handle news posts, and persist data via a backend database with server-side EJS rendering and custom middleware logging.

### Key Features

- **User Interactivity:** Dynamic catalog management, forms for creating/editing records, and contact/search handling.
- **Database Integration:** Persistent data storage using MongoDB and Mongoose.
- **Production Deployment:** Deployed and publicly accessible on Google Cloud Platform App Engine.

---

## 2. What's the Tech Stack?

- **Runtime:** Node.js
- **Backend Framework:** Express.js
- **Database & ODM:** MongoDB & Mongoose
- **Templating:** EJS (Embedded JavaScript Templates)
- **Deployment & Hosting:** Google Cloud App Engine (Standard Environment)
- **Version Control:** Git & GitHub

---

## 3. Routes & Endpoints Reference

Below is the complete inventory of all `GET` and `POST` routes implemented in the application for evaluation:

### General & Static Pages

| Method   | Endpoint   | Description                                                        |
| :------- | :--------- | :----------------------------------------------------------------- |
| **GET**  | `/`        | Renders the home landing page (`index.ejs`).                       |
| **GET**  | `/about`   | Displays company information and developer notes.                  |
| **GET**  | `/contact` | Renders the static contact form page (`contact.html`).             |
| **POST** | `/contact` | Handles contact form submissions and processes request payloads.   |
| **GET**  | `/search`  | Renders a search interface supporting query parameters (`?q=...`). |

### News Management

| Method   | Endpoint    | Description                                                    |
| :------- | :---------- | :------------------------------------------------------------- |
| **GET**  | `/news`     | Renders the main news index page.                              |
| **GET**  | `/news/new` | Renders the form to create a new news entry (`news/new`).      |
| **POST** | `/news`     | Receives form data and creates a new News document in MongoDB. |

### Cookie Catalog & Dynamic Database Routes

| Method   | Endpoint                | Description                                                                 |
| :------- | :---------------------- | :-------------------------------------------------------------------------- |
| **GET**  | `/cookies`              | Fetches all cookie documents from MongoDB and renders the catalog.          |
| **GET**  | `/cookies/new`          | Renders the form to add a new cookie (`cookies/new`).                       |
| **POST** | `/cookies`              | Receives form data and saves a new Cookie document to MongoDB.              |
| **GET**  | `/cookies/:slug`        | Fetches and displays a specific cookie by its unique slug (`cookies/show`). |
| **GET**  | `/cookies/:slug/edit`   | Renders the edit form populated with the specific cookie's data.            |
| **POST** | `/cookies/:slug`        | Updates an existing cookie document in MongoDB by slug.                     |
| **GET**  | `/cookies/:slug/delete` | Deletes a specific cookie from MongoDB by slug and redirects to the index.  |

### JSON API Endpoints

| Method  | Endpoint                | Description                                                               |
| :------ | :---------------------- | :------------------------------------------------------------------------ |
| **GET** | `/api/v1/cookies`       | Returns a JSON response containing the hardcoded cookie collection.       |
| **GET** | `/api/v1/cookies/:slug` | Returns a JSON response for a single hardcoded cookie matched by slug/ID. |

---

## 4. How do I set it up locally?

### Prerequisites

- Node.js (v18+ or v20+)
- npm (bundled with Node.js)
- Local or Cloud MongoDB instance

### Setup Steps

1. **Clone the repository:**

   ```bash
   git clone <repository-url>
   cd cookie-shop
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Configure environment variables:**
   Create a `.env` file in the root directory and add your connection string and port:

   ```env
   MONGODB_URI=your_mongodb_connection_string
   PORT=8080
   ```

4. **Run the application locally:**
   ```bash
   npm run dev
   ```
   Open your browser and navigate to `http://localhost:8080`.
