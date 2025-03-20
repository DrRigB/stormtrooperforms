const errorImages = [
    'images/freaky.gif',
    'images/dog.jpg',
    'images/indigoingot-dog.gif',
    'images/eyebrow-raise-dog-eyebrow.gif',
    'images/biolit.gif',
    'images/indigoingot-chickencoup.gif',
    'images/bpk-scared-dog.gif',
    'images/no-really.gif',
    'images/bellebows-tiktok.gif',
];

let currentImageIndex = 0;

function getNextImage() {
    const image = errorImages[currentImageIndex];
    currentImageIndex = (currentImageIndex + 1) % errorImages.length;
    return image;
}

function showError(errorMessage) {
    const overlay = document.getElementById('error-overlay');
    const gif = document.getElementById('error-gif');
    const errorText = document.getElementById('error-text');
    
    errorText.textContent = errorMessage || 'ERROR! Please fix the form and try again!';
    
    gif.src = getNextImage() + '?' + new Date().getTime();
    
    overlay.style.display = 'block';
    
    setTimeout(function() {
        overlay.style.display = 'none';
    }, 1000);
}

function showSuccess() {
    const overlay = document.getElementById('success-overlay');
    
    overlay.style.display = 'block';
    
    setTimeout(function() {
        overlay.style.display = 'none';
    }, 3000);
}

document.getElementById('feedbackForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const age = parseInt(document.getElementById('age').value);
    const phone = document.getElementById('phone').value.trim();
    const street = document.getElementById('street').value.trim();
    const city = document.getElementById('city').value.trim();
    const state = document.getElementById('state').value.trim();
    const zip = document.getElementById('zip').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    if (!name || !age || !phone || !street || !city || !state || !zip || !email || !message) {
        showError('ERROR: All fields must be filled out!');
        return;
    }

    if (isNaN(age) || age < 18) {
        showError('ERROR: Must be 18 or older!');
        return;
    }

    const phoneRegex = /^\d{3}-\d{3}-\d{4}$/;
    if (!phoneRegex.test(phone)) {
        showError('ERROR: Phone must be in format: xxx-xxx-xxxx');
        return;
    }

    const streetTypes = ['street', 'road', 'avenue', 'boulevard', 'drive', 'court', 'circle', 
                        'place', 'lane', 'way', 'track', 'parkway', 'st', 'rd', 'ave', 'blvd', 
                        'dr', 'ct', 'cir', 'pl', 'ln'];
    const hasStreetType = streetTypes.some(type => 
        street.toLowerCase().includes(type.toLowerCase())
    );
    if (!hasStreetType) {
        showError('ERROR: Street name must include type (St, Rd, Ave, etc)');
        return;
    }

    const zipRegex = /^\d{5}$/;
    if (!zipRegex.test(zip)) {
        showError('ERROR: Zip code must be exactly 5 digits');
        return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showError('ERROR: Invalid email address');
        return;
    }

    const cityRegex = /^[A-Za-z\s]+$/;
    if (!cityRegex.test(city)) {
        showError('ERROR: City name can only contain letters and spaces');
        return;
    }

    const stateRegex = /^[A-Z]{2}$/;
    if (!stateRegex.test(state.toUpperCase())) {
        showError('ERROR: State must be a 2-letter code (e.g., OH)');
        return;
    }

    showSuccess();
    this.reset();
});
