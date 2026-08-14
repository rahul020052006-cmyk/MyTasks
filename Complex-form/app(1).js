document.addEventListener('DOMContentLoaded', () => {
  // DOM Element References
  const emailInput = document.getElementById('email');
  const emailError = document.getElementById('email-error');
  const passwordInput = document.getElementById('password');
  const confirmInput = document.getElementById('confirm-password');
  const matchError = document.getElementById('match-error');
  const strengthBar = document.getElementById('strength-bar');
  const strengthText = document.getElementById('strength-text');
  const accountType = document.getElementById('account-type');
  const companyGroup = document.getElementById('company-group');
  const companyInput = document.getElementById('company-name');
  const progressBar = document.getElementById('progress-bar');
  const submitBtn = document.getElementById('submit-btn');
  const form = document.getElementById('registration-form');

  // Track validation status of required fields
  const fieldStatus = {
    email: false,
    password: false,
    confirm: false,
    company: true // Default true since it's hidden initially
  };

  // --- STEP 1: CLIENT-SIDE HASH ROUTER ---
  function handleRouting() {
    const hash = window.location.hash || '#signup';
    const views = document.querySelectorAll('.view');
    
    views.forEach(view => {
      if (`#${view.id}` === hash) {
        view.classList.remove('hidden');
      } else {
        view.classList.add('hidden');
      }
    });
  }

  window.addEventListener('hashchange', handleRouting);
  handleRouting(); // Initialize route on load

  // --- STEP 2: ADVANCED FORM VALIDATION & DOM UPDATES ---

  // Email Format Validation (Regex)
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

  // Password Strength Calculation
  passwordInput.addEventListener('input', () => {
    const val = passwordInput.value;
    let score = 0;

    if (val.length >= 8) score++;
    if (/[A-Z]/.test(val)) score++;
    if (/[0-9]/.test(val)) score++;
    if (/[^A-Za-z0-9]/.test(val)) score++;

    // Dynamic UI Updates based on strength
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
      fieldStatus.password = score >= 3; // Require medium or strong
    }

    validatePasswordMatch();
    updateProgressAndState();
  });

  // Confirm Password Check
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
  function updateProgressAndState() {
    const keys = Object.keys(fieldStatus);
    const validCount = keys.filter(key => fieldStatus[key]).length;
    const percentage = (validCount / keys.length) * 100;

    progressBar.style.width = `${percentage}%`;

    // Toggle button state
    const isFormValid = keys.every(key => fieldStatus[key]);
    submitBtn.disabled = !isFormValid;
  }

  // Handle Form Submission & Routing Transition
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    // Navigate via Hash Routing
    window.location.hash = '#dashboard';
    form.reset();
    strengthBar.style.width = '0%';
  });
});