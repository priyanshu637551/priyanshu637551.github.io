const canvas = document.getElementById('bg');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];
let mouse = {x: null, y: null};

const colors = ['#4285F4','#EA4335','#FBBC05','#34A853'];

window.addEventListener('mousemove', e => {
    mouse.x = e.x;
    mouse.y = e.y;
});

for(let i=0;i<350;i++){
    particles.push({
        x: Math.random()*canvas.width,
        y: Math.random()*canvas.height,
        size: Math.random()*1.5 + 0.5,
        dx: (Math.random()-0.5)*0.6,
        dy: (Math.random()-0.5)*0.6,
        color: colors[Math.floor(Math.random()*colors.length)]
    });
}

function animate(){
    ctx.clearRect(0,0,canvas.width,canvas.height);

    particles.forEach(p=>{
        let dist = Math.hypot(p.x - mouse.x, p.y - mouse.y);

        if(dist < 180){
            let angle = Math.atan2(mouse.y - p.y, mouse.x - p.x);
            p.x += Math.cos(angle) * 1.2;
            p.y += Math.sin(angle) * 1.2;
            p.size = 2.8;
        } else {
            p.x += p.dx;
            p.y += p.dy;
            p.size = 1.2;
        }

        if(p.x<0 || p.x>canvas.width) p.dx *= -1;
        if(p.y<0 || p.y>canvas.height) p.dy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI*2);
        ctx.fillStyle = p.color;
        ctx.fill();
    });

    requestAnimationFrame(animate);
}

animate();

window.addEventListener('resize',()=>{
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});
