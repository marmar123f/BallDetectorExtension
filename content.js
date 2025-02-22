(function() {
    console.log("Ball Detector Script Loaded");

    function analyzeCanvas() {
        let canvas = document.querySelector("canvas");
        if (!canvas) {
            console.log("❌ لم يتم العثور على الـ Canvas!");
            return;
        }

        let ctx = canvas.getContext("2d");
        let imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        let pixels = imgData.data;

        // 🔴 لون الكرة (عدّله إذا كان لون الكرة مختلفاً في اللعبة)
        let ballColor = { r: 255, g: 0, b: 0 };

        let detectedPositions = [];

        for (let i = 0; i < pixels.length; i += 4) {
            let r = pixels[i], g = pixels[i + 1], b = pixels[i + 2];

            if (Math.abs(r - ballColor.r) < 30 && 
                Math.abs(g - ballColor.g) < 30 && 
                Math.abs(b - ballColor.b) < 30) {
                
                let x = (i / 4) % canvas.width;
                let y = Math.floor((i / 4) / canvas.width);
                detectedPositions.push({ x, y });

                if (detectedPositions.length > 500) break;
            }
        }

        if (detectedPositions.length > 0) {
            let minX = Math.min(...detectedPositions.map(p => p.x));
            let minY = Math.min(...detectedPositions.map(p => p.y));

            // 🔵 إضافة مؤشر لموقع الكرة
            let marker = document.getElementById("ball-marker");
            if (!marker) {
                marker = document.createElement("div");
                marker.id = "ball-marker";
                marker.style.position = "absolute";
                marker.style.width = "20px";
                marker.style.height = "20px";
                marker.style.backgroundColor = "rgba(0, 255, 0, 0.7)";
                marker.style.borderRadius = "50%";
                marker.style.zIndex = "9999";
                marker.style.pointerEvents = "none";
                document.body.appendChild(marker);
            }

            marker.style.left = `${canvas.offsetLeft + minX}px`;
            marker.style.top = `${canvas.offsetTop + minY}px`;

            console.log(`✅ الكرة موجودة عند: (${minX}, ${minY})`);
        } else {
            console.log("❌ لم يتم العثور على الكرة!");
        }
    }

    setInterval(analyzeCanvas, 500); // 🔄 تحديث كل نصف ثانية

})();
