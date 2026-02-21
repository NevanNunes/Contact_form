# Contact Manager - Viva Preparation Guide

## Project Overview
A simple web application to manage contacts with add, edit, delete, and search functionality. Data persists using browser's local storage.

---

## Features Implemented

### 1. **Add Contact**
- Form with 3 fields: Name, Email, Phone
- Validation to ensure all fields are filled correctly
- Adds contact to the list and saves to local storage

### 2. **Edit Contact**
- Click "Edit" button on any contact
- Form fills with contact data
- Update button saves changes

### 3. **Delete Contact**
- Click "Delete" button on any contact
- Confirmation dialog before deletion
- Removes from list and local storage

### 4. **Search Contacts**
- Search bar filters contacts by name or email
- Real-time filtering as you type

### 5. **Persist Data**
- Uses `localStorage` to save contacts
- Data remains even after page refresh

### 6. **Clear All**
- Button to delete all contacts at once
- Confirmation before clearing

---

## File Structure

```
exp2/
├── index.html    (Structure of the page)
├── styles.css    (Styling and design)
└── script.js     (Functionality and logic)
```

---

## How to Explain in Viva

### **HTML (index.html)**
**What it does:** Defines the structure of the webpage

**Key sections:**
1. **Header** - Title and description
2. **Search Box** - Input field to search contacts
3. **Form** - Three input fields (name, email, phone) and submit button
4. **Contacts List** - Displays all saved contacts
5. **Toast** - Shows success messages

**Important tags:**
- `<form>` - Groups input fields
- `<input type="email">` - Validates email format
- `<input type="tel">` - For phone numbers
- `required` attribute - Makes fields mandatory

---

### **CSS (styles.css)**
**What it does:** Makes the page look good

**Key concepts:**
1. **Gradient Background** - `linear-gradient(135deg, #667eea 0%, #764ba2 100%)`
2. **Box Model** - `padding`, `margin`, `border`
3. **Flexbox** - For button layout (`display: flex`)
4. **Hover Effects** - `transform: translateY(-2px)` on hover
5. **Responsive Design** - `@media (max-width: 600px)` for mobile

**Color scheme:**
- Purple gradient background (#667eea to #764ba2)
- White cards for contrast
- Green for edit, Red for delete

---

### **JavaScript (script.js)**
**What it does:** Makes the page interactive

**Key concepts explained:**

#### 1. **Variables**
```javascript
let contacts = [];  // Array to store all contacts
let editingIndex = null;  // Track if we're editing
```

#### 2. **Local Storage**
```javascript
// Save to browser
localStorage.setItem('contacts', JSON.stringify(contacts));

// Load from browser
localStorage.getItem('contacts');
```

#### 3. **Form Validation**
```javascript
function isValidEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
}
```
- Uses **Regular Expression** to check email format
- Phone must be exactly 10 digits

#### 4. **Add Contact**
```javascript
const contact = {
    id: Date.now(),  // Unique ID
    name: nameInput.value.trim(),
    email: emailInput.value.trim(),
    phone: phoneInput.value.trim()
};
contacts.unshift(contact);  // Add to beginning
```

#### 5. **Edit Contact**
- Fills form with existing data
- Changes button text to "Update"
- Saves at same index when submitted

#### 6. **Delete Contact**
```javascript
contacts.splice(index, 1);  // Remove from array
```

#### 7. **Search**
```javascript
contacts.filter(contact => 
    contact.name.toLowerCase().includes(searchTerm) ||
    contact.email.toLowerCase().includes(searchTerm)
);
```
- Uses `filter()` method
- Converts to lowercase for case-insensitive search

#### 8. **Display Contacts**
- Loops through contacts array
- Creates HTML for each contact
- Uses `innerHTML` to add to page

---

## Common Viva Questions & Answers

### Q1: What is local storage?
**A:** Local storage is a web browser feature that allows websites to store data on the user's computer. The data persists even after closing the browser. We use it to save contacts so they don't disappear when the page is refreshed.

### Q2: Why do you use JSON.stringify and JSON.parse?
**A:** Local storage can only store strings (text). Our contacts are stored in an array (object). 
- `JSON.stringify()` converts the array to a string before saving
- `JSON.parse()` converts the string back to an array when loading

### Q3: What is form validation?
**A:** Form validation checks if the user entered correct data before submitting. We check:
- All fields are filled (not empty)
- Email has correct format (contains @ and .)
- Phone number has exactly 10 digits

### Q4: How does the search work?
**A:** When user types in the search box, we:
1. Get the search term
2. Convert it to lowercase
3. Filter the contacts array to find matches in name or email
4. Display only the filtered contacts

### Q5: What is the difference between `let` and `const`?
**A:** 
- `let` - Variable that can be changed (like `contacts`, `editingIndex`)
- `const` - Variable that cannot be changed (like `contactForm`, `nameInput`)

### Q6: How does edit work?
**A:** 
1. When edit button is clicked, we store the index of that contact
2. Fill the form with that contact's data
3. Change button text to "Update Contact"
4. When form is submitted, we replace the contact at that index instead of adding new

### Q7: What is `event.preventDefault()`?
**A:** By default, submitting a form reloads the page. `preventDefault()` stops this default behavior so we can handle the form submission with JavaScript instead.

### Q8: Why use `trim()`?
**A:** `trim()` removes extra spaces from the beginning and end of text. For example, "  John  " becomes "John". This prevents saving contacts with unnecessary spaces.

---

## Technologies Used
- **HTML5** - Structure
- **CSS3** - Styling (Flexbox, Gradients, Media Queries)
- **JavaScript (ES6)** - Functionality (Arrow functions, Template literals, Array methods)
- **Local Storage API** - Data persistence

---

## How to Run
1. Open `index.html` in any web browser
2. Start adding contacts!

---

## Key Learning Outcomes
1. DOM manipulation (getting and setting element values)
2. Event handling (form submit, button clicks)
3. Array methods (filter, splice, unshift, forEach)
4. Local storage for data persistence
5. Form validation with regular expressions
6. Responsive web design
7. User experience (toast notifications, confirmations)

---

## Tips for Viva
1. **Be confident** - You understand this code!
2. **Explain step-by-step** - Don't rush
3. **Use simple language** - Avoid complex jargon
4. **Show the code** - Point to specific lines when explaining
5. **Demo the app** - Show it working in browser
6. **Know the flow** - User clicks button → Event listener → Function runs → DOM updates

Good luck! 🎓
