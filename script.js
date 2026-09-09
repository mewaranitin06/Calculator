let display = document.getElementById('display');
let blurOverlay = document.getElementById('blurOverlay');
let modalOverlay = document.getElementById('modalOverlay');

let currentValue = '0';
let fullResult = null;      // stores the real result while locked
let isSubscribed = false;   // demo-only flag, resets on page reload

function updateDisplay(text) {
  display.textContent = text;
}

function appendValue(val) {
  // typing again after a result clears the locked state
  if (fullResult !== null) {
    fullResult = null;
    blurOverlay.classList.remove('show');
  }

  if (currentValue === '0' && val !== '.') {
    currentValue = val;
  } else {
    currentValue += val;
  }
  updateDisplay(currentValue);
}

function clearDisplay() {
  currentValue = '0';
  fullResult = null;
  blurOverlay.classList.remove('show');
  updateDisplay(currentValue);
}

function deleteLast() {
  currentValue = currentValue.slice(0, -1);
  if (currentValue === '') currentValue = '0';
  updateDisplay(currentValue);
}

function calculate() {
  try {
    let result = String(eval(currentValue));

    if (isSubscribed) {
      // subscribed users see the full result immediately
      currentValue = result;
      updateDisplay(currentValue);
    } else {
      // free users only see the first digit, rest is blurred
      fullResult = result;
      currentValue = result;
      updateDisplay(result.charAt(0));
      blurOverlay.classList.add('show');
    }
  } catch (e) {
    currentValue = 'Error';
    updateDisplay(currentValue);
  }
}

// ---- Modal logic ----

function openModal() {
  modalOverlay.classList.add('show');
}

function closeModal() {
  modalOverlay.classList.remove('show');
}

function showTab(tab) {
  document.getElementById('loginTab').classList.toggle('hidden', tab !== 'login');
  document.getElementById('signupTab').classList.toggle('hidden', tab !== 'signup');
  document.getElementById('loginTabBtn').classList.toggle('active', tab === 'login');
  document.getElementById('signupTabBtn').classList.toggle('active', tab === 'signup');
}

function subscribe() {
  // demo only: no real auth or payment happens here
  isSubscribed = true;
  closeModal();
  blurOverlay.classList.remove('show');

  if (fullResult !== null) {
    updateDisplay(fullResult);
  }
}
