# Ravi Auto Service - Bike Repairing Center Website

A modern, production-ready full-stack website built with Next.js 14, Tailwind CSS, and MongoDB.

## 🚀 Features

- **Responsive Design**: Full mobile-first experience.
- **Appointment Booking**: Online booking form with Zod validation.
- **WhatsApp Integration**: Direct booking confirmations via WhatsApp links.
- **Services Showcase**: Detailed listing of all bike services.
- **Photo Gallery**: Masonry grid with filtering and lightbox for workshop photos.
- **Contact System**: Integration for customer queries saved directly to database.
- **SEO Optimized**: Metadata and schema-ready for local business visibility.
- **Premium Aesthetics**: Dark theme with red/orange accents and smooth animations.

## 🛠️ Tech Stack

- **Frontend**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS + Framer Motion
- **Database**: MongoDB with Mongoose
- **Form Handling**: React Hook Form + Zod
- **Icons**: Lucide React
- **Slider**: Swiper.js

## ⚙️ Setup Instructions

### 1. External Dependencies
Ensure you have the following installed:
- Node.js (v18+)
- MongoDB Atlas Account (or local MongoDB)

### 2. Environment Variables
Create a `.env.local` file in the root directory (one has been pre-created for you with placeholders):
```env
MONGODB_URI=your_mongodb_connection_string
NEXT_PUBLIC_WHATSAPP_NUMBER=918097901003
NEXT_PUBLIC_SHOP_PHONE1=8097901003
NEXT_PUBLIC_SHOP_PHONE2=8850527356
NEXT_PUBLIC_SHOP_ADDRESS=Shop No. 1243/001...
```

### 3. Installation
```bash
npm install
```

### 4. Run Locally
```bash
npm run dev
```

### 5. Build for Production
```bash
npm run build
npm start
```

## 📁 Project Structure

- `/app`: Pages and API routes.
- `/components`: Reusable UI components.
- `/lib`: Database connection, models, and constants.
- `/public`: Static assets (images, icons).

## 🏪 Business Info
- **Business Name**: Ravi Auto Service
- **Location**: Ghansoli Gaon, Navi Mumbai
- **Working Hours**: Mon–Sat: 9:00 AM – 7:00 PM, Sun: 10:00 AM – 4:00 PM

## Admin Panel Setup

### Step 1: Add env variables to .env.local
NEXTAUTH_SECRET=ravi-auto-service-super-secret-key-2024
NEXTAUTH_URL=http://localhost:3000

### Step 2: Create admin user (run ONCE)
Start the dev server: npm run dev
Visit: http://localhost:3000/api/admin/seed
You should see: "Admin user created!"

### Step 3: Delete the seed file
Delete: app/api/admin/seed/route.js
(Important! Don't leave this open in production)

### Step 4: Login
Visit: http://localhost:3000/admin/login
Username: admin
Password: ravi@admin123

### Step 5: Change password after first login
Go to Settings → Change Password

---
Developed with ❤️ for Ravi Auto Service.
