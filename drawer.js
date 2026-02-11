document.addEventListener('DOMContentLoaded', () => {

const modal = document.getElementById('drawerModal');
const openBtn = document.getElementById('openDrawer');
const closeBtn = document.getElementById('closeDrawer');
const canvas = document.getElementById('drawArea');
const ctx = canvas.getContext('2d');

let currentClass = 'A';
let dataPoints = [];

const colors = {
    A:'#e74c3c',
    B:'#3498db',
    C:'#2ecc71',
    D:'#f1c40f'
};

function resizeCanvas(){
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    drawGrid();
}

function drawGrid(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.strokeStyle="#ddd";
    ctx.lineWidth=1;

    for(let x=0;x<canvas.width;x+=25){
        ctx.beginPath();
        ctx.moveTo(x,0);
        ctx.lineTo(x,canvas.height);
        ctx.stroke();
    }
    for(let y=0;y<canvas.height;y+=25){
        ctx.beginPath();
        ctx.moveTo(0,y);
        ctx.lineTo(canvas.width,y);
        ctx.stroke();
    }
}

resizeCanvas();
window.addEventListener('resize', resizeCanvas);

openBtn.addEventListener('click', ()=>{
    modal.style.display='flex';
    resizeCanvas();
});

closeBtn.addEventListener('click', ()=>{
    modal.style.display='none';
});

document.querySelectorAll('.tools button[data-class]').forEach(btn=>{
    btn.addEventListener('click', ()=> currentClass = btn.dataset.class);
});

document.getElementById('clearCanvas').addEventListener('click', ()=>{
    drawGrid();
    dataPoints=[];
});

canvas.addEventListener('click', e=>{
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ctx.fillStyle = colors[currentClass];
    ctx.beginPath();
    ctx.arc(x,y,6,0,Math.PI*2);
    ctx.fill();

    dataPoints.push({x, y, label: currentClass});
});

document.getElementById('downloadCSV').addEventListener('click', ()=>{
    if(dataPoints.length===0){
        alert("Draw some points first");
        return;
    }

    const csvRows = ["x,y,label", ...dataPoints.map(p=>`${p.x},${p.y},${p.label}`)];
    const blob = new Blob([csvRows.join("\n")], {type:'text/csv'});
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = 'ml_dataset.csv';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
});

});
