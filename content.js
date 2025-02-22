function detectBalls() {
    let balls = document.querySelectorAll("div, img"); // البحث عن الكرات
    document.querySelectorAll(".ball-marker").forEach(e => e.remove()); // إزالة العلامات القديمة

    balls.forEach(ball => {
        let rect = ball.getBoundingClientRect();

        if (rect.width > 10 && rect.height > 10) {
            let marker = document.createElement("div");
            marker.classList.add("ball-marker");
            marker.style.position = "absolute";
            marker.style.left = `${rect.left + window.scrollX}px`;
            marker.style.top = `${rect.top + window.scrollY - 20}px`;
            marker.style.width = "20px";
            marker.style.height = "20px";
            marker.style.backgroundColor = "red";
            marker.style.borderRadius = "50%";
            marker.style.border = "2px solid white";
            marker.style.zIndex = "9999";
            document.body.appendChild(marker);
        }
    });
}

setInterval(detectBalls, 500);
