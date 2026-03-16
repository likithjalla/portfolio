// app.js

// Initialize Lucide Icons
lucide.createIcons();

// Custom Cursor
const cursorDot = document.getElementById('cursor-dot');
const cursorOutline = document.getElementById('cursor-outline');

window.addEventListener('mousemove', (e) => {
    const x = e.clientX;
    const y = e.clientY;

    cursorDot.style.left = `${x}px`;
    cursorDot.style.top = `${y}px`;

    // Slight delay mimicking lerp for outline
    setTimeout(() => {
        cursorOutline.style.left = `${x}px`;
        cursorOutline.style.top = `${y}px`;
    }, 50);
});

document.addEventListener('mousedown', () => {
    cursorDot.style.transform = 'translate(-50%, -50%) scale(0.8)';
    cursorOutline.style.transform = 'translate(-50%, -50%) scale(0.5)';
});

document.addEventListener('mouseup', () => {
    cursorDot.style.transform = 'translate(-50%, -50%) scale(1)';
    cursorOutline.style.transform = 'translate(-50%, -50%) scale(1)';
});

// Add hover effect for interactables
const interactables = document.querySelectorAll('a, button, input, textarea, .cursor-pointer, .group');
interactables.forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursorOutline.style.transform = 'translate(-50%, -50%) scale(1.8)';
        cursorOutline.style.opacity = '0.8';
        cursorDot.style.transform = 'translate(-50%, -50%) scale(1.5)';
    });
    el.addEventListener('mouseleave', () => {
        cursorOutline.style.transform = 'translate(-50%, -50%) scale(1)';
        cursorOutline.style.opacity = '0.5';
        cursorDot.style.transform = 'translate(-50%, -50%) scale(1)';
    });
});

// Three.js Data Sphere
const canvas = document.getElementById('hero-canvas');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

camera.position.z = 3;

// Create Particles
const particlesGeometry = new THREE.BufferGeometry();
const particlesCount = 3000;
const posArray = new Float32Array(particlesCount * 3);

for (let i = 0; i < particlesCount * 3; i++) {
    // Spherical distribution
    const theta = Math.random() * 2 * Math.PI;
    const phi = Math.acos((Math.random() * 2) - 1);
    const radius = 1.5;

    const x = radius * Math.sin(phi) * Math.cos(theta);
    const y = radius * Math.sin(phi) * Math.sin(theta);
    const z = radius * Math.cos(phi);

    if (i % 3 === 0) {
        posArray[i] = x;
        posArray[i + 1] = y;
        posArray[i + 2] = z;
    }
}

particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
const material = new THREE.PointsMaterial({
    size: 0.015,
    color: 0x0ea5e9,
    transparent: true,
    opacity: 0.8,
    blending: THREE.AdditiveBlending
});

const particlesMesh = new THREE.Points(particlesGeometry, material);
particlesMesh.rotation.x = Math.PI / 4;
scene.add(particlesMesh);

// Animation Loop
const clock = new THREE.Clock();

function animate() {
    requestAnimationFrame(animate);
    const elapsedTime = clock.getElapsedTime();

    particlesMesh.rotation.y = elapsedTime * 0.1;
    particlesMesh.rotation.x = (Math.PI / 4) + (elapsedTime * 0.05);

    renderer.render(scene, camera);
}
animate();

// Resize Handler
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});


// DATA INJECTION (Normally via framework)

// Skills Data
const skillsData = [
    { cat: "Programming", items: ["Python", "C++", "C"], color: "from-blue-400 to-cyan-500", icon: "P" },
    { cat: "Web", items: ["HTML", "CSS", "JavaScript"], color: "from-purple-400 to-pink-500", icon: "W" },
    { cat: "Data Tools", items: ["Power BI", "Tableau", "Excel", "Pandas"], color: "from-green-400 to-emerald-500", icon: "D" },
    { cat: "Technologies", items: ["Git", "GitHub", "Figma"], color: "from-orange-400 to-amber-500", icon: "T" },
];

const skillsContainer = document.getElementById('skills-grid');
skillsData.forEach(skill => {
    const group = document.createElement('div');
    group.className = "glass-card p-6 flex flex-col items-center hover:-translate-y-2 cursor-pointer";

    let pills = skill.items.map(item => `<div class="px-4 py-2 rounded-full border border-white/10 bg-white/5 text-sm font-medium text-gray-300 hover:text-white hover:border-accent/50 hover:bg-accent/10 hover:shadow-[0_0_15px_rgba(14,165,233,0.3)] transition-all">${item}</div>`).join('');

    group.innerHTML = `
        <div class="w-12 h-12 rounded-lg bg-gradient-to-br ${skill.color} mb-6 flex items-center justify-center shadow-lg">
            <div class="w-full h-full bg-black/50 backdrop-blur-sm rounded-lg flex items-center justify-center">
                <span class="text-white font-bold text-xl">${skill.icon}</span>
            </div>
        </div>
        <h3 class="text-xl font-semibold mb-6 text-center text-white border-b border-white/10 pb-4 w-full">${skill.cat}</h3>
        <div class="flex flex-wrap gap-3 justify-center">${pills}</div>
    `;
    skillsContainer.appendChild(group);
});


// Projects Data
const projects = [
    {
        id: 1, title: "Airline Delay Analysis",
        desc: "Interactive data visualization dashboard analyzing historical flight data. Highlights key performance indicators (KPIs) and identifies primary factors contributing to airline delays using advanced filtering.",
        img: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=2074&auto=format&fit=crop",
        tags: ["Power BI", "Data Visualization", "SQL"],
        features: ["KPI metrics modeling", "Interactive delay analysis mapping", "Real-time filtering"],
        github: "https://github.com/likithjalla/Air-flight-delay-analysis-dashboard.git"
    },
    {
        id: 2, title: "Food Delivery Optimizer",
        desc: "An algorithmic solution designed to optimize delivery routes for multi-stop food delivery services, minimizing total travel time and improving efficiency.",
        img: "https://images.unsplash.com/photo-1526367790999-0150786686a2?q=80&w=2071&auto=format&fit=crop",
        tags: ["C++", "Dijkstra's Algorithm"],
        features: ["Shortest path calculation", "Dynamic node weighting", "Performance optimized"],
        github: "https://github.com/likithjalla/Food-delivery-optimizer.git"
    },
    {
        id: 3, title: "Real-Fake Job Posting Prediction",
        desc: "A machine learning pipeline that identifies and classifies fraudulent job postings from authentic ones to ensure platform integrity and user safety.",
        img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop",
        tags: ["Python", "Machine Learning", "NLP"],
        features: ["Text classification using NLP", "Automated data cleaning", "High-accuracy predictive model"],
        github: "https://github.com/likithjalla/Real-Fake-Job-Posting-Prediction.git"
    }
];

const projectsContainer = document.getElementById('projects-grid');
projects.forEach(p => {
    const card = document.createElement('div');
    card.className = "group relative glass rounded-2xl overflow-hidden border border-white/10 hover:border-accent/50 transition-all duration-500 cursor-pointer flex flex-col h-[400px]";
    card.innerHTML = `
        <div class="relative h-48 w-full overflow-hidden shrink-0">
            <div class="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-all z-10 duration-500"></div>
            <img src="${p.img}" alt="${p.title}" class="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-in-out"/>
            <div class="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-accent to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 z-20 origin-left"></div>
        </div>
        <div class="p-6 flex flex-col flex-grow bg-gradient-to-b from-black/80 to-black backdrop-blur-md">
            <div class="flex gap-2 mb-3 flex-wrap">
                ${p.tags.map(t => `<span class="text-[10px] font-mono text-accent bg-accent/10 px-2 py-1 rounded-sm">${t}</span>`).join('')}
            </div>
            <h3 class="text-xl font-bold text-white mb-2 group-hover:text-accent transition-colors">${p.title}</h3>
            <p class="text-gray-400 text-sm line-clamp-3 mb-4">${p.desc}</p>
            <div class="mt-auto flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span class="text-sm text-white font-medium flex items-center gap-2">View Details <i data-lucide="external-link" class="w-4 h-4"></i></span>
            </div>
        </div>
    `;
    card.onclick = () => openModal(p);
    projectsContainer.appendChild(card);
});

