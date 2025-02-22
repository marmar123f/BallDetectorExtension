function detectCorrectCups() {
    // البحث عن الأكواب الأساسية في اللعبة
    let cups = document.querySelectorAll("div.cup"); // تأكد من أن "cup" هو الكلاس الصحيح للأكواب

    if (cups.length !== 3) {
        console.log("لم يتم العثور على 3 أكواب، تحقق من الكود.");
        return;
    }

    // إزالة العلامات القديمة
    document.querySelectorAll(".ball-marker").forEach(e => e.remove());

    cups.forEach(cup => {
        let ball = cup.querySelector("div.ball-marker"); // التحقق من وجود الكرة داخل الكوب

        if (ball) { // إذا كان هناك كرة داخل الكوب
            let rect = cup.getBoundingClientRect();

            let marker = document.createElement("div");
            marker.classList.add("ball-indicator");
            marker.style.position = "absolute";
            marker.style.left = `${rect.left + window.scrollX + rect.width / 2 - 10}px`;
            marker.style.top = `${rect.top + window.scrollY - 20}px`;
            marker.style.width = "20px";
            marker.style.height = "20px";
            marker.style.backgroundColor = "red"; // يمكنك تغييره إلى سهم إذا أردت
            marker.style.borderRadius = "50%";
            marker.style.border = "2px solid white";
            marker.style.zIndex = "9999";
            document.body.appendChild(marker);
        }
    });
}

// تشغيل الكشف كل نصف ثانية لمتابعة تحرك الكرة
setInterval(detectCorrectCups, 500);
