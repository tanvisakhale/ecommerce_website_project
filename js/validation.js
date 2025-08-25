// Enhanced jQuery validation for contact form
$(document).ready(function() {
    $('#contactForm').on('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        var name = $('#name').val().trim();
        var email = $('#email').val().trim();
        var message = $('#message').val().trim();
        
        // Reset previous messages
        $('#formMsg').html('');
        
        // Validation
        var valid = true;
        var errorMessages = [];
        
        // Name validation
        if (name.length < 2) {
            valid = false;
            errorMessages.push('Name must be at least 2 characters long.');
        }
        
        // Email validation
        var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            valid = false;
            errorMessages.push('Please enter a valid email address.');
        }
        
        // Message validation
        if (message.length < 10) {
            valid = false;
            errorMessages.push('Message must be at least 10 characters long.');
        }
        
        // Display result
        if (valid) {
            // Success message
            $('#formMsg').html('<div class="alert alert-success">Thank you for your message! We will get back to you soon.</div>');
            
            // Reset form
            this.reset();
            
            // Show success notification
            showNotification('Message sent successfully!', 'success');
        } else {
            // Error message
            var errorHtml = '<div class="alert alert-danger"><strong>Please fix the following errors:</strong><ul>';
            errorMessages.forEach(function(msg) {
                errorHtml += '<li>' + msg + '</li>';
            });
            errorHtml += '</ul></div>';
            $('#formMsg').html(errorHtml);
            
            // Show error notification
            showNotification('Please check the form for errors.', 'error');
        }
    });
    
    // Real-time validation feedback
    $('#name').on('blur', function() {
        var name = $(this).val().trim();
        if (name.length < 2 && name.length > 0) {
            $(this).addClass('is-invalid');
        } else {
            $(this).removeClass('is-invalid').addClass('is-valid');
        }
    });
    
    $('#email').on('blur', function() {
        var email = $(this).val().trim();
        var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email) && email.length > 0) {
            $(this).addClass('is-invalid');
        } else {
            $(this).removeClass('is-invalid').addClass('is-valid');
        }
    });
    
    $('#message').on('blur', function() {
        var message = $(this).val().trim();
        if (message.length < 10 && message.length > 0) {
            $(this).addClass('is-invalid');
        } else {
            $(this).removeClass('is-invalid').addClass('is-valid');
        }
    });
    
    // Clear validation classes on input
    $('input, textarea').on('input', function() {
        $(this).removeClass('is-invalid is-valid');
    });
});

// Notification function (if not already defined in script.js)
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `alert alert-${type === 'error' ? 'danger' : type === 'success' ? 'success' : 'info'} position-fixed`;
    notification.style.cssText = 'top: 20px; right: 20px; z-index: 9999; min-width: 300px;';
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}