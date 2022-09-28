const OFFSET_TOP = 42;

window.addEventListener('load', () => {
    const canvas = document.querySelector('canvas');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight - OFFSET_TOP;

    const ctx = canvas.getContext('2d');

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

        console.log(event.touches[0]);

        if (event.type == 'mousedown' || event.type == 'mouseup' || event.type == 'mousemove')
            ctx.lineTo(event.clientX, event.clientY - OFFSET_TOP);
        else
            ctx.lineTo(event.touches[0].pageX, event.touches[0].pageY - OFFSET_TOP);

        ctx.stroke();

        // For a smooth line
        ctx.beginPath();

        if (event.type == 'mousedown' || event.type == 'mouseup' || event.type == 'mousemove')
            ctx.moveTo(event.clientX, event.clientY - OFFSET_TOP);
        else
            ctx.moveTo(event.touches[0].pageX, event.touches[0].pageY - OFFSET_TOP);
    };

    canvas.addEventListener('mousedown', (event) => {
        painting = true;

        ctx.beginPath();
        tryDraw(event);
    });

    canvas.addEventListener('touchstart', (event) => {
        painting = true;

        ctx.beginPath();
        tryDraw(event);
    });

    canvas.addEventListener('mouseup', () => {
        painting = false;
    });

    canvas.addEventListener('touchend', () => {
        painting = false;
    });

    canvas.addEventListener('mousemove', tryDraw);
    canvas.addEventListener('touchmove', tryDraw);
});