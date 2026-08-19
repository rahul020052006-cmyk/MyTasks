/**
 * Complex Form - Client-side Form Validation & Hash Routing
 * Handles DOM events, real-time input validation, password strength scoring,
 * dynamic conditional form fields, progress tracking, and hash-based SPA routing.
 */

document.addEventListener('DOMContentLoaded', () => {
    // --- DOM ELEMENT REFERENCES ---
    // Inputs & Error Message Containers
    const emailInput = document.getElementById('email');
    const emailError = document.getElementById('email-error');
    const passwordInput = document.getElementById('password');
    const confirmInput = document.getElementById('confirm-password');
    const matchError = document.getElementById('match-error');

    // Indicators & Conditional Fields
    const strengthBar = document.getElementById('strength-bar');
    const strengthText = document.getElementById('strength-text');
    const accountType = document.getElementById('account-type');
    const companyGroup = document.getElementById('company-group');
    const companyInput = document.getElementById('company-name');
    const progressBar = document.getElementById('progress-bar');

    // Form & Submit Controls
    const submitBtn = document.getElementById('submit-btn');
    const form = document.getElementById('registration-form');

    // Track validation state for all required form fields
    const fieldStatus = {
        email: false,
        password: false,
        confirm: false,
        company: true // Default true since business input is hidden initially
    };

    // --- STEP 1: CLIENT-SIDE HASH ROUTER ---
    /**
     * Toggles view visibility based on window.location.hash (#signup or #dashboard).
     */
    function handleRouting() {
        const hash = window.location.hash || '#signup';
        const views = document.querySelectorAll('.view');

        views.forEach(view => {
            if (`#${view.id}` === hash) {
                view.classList.remove('hidden'); // Show targeted view section
            } else {
                view.classList.add('hidden'); // Hide all other views
            }
        });
    }

    // Listen for hash changes in URL and run initial router setup
    window.addEventListener('hashchange', handleRouting);
    handleRouting();

    // --- STEP 2: ADVANCED FORM VALIDATION & DOM UPDATES ---

    /**
     * Email Input Event Listener
     * Validates email format using regular expressions and updates UI styling.
     */
    emailInput.addEventListener('input', () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailRegex.test(emailInput.value)) {
            emailInput.classList.remove('invalid');
            emailInput.classList.add('valid');
            emailError.textContent = '';
            fieldStatus.email = true;
        } else {
            emailInput.classList.remove('valid');
            emailInput.classList.add('invalid');
            emailError.textContent = 'Please enter a valid email address.';
            fieldStatus.email = false;
        }
        updateProgressAndState();
    });

    /**
     * Password Input Event Listener
     * Calculates password complexity score and updates visual strength indicator bar.
     */
    passwordInput.addEventListener('input', () => {
        const val = passwordInput.value;
        let score = 0;

        // Complexity criteria evaluations
        if (val.length >= 8) score++; // Length check
        if (/[A-Z]/.test(val)) score++; // Uppercase letter check
        if (/[0-9]/.test(val)) score++; // Number check
        if (/[^A-Za-z0-9]/.test(val)) score++; // Special character check

        // UI indicator properties mapping for score levels
        const strengthMap = [
            { width: '25%', color: '#e74c3c', text: 'Very Weak' },
            { width: '50%', color: '#e67e22', text: 'Weak' },
            { width: '75%', color: '#f1c40f', text: 'Medium' },
            { width: '100%', color: '#2ecc71', text: 'Strong' }
        ];

        if (val.length === 0) {
            strengthBar.style.width = '0%';
            strengthText.textContent = 'Strength: Very Weak';
            fieldStatus.password = false;
        } else {
            const current = strengthMap[score - 1] || strengthMap[0];
            strengthBar.style.width = current.width;
            strengthBar.style.backgroundColor = current.color;
            strengthText.textContent = `Strength: ${current.text}`;
            fieldStatus.password = score >= 3; // Require at least 'Medium' strength
        }

        validatePasswordMatch();
        updateProgressAndState();
    });

    /**
     * Password Match Validator
     * Checks if confirmation input matches the primary password.
     */
    function validatePasswordMatch() {
        if (confirmInput.value === '' && passwordInput.value === '') return;

        if (confirmInput.value === passwordInput.value && fieldStatus.password) {
            confirmInput.classList.remove('invalid');
            confirmInput.classList.add('valid');
            matchError.textContent = '';
            fieldStatus.confirm = true;
        } else {
            confirmInput.classList.remove('valid');
            confirmInput.classList.add('invalid');
            matchError.textContent = 'Passwords do not match or password is too weak.';
            fieldStatus.confirm = false;
        }
    }

    confirmInput.addEventListener('input', () => {
        validatePasswordMatch();
        updateProgressAndState();
    });

    // --- STEP 3: DYNAMIC CONDITIONAL FIELDS ---
    /**
     * Account Type Change Listener
     * Toggles visibility and required validation status for Company Name field.
     */
    accountType.addEventListener('change', (e) => {
        if (e.target.value === 'business') {
            companyGroup.classList.remove('hidden');
            fieldStatus.company = companyInput.value.trim() !== '';
        } else {
            companyGroup.classList.add('hidden');
            fieldStatus.company = true; // Not required for personal accounts
        }
        updateProgressAndState();
    });

    companyInput.addEventListener('input', () => {
        if (accountType.value === 'business') {
            fieldStatus.company = companyInput.value.trim() !== '';
        }
        updateProgressAndState();
    });

    // --- STEP 4: PROGRESS BAR & SUBMIT STATE ---
    /**
     * Calculates overall form completion percentage and enables/disables submit button.
     */
    function updateProgressAndState() {
        const keys = Object.keys(fieldStatus);
        const validCount = keys.filter(key => fieldStatus[key]).length;
        const percentage = (validCount / keys.length) * 100;

        // Update progress bar width dynamically
        progressBar.style.width = `${percentage}%`;

        // Enable submit button only when all tracked fields are valid
        const isFormValid = keys.every(key => fieldStatus[key]);
        submitBtn.disabled = !isFormValid;
    }

    // --- STEP 5: FORM SUBMISSION & HASH ROUTING ---
    /**
     * Form Submit Event Listener
     * Handles form submission, prevents default page reload, and routes view to #dashboard.
     */
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const isFormValid = Object.keys(fieldStatus).every(key => fieldStatus[key]);
        if (isFormValid) {
            window.location.hash = '#dashboard';
        }
    });
});
