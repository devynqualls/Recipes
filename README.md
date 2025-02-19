# Recipes Project

This project is a full-stack application for managing and searching recipes. It consists of a frontend built with [React](https://reactjs.org/) and a backend built with [Express](https://expressjs.com/) and [Prisma](https://www.prisma.io/).

## Prerequisites

Before you begin, ensure you have the following installed on your machine:

- [Node.js](https://nodejs.org/) (v14 or higher)
- [npm](https://www.npmjs.com/) (v6 or higher)
- [PostgreSQL](https://www.postgresql.org/)

## Getting Started

### Backend Setup

1. **Clone the repository**:

    ```sh
    git clone https://github.com/your-username/recipes.git
    cd recipes/backend
    ```

2. **Install dependencies**:

    ```sh
    npm install
    ```

3. **Set up environment variables**:

    Create a `.env` file in the [backend](http://_vscodecontentref_/1) directory and add the following:

    ```properties
    DATABASE_URL=postgresql://<username>:<password>@<host>:<port>/<database>
    API_KEY=your_api_key_here
    ```

4. **Run database migrations**:

    ```sh
    npx prisma migrate dev
    ```

5. **Start the backend server**:

    ```sh
    npm run start
    ```

    The backend server will run on `http://localhost:5001`.

### Frontend Setup

1. **Navigate to the frontend directory**:

    ```sh
    cd ../frontend
    ```

2. **Install dependencies**:

    ```sh
    npm install
    ```

3. **Start the frontend server**:

    ```sh
    npm run dev
    ```

    The frontend server will run on `http://localhost:3000`.

## API Endpoints

### Recipes

- `GET /api/recipes/search`: Search for recipes.
- `GET /api/recipes/:recipeId/summary`: Get a summary of a specific recipe.
- `GET /api/recipes/favorite`: Get a list of favorite recipes.
- `POST /api/recipes/favorite`: Add a recipe to favorites.
- `DELETE /api/recipes/favorite`: Remove a recipe from favorites.
