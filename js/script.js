const projectsData = {
    'REVISST': {
        id: 'REVISST',
        title: 'Application de révision SST',
        subtitle: 'Application desktop JavaFX',
        date: '2025',
        status: 'Terminé',
        description: `
            <p>Application desktop développée en JavaFX pour la révision des situations et pictogrammes destinée aux Sauveteurs Secouristes du Travail (SST).</p>
            <p>Le projet a été développé en suivant une architecture MVC stricte, garantissant une séparation claire entre les différentes couches de l'application.</p>
            <img src="./images/GrilleRevisst.png" alt="Capture d'écran de l'application" class="modal-image">
            <p>Voici un exemple de structure de données utilisée pour stocker les scores :</p>
            <div class="code-header">Extrait du code <span class="code-lang">JSON</span></div>
            <pre class="modal-code-block">{
"utilisateur": "Dorian",
"score": 1500,
"mode": "Pictogrammes",
"date": "2024-01-15"
}</pre>
        `,
        features: [
            'Gestion des utilisateurs et scores',
            'Plusieurs modes de jeu',
            'Persistance des données en JSON',
            'Interface intuitive JavaFX'
        ],
        techStack: ['Java', 'JavaFX', 'JSON', 'SceneBuilder'],
        links: {
            github: 'https://github.com/Rodez-IUT/2025-2026-but2-sae-s3-java-ga5'
        }
    },
    'Wemember': {
        id: 'Wemember',
        title: 'Application de gestion d\'association',
        subtitle: 'Site web dynamique PHP',
        date: '2025',
        status: 'Terminé',
        description: `
            <p>Plateforme web collaborative avec système d'authentification, gestion des utilisateurs et tableau de bord administrateur.</p>
            <p>L'application intègre un système complet de gestion des rôles avec différents niveaux de permissions.</p>
            <p>Gestion complète des documents uploadés sur l'application par des utilisateurs, avec possibilité d'exporter les données au format PDF.</p>
            <img src="./images/AccueilWemember.png" alt="Dashboard" class="modal-image">
        `,
        features: [
            'Authentification sécurisée',
            'Gestion des rôles',
            'Tableau de bord admin',
            'Responsive design',
            'Gestion des documents'
        ],
        techStack: ['PHP', 'PHP My Admin', 'Uniform Server'],
        links: {
            github: 'https://github.com/Rodez-IUT/2025-2026-but2-sae-s3-web-ga5',
            demo: 'https://wemember.alwaysdata.net/'
        }
    },
    'api-rest': {
        id: 'api-rest',
        title: 'API RESTful',
        subtitle: 'Backend PHP',
        date: '2025',
        status: 'En développement',
        description: `
            <p>Backend API développé en PHP utilisant CURL pour les requêtes HTTP externes.</p>
            <p>Structure principale du contrôleur API :</p>
            <div class="code-header">Extrait du code <span class="code-lang">PHP</span></div>
            <pre class="modal-code-block">&lt;?php
class APIController {
public function getRequest($url) {
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
$response = curl_exec($ch);
curl_close($ch);
return json_decode($response, true);
}
}
?&gt;</pre>
        `,
        features: [
            'Requêtes GET/POST/PUT/DELETE',
            'Format JSON',
            'Gestion des erreurs'
        ],
        techStack: ['PHP', 'CURL', 'JSON'],
        links: {
            'Aucun lien pour le moment' : '#'}
    }
};

// ============================================
// VARIABLES
// ============================================

let lastScrollY = window.scrollY;
let ticking = false;
const nav = document.querySelector('nav');
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const sections = document.querySelectorAll('section');
const projectCards = document.querySelectorAll('.project-card');
const scrollProgress = document.querySelector('.scroll-progress');
const navItems = document.querySelectorAll('.nav-links li');
const projectModal = document.getElementById('project-modal');

// ============================================
// PROJECT MODAL
// ============================================

function openProjectModal(projectId) {
    const project = projectsData[projectId];
    if (!project) return;

    let featuresHtml = '';
    project.features.forEach(function(feature) {
        featuresHtml += '<li>' + feature + '</li>';
    });

    let techStackHtml = '';
    project.techStack.forEach(function(tech) {
        techStackHtml += '<span class="tech-badge">' + tech + '</span>';
    });

    let linksHtml = '';
    if (project.links.github) {
        linksHtml += `
            <a href="${project.links.github}" class="modal-resource-link" target="_blank" rel="noopener">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
                </svg>
                <div class="modal-resource-info">
                    <span class="modal-resource-title">Code source</span>
                    <span class="modal-resource-type">GitHub</span>
                </div>
            </a>
        `;
    }
    if (project.links.demo) {
        linksHtml += `
            <a href="${project.links.demo}" class="modal-resource-link" target="_blank" rel="noopener">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="10"/>
                    <line x1="2" y1="12" x2="22" y2="12"/>
                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
                </svg>
                <div class="modal-resource-info">
                    <span class="modal-resource-title">Démo en ligne</span>
                    <span class="modal-resource-type">Site web</span>
                </div>
            </a>
        `;
    }

    document.getElementById('modal-content').innerHTML = `
        <div class="modal-header">
            <div class="modal-breadcrumb">Projets / ${project.title}</div>
            <h2 class="modal-title">${project.title}</h2>
            <p style="color: var(--fg-muted); margin-bottom: 1rem;">${project.subtitle}</p>
            <div class="modal-meta">
                <div class="modal-meta-item">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                        <line x1="16" y1="2" x2="16" y2="6"/>
                        <line x1="8" y1="2" x2="8" y2="6"/>
                        <line x1="3" y1="10" x2="21" y2="10"/>
                    </svg>
                    ${project.date}
                </div>
                <div class="modal-meta-item">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <circle cx="12" cy="12" r="10"/>
                        <polyline points="12 6 12 12 16 14"/>
                    </svg>
                    ${project.status}
                </div>
            </div>
        </div>
        <div class="modal-body">
            <div class="modal-main">
                <div class="modal-section">
                    <h4 class="modal-section-title">Description</h4>
                    <div class="modal-description">
                        ${project.description}
                    </div>
                </div>
                <div class="modal-section">
                    <h4 class="modal-section-title">Fonctionnalités</h4>
                    <ul class="modal-features">
                        ${featuresHtml}
                    </ul>
                </div>
            </div>
            <div class="modal-sidebar">
                <div class="modal-tech-stack">
                    <h4 class="modal-section-title">Technologies</h4>
                    <div class="tech-stack-grid">
                        ${techStackHtml}
                    </div>
                </div>
                <div class="modal-resources">
                    <h4 class="modal-section-title">Liens</h4>
                    ${linksHtml}
                </div>
            </div>
        </div>
    `;

    projectModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    projectModal.classList.remove('active');
    document.body.style.overflow = '';
}

