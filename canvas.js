const OFFSET_TOP = 42;

window.addEventListener('load', () => {
    const canvas = document.querySelector('canvas');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight - OFFSET_TOP;

    const ctx = canvas.getContext('2d');

    // ctx.fillStyle = 'red';
    // ctx.fillRect(100, 50, 100, 150);

    // ctx.strokeStyle = 'blue';
    // ctx.lineWidth = 3;
    // ctx.strokeRect(150, 150, 70, 70);

    // ctx.lineWidth = 3;
    // ctx.strokeStyle = 'red';

    // ctx.beginPath();
    // ctx.moveTo(100, 100);
    // ctx.lineTo(200, 100);
    // ctx.lineTo(150, 200);
    // ctx.closePath();
    // ctx.stroke();

    let painting = false;

    const tryDraw = (event) => {
        if (!painting)
            return;

        ctx.lineWidth = 10;

        const lineWidthInput = document.getElementById('lineWidth');

        if (lineWidthInput) {
            ctx.lineWidth = +lineWidthInput.value;
        }

        const strokeColorInput = document.getElementById('strokeColor');

        ctx.strokeStyle = 'black';

        if (strokeColorInput) {
            ctx.strokeStyle = strokeColorInput.value;
        }

        ctx.lineCap = 'round';
        ctx.lineTo(event.clientX, event.clientY - 42);
        ctx.stroke();

        // For a smooth line
        ctx.beginPath();
        ctx.moveTo(event.clientX, event.clientY - OFFSET_TOP);
    };

    canvas.addEventListener('mousedown', (event) => {
        painting = true;

        ctx.beginPath();
        tryDraw(event);
    });

    canvas.addEventListener('mouseup', () => {
        painting = false;
    });

    canvas.addEventListener('mousemove', tryDraw);
});