// Modal Logic
const modal = document.getElementById('project-modal');
function openModal(project) {
    modal.innerHTML = `
        <div class="bg-gray-900 border border-white/10 rounded-2xl overflow-hidden max-w-4xl w-full max-h-[90vh] flex flex-col md:flex-row shadow-[0_0_50px_rgba(0,0,0,0.5)] transform scale-95 opacity-0 transition-all duration-300" id="modal-content">
            <div class="w-full md:w-1/2 h-64 md:h-auto relative">
                <img src="${project.img}" class="w-full h-full object-cover"/>
                <div class="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-l from-gray-900 to-transparent"></div>
            </div>
            <div class="w-full md:w-1/2 p-8 md:p-10 flex flex-col justify-center relative overflow-y-auto">
                <button onclick="closeModal()" class="absolute top-4 right-4 p-2 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors cursor-pointer z-50">
                    <i data-lucide="x" class="w-5 h-5"></i>
                </button>
                <h3 class="text-3xl font-bold text-white mb-2 pr-8">${project.title}</h3>
                <div class="flex gap-2 mb-6 flex-wrap">
                    ${project.tags.map(t => `<span class="text-xs font-mono text-accent border border-accent/30 bg-accent/10 px-3 py-1 rounded-full">${t}</span>`).join('')}
                </div>
                <p class="text-gray-300 text-base leading-relaxed mb-6 font-light">${project.desc}</p>
                <h4 class="text-white font-semibold mb-3 flex items-center gap-2">Key Features</h4>
                <ul class="space-y-2 mb-8 text-gray-400 text-sm">
                    ${project.features.map(f => `<li class="flex items-start gap-2"><span class="text-accent mt-0.5">▹</span> ${f}</li>`).join('')}
                </ul>
                <div class="flex gap-4 mt-auto">
                    <a href="${project.github}" target="_blank" class="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-md border border-white/20 flex items-center gap-2 font-medium text-sm transition-colors cursor-pointer"><i data-lucide="github" class="w-4 h-4"></i> Code</a>
                    <button class="bg-accent hover:bg-sky-500 text-white px-4 py-2 rounded-md shadow-[0_0_15px_rgba(14,165,233,0.3)] flex items-center gap-2 font-medium text-sm transition-colors cursor-pointer"><i data-lucide="external-link" class="w-4 h-4"></i> Live Demo</button>
                </div>
            </div>
        </div>
    `;
    lucide.createIcons();
    modal.classList.add('active');
    setTimeout(() => {
        document.getElementById('modal-content').classList.remove('scale-95', 'opacity-0');
        document.getElementById('modal-content').classList.add('scale-100', 'opacity-100');
    }, 10);
}

function closeModal() {
    document.getElementById('modal-content').classList.remove('scale-100', 'opacity-100');
    document.getElementById('modal-content').classList.add('scale-95', 'opacity-0');
    setTimeout(() => {
        modal.classList.remove('active');
    }, 300);
}
modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
});


