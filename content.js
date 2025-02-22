(function() {
    console.log("Ball Detector Script Loaded");
    let checkCanvas = setInterval(() => {
        let canvas = document.querySelector("canvas");
        if (canvas) {
            console.log("Canvas Found! Analyzing...");
            clearInterval(checkCanvas);
            analyzeCanvas(canvas);
        }
    }, 1000);

    function analyzeCanvas(canvas) {
        let ctx = canvas.getContext("2d");
        let imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        console.log("Canvas Data: ", imgData);
        // Further image processing can be added here to detect the ball
    }
})();
