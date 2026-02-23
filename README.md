# 🎓 Viva Preparation Guide: Contact Manager Pro

This project is designed to be **simple to explain** while looking **premium**.

---

## 🚀 1-Minute Project Overview
"This is a **Single Page Application (SPA)** built with HTML, CSS, and Vanilla JavaScript. It allows users to manage their contacts. I used **Local Storage** to ensure data doesn't disappear when the page is refreshed."

---

## 🛠️ The Tech Stack
1.  **HTML5**: Defines the structure (Semantic tags like `<header>`, `<main>`, `<section>`).
2.  **CSS3**: Handles the design (CSS Variables, Flexbox, Grid, and Animations).
3.  **JavaScript (ES6)**: Handles the logic (DOM manipulation, Array methods, Local Storage).

---

## 💡 How it Works (The Logic)

### 1. **Data Management**
I store the contacts in an **Array of Objects**. Each contact looks like this:
```javascript
{ name: "Nevan", email: "nevan@mail.com", phone: "9876543210" }
```

### 2. **The "Render" Pattern**
Instead of updating parts of the page manually, I have a single `render()` function. 
- It clears the list and rebuilds it from the `contacts` array.
- This ensures the UI is always in sync with the data.

### 3. **Local Storage**
I use `JSON.stringify` to save the array to the browser and `JSON.parse` to load it back. This is because Local Storage only stores text.

---

## 📝 Common Viva Questions

### **Q: What is DOM Manipulation?**
**A:** It stands for Document Object Model. In my code, I use `document.getElementById` to "grab" HTML elements and change their content or style using JavaScript.

### **Q: Why use CSV Variables in CSS?**
**A:** I used `:root` variables (like `--primary`) so I can change the entire theme of the app by modifying just one line. It makes the code clean and professional.

### **Q: How does the Search work?**
**A:** I use the `.filter()` method on the contacts array. It checks if the search text is included in the name or email, and then `render()` displays only those matches.

### **Q: How do you handle both Add and Edit with one form?**
**A:** I use an `editIndex` variable. If it's `null`, the form **adds** a new contact. If it has a number, the form **updates** the contact at that specific index.

---

## 🎨 Design Aesthetics
- **Color Palette**: Dark mode with a vibrant purple gradient (`#a855f7`).
- **Typography**: Uses 'Outfit' from Google Fonts for a modern, techy look.
- **Responsiveness**: Uses a Grid layout that switches to a single column on mobile.

---

## 📁 File Structure
- `index.html`: The skeleton.
- `styles.css`: The skin.
- `script.js`: The brain.

**Good luck with your Viva! You've got this! 🚀**
