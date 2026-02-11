const canvas = document.getElementById('bg');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];
let mouse = {x: null, y: null};

window.addEventListener('mousemove', e => {
    mouse.x = e.x;
    mouse.y = e.y;
});

for(let i=0;i<200;i++){
    particles.push({
        x: Math.random()*canvas.width,
        y: Math.random()*canvas.height,
        size: Math.random()*2,
        dx: Math.random()-0.5,
        dy: Math.random()-0.5
    });
}

function draw(){
    ctx.clearRect(0,0,canvas.width,canvas.height);

    particles.forEach(p=>{
        let dist = Math.hypot(p.x-mouse.x, p.y-mouse.y);

        if(dist < 150){
            ctx.fillStyle = ['#4285F4','#EA4335','#FBBC05','#34A853'][Math.floor(Math.random()*4)];
            p.size = 3;
        } else {
            ctx.fillStyle = '#888';
            p.size = 1.5;
        }

        p.x += p.dx;
        p.y += p.dy;

        if(p.x<0 || p.x>canvas.width) p.dx*=-1;
        if(p.y<0 || p.y>canvas.height) p.dy*=-1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI*2);
        ctx.fill();
    });

    requestAnimationFrame(draw);
}

draw();
