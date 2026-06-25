// Template data
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
        }
    },
    {
        id: 3,
        name: 'Traditional Indian',
        category: 'wedding',
        emoji: '🎊',
        colors: {
            bg: '#8B0000',
            primary: '#FFD700',
            text: '#FFFFFF'
        }
    },
    {
        id: 4,
        name: 'Modern Luxury',
        category: 'wedding',
        emoji: '✨',
        colors: {
            bg: '#1a1a2e',
            primary: '#00D9FF',
            text: '#FFFFFF'
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
        }
    }
];

// State management
let currentState = {
    templateId: 1,
    hostName: 'John & Sarah',
    eventTitle: 'Wedding Ceremony',
    eventDate: new Date().toISOString().split('T')[0],
    eventTime: '18:00',
    venue: 'Grand Hotel',
    description: 'Join us to celebrate our special day',
    contact: '+1 (555) 123-4567',
    fontFamily: 'Arial',
    fontSize: 32,
    textColor: '#FFFFFF',
    bgColor: '#667EEA',
    bgImage: null
};

let draggedImage = null;

// Initialize dark mode
function initDarkMode() {
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    if (isDarkMode) {
        document.body.classList.add('dark-mode');
        updateDarkModeButton();
    }
}

function toggleDarkMode() {
    const isDarkMode = document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', isDarkMode);
    updateDarkModeButton();
}

function updateDarkModeButton() {
    const btn = document.getElementById('darkModeToggle');
    if (btn) {
        btn.textContent = document.body.classList.contains('dark-mode') ? '☀️' : '🌙';
    }
}

// Initialize templates
function initTemplates() {
    const selector = document.getElementById('templateSelector');
    selector.innerHTML = templates.map(t => `
        <button class="template-option ${t.id === 1 ? 'active' : ''}" data-template-id="${t.id}" title="${t.name}">
            ${t.emoji}
            <div style="font-size: 0.7rem; margin-top: 0.25rem;">${t.name.substring(0, 10)}</div>
        </button>
    `).join('');

    selector.addEventListener('click', (e) => {
        const btn = e.target.closest('.template-option');
        if (btn) {
            selectTemplate(parseInt(btn.dataset.templateId));
        }
    });
}

function selectTemplate(templateId) {
    const template = templates.find(t => t.id === templateId);
    if (!template) return;

    currentState.templateId = templateId;
    currentState.bgColor = template.colors.bg;
    currentState.textColor = template.colors.text;

    document.getElementById('bgColor').value = template.colors.bg;
    document.getElementById('textColor').value = template.colors.text;

    // Update active state
    document.querySelectorAll('.template-option').forEach(btn => {
        btn.classList.toggle('active', parseInt(btn.dataset.templateId) === templateId);
    });

    updatePreview();
}

// Setup event listeners
function setupEventListeners() {
    // Text inputs
    document.getElementById('hostName').addEventListener('input', (e) => {
        currentState.hostName = e.target.value;
        updatePreview();
    });

    document.getElementById('eventTitle').addEventListener('input', (e) => {
        currentState.eventTitle = e.target.value;
        updatePreview();
    });

    document.getElementById('eventDate').addEventListener('change', (e) => {
        currentState.eventDate = e.target.value;
        updatePreview();
    });

    document.getElementById('eventTime').addEventListener('change', (e) => {
        currentState.eventTime = e.target.value;
        updatePreview();
    });

    document.getElementById('venue').addEventListener('input', (e) => {
        currentState.venue = e.target.value;
        updatePreview();
    });

    document.getElementById('description').addEventListener('input', (e) => {
        currentState.description = e.target.value;
        updatePreview();
    });

    document.getElementById('contact').addEventListener('input', (e) => {
        currentState.contact = e.target.value;
        updatePreview();
    });

    // Font selection
    document.querySelectorAll('.font-option').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('.font-option').forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            currentState.fontFamily = e.target.dataset.font;
            updatePreview();
        });
    });

    // Font size
    document.getElementById('titleFontSize').addEventListener('input', (e) => {
        currentState.fontSize = parseInt(e.target.value);
        document.getElementById('fontSizeDisplay').textContent = currentState.fontSize;
        updatePreview();
    });

    // Colors
    document.getElementById('textColor').addEventListener('change', (e) => {
        currentState.textColor = e.target.value;
        updatePreview();
    });

    document.getElementById('bgColor').addEventListener('change', (e) => {
        currentState.bgColor = e.target.value;
        updatePreview();
    });

    // Background image
    document.getElementById('bgImage').addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                currentState.bgImage = event.target.result;
                updatePreview();
            };
            reader.readAsDataURL(file);
        }
    });

    // Buttons
    document.getElementById('downloadBtn').addEventListener('click', downloadCard);
    document.getElementById('printBtn').addEventListener('click', printCard);
    document.getElementById('darkModeToggle').addEventListener('click', toggleDarkMode);
}

