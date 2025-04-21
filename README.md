# Recipe Book Application
## Features

- Browse all available recipes
- Filter recipes by:
    - Ingredient
    - Country
    - Category
- View detailed recipe information including:
    - Recipe image
    - Name and country of origin
    - Cooking instructions
    - List of ingredients
    - Related recipes by category

## Tech Stack

### Backend
- Node.js
- Nest.js
- TypeScript
- [TheMealDB API](https://www.themealdb.com/api.php)

### Frontend
- React
- Next.js
- TypeScript
- MUI
- React Query

## Project Structure

```
develops-task/
├── backend/         # Nest.js backend
├── frontend/        # Next.js frontend
├── docker-compose.yml
└── README.md
```

## Getting Started

### Prerequisites

- [Docker](https://www.docker.com/products/docker-desktop)
- [Docker Compose](https://docs.docker.com/compose/install/)

### Running the Application with Docker

1. Clone the repository
```bash
git clone https://github.com/goritpukan/develops-task.git
cd develops-task
```

2. Start the application with Docker Compose:
```bash
sudo docker compose up --build
```

3. Access the application:
    - Frontend: [http://localhost:3000](http://localhost:3000)
    - Backend API: [http://localhost:8800](http://localhost:8800)