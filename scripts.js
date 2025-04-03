/*
 * Country Roads - Country Music Website
 * Main JavaScript File
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components and event listeners
    initNavigation();
    initNewsletterForm();
    initFadeInElements();
    initMobileMenu();
    
    // If there's a playlist, initialize audio functionality
    if (document.querySelector('.playlist-tracks')) {
        initPlaylist();
    }
});

// Sticky Navigation handling
function initNavigation() {
    const nav = document.querySelector('nav');
    const headerHeight = document.querySelector('header').offsetHeight;
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > headerHeight) {
            nav.classList.add('sticky');
        } else {
            nav.classList.remove('sticky');
        }
    });
    
    // Highlight current page in navigation
    const currentPage = window.location.pathname.split("/").pop();
    const navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage || (currentPage === '' && linkPage === 'index.html')) {
            link.classList.add('active');
        }
    });
}

// Newsletter Form Submission
function initNewsletterForm() {
    const form = document.querySelector('.newsletter-form');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = form.querySelector('input[type="email"]');
            const email = emailInput.value;
            
            if (validateEmail(email)) {
                // Normally you would send this to a server
                // For now, we'll just show a success message
                form.innerHTML = '<p class="success-message">Thanks for subscribing! You\'ll receive our next newsletter soon.</p>';
            } else {
                // Create error message if it doesn't exist
                let errorMsg = form.querySelector('.error-message');
                
                if (!errorMsg) {
                    errorMsg = document.createElement('p');
                    errorMsg.classList.add('error-message');
                    errorMsg.style.color = '#a94442';
                    errorMsg.style.marginTop = '0.5rem';
                    form.appendChild(errorMsg);
                }
                
                errorMsg.textContent = 'Please enter a valid email address.';
            }
        });
    }
}

// Email validation function
function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

// Fade in elements as they scroll into view
function initFadeInElements() {
    const elements = document.querySelectorAll('.card, .event, .featured-playlist');
    
    // Add initial opacity to elements
    elements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    });
    
    function checkFade() {
        elements.forEach(el => {
            const elementTop = el.getBoundingClientRect().top;
            const elementBottom = el.getBoundingClientRect().bottom;
            
            // Check if element is in viewport
            if (elementTop < window.innerHeight && elementBottom > 0) {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }
        });
    }
    
    // Run on scroll and initially
    window.addEventListener('scroll', checkFade);
    checkFade();
}

// Mobile menu toggle
function initMobileMenu() {
    // Check if we need to create a mobile menu
    if (window.innerWidth <= 768) {
        const nav = document.querySelector('nav');
        
        // Clone existing links
        const links = Array.from(nav.querySelectorAll('a'));
        
        // Create the mobile menu button
        const mobileMenuButton = document.createElement('button');
        mobileMenuButton.classList.add('mobile-menu-toggle');
        mobileMenuButton.innerHTML = '☰ Menu';
        mobileMenuButton.style.background = 'transparent';
        mobileMenuButton.style.border = 'none';
        mobileMenuButton.style.color = '#f9f3e9';
        mobileMenuButton.style.fontSize = '1.2rem';
        mobileMenuButton.style.cursor = 'pointer';
        mobileMenuButton.style.display = 'none'; // Initially hide
        
        // Create mobile menu container
        const mobileMenu = document.createElement('div');
        mobileMenu.classList.add('mobile-menu');
        mobileMenu.style.display = 'none';
        mobileMenu.style.flexDirection = 'column';
        mobileMenu.style.alignItems = 'center';
        mobileMenu.style.padding = '1rem 0';
        
        // Add links to mobile menu
        links.forEach(link => {
            const newLink = link.cloneNode(true);
            newLink.style.margin = '0.5rem 0';
            mobileMenu.appendChild(newLink);
        });
        
        // Replace nav contents with button and mobile menu
        if (window.innerWidth <= 768) {
            mobileMenuButton.style.display = 'block';
            
            // Keep first link visible alongside the menu button
            const firstLink = links[0];
            
            nav.innerHTML = '';
            nav.style.display = 'flex';
            nav.style.justifyContent = 'space-between';
            nav.style.alignItems = 'center';
            
            nav.appendChild(firstLink);
            nav.appendChild(mobileMenuButton);
            nav.appendChild(mobileMenu);
            
            // Toggle mobile menu when button is clicked
            mobileMenuButton.addEventListener('click', function() {
                if (mobileMenu.style.display === 'none') {
                    mobileMenu.style.display = 'flex';
                    mobileMenuButton.innerHTML = '✕ Close';
                } else {
                    mobileMenu.style.display = 'none';
                    mobileMenuButton.innerHTML = '☰ Menu';
                }
            });
        }
    }
}

// Playlist functionality
function initPlaylist() {
    const tracks = document.querySelectorAll('.track');
    
    tracks.forEach(track => {
        track.addEventListener('click', function() {
            // Remove active class from all tracks
            tracks.forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked track
            this.classList.add('active');
            
            // Get track info
            const title = this.querySelector('.track-title').textContent;
            const artist = this.querySelector('.track-artist').textContent;
            
            // In a real website, this would play the actual song
            // For now, we'll just show an alert
            alert(`Now playing: ${title} by ${artist}`);
            
            // Normally you would load and play the audio file here
            // const audioPlayer = new Audio('path/to/audio/file.mp3');
            // audioPlayer.play();
        });
    });
}

// Function to handle image gallery on artist pages
function initGallery() {
    const thumbnails = document.querySelectorAll('.gallery-thumbnail');
    const mainImage = document.querySelector('.gallery-main-image');
    
    if (thumbnails.length > 0 && mainImage) {
        thumbnails.forEach(thumb => {
            thumb.addEventListener('click', function() {
                // Get the high-res version URL
                const highResUrl = this.getAttribute('data-high-res');
                
                // Update main image
                mainImage.src = highResUrl;
                
                // Update active thumbnail
                thumbnails.forEach(t => t.classList.remove('active'));
                this.classList.add('active');
            });
        });
    }
}

// Function to handle upcoming events filtering
function initEventsFilter() {
    const filterButtons = document.querySelectorAll('.events-filter button');
    const events = document.querySelectorAll('.event');
    
    if (filterButtons.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Update active filter button
                filterButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                
                const filter = this.getAttribute('data-filter');
                
                // Show/hide events based on filter
                events.forEach(event => {
                    if (filter === 'all') {
                        event.style.display = 'flex';
                    } else {
                        const eventMonth = event.getAttribute('data-month');
                        event.style.display = (eventMonth === filter) ? 'flex' : 'none';
                    }
                });
            });
        });
    }
}

// Load more content dynamically (for news and artists pages)
function initLoadMore() {
    const loadMoreBtn = document.querySelector('.load-more-btn');
    
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', function() {
            const container = this.previousElementSibling;
            const contentType = this.getAttribute('data-content');
            
            // Show loading indicator
            this.textContent = 'Loading...';
            this.disabled = true;
            
            // Simulate ajax request with timeout
            setTimeout(() => {
                // Generate more content based on content type
                let newContent = '';
                
                if (contentType === 'news') {
                    // Add 3 more news items
                    for (let i = 0; i < 3; i++) {
                        newContent += generateNewsItem(i);
                    }
                } else if (contentType === 'artists') {
                    // Add 3 more artists
                    for (let i = 0; i < 3; i++) {
                        newContent += generateArtistCard(i);
                    }
                }
                
                // Add content to container
                container.innerHTML += newContent;
                
                // Hide load more button after second click (demo purposes)
                if (this.getAttribute('data-clicks') === '1') {
                    this.style.display = 'none';
                } else {
                    this.setAttribute('data-clicks', '1');
                    this.textContent = 'Load More';
                    this.disabled = false;
                }
                
                // Reinitialize fade effect for new elements
                initFadeInElements();
            }, 1000);
        });
    }
}

// Helper function to generate news item HTML
function generateNewsItem(index) {
    const titles = [
        'Country Star Announces Surprise Album',
        'Festival Lineup Revealed for Summer Tour',
        'Historic Venue Reopens with Sold-Out Show'
    ];
    
    return `
        <div class="card">
            <div class="card-image" style="background-image: url('images/news-extra-${index + 1}.jpg')"></div>
            <div class="card-content">
                <h3>${titles[index]}</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus hendrerit arcu sed erat molestie vehicula.</p>
                <a href="news/article-${index + 1}.html" class="btn">Read More</a>
            </div>
        </div>
    `;
}

// Helper function to generate artist card HTML
function generateArtistCard(index) {
    const artists = [
        'Sarah Williams',
        'The Dusty Boots Band',
        'Travis Montgomery'
    ];
    
    return `
        <div class="card">
            <div class="card-image" style="background-image: url('images/artist-extra-${index + 1}.jpg')"></div>
            <div class="card-content">
                <h3>${artists[index]}</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus hendrerit arcu sed erat molestie vehicula.</p>
                <a href="artists/artist-${index + 1}.html" class="btn">View Profile</a>
            </div>
        </div>
    `;
}