// Update preview
function updatePreview() {
    const preview = document.getElementById('cardPreview');
    const content = preview.querySelector('.card-content');

    // Update styles
    preview.style.backgroundColor = currentState.bgColor;
    preview.style.color = currentState.textColor;

    // Update background image
    if (currentState.bgImage) {
        let img = preview.querySelector('.card-image');
        if (!img) {
            img = document.createElement('img');
            img.className = 'card-image';
            img.style.opacity = '0.3';
            preview.insertBefore(img, content);
            setupImageDragging(img);
        }
        img.src = currentState.bgImage;
    } else {
        const img = preview.querySelector('.card-image');
        if (img) img.remove();
    }

    // Update text
    document.getElementById('previewHost').textContent = currentState.hostName;
    document.getElementById('previewTitle').textContent = currentState.eventTitle;
    document.getElementById('previewTitle').style.fontFamily = currentState.fontFamily;
    document.getElementById('previewTitle').style.fontSize = currentState.fontSize + 'px';

    // Format date
    if (currentState.eventDate) {
        const date = new Date(currentState.eventDate + 'T00:00:00');
        const formatted = date.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        document.getElementById('previewDate').textContent = '📅 ' + formatted;
    }

    document.getElementById('previewTime').textContent = currentState.eventTime ? '🕐 ' + currentState.eventTime : '🕐 Select a time';
    document.getElementById('previewVenue').textContent = '📍 ' + currentState.venue;
    document.getElementById('previewDescription').textContent = currentState.description;
    document.getElementById('previewContact').textContent = '📞 ' + currentState.contact;

    // Apply font family to all text
    [
        'previewHost',
        'previewTitle',
        'previewDate',
        'previewTime',
        'previewVenue',
        'previewDescription',
        'previewContact'
    ].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.style.fontFamily = currentState.fontFamily;
    });
}

// Image dragging
function setupImageDragging(img) {
    let isDown = false;
    let offset = { x: 0, y: 0 };

    img.addEventListener('mousedown', (e) => {
        isDown = true;
        const rect = img.getBoundingClientRect();
        offset.x = e.clientX - rect.left;
        offset.y = e.clientY - rect.top;
        img.style.cursor = 'grabbing';
        document.getElementById('cardPreview').classList.add('dragging');
    });

    document.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        const preview = document.getElementById('cardPreview');
        const rect = preview.getBoundingClientRect();
        img.style.left = (e.clientX - rect.left - offset.x) + 'px';
        img.style.top = (e.clientY - rect.top - offset.y) + 'px';
    });

    document.addEventListener('mouseup', () => {
        isDown = false;
        img.style.cursor = 'move';
        document.getElementById('cardPreview').classList.remove('dragging');
    });
}

// Download card as PNG
async function downloadCard() {
    try {
        const element = document.getElementById('cardPreview');
        const canvas = await html2canvas(element, {
            backgroundColor: null,
            scale: 2,
            useCORS: true,
            allowTaint: true
        });

        const link = document.createElement('a');
        link.href = canvas.toDataURL('image/png');
        link.download = 'invitation-card.png';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        showMessage('Invitation downloaded successfully!', 'success');
    } catch (error) {
        console.error('Download error:', error);
        showMessage('Failed to download invitation. Please try again.', 'error');
    }
}

// Print card
function printCard() {
    try {
        const preview = document.getElementById('cardPreview');
        const printWindow = window.open('', '_blank');
        const previewClone = preview.cloneNode(true);

        printWindow.document.write(`
            <!DOCTYPE html>
            <html>
            <head>
                <title>Invitation Card</title>
                <style>
                    body {
                        margin: 0;
                        padding: 20px;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        min-height: 100vh;
                        background: #f0f0f0;
                    }
                    .card-preview {
                        width: 800px;
                        height: 600px;
                        border-radius: 1rem;
                        padding: 2rem;
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        align-items: center;
                        text-align: center;
                        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
                        position: relative;
                        overflow: hidden;
                    }
                    .card-image {
                        position: absolute;
                        top: 0;
                        left: 0;
                        width: 100%;
                        height: 100%;
                        object-fit: cover;
                        opacity: 0.3;
                    }
                    .card-content {
                        position: relative;
                        z-index: 2;
                    }
                    @media print {
                        body {
                            background: white;
                            padding: 0;
                        }
                        .card-preview {
                            box-shadow: none;
                        }
                    }
                </style>
            </head>
            <body>
                ${previewClone.outerHTML}
            </body>
            </html>
        `);
        printWindow.document.close();
        printWindow.focus();
        setTimeout(() => printWindow.print(), 250);

        showMessage('Print dialog opened!', 'success');
    } catch (error) {
        console.error('Print error:', error);
        showMessage('Failed to open print dialog. Please try again.', 'error');
    }
}

// Show message
function showMessage(text, type) {
    const messageEl = document.getElementById('message');
    messageEl.textContent = text;
    messageEl.className = `message show ${type}`;
    setTimeout(() => {
        messageEl.classList.remove('show');
    }, 4000);
}

// Initialize on page load
function init() {
    initDarkMode();
    initTemplates();
    setupEventListeners();

    // Set initial date to today
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('eventDate').value = today;
    currentState.eventDate = today;

    // Load from URL parameter if available
    const params = new URLSearchParams(window.location.search);
    const templateId = params.get('template');
    if (templateId) {
        selectTemplate(parseInt(templateId));
    }

    updatePreview();
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}