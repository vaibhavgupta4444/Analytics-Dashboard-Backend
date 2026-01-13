# Analytics Dashboard - Backend

Backend API server for the Analytics Dashboard application built with Express.js, TypeScript, and MongoDB.

## 📁 Folder Structure

```
backend/
├── src/
│   ├── index.ts                    # Application entry point
│   ├── config/
│   │   └── db-connect.ts           # MongoDB connection configuration
│   ├── controllers/
│   │   ├── blog.ts                 # Blog CRUD controllers
│   │   ├── user.ts                 # User CRUD controllers
│   │   ├── analytics/
│   │   │   ├── blog-controller.ts  # Blog analytics controllers
│   │   │   ├── common.ts           # Common analytics (summary)
│   │   │   └── user-controller.ts  # User analytics controllers
│   │   └── exports/
│   │       ├── export-blog.ts      # Blog Excel export controller
│   │       └── export-user.ts      # User Excel export controller
│   ├── interfaces/
│   │   ├── base.ts                 # Base interfaces
│   │   ├── blog-interface.ts       # Blog type definitions
│   │   └── user-interface.ts       # User type definitions
│   ├── models/
│   │   ├── Blog.ts                 # Blog Mongoose model
│   │   └── User.ts                 # User Mongoose model
│   ├── routes/
│   │   ├── analytics-router.ts     # Analytics endpoints
│   │   ├── blog-router.ts          # Blog endpoints
│   │   ├── export-router.ts        # Export endpoints
│   │   └── user-router.ts          # User endpoints
│   └── utils/
│       └── seeder.ts               # Database seeding utility
├── nodemon.json                     # Nodemon configuration
├── package.json                     # Dependencies and scripts
├── tsconfig.json                    # TypeScript configuration
└── README.md                        # This file
```

## 🛣️ API Routes

### Base URL
```
http://localhost:<PORT>
```

### User Routes
**Base Path:** `/api/user`

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET    | `/`      | Get all users |
| GET    | `/:id`   | Get single user by ID |

### Blog Routes
**Base Path:** `/api/blog`

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET    | `/`      | Get all blogs |
| GET    | `/:id`   | Get single blog by ID |

### Analytics Routes
**Base Path:** `/api/analytics`

| Method | Endpoint | Description | Query Parameters |
|--------|----------|-------------|------------------|
| GET    | `/users-growth` | Get user growth analytics | `startDate`, `endDate` (optional) |
| GET    | `/blogs-created` | Get blogs creation analytics | `groupBy=day` or `month` (optional) |
| GET    | `/blogs-by-category` | Get blogs grouped by category | - |
| GET    | `/engagement-trend` | Get engagement trend data | - |
| GET    | `/summary` | Get overall analytics summary | - |

**Example Queries:**
```
GET /api/analytics/users-growth?startDate=2025-01-01&endDate=2025-01-31
GET /api/analytics/blogs-created?groupBy=day
GET /api/analytics/blogs-created?groupBy=month
```

### Export Routes
**Base Path:** `/api/export`

| Method | Endpoint | Description | Response Type |
|--------|----------|-------------|---------------|
| GET    | `/users` | Export users to Excel | Excel file download |
| GET    | `/blogs` | Export blogs to Excel | Excel file download |

## 🔧 Environment Variables

Create a `.env` file in the backend root directory with the following variables:

```env
# Server Configuration
PORT=5000

# Database Configuration
MONGODB_URI=mongodb://localhost:27017/analytics-dashboard

# CORS Configuration (if different from default)
# The frontend URL is currently hardcoded to http://localhost:5173
```

### Environment Variable Details

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `PORT` | Yes | - | Port number for the server to run on |
| `MONGODB_URI` | No | `mongodb://localhost:27017/analytics-dashboard` | MongoDB connection string |

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (running locally or connection string to remote instance)

### Installation

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file with required environment variables (see above)

3. Start the development server:
```bash
npm run dev
```

4. For production build:
```bash
npm run build
npm start
```

### Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Compile TypeScript to JavaScript
- `npm start` - Start production server from compiled files

## 🗃️ Database Models

### User Model
- User information and registration dates
- Tracked for user growth analytics

### Blog Model
- Blog posts with categories and engagement metrics
- Tracked for content analytics and engagement trends

## 📦 Tech Stack

- **Runtime:** Node.js with TypeScript
- **Framework:** Express.js
- **Database:** MongoDB with Mongoose ODM
- **Export:** ExcelJS for Excel file generation
- **Development:** Nodemon for hot reload

## 🔒 CORS Configuration

The API is configured to accept requests from:
- `http://localhost:5173` (Frontend development server)

To modify CORS settings, update the configuration in [src/index.ts](src/index.ts).
