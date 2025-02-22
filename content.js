function detectBalls() {
    let canvas = document.querySelector("canvas");
    if (!canvas) return;

    let ctx = canvas.getContext("2d");
    let imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let pixels = imgData.data;
    
    let ballColor = { r: 255, g: 0, b: 0 }; // لون الكرات المتوقع (عدّل حسب الحاجة)
    let ballPositions = [];

    for (let y = 0; y < canvas.height; y++) {
        for (let x = 0; x < canvas.width; x++) {
            let index = (y * canvas.width + x) * 4;
            let r = pixels[index], g = pixels[index + 1], b = pixels[index + 2];

            if (Math.abs(r - ballColor.r) < 50 && Math.abs(g - ballColor.g) < 50 && Math.abs(b - ballColor.b) < 50) {
                ballPositions.push({ x, y });
            }
        }
    }

    drawArrows(ballPositions);
}

function drawArrows(positions) {
    document.querySelectorAll(".ball-arrow").forEach(e => e.remove());

    positions.forEach(pos => {
        let arrow = document.createElement("div");
        arrow.classList.add("ball-arrow");
        arrow.style.position = "absolute";
        arrow.style.left = `${pos.x}px`;
        arrow.style.top = `${pos.y - 30}px`;
        arrow.style.width = "20px";
        arrow.style.height = "20px";
        arrow.style.backgroundColor = "red";
        arrow.style.borderRadius = "50%";
        arrow.style.zIndex = "9999";
        document.body.appendChild(arrow);
    });
}

setInterval(detectBalls, 500);
