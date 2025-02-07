// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getDatabase, ref, push, set } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCl4v4Ug78YXyq_y-KfWGnhRX-Pahrb2HU",
    authDomain: "tutorial-project-ecf1e.firebaseapp.com",
    databaseURL: "https://tutorial-project-ecf1e-default-rtdb.firebaseio.com",
    projectId: "tutorial-project-ecf1e",
    storageBucket: "tutorial-project-ecf1e.appspot.com",
    messagingSenderId: "712917386489",
    appId: "1:712917386489:web:8df101b3743d470c6e4e28",
    measurementId: "G-VE6N83J1W4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
console.log("✅ Firebase Initialized Successfully!");

// Form elements
const form = document.getElementById("enquiryForm");
const modal = document.getElementById("enquiryModal");
const openButton = document.getElementById("openEnquiryForm");
const closeButton = document.getElementById("closeModal");

// Form fields
const nameField = document.getElementById("name");
const emailField = document.getElementById("email");
const subjectField = document.getElementById("subject");
const messageField = document.getElementById("message");

// Open modal
openButton.addEventListener("click", () => {
    modal.classList.add("active");
});

// Close modal
closeButton.addEventListener("click", () => {
    modal.classList.remove("active");
    form.reset();
});

// Validate form
function validateForm() {
    if (!nameField.value.trim()) {
        alert("Please enter your name");
        return false;
    }
    if (!emailField.value.trim()) {
        alert("Please enter your email");
        return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailField.value.trim())) {
        alert("Invalid email format");
        return false;
    }
    if (!subjectField.value.trim()) {
        alert("Please enter a subject");
        return false;
    }
    if (!messageField.value.trim()) {
        alert("Please enter a message");
        return false;
    }
    return true;
}

// Prevent Multiple Submissions
let isSubmitting = false;

// Form submit event
form.addEventListener("submit", async (e) => {
    e.preventDefault();

    if (isSubmitting) {
        console.warn("⚠ Form is already submitting, please wait...");
        return;
    }
    isSubmitting = true; // Prevent duplicate submissions

    console.log("📌 Form submission started...");

    if (!validateForm()) {
        console.log("❌ Validation failed, form not submitted.");
        isSubmitting = false; // Reset flag if validation fails
        return;
    }

    const formData = {
        name: nameField.value.trim(),
        email: emailField.value.trim(),
        subject: subjectField.value.trim(),
        message: messageField.value.trim(),
        timestamp: new Date().toISOString()
    };

    try {
        console.log("⏳ Sending data to Firebase...");
        const newRef = push(ref(db, "enquiries"));
        await set(newRef, formData);

        console.log("✅ Data successfully saved:", formData);
        alert("Message sent successfully!");

        // Reset form & modal
        modal.classList.remove("active");
        form.reset();
    } catch (error) {
        console.error("❌ Error saving data:", error);
        alert("Error sending message. Try again later.");
    }

    isSubmitting = false; // Allow new submissions
});
