function findBall() {
    const canvas = document.querySelector("canvas"); // العثور على عنصر الـ Canvas
    if (!canvas) {
        console.log("❌ لم يتم العثور على الـ Canvas");
        return;
    }

    const ctx = canvas.getContext("2d");
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const pixels = imageData.data;

    let ballPositions = [];

    // البحث عن اللون المميز للكرة
    for (let i = 0; i < pixels.length; i += 4) {
        let r = pixels[i];
        let g = pixels[i + 1];
        let b = pixels[i + 2];

        if (r === 255 && g === 0 && b === 0) { // مثال: إذا كانت الكرة حمراء
            let x = (i / 4) % canvas.width;
            let y = Math.floor(i / 4 / canvas.width);
            ballPositions.push({ x, y });
        }
    }

    if (ballPositions.length > 0) {
        console.log("✅ تم العثور على الكرة:", ballPositions);
        highlightBall(ballPositions);
    } else {
        console.log("⚠️ لم يتم العثور على الكرة");
    }
}

function highlightBall(positions) {
    positions.forEach(({ x, y }) => {
        const marker = document.createElement("div");
        marker.style.position = "absolute";
        marker.style.left = `${x}px`;
        marker.style.top = `${y}px`;
        marker.style.width = "20px";
        marker.style.height = "20px";
        marker.style.backgroundColor = "rgba(255, 0, 0, 0.5)";
        marker.style.border = "2px solid white";
        marker.style.borderRadius = "50%";
        marker.style.pointerEvents = "none";
        marker.style.zIndex = "9999";

        document.body.appendChild(marker);
    });
}

// تشغيل البحث بعد تحميل الصفحة
setInterval(findBall, 500);
