const canvas = document.getElementById('bg');
const ctx = canvas.getContext('2d');

function resize(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resize();
window.addEventListener('resize', resize);

let mouse = {x: null, y: null};
window.addEventListener('mousemove', e=>{
    mouse.x = e.x;
    mouse.y = e.y;
});

const colorsDark = ['#4285F4','#EA4335','#FBBC05','#34A853'];
const colorsLight = ['#1a73e8','#ea4335','#fbbc05','#34a853'];

let particles = [];
const PARTICLE_COUNT = 450;
for(let i=0;i<PARTICLE_COUNT;i++){
    particles.push({
        x: Math.random()*canvas.width,
        y: Math.random()*canvas.height,
        dx: (Math.random()-0.5)*0.5,
        dy: (Math.random()-0.5)*0.5,
        size: Math.random()*1.5+0.5
    });
}

function animate(){
    ctx.clearRect(0,0,canvas.width,canvas.height);

    const colors = document.body.classList.contains('light') ? colorsLight : colorsDark;

    particles.forEach(p=>{
        let dist = Math.hypot(p.x-mouse.x, p.y-mouse.y);

        if(dist<150){
            let angle = Math.atan2(mouse.y-p.y, mouse.x-p.x);
            p.x -= Math.cos(angle);
            p.y -= Math.sin(angle);
            p.size = 2.5;
        } else {
            p.x += p.dx;
            p.y += p.dy;
            p.size = 1.2;
        }

        if(p.x<0||p.x>canvas.width) p.dx*=-1;
        if(p.y<0||p.y>canvas.height) p.dy*=-1;

        ctx.beginPath();
        ctx.arc(p.x,p.y,p.size,0,Math.PI*2);
        ctx.fillStyle = colors[Math.floor(Math.random()*4)];
        ctx.fill();
    });

    requestAnimationFrame(animate);
}
animate();

/* Theme toggle */
const toggle = document.getElementById('themeToggle');
toggle.addEventListener('click', ()=>{
    document.body.classList.toggle('light');
    localStorage.setItem('theme',
        document.body.classList.contains('light')?'light':'dark'
    );
});

window.addEventListener('load',()=>{
    if(localStorage.getItem('theme')==='light'){
        document.body.classList.add('light');
    }
});

document.addEventListener("DOMContentLoaded",()=>{

const projectModal = document.getElementById("projectModal");
const projectTitle = document.getElementById("projectTitle");
const projectContent = document.getElementById("projectContent");
const repoLink = document.getElementById("repoLink");
const closeProject = document.getElementById("closeProject");

const readmes = {
    swiggy: `
    <h3>Overview</h3>
    <p>Exploratory Data Analysis on Swiggy sales data.</p>
    <ul>
        <li>Cleaned and processed large dataset</li>
        <li>Visualized trends using Python</li>
        <li>Identified revenue drivers</li>
    </ul>
    <h3>Tech Stack</h3>
    <p>Python, Pandas, Matplotlib, Seaborn</p>
    `,

    student: `
    <h3>Overview</h3>
    <p>Machine learning model predicting student productivity & burnout.</p>
    <ul>
        <li>Data preprocessing</li>
        <li>Feature engineering</li>
        <li>Model training & evaluation</li>
    </ul>
    <h3>Algorithms Used</h3>
    <p>Logistic Regression, Random Forest</p>
    `
};

const repos = {
    swiggy: "https://github.com/priyanshu637551/Swiggy_sales_analysis",
    student: "https://github.com/priyanshu637551/Student-Burnout-and-Productivity-predictor"
};

document.querySelectorAll(".openProject").forEach(btn=>{
    btn.addEventListener("click",(e)=>{
        e.preventDefault();
        const key = btn.dataset.readme;

        projectTitle.textContent = btn.dataset.title;
        projectContent.innerHTML = readmes[key];
        repoLink.href = repos[key];

        projectModal.style.display="flex";
    });
});

closeProject.addEventListener("click",()=>{
    projectModal.style.display="none";
});

});


