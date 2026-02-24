const menuItems = document.querySelectorAll('.nav-link');
const mobileMenu = document.getElementById('mobile-menu');
const navMenu = document.querySelector('.nav-menu');

// Toggle mobile menu
mobileMenu.addEventListener('click', function() {
    mobileMenu.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
menuItems.forEach(item => {
    item.addEventListener('click', function() {
        mobileMenu.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Highlight active section on scroll
window.addEventListener('scroll', function() {
    let current = '';
    const sections = document.querySelectorAll('section[id]');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    menuItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href') === `#${current}`) {
            item.classList.add('active');
        }
    });
});
  
        // JAVASCRIPT LOGIC
        
        function copyNumber() {
            // The number to copy
            const phoneNumber = "(888) 862-0193";
            
            // Use the Clipboard API to copy text
            navigator.clipboard.writeText(phoneNumber).then(() => {
                showToast();
            }).catch(err => {
                console.error('Failed to copy text: ', err);
            });
        }

        // Function to show the "Copied" popup
        function showToast() {
            const toast = document.getElementById("toast");
            toast.className = "show";
            
            // Hide the toast after 3 seconds
            setTimeout(function(){ 
                toast.className = toast.className.replace("show", ""); 
            }, 3000);
        }
   // JavaScript Functionality

document.addEventListener('DOMContentLoaded', function() {
    const phoneBtn = document.getElementById('phoneBtn');
    const stars = document.getElementById('stars');
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toast-message');
    
    // Phone number to copy/call
    const phoneNumber = '(888) 862-0193';
    const phoneNumberClean = '8888620193';
    
    // Add click event listener
    phoneBtn.addEventListener('click', handlePhoneClick);
    
    // Add hover animation to stars
    const starElements = document.querySelectorAll('.star');
    starElements.forEach((star, index) => {
        star.addEventListener('mouseenter', function() {
            // Highlight stars up to this one
            starElements.forEach((s, i) => {
                if (i <= index) {
                    s.style.color = '#ffd700';
                } else {
                    s.style.color = '#ffffff';
                }
            });
        });
    });
    
    // Reset stars on mouse leave
    stars.addEventListener('mouseleave', function() {
        starElements.forEach(star => {
            star.style.color = '#ffffff';
        });
    });
    
    // Function to handle phone button click
    function handlePhoneClick() {
        // Detect if mobile device
        const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
        
        if (isMobile) {
            // On mobile, initiate phone call
            initiateCall();
        } else {
            // On desktop, copy to clipboard
            copyToClipboard();
        }
    }
    
    // Function to copy phone number to clipboard
    function copyToClipboard() {
        phoneBtn.classList.add('loading');
        
        navigator.clipboard.writeText(phoneNumber).then(function() {
            showToast('Phone number copied to clipboard!');
            phoneBtn.classList.remove('loading');
            
            // Add visual feedback
            phoneBtn.style.backgroundColor = '#d4edda';
            setTimeout(() => {
                phoneBtn.style.backgroundColor = '#ffffff';
            }, 500);
        }).catch(function(err) {
            // Fallback for older browsers
            fallbackCopyToClipboard();
            phoneBtn.classList.remove('loading');
        });
    }
    
    // Fallback copy method
    function fallbackCopyToClipboard() {
        const textArea = document.createElement('textarea');
        textArea.value = phoneNumber;
        textArea.style.position = 'fixed';
        textArea.style.left = '-9999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        
        try {
            document.execCommand('copy');
            showToast('Phone number copied!');
        } catch (err) {
            showToast('Failed to copy. Please copy manually.');
        }
        
        document.body.removeChild(textArea);
    }
    
    // Function to initiate phone call
    function initiateCall() {
        window.location.href = `tel:${phoneNumberClean}`;
        showToast('Initiating call...');
    }
    
    // Function to show toast notification
    function showToast(message) {
        toastMessage.textContent = message;
        toast.classList.add('show');
        
        // Hide toast after 3 seconds
        setTimeout(function() {
            toast.classList.remove('show');
        }, 3000);
    }
    
    // Add animation to stars on page load
    setTimeout(function() {
        stars.classList.add('animate');
        setTimeout(function() {
            stars.classList.remove('animate');
        }, 600);
    }, 500);
    
    // Add keyboard accessibility
    phoneBtn.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handlePhoneClick();
        }
    });
});

// Add ripple effect on button click
document.getElementById('phoneBtn').addEventListener('click', function(e) {
    const ripple = document.createElement('span');
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple');
    
    this.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
});