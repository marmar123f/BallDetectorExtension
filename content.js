function makeCupsTransparent() {
    let cups = document.querySelectorAll("div.cup"); // استبدل 'div.cup' بالكلاس الصحيح للأكواب

    if (cups.length === 0) {
        console.log("لم يتم العثور على الأكواب، تحقق من الكود.");
        return;
    }

    cups.forEach(cup => {
        cup.style.opacity = "0.2"; // جعل الكوب شفافًا (يمكنك تقليل الرقم ليصبح أكثر شفافية)
        cup.style.transition = "opacity 0.3s"; // تأثير ناعم
    });

    console.log("تم جعل الأكواب شفافة!");
}

// تشغيل الكود بعد تحميل الصفحة
setTimeout(makeCupsTransparent, 2000);
