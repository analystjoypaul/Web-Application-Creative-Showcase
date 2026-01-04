
#  Creative Showcase

### Responsive Web Application for Showcasing Digital Artwork

Creative Showcase is a **responsive frontend web application** that allows users to sign up, log in, upload images, and showcase their digital artwork or memories.
The application includes both **private user dashboards** and **public profile pages** for sharing content.

This project was developed as part of the **Aeka Advisor Assignment** using **HTML, CSS, and JavaScript**.

---

## 🌐 Live Demo

🔗 **[https://creative-showcase-unique.netlify.app/)**

---

## 🚀 Features

*  User Authentication (Sign Up & Login)
*  Private User Dashboard
*  Image Upload & Display
*  Masonry / Mosaic Image Layout
*  Public User Profile Pages
*  Show / Hide Password Toggle
*  Dark Mode Support
*  Fully Responsive Design
*  Client-side Data Persistence using LocalStorage

---

## 📑 Pages Overview

### 1️⃣ Landing Page (`index.html`)

* Displays uploaded images in a **mosaic/masonry layout**
* Publicly accessible
* Navigation to Login and Sign Up pages

### 2️⃣ Sign Up Page (`signup.html`)

* New user registration
* Client-side form validation
* Password visibility toggle

### 3️⃣ Login Page (`login.html`)

* User authentication using LocalStorage
* Redirects to the user profile after successful login

### 4️⃣ User Profile / Dashboard (`profile.html`)

* Private page (accessible after login)
* Image upload functionality
* Displays images uploaded by the logged-in user
* Logout option

### 5️⃣ Public User Profile (`public-profile.html`)

* Accessible via URL parameter
  **Example:**
  `/public-profile.html?user=username`
* Displays a specific user’s uploaded images
* Publicly viewable without authentication

---

## 🛠️ Technologies Used

| Technology               | Purpose                             |
| ------------------------ | ----------------------------------- |
| **HTML5**                | Structure and semantic layout       |
| **CSS3**                 | Styling, animations, responsiveness |
| **JavaScript (Vanilla)** | Application logic & interactivity   |
| **LocalStorage**         | Authentication & data persistence   |
| **Netlify**              | Hosting & deployment                |
| **Git & GitHub**         | Version control                     |

---

## 📂 Project Structure

```
CREATIVE_SHOWCASE/
│
├── .netlify/
├── .vscode/
│
├── index.html
├── login.html
├── signup.html
├── profile.html
├── public-profile.html
│
├── styles.css
├── script.js
│
├── README.md
└── TODO.md
```

---

## ✅ Assignment Requirement Mapping

| Requirement                     | Status |
| ------------------------------- | ------ |
| Landing Page with Mosaic Layout | ✅      |
| User Registration               | ✅      |
| Secure Login                    | ✅      |
| Private User Dashboard          | ✅      |
| Public User Profile Page        | ✅      |
| HTML, CSS, JavaScript Only      | ✅      |

---

## 🔒 Important Notes

* All authentication and image data are stored using **LocalStorage**
* No backend server or database is used
* This project is intended for **learning and demonstration purposes**

---

## 📈 Future Enhancements

* Backend integration (Node.js / Firebase)
* Cloud-based image storage
* User likes & comments
* Profile customization
* Search & filter functionality

---

## 👤 Author

**Joy Paul**
Frontend / Full Stack Web Developer
Project developed for **Aeka Advisor Assignment**

---

