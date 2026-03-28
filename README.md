# FullStack-ACT - Task Management Dashboard

A professional full-stack task management application with user authentication, task management, lead and team member profiles/users profile.

## �️ Tech Stack

**Backend:**

- Node.js + Express
- MongoDB + Mongoose
- JWT Authentication
- bcryptjs (Password hashing)

**Frontend:**

- React 18 + Vite
- Tailwind CSS
- Framer Motion (Animations)
- Axios (HTTP Client)

## 📋 Features

✅ User Registration & Login with JWT  
✅ Protected Dashboard with Authentication.
✅ Task CRUD Operations (Create, Read, Update, Delete)  
✅ Lead Management (View Details & Contact)  
✅ Team Members Profiles  
✅ Dashboard Stats & Analytics  
✅ Responsive Design  
✅ Smooth Animations

## 🚀 Quick Start

### Prerequisites

- Node.js (v14+)
- MongoDB (Local or Atlas)

### Backend Setup

```bash
cd server
npm install
# Edit .env file
npm run dev
# Server runs at http://localhost:5000
```

### Frontend Setup

```bash
cd client
npm install
npm run dev
# Frontend runs at http://localhost:5173
```

## 📡 API Routes

### Authentication

- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login user
- `GET /api/dashboard` - Get dashboard data (protected)

### Tasks (Protected - Used in Frontend)

- `POST /api/tasks` - Create task (used in My Tasks → + Create Task button)
- `GET /api/tasks` - Get all user tasks (used to load My Tasks on dashboard)
- `PUT /api/tasks/:id` - Update task (used in My Tasks → Edit button)
- `DELETE /api/tasks/:id` - Delete task (used in My Tasks → Delete button)

## 📊 Dashboard Sections

- **Stats Cards** - Background: `#D9DCE5`, Text: `#000000` & `#4B5563`
- **My Tasks** - Background: `#E6E8F0`, Cards: `#D9DCE5`, Buttons: `#7C83FD`
- **Sample Tasks** - Background: `#E6E8F0`, Cards: `#D9DCE5`, Buttons: `#7C83FD`
- **Leads** - Background: `#E6E8F0`, Cards: `#D9DCE5`, Buttons: `#7C83FD`
- **Users** - Background: `#E6E8F0`, Cards: `#D9DCE5`

## 🎨 Color Scheme

| Color       | Hex       | Use             |
| ----------- | --------- | --------------- |
| Black       | `#000000` | Headings        |
| Dark Gray   | `#4B5563` | Text            |
| Light Cream | `#E6E8F0` | Page Background |
| Soft Gray   | `#D9DCE5` | Cards           |
| Indigo      | `#7C83FD` | Buttons         |
| Dark        | `#111111` | Nav/Footer      |
| White       | `#FFFFFF` | Dark Text       |

## 🔐 Environment Variables (.env)

**Server:**

```
PORT=5000
MONGO_URI=mongodb:(Here it should Have your url)
JWT_SECRET=your_secret_key
```

**Client:**

```
VITE_API_URL=http://localhost:5000/api
```

## 📁 Project Structure

```
FullStack-ACT/
├── server/
│   ├── models/        # Database schemas
│   ├── controllers/   # Business logic
│   ├── routes/        # API routes
│   ├── middlewares/   # Auth middleware
│   ├── server.js      # Express app
│   └── .env          # Environment config
│
└── client/
    ├── src/
    │   ├── pages/       # Dashboard, Auth pages
    │   ├── components/  # UI components
    │   ├── context/     # Auth context
    │   ├── services/    # API calls
    │   └── App.jsx      # Main app
    └── vite.config.js   # Vite config
```

## 🧪 Test the App

1. Register a new account
2. Login with your credentials
3. Create, Edit, Delete tasks in "My Tasks"
4. View sample tasks and assign them
5. Browse team members and leads
6. View task/lead details in modals
7. About Page also added

  

