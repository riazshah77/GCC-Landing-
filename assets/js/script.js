(() => {
    'use strict';

    const form = document.getElementById('profileForm');
    const emailInput = document.getElementById('email');
    const fileInput = document.getElementById('hiddenImageInput');
    const placeholder = document.getElementById('imageUploaded');
    const toastElement = document.getElementById('submitToast');
    const toast = new bootstrap.Toast(toastElement);

    // Email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    form.addEventListener('submit', function (event) {
        event.preventDefault();
        event.stopPropagation();

        // Reset custom validity for email
        emailInput.setCustomValidity('');

        // Validate email format
        if (!emailRegex.test(emailInput.value.trim())) {
            emailInput.setCustomValidity('Invalid email format');
        }

        // Trigger Bootstrap validation styles
        form.classList.add('was-validated');

        // If form is valid, show toast
        if (form.checkValidity()) {
            toast.show();
        }
    });

    // Handle image upload and display preview
    fileInput.addEventListener('change', () => {
        const file = fileInput.files[0];
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = e => {
                placeholder.innerHTML = '';
                const img = document.createElement('img');
                img.src = e.target.result;
                img.alt = 'Uploaded image';
                img.classList.add('img-fluid', 'rounded-circle');
                img.style.width = '100%';
                img.style.height = '100%';
                img.style.objectFit = 'cover';
                placeholder.appendChild(img);
            };
            reader.readAsDataURL(file);
        }
    });

    // Delete uploaded image and reset input
    window.deleteImage = function () {
        fileInput.value = '';
        placeholder.innerHTML = '';
    };
})();

window.addEventListener("scroll", function () {
    const header = document.getElementById("mainHeader");
    if (window.scrollY > 15) {
        header.classList.add("sticky");
        body.classList.add("has-sticky-header");
    } else {
        header.classList.remove("sticky");
        body.classList.remove("has-sticky-header");
    }
});