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

canvas.width = 800;
canvas.height = 400;

openBtn.addEventListener('click', () => {
    modal.style.display = 'flex';
});

closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
});

document.querySelectorAll('.tools button[data-class]').forEach(btn=>{
    btn.addEventListener('click', ()=>{
        currentClass = btn.dataset.class;
    });
});

document.getElementById('clearCanvas').addEventListener('click', ()=>{
    ctx.clearRect(0,0,canvas.width,canvas.height);
    dataPoints = [];
});

canvas.addEventListener('click', e=>{
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ctx.fillStyle = colors[currentClass];
    ctx.beginPath();
    ctx.arc(x,y,5,0,Math.PI*2);
    ctx.fill();

    dataPoints.push({x, y, label: currentClass});
});

document.getElementById('downloadCSV').addEventListener('click', ()=>{
    let csv = "x,y,label\n";
    dataPoints.forEach(p=>{
        csv += `${p.x},${p.y},${p.label}\n`;
    });

    const blob = new Blob([csv], {type:'text/csv'});
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'ml_data.csv';
    a.click();
});

});
