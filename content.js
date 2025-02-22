(function() {
    console.log("Ball Detector Script Loaded");

    function analyzeCanvas() {
        let canvas = document.querySelector("canvas");
        if (!canvas) {
            console.log("Canvas not found!");
            return;
        }

        let ctx = canvas.getContext("2d");
        let imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        let pixels = imgData.data;

        let ballColor = { r: 255, g: 0, b: 0 }; // لون الكرة (غيّره حسب لون الكرة الفعلي)
        let detectedPositions = [];

        for (let i = 0; i < pixels.length; i += 4) {
            let r = pixels[i], g = pixels[i + 1], b = pixels[i + 2];

            if (Math.abs(r - ballColor.r) < 20 && 
                Math.abs(g - ballColor.g) < 20 && 
                Math.abs(b - ballColor.b) < 20) {
                
                let x = (i / 4) % canvas.width;
                let y = Math.floor((i / 4) / canvas.width);
                detectedPositions.push({ x, y });

                if (detectedPositions.length > 500) break; // وقف البحث بعد العثور على نقاط كافية
            }
        }

        if (detectedPositions.length > 0) {
            let minX = Math.min(...detectedPositions.map(p => p.x));
            let minY = Math.min(...detectedPositions.map(p => p.y));

            let marker = document.createElement("div");
            marker.style.position = "absolute";
            marker.style.left = `${minX}px`;
            marker.style.top = `${minY}px`;
            marker.style.width = "20px";
            marker.style.height = "20px";
            marker.style.backgroundColor = "red";
            marker.style.borderRadius = "50%";
            marker.style.zIndex = "9999";
            marker.style.pointerEvents = "none";

            document.body.appendChild(marker);

            console.log(`Ball detected at (${minX}, ${minY})`);
        } else {
            console.log("Ball not found!");
        }
    }

    setInterval(analyzeCanvas, 1000); // تحديث كل ثانية

})();
