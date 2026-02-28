# Ravi Auto Service 🏍️🛠️

A modern, high-performance web application designed and developed for **Ravi Auto Service** – a premium two-wheeler repair and servicing workshop located in Navi Mumbai. This project was built as a proprietary freelancing solution to digitize the client's business, streamline service bookings, and enhance local online presence.

## 🌟 Overview

Ravi Auto Service is a comprehensive booking and management platform tailored for a motorcycle mechanic workshop. It allows customers to explore available services, view a gallery of past work, and effortlessly book service appointments online (with both pickup/drop capabilities and workshop visits). 

On the flip side, the platform provides a robust **Admin Panel** exclusively for the shop owner to manage bookings, view customer messages, and track repair statuses efficiently.

## 🚀 Key Features

### For Customers (Client-Facing)
- **Modern UI/UX:** A stunning, responsive, and dark-themed visual experience highlighting the workshop's expertise.
- **Service Catalog:** Detailed overview of all repair and maintenance services along with starting prices.
- **Online Booking System:** Customers can request a service, choose preferred dates, and opt for home pickup/drop.
- **Dynamic Gallery:** A showcase of high-quality local workshop and bike-repair images.
- **Contact & Location Info:** Direct WhatsApp integration, click-to-call functionality, and integrated Google Maps.

### For The Shop Owner (Admin Panel)
- **Secure Authentication:** Protected admin routes utilizing NextAuth.js.
- **Dashboard Overview:** At-a-glance metrics of total bookings, pending requests, and new messages.
- **Booking Management:** 
  - View full customer and bike details.
  - Update service status (Pending -> Confirmed -> Completed).
  - One-click WhatsApp message dispatch to notify customers about their bike.
  - Delete/Cancel bookings with custom modal confirmations.
- **Customer Messages:** Dedicated section to read and manage inquiries sent through the Contact Us form.

## 💻 Tech Stack

This project leverages modern web technologies for maximum performance, SEO, and maintainability:

- **Frontend:** [Next.js 14](https://nextjs.org/) (App Router), React, TypeScript
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Icons & Animations:** Lucide React, Framer Motion
- **Database:** [MongoDB](https://www.mongodb.com/) (Mongoose ODM)
- **Authentication:** [NextAuth.js](https://next-auth.js.org/)
- **Notifications:** React Hot Toast
- **Deployment:** [Vercel](https://vercel.com/)


## ⚙️ Local Development Setup

If you need to run this project locally for future maintenance:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/dharmendra4522/ravi-auto-service.git
   cd ravi-auto-service
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   Create a `.env.local` file in the root directory and add the following:
   ```env
   MONGODB_URI=your_mongodb_connection_string
   NEXTAUTH_SECRET=your_generated_secret_key
   NEXTAUTH_URL=http://localhost:3000
   
   # Shop Specific Data
   NEXT_PUBLIC_SHOP_PHONE1=8097901003
   NEXT_PUBLIC_SHOP_PHONE2=8850527356
   NEXT_PUBLIC_WHATSAPP_NUMBER=918097901003
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```

5. Open [https://ravi-auto-service.vercel.app/](https://ravi-auto-service.vercel.app/) with your browser to see the result.


## 🔒 Admin Access

The Admin Panel is hidden from regular users to prevent unnecessary access attempts. 
It can be accessed by clicking the **Copyright (©)** symbol in the bottom footer, which dynamically routes to `/admin/login`.

---

**Design And Developed By:** [DharmaByte](https://dharmendra-vishvkarma.vercel.app/)  
*Freelance Project formulated specifically for Ravi Auto Service.*