// Project card click handlers
projectCards.forEach(function(card) {
    card.addEventListener('click', function() {
        const projectId = this.getAttribute('data-project');
        openProjectModal(projectId);
    });
});

// Close modal on escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeModal();
    }
});

// Close modal on background click
projectModal.addEventListener('click', function(e) {
    if (e.target === projectModal) {
        closeModal();
    }
});

// ============================================
// SCROLL & NAVIGATION
// ============================================

// Typing effect
const typingText = document.querySelector('.typing-text');
const textToType = 'Etudiant en IUT Informatique';
let charIndex = 0;

function typeText() {
    if (charIndex < textToType.length) {
        typingText.textContent += textToType.charAt(charIndex);
        charIndex++;
        setTimeout(typeText, 50);
    }
}

setTimeout(typeText, 500);

// Scroll progress
function updateScrollProgress() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = Math.min(scrollTop / docHeight, 1);
    scrollProgress.style.transform = 'scaleX(' + progress + ')';
}

// Navigation hide/show
function updateNav() {
    const currentScrollY = window.scrollY;
    if (currentScrollY > lastScrollY && currentScrollY > 100) {
        nav.classList.add('nav-hidden');
    } else {
        nav.classList.remove('nav-hidden');
    }
    lastScrollY = currentScrollY;
    ticking = false;
}

// Active section detection
function updateActiveSection() {
    let currentSection = 'hero';
    sections.forEach(function(section) {
        const sectionTop = section.offsetTop - 200;
        const sectionBottom = sectionTop + section.offsetHeight;
        if (window.scrollY >= sectionTop && window.scrollY < sectionBottom) {
            currentSection = section.getAttribute('id');
        }
    });
    navItems.forEach(function(item) {
        item.classList.remove('active');
        const link = item.querySelector('a');
        if (link && link.getAttribute('href') === '#' + currentSection) {
            item.classList.add('active');
        }
    });
}

window.addEventListener('scroll', function() {
    updateScrollProgress();
    updateActiveSection();
    if (!ticking) {
        requestAnimationFrame(updateNav);
        ticking = true;
    }
});

// Mobile menu
menuToggle.addEventListener('click', function() {
    const isExpanded = this.getAttribute('aria-expanded') === 'true';
    this.setAttribute('aria-expanded', !isExpanded);
    navLinks.classList.toggle('active');
});

navLinks.querySelectorAll('a').forEach(function(link) {
    link.addEventListener('click', function() {
        navLinks.classList.remove('active');
        menuToggle.setAttribute('aria-expanded', 'false');
    });
});

// Intersection Observer
const sectionObserver = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

sections.forEach(function(section) {
    sectionObserver.observe(section);
});

const cardObserver = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry, index) {
        if (entry.isIntersecting) {
            setTimeout(function() {
                entry.target.classList.add('visible');
            }, index * 100);
        }
    });
}, { threshold: 0.1 });

projectCards.forEach(function(card) {
    cardObserver.observe(card);
});

const skillRows = document.querySelectorAll('.skill-row');
const skillObserver = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry, index) {
        if (entry.isIntersecting) {
            setTimeout(function() {
                entry.target.classList.add('visible');
            }, index * 80);
        }
    });
}, { threshold: 0.2 });

skillRows.forEach(function(row) {
    skillObserver.observe(row);
});

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        e.preventDefault();
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const navHeight = nav.offsetHeight;
            const targetPosition = targetElement.offsetTop - navHeight;
            window.scrollTo({ top: targetPosition, behavior: 'smooth' });
        }
    });
});

// Hero animation on load
window.addEventListener('load', function() {
    document.querySelector('#hero').classList.add('visible');
});

// Footer time
function updateTime() {
    const now = new Date();
    const options = { hour: '2-digit', minute: '2-digit', year: 'numeric' };
    const timeString = now.toLocaleDateString('fr-FR', options).replace(',', ' -');
    document.querySelector('.footer-time').textContent = timeString;
}
updateTime();
setInterval(updateTime, 60000);