import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyCl4v4Ug78YXyq_y-KfWGnhRX-Pahrb2HU",
    authDomain: "tutorial-project-ecf1e.firebaseapp.com",
    databaseURL: "https://tutorial-project-ecf1e-default-rtdb.firebaseio.com",
    projectId: "tutorial-project-ecf1e",
    storageBucket: "tutorial-project-ecf1e.firebasestorage.app",
    messagingSenderId: "712917386489",
    appId: "1:712917386489:web:8df101b3743d470c6e4e28"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const rtdb = getDatabase(app);

class EnquiryForm {
    constructor() {
        console.log('Initializing form...');
        this.modal = document.getElementById('enquiryModal');
        this.form = document.getElementById('enquiryForm');
        this.openButton = document.getElementById('openEnquiryForm');
        this.closeButton = document.getElementById('closeModal');
        
        // Form fields
        this.fields = {
            name: document.getElementById('name'),
            email: document.getElementById('email'),
            subject: document.getElementById('subject'),
            message: document.getElementById('message')
        };

        this.addEventListeners();
        console.log('Form initialized');
    }

    addEventListeners() {
        console.log('Adding event listeners...');
        this.openButton.addEventListener('click', () => {
            console.log('Opening modal');
            this.openModal();
        });

        this.closeButton.addEventListener('click', () => {
            console.log('Closing modal');
            this.closeModal();
        });

        this.form.addEventListener('submit', (e) => {
            console.log('Form submitted');
            this.handleSubmit(e);
        });
    }

    openModal() {
        this.modal.classList.add('active');
    }

    closeModal() {
        this.modal.classList.remove('active');
        this.form.reset();
    }

    async handleSubmit(e) {
        e.preventDefault();
        console.log('Processing form submission...');

        const formData = {
            name: this.fields.name.value,
            email: this.fields.email.value,
            subject: this.fields.subject.value,
            message: this.fields.message.value,
            timestamp: new Date().toISOString()
        };

        console.log('Form data:', formData);

        try {
            // Save to Firestore
            const docRef = await addDoc(collection(db, 'enquiries'), formData);
            console.log('Saved to Firestore:', docRef.id);

            // Save to Realtime Database
            const dbRef = ref(rtdb, 'enquiries/' + docRef.id);
            await set(dbRef, formData);
            console.log('Saved to Realtime Database');

            alert('Message sent successfully!');
            this.closeModal();
        } catch (error) {
            console.error('Error:', error);
            alert('Error sending message: ' + error.message);
        }
    }
}

// Initialize form
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, creating form...');
    window.enquiryForm = new EnquiryForm();
}); 