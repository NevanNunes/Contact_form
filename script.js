// ==========================================
// CONTACT MANAGER APPLICATION
// ==========================================

// Global Variables - Store our data and state
let contacts = []; // Array to store all contacts
let editingIndex = null; // Track which contact we're editing (null means we're adding new)

// Get references to HTML elements we'll use
const contactForm = document.getElementById('contactForm');
const nameInput = document.getElementById('nameInput');
const emailInput = document.getElementById('emailInput');
const phoneInput = document.getElementById('phoneInput');
const contactsList = document.getElementById('contactsList');
const emptyState = document.getElementById('emptyState');
const contactCount = document.getElementById('contactCount');
const clearAllBtn = document.getElementById('clearAllBtn');
const searchInput = document.getElementById('searchInput');
const submitBtn = document.getElementById('submitBtn');
const cancelBtn = document.getElementById('cancelBtn');
const formTitle = document.getElementById('formTitle');
const toast = document.getElementById('toast');
const toastMessage = document.getElementById('toastMessage');

// Error message elements
const nameError = document.getElementById('nameError');
const emailError = document.getElementById('emailError');
const phoneError = document.getElementById('phoneError');

// ==========================================
// INITIALIZATION - Run when page loads
// ==========================================
document.addEventListener('DOMContentLoaded', function () {
    loadContacts(); // Load contacts from browser storage
    displayContacts(); // Show contacts on page
    setupEventListeners(); // Set up button clicks and form submission
});

// ==========================================
// EVENT LISTENERS - Handle user interactions
// ==========================================
function setupEventListeners() {
    // When form is submitted
    contactForm.addEventListener('submit', handleSubmit);

    // When clear all button is clicked
    clearAllBtn.addEventListener('click', clearAllContacts);

    // When user types in search box
    searchInput.addEventListener('input', handleSearch);

    // When cancel button is clicked
    cancelBtn.addEventListener('click', cancelEdit);
}

// ==========================================
// LOCAL STORAGE - Save and load data
// ==========================================

// Load contacts from browser's local storage
function loadContacts() {
    const savedContacts = localStorage.getItem('contacts');
    if (savedContacts) {
        contacts = JSON.parse(savedContacts); // Convert text back to array
    }
}

// Save contacts to browser's local storage
function saveContacts() {
    localStorage.setItem('contacts', JSON.stringify(contacts)); // Convert array to text
}

// ==========================================
// FORM VALIDATION - Check if inputs are valid
// ==========================================

// Validate email format
function isValidEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
}

// Validate phone number (must be 10 digits)
function isValidPhone(phone) {
    const phonePattern = /^\d{10}$/;
    return phonePattern.test(phone);
}

// Validate all form fields
function validateForm() {
    let isValid = true;

    // Clear previous errors
    nameError.classList.remove('show');
    emailError.classList.remove('show');
    phoneError.classList.remove('show');
    nameInput.classList.remove('invalid');
    emailInput.classList.remove('invalid');
    phoneInput.classList.remove('invalid');

    // Check name
    if (nameInput.value.trim() === '') {
        nameError.textContent = 'Name is required';
        nameError.classList.add('show');
        nameInput.classList.add('invalid');
        isValid = false;
    }

    // Check email
    if (emailInput.value.trim() === '') {
        emailError.textContent = 'Email is required';
        emailError.classList.add('show');
        emailInput.classList.add('invalid');
        isValid = false;
    } else if (!isValidEmail(emailInput.value.trim())) {
        emailError.textContent = 'Please enter a valid email';
        emailError.classList.add('show');
        emailInput.classList.add('invalid');
        isValid = false;
    }

    // Check phone
    if (phoneInput.value.trim() === '') {
        phoneError.textContent = 'Phone number is required';
        phoneError.classList.add('show');
        phoneInput.classList.add('invalid');
        isValid = false;
    } else if (!isValidPhone(phoneInput.value.trim())) {
        phoneError.textContent = 'Please enter a valid 10-digit phone number';
        phoneError.classList.add('show');
        phoneInput.classList.add('invalid');
        isValid = false;
    }

    return isValid;
}

// ==========================================
// FORM HANDLING - Add or update contacts
// ==========================================

// Handle form submission
function handleSubmit(event) {
    event.preventDefault(); // Prevent page reload

    // Validate inputs
    if (!validateForm()) {
        return; // Stop if validation fails
    }

    // Create contact object
    const contact = {
        id: Date.now(), // Unique ID using timestamp
        name: nameInput.value.trim(),
        email: emailInput.value.trim(),
        phone: phoneInput.value.trim()
    };

    if (editingIndex !== null) {
        // UPDATE existing contact
        contacts[editingIndex] = contact;
        showToast('Contact updated successfully!');
        cancelEdit(); // Reset form to add mode
    } else {
        // ADD new contact
        contacts.unshift(contact); // Add to beginning of array
        showToast('Contact added successfully!');
    }

    // Save to local storage and refresh display
    saveContacts();
    displayContacts();
    contactForm.reset(); // Clear form fields
}

