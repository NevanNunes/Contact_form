// 1. Data State
let contacts = JSON.parse(localStorage.getItem('contacts')) || [];
let editIndex = null;

// 2. DOM Elements
const elements = {
    form: document.getElementById('contactForm'),
    list: document.getElementById('contactsList'),
    name: document.getElementById('nameInput'),
    email: document.getElementById('emailInput'),
    phone: document.getElementById('phoneInput'),
    search: document.getElementById('searchInput'),
    title: document.getElementById('formTitle'),
    submitBtn: document.getElementById('submitBtn'),
    cancelBtn: document.getElementById('cancelBtn'),
    count: document.getElementById('contactCount'),
    clearBtn: document.getElementById('clearAllBtn'),
    empty: document.getElementById('emptyState'),
    toast: document.getElementById('toast')
};

// 3. Render contacts to the page
function render(filter = '') {
    const filtered = contacts.filter(c =>
        c.name.toLowerCase().includes(filter.toLowerCase()) ||
        c.email.toLowerCase().includes(filter.toLowerCase())
    );

    elements.count.innerText = contacts.length;
    elements.clearBtn.style.display = contacts.length > 0 ? 'inline' : 'none';
    elements.empty.style.display = filtered.length === 0 ? 'block' : 'none';

    elements.list.innerHTML = filtered.map((c, i) => `
        <div class="contact-card">
            <div>
                <h3>${c.name}</h3>
                <p>${c.email} &nbsp;|&nbsp; ${c.phone}</p>
            </div>
            <div class="card-actions">
                <button class="action-btn edit-btn" onclick="startEdit(${i})">Edit</button>
                <button class="action-btn delete-btn" onclick="removeContact(${i})">Delete</button>
            </div>
        </div>
    `).join('');

    localStorage.setItem('contacts', JSON.stringify(contacts));
}

// 4. Handle form submit (Add or Update)
elements.form.onsubmit = (e) => {
    e.preventDefault();

    const newContact = {
        name: elements.name.value.trim(),
        email: elements.email.value.trim(),
        phone: elements.phone.value.trim()
    };

    if (editIndex !== null) {
        contacts[editIndex] = newContact;
        showToast('Contact updated!');
    } else {
        contacts.unshift(newContact);
        showToast('Contact added!');
    }

    resetForm();
    render();
};

// 5. Search
elements.search.oninput = (e) => render(e.target.value);

// 6. Clear All
elements.clearBtn.onclick = () => {
    if (confirm('Delete all contacts?')) {
        contacts = [];
        render();
    }
};

// Helper: Start editing a contact
function startEdit(index) {
    const c = contacts[index];
    elements.name.value = c.name;
    elements.email.value = c.email;
    elements.phone.value = c.phone;

    editIndex = index;
    elements.title.innerText = 'Edit Contact';
    elements.submitBtn.innerText = 'Update Contact';
    elements.cancelBtn.style.display = 'block';
    window.scrollTo(0, 0);
}

// Helper: Reset form back to Add mode
function resetForm() {
    editIndex = null;
    elements.form.reset();
    elements.title.innerText = 'Add New Contact';
    elements.submitBtn.innerText = 'Add Contact';
    elements.cancelBtn.style.display = 'none';
}

// Helper: Delete a contact
function removeContact(index) {
    if (confirm('Delete this contact?')) {
        contacts.splice(index, 1);
        render();
    }
}

// Helper: Show a short toast message
function showToast(msg) {
    elements.toast.innerText = msg;
    elements.toast.classList.add('show');
    setTimeout(() => elements.toast.classList.remove('show'), 2500);
}

elements.cancelBtn.onclick = resetForm;

// Initialize on page load
render();
