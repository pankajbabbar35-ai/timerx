// Template data for the invitation maker
const templates = [
    {
        id: 1,
        name: 'Royal Gold Wedding',
        category: 'wedding',
        emoji: '💍',
        colors: {
            bg: '#1a1a1a',
            primary: '#D4AF37',
            text: '#FFFFFF'
        },
        defaults: {
            hostName: 'Mr. & Mrs. Smith',
            eventTitle: 'Wedding Ceremony',
            date: '2024-12-15',
            time: '18:00',
            venue: 'Grand Ballroom, City Hall',
            description: 'Together with our families, we joyfully invite you to celebrate our marriage',
            contactNumber: '+1 (555) 123-4567'
        }
    },
    {
        id: 2,
        name: 'Floral Wedding',
        category: 'wedding',
        emoji: '🌸',
        colors: {
            bg: '#FFF8F0',
            primary: '#FF69B4',
            text: '#333333'
        },
        defaults: {
            hostName: 'Bride & Groom',
            eventTitle: 'Our Wedding Day',
            date: '2024-06-20',
            time: '17:00',
            venue: 'Garden Estate',
            description: 'Join us for a beautiful celebration of love and commitment',
            contactNumber: '+1 (555) 987-6543'
        }
    },
    {
        id: 3,
        name: 'Traditional Indian Wedding',
        category: 'wedding',
        emoji: '🎊',
        colors: {
            bg: '#8B0000',
            primary: '#FFD700',
            text: '#FFFFFF'
        },
        defaults: {
            hostName: 'Family Name',
            eventTitle: 'Wedding Celebration',
            date: '2024-11-22',
            time: '19:00',
            venue: 'Grand Hotel',
            description: 'We cordially invite you to be part of our wedding festivities',
            contactNumber: '+91 98765 43210'
        }
    },
    {
        id: 4,
        name: 'Modern Luxury Wedding',
        category: 'wedding',
        emoji: '✨',
        colors: {
            bg: '#1a1a2e',
            primary: '#00D9FF',
            text: '#FFFFFF'
        },
        defaults: {
            hostName: 'Couple Names',
            eventTitle: 'Wedding Reception',
            date: '2024-07-12',
            time: '20:00',
            venue: 'Downtown Event Center',
            description: 'Celebrate love and elegance with us at our wedding',
            contactNumber: '+1 (555) 246-8135'
        }
    },
    {
        id: 5,
        name: 'Kids Birthday',
        category: 'birthday',
        emoji: '🎂',
        colors: {
            bg: '#FFB6C1',
            primary: '#FF1493',
            text: '#FFFFFF'
        },
        defaults: {
            hostName: 'Parent Name',
            eventTitle: 'Birthday Party',
            date: '2024-09-15',
            time: '14:00',
            venue: 'Fun Park',
            description: 'Join us for a day of fun, games, and celebration!',
            contactNumber: '+1 (555) 111-2222'
        }
    },
    {
        id: 6,
        name: 'Adult Birthday',
        category: 'birthday',
        emoji: '🎉',
        colors: {
            bg: '#2C3E50',
            primary: '#E74C3C',
            text: '#FFFFFF'
        },
        defaults: {
            hostName: 'Celebrant',
            eventTitle: 'Birthday Celebration',
            date: '2024-10-20',
            time: '19:00',
            venue: 'Venue Address',
            description: 'Let us celebrate another year of wonderful moments together!',
            contactNumber: '+1 (555) 333-4444'
        }
    },
    {
        id: 7,
        name: 'Elegant Birthday',
        category: 'birthday',
        emoji: '👑',
        colors: {
            bg: '#34495E',
            primary: '#F39C12',
            text: '#FFFFFF'
        },
        defaults: {
            hostName: 'Birthday Guest',
            eventTitle: 'Elegant Birthday Soirée',
            date: '2024-08-10',
            time: '18:30',
            venue: 'Upscale Restaurant',
            description: 'You are cordially invited to an elegant birthday celebration',
            contactNumber: '+1 (555) 555-6666'
        }
    },
    {
        id: 8,
        name: 'Anniversary',
        category: 'other',
        emoji: '💕',
        colors: {
            bg: '#8B0000',
            primary: '#FFB6C1',
            text: '#FFFFFF'
        },
        defaults: {
            hostName: 'Couple',
            eventTitle: 'Anniversary Celebration',
            date: '2024-12-25',
            time: '19:00',
            venue: 'Romantic Venue',
            description: 'Join us as we celebrate years of love and togetherness',
            contactNumber: '+1 (555) 777-8888'
        }
    },
    {
        id: 9,
        name: 'Baby Shower',
        category: 'other',
        emoji: '👶',
        colors: {
            bg: '#FFE5CC',
            primary: '#4CAF50',
            text: '#333333'
        },
        defaults: {
            hostName: 'Parents-to-be',
            eventTitle: 'Baby Shower',
            date: '2024-09-30',
            time: '15:00',
            venue: 'Home Sweet Home',
            description: 'Come celebrate the arrival of our little bundle of joy!',
            contactNumber: '+1 (555) 999-0000'
        }
    },
    {
        id: 10,
        name: 'Housewarming',
        category: 'other',
        emoji: '🏠',
        colors: {
            bg: '#87CEEB',
            primary: '#FF8C00',
            text: '#FFFFFF'
        },
        defaults: {
            hostName: 'New Homeowners',
            eventTitle: 'Housewarming Party',
            date: '2024-11-10',
            time: '18:00',
            venue: 'New Home Address',
            description: 'Please join us to celebrate our new home and create new memories!',
            contactNumber: '+1 (555) 123-5678'
        }
    }
];

// Initialize dark mode from localStorage
function initDarkMode() {
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    if (isDarkMode) {
        document.body.classList.add('dark-mode');
        updateDarkModeButton();
    }
}

// Toggle dark mode
function toggleDarkMode() {
    const isDarkMode = document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', isDarkMode);
    updateDarkModeButton();
}

// Update dark mode button appearance
function updateDarkModeButton() {
    const btn = document.getElementById('darkModeToggle');
    if (btn) {
        btn.textContent = document.body.classList.contains('dark-mode') ? '☀️' : '🌙';
    }
}

// Populate templates grid
function populateTemplates(filter = 'all') {
    const grid = document.getElementById('templatesGrid');
    if (!grid) return;

    const filteredTemplates = filter === 'all' 
        ? templates 
        : templates.filter(t => t.category === filter);

    grid.innerHTML = filteredTemplates.map(template => `
        <div class="template-card" onclick="goToEditor(${template.id})">
            <div class="template-preview">${template.emoji}</div>
            <div class="template-info">
                <h3>${template.name}</h3>
                <span class="template-category">${template.category}</span>
            </div>
        </div>
    `).join('');
}

// Navigate to editor with template
function goToEditor(templateId) {
    localStorage.setItem('selectedTemplate', templateId);
    window.location.href = 'editor.html';
}

// Setup filter buttons
function setupFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            filterBtns.forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            const filter = e.target.dataset.filter;
            populateTemplates(filter);
        });
    });
}

// Initialize homepage
function initHomePage() {
    initDarkMode();
    const darkModeToggle = document.getElementById('darkModeToggle');
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', toggleDarkMode);
    }
    populateTemplates();
    setupFilters();
}

// Export templates for editor access
window.getTemplate = (id) => templates.find(t => t.id === id);
window.getAllTemplates = () => templates;

// Run initialization
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initHomePage);
} else {
    initHomePage();
}