// Certs Data
const certs = [
    { title: "Master Generative AI Tools", issuer: "Udemy", year: "2024", skills: ["Generative AI", "LLMs"], link: "https://drive.google.com/file/d/1Cnw8xrF1DTiAtjo-XFCMHqTWZA-QnkBC/view?usp=drive_link" },
    { title: "Computational Theory", issuer: "NPTEL", year: "2024", skills: ["Automata", "Complexity"], link: "https://drive.google.com/file/d/1Eqbo30rmWbYd7v52TkvP2dJJeouBuDNS/view?usp=drive_link" },
    { title: "Build Generative AI Apps", issuer: "Coursera", year: "2024", skills: ["LangChain", "OpenAI APIs"], link: "https://drive.google.com/file/d/1gmW2e6dPpXlVSkxgc2fmL0CDYjy2G3M3/view?usp=drive_link" },
    { title: "Data Structures & Algorithms", issuer: "GeeksforGeeks", year: "2023", skills: ["C++", "DSA"], link: "https://drive.google.com/file/d/1irnBvA0BXbtkacts8nwo5ITRl-VyXoET/view?usp=drive_link" }
];
const certContainer = document.getElementById('certs-grid');
certs.forEach(cert => {
    const el = document.createElement('div');
    el.className = "cert-card relative h-80 rounded-2xl cursor-pointer";
    el.innerHTML = `
        <div class="cert-card-inner">
            <div class="cert-card-front glass-card p-6 flex flex-col items-center justify-center text-center rounded-2xl">
                <i data-lucide="award" class="w-16 h-16 text-accent mb-6 opacity-80"></i>
                <h3 class="text-xl font-bold text-white mb-2 leading-tight">${cert.title}</h3>
                <p class="text-gray-400 font-mono text-sm">${cert.issuer}</p>
            </div>
            <div class="cert-card-back glass-card bg-accent/10 border-accent/50 p-6 flex flex-col items-center justify-center text-center rounded-2xl">
                <h4 class="text-lg font-bold text-white mb-4 border-b border-white/20 pb-2 w-full">Details</h4>
                <div class="flex flex-wrap gap-2 justify-center mb-6">
                    ${cert.skills.map(s => `<span class="text-xs bg-black/50 text-gray-300 px-2 py-1 rounded-sm">${s}</span>`).join('')}
                </div>
                <span class="text-accent font-mono text-sm mb-4">Issued: ${cert.year}</span>
                <a href="${cert.link || '#'}" ${cert.link ? 'target="_blank"' : ''} class="mt-auto px-4 py-2 border border-accent text-accent hover:bg-accent hover:text-white rounded-full transition-colors flex items-center gap-2 text-sm font-medium z-10 cursor-pointer">Verify <i data-lucide="external-link" class="w-4 h-4"></i></a>
            </div>
        </div>
    `;
    certContainer.appendChild(el);
});



// Re-init lucide for injected stuff
lucide.createIcons();

// GSAP Animations
gsap.registerPlugin(ScrollTrigger);

// Hero Sequence
gsap.fromTo('.gsap-hero-fade',
    { y: 30, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.8, stagger: 0.2, ease: "power2.out", delay: 0.2 }
);

// Fade up sections
const fadeSections = document.querySelectorAll('.gsap-fade-up');
fadeSections.forEach(sec => {
    gsap.fromTo(sec,
        { y: 50, opacity: 0 },
        {
            y: 0, opacity: 1, duration: 0.8, ease: "power2.out",
            scrollTrigger: {
                trigger: sec,
                start: "top 80%",
                toggleActions: "play none none none"
            }
        }
    );
});

// Counter Animation logic
const counters = document.querySelectorAll('.counter');
counters.forEach(counter => {
    ScrollTrigger.create({
        trigger: counter,
        start: "top 85%",
        once: true,
        onEnter: () => {
            const target = parseInt(counter.getAttribute('data-target'));
            let count = 0;
            const inc = target / 60; // 60 frames assumption
            const updateCount = () => {
                count += inc;
                if (count < target) {
                    counter.innerText = Math.ceil(count) + "+";
                    requestAnimationFrame(updateCount);
                } else {
                    counter.innerText = target + "+";
                }
            };
            updateCount();
        }
    });
});



// Form Submission Simulation
document.getElementById('contact-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = document.getElementById('submit-btn');
    const originalText = btn.innerHTML;

    btn.innerHTML = `<div class="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>`;

    setTimeout(() => {
        btn.innerHTML = `Message Sent Successfully`;
        btn.classList.remove('bg-accent');
        btn.classList.add('bg-green-500');
        e.target.reset();

        setTimeout(() => {
            btn.innerHTML = originalText;
            btn.classList.add('bg-accent');
            btn.classList.remove('bg-green-500');
        }, 3000);
    }, 1500);
});

// Quick pulse CSS addition dynamically
const style = document.createElement('style');
style.innerHTML = `
@keyframes pulse-op {
    0%, 100% { background-color: rgba(168, 85, 247, 0.2); box-shadow: 0 0 0px rgba(168, 85, 247, 0); }
    50% { background-color: rgba(168, 85, 247, 0.8); box-shadow: 0 0 15px rgba(168, 85, 247, 0.8); }
}
`;
document.head.appendChild(style);