// ==========================================
// EDIT FUNCTIONALITY
// ==========================================

// Edit a contact
function editContact(index) {
    const contact = contacts[index];

    // Fill form with contact data
    nameInput.value = contact.name;
    emailInput.value = contact.email;
    phoneInput.value = contact.phone;

    // Update UI to edit mode
    editingIndex = index;
    formTitle.textContent = 'Edit Contact';
    submitBtn.textContent = 'Update Contact';
    cancelBtn.style.display = 'block';

    // Scroll to form
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Cancel editing
function cancelEdit() {
    editingIndex = null;
    formTitle.textContent = 'Add New Contact';
    submitBtn.textContent = 'Add Contact';
    cancelBtn.style.display = 'none';
    contactForm.reset();
}

// ==========================================
// DELETE FUNCTIONALITY
// ==========================================

// Delete a contact
function deleteContact(index) {
    const contact = contacts[index];

    // Confirm before deleting
    if (confirm(`Are you sure you want to delete ${contact.name}?`)) {
        contacts.splice(index, 1); // Remove from array
        saveContacts();
        displayContacts();
        showToast('Contact deleted successfully!');

        // If we were editing this contact, cancel edit mode
        if (editingIndex === index) {
            cancelEdit();
        }
    }
}

// Clear all contacts
function clearAllContacts() {
    if (contacts.length === 0) return;

    if (confirm('Are you sure you want to delete all contacts?')) {
        contacts = [];
        saveContacts();
        displayContacts();
        showToast('All contacts cleared!');
        cancelEdit();
    }
}

// ==========================================
// SEARCH FUNCTIONALITY
// ==========================================

// Handle search input
function handleSearch() {
    const searchTerm = searchInput.value.toLowerCase().trim();
    displayContacts(searchTerm);
}

// Filter contacts based on search term
function filterContacts(searchTerm) {
    if (!searchTerm) {
        return contacts; // Return all if no search term
    }

    // Filter by name or email
    return contacts.filter(contact =>
        contact.name.toLowerCase().includes(searchTerm) ||
        contact.email.toLowerCase().includes(searchTerm)
    );
}

// ==========================================
// DISPLAY CONTACTS - Show contacts on page
// ==========================================

function displayContacts(searchTerm = '') {
    const filteredContacts = filterContacts(searchTerm);

    // Update contact count
    contactCount.textContent = contacts.length;

    // Show/hide clear all button
    if (contacts.length > 0) {
        clearAllBtn.style.display = 'block';
    } else {
        clearAllBtn.style.display = 'none';
    }

    // Show empty state if no contacts
    if (filteredContacts.length === 0) {
        emptyState.classList.remove('hide');
        contactsList.innerHTML = '';

        // Update empty state message based on search
        if (searchTerm && contacts.length > 0) {
            emptyState.innerHTML = '<p>No contacts found matching your search.</p>';
        } else {
            emptyState.innerHTML = '<p>No contacts yet. Add your first contact above!</p>';
        }
        return;
    }

    // Hide empty state
    emptyState.classList.add('hide');

    // Build HTML for all contacts
    let html = '';
    filteredContacts.forEach((contact, displayIndex) => {
        // Find actual index in main contacts array
        const actualIndex = contacts.findIndex(c => c.id === contact.id);

        html += `
            <div class="contact-card">
                <div class="contact-header">
                    <div class="contact-info">
                        <h3>${escapeHtml(contact.name)}</h3>
                        <div class="contact-detail">
                            <strong>Email:</strong> ${escapeHtml(contact.email)}
                        </div>
                        <div class="contact-detail">
                            <strong>Phone:</strong> ${escapeHtml(contact.phone)}
                        </div>
                    </div>
                    <div class="contact-actions">
                        <button class="icon-btn edit-btn" onclick="editContact(${actualIndex})">
                            Edit
                        </button>
                        <button class="icon-btn delete-btn" onclick="deleteContact(${actualIndex})">
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        `;
    });

    contactsList.innerHTML = html;
}

// ==========================================
// TOAST NOTIFICATION - Show success messages
// ==========================================

function showToast(message) {
    toastMessage.textContent = message;
    toast.classList.add('show');

    // Hide after 3 seconds
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// ==========================================
// UTILITY FUNCTIONS
// ==========================================

// Prevent XSS attacks by escaping HTML
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}
