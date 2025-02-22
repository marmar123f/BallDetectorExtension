(function() {
    console.log("Ball Detector Loaded");

    function findCanvas() {
        let canvasList = document.querySelectorAll("canvas");
        for (let canvas of canvasList) {
            let gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
            if (gl) {
                console.log("✅ تم العثور على WebGL Canvas");
                observeWebGL(canvas, gl);
                return;
            }
        }
        console.log("❌ لم يتم العثور على WebGL Canvas!");
    }

    function observeWebGL(canvas, gl) {
        let originalDrawArrays = gl.drawArrays;
        gl.drawArrays = function(...args) {
            console.log("🔍 يتم تحديث الـ WebGL - قد تحتوي هذه الإطارات على الكرة!");
            originalDrawArrays.apply(gl, args);
            highlightBall(canvas);
        };
    }

    function highlightBall(canvas) {
        let ctx = canvas.getContext("2d");
        if (!ctx) return;

        let imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        let pixels = imgData.data;

        let ballColor = { r: 255, g: 0, b: 0 }; // تغيير لون الكرة إذا لزم الأمر
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
         
