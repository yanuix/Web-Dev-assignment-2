document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('nav ul');
    
    if (mobileMenuBtn && navMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            navMenu.classList.toggle('show');
            this.querySelector('i').classList.toggle('fa-times');
            this.querySelector('i').classList.toggle('fa-bars');
        });
    }

    // Character Modal functionality
    const characterBtns = document.querySelectorAll('.character-btn');
    
    characterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const characterCard = this.closest('.character-card');
            const characterName = characterCard.querySelector('h3').textContent;
            const characterDesc = characterCard.querySelector('p').textContent;
            const characterImg = characterCard.querySelector('img').src;
            
            const modal = document.createElement('div');
            modal.className = 'character-modal';
            modal.innerHTML = `
                <div class="modal-content">
                    <span class="close-modal" aria-label="Close modal">&times;</span>
                    <img src="${characterImg}" alt="${characterName}">
                    <h2>${characterName}</h2>
                    <p>${characterDesc}</p>
                </div>
            `;
            document.body.appendChild(modal);
            
            // Close modal when clicking X or outside
            modal.querySelector('.close-modal').addEventListener('click', () => modal.remove());
            modal.addEventListener('click', (e) => {
                if (e.target === modal) modal.remove();
            });

            // Close with Escape key
            document.addEventListener('keydown', function handleKeyDown(e) {
                if (e.key === 'Escape') {
                    modal.remove();
                    document.removeEventListener('keydown', handleKeyDown);
                }
            });
        });
    });

    // Gallery Lightbox functionality
    const galleryImages = document.querySelectorAll('.gallery-img');
    galleryImages.forEach(img => {
        img.addEventListener('click', function() {
            const modal = document.createElement('div');
            modal.className = 'lightbox';
            modal.innerHTML = `
                <span class="close-lightbox" aria-label="Close lightbox">&times;</span>
                <img src="${this.src}" alt="${this.alt}">
                <p class="image-caption">${this.nextElementSibling.textContent}</p>
            `;
            document.body.appendChild(modal);

            // Close modal when clicking X or outside
            modal.querySelector('.close-lightbox').addEventListener('click', () => modal.remove());
            modal.addEventListener('click', (e) => {
                if (e.target === modal) modal.remove();
            });

            // Close with Escape key
            document.addEventListener('keydown', function handleKeyDown(e) {
                if (e.key === 'Escape') {
                    modal.remove();
                    document.removeEventListener('keydown', handleKeyDown);
                }
            });
        });
    });

    // Gallery tabs functionality
    const tabBtns = document.querySelectorAll('.tab-btn');
    if (tabBtns) {
        tabBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                // Remove active class from all buttons
                tabBtns.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                this.classList.add('active');
                
                // Hide all galleries
                document.querySelectorAll('.gallery-container').forEach(gallery => {
                    gallery.classList.add('hidden');
                });
                
                // Show selected gallery
                const tabName = this.getAttribute('data-tab');
                document.getElementById(`${tabName}-gallery`).classList.remove('hidden');
            });
        });
    }

    // Form submissions
    const communityForm = document.querySelector('.community-form');
    if (communityForm) {
        communityForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const name = this.querySelector('#name').value;
            const email = this.querySelector('#email').value;
            const message = this.querySelector('#message').value;
            
            // Simple validation
            if (!name || !email || !message) {
                alert('Please fill in all fields');
                return;
            }
            
            // In a real implementation, you would send this data to a server
            alert(`Thank you for your message, ${name}! We'll get back to you soon.`);
            this.reset();
        });
    }

    // Dark mode toggle
    const darkModeToggle = document.querySelector('.dark-mode-toggle');
    if (darkModeToggle) {
        // Check for saved user preference
        if (localStorage.getItem('darkMode') === 'disabled') {
            document.body.classList.add('light-mode');
            darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        } else {
            // Default to dark mode
            document.body.classList.add('dark-mode');
            darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        }

        darkModeToggle.addEventListener('click', function() {
            document.body.classList.toggle('light-mode');
            document.body.classList.toggle('dark-mode');
            
            // Update icon and save preference
            if (document.body.classList.contains('light-mode')) {
                this.innerHTML = '<i class="fas fa-sun"></i>';
                localStorage.setItem('darkMode', 'disabled');
            } else {
                this.innerHTML = '<i class="fas fa-moon"></i>';
                localStorage.setItem('darkMode', 'enabled');
            }
        });
    }
});
