# 🌍 Travel Booking & Enquiry Platform

A full-stack **Travel Website + Admin Panel** built to manage travel packages, blogs, categories, and customer enquiries with a clean public UI and a powerful admin dashboard.

This project is **production-ready** and follows real-world standards used in commercial travel platforms.

---

## ✨ Features

### 🌐 Public Website

* Modern landing pages for travel services
* Travel enquiry form with:

  * Custom destination typing (auto-suggest + free text)
  * Date & guest selection
  * Special request notes
* Server-side validation with **Zod**
* Automatic email notification to admin on enquiry
* Responsive and SEO-friendly UI

---

### 🛠 Admin Panel

* Secure admin authentication
* Dashboard overview
* Manage:

  * Blogs (Create / Edit / Delete)
  * Categories
  * Packages
* Enquiry Management:

  * View all enquiries
  * View single enquiry details
  * Update enquiry status (New / In Progress / Contacted / Closed)
  * Admin private notes
* Optimized state handling with **React Query**

---

## 🧱 Tech Stack

### Frontend

* React / Next.js
* Tailwind CSS
* React Hook Form
* Zod (form validation)
* TanStack React Query
* Lucide Icons

### Backend

* Node.js
* Express.js
* MongoDB + Mongoose
* Zod (request validation)
* Nodemailer (SMTP)

### Other

* JWT-based Admin Authentication
* RESTful API Architecture
* Modular & Scalable Folder Structure

---

## 📁 Project Structure (Simplified)

```
client/
 ├─ pages/
 │   ├─ admin/
 │   │   ├─ enquiries/
 │   │   ├─ blogs/
 │   │   ├─ packages/
 │   │   └─ categories/
 │   └─ enquiry/
 ├─ hooks/
 ├─ validators/
 └─ components/

server/
 ├─ controllers/
 ├─ routes/
 ├─ models/
 ├─ validators/
 └─ middleware/
```

---

## 🔐 Enquiry Flow (End-to-End)

1. User submits enquiry from website
2. Frontend validates data using Zod
3. Backend validates again using Zod
4. Enquiry saved to MongoDB
5. Admin email notification sent
6. Enquiry appears in admin panel
7. Admin updates status & notes

---

## 🧪 Validation Strategy

* **Frontend**: Zod + React Hook Form (instant user feedback)
* **Backend**: Zod (security & data integrity)
* Both layers share the **same data structure**

---

## 🚀 Setup Instructions

### 1️⃣ Clone the Repository

```
git clone <your-repo-url>
```

### 2️⃣ Install Dependencies

**Frontend**

```
cd client
npm install
npm run dev
```

**Backend**

```
cd server
npm install
npm run dev
```

---

## 🔑 Environment Variables (Backend)

```
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret_key

SMTP_HOST=your_smtp_host
SMTP_PORT=587
SMTP_USER=your_email
SMTP_PASS=your_password
SMTP_ADMIN_EMAIL=admin_email
```

---

## 📌 Project Status

* ✅ Public website complete
* ✅ Admin panel complete
* ✅ Enquiry system complete
* ✅ Validation & security applied
* ✅ Production-ready

---

## 👨‍💻 Author

**Vicky**
Full-Stack Developer
Focused on scalable, real-world web applications

---

## 📄 License

This project is licensed for **personal and commercial use**.
You are free to modify and extend it as needed.

---

⭐ If you like this project, don’t forget to star the repository!
