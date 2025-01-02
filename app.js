// التعامل مع نموذج تسجيل الدخول
document.getElementById("loginForm").addEventListener("submit", async function (event) {
  event.preventDefault(); // منع الإرسال الافتراضي للنموذج

  const email = document.getElementById("email-signin").value;
  const password = document.getElementById("password-signin").value;

  // إرسال البيانات إلى السيرفر لتسجيل الدخول
  try {
    const response = await fetch("http://localhost:3000/signin", { // تأكد من تطابق الرابط مع السيرفر
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (response.ok) {
      alert("تم تسجيل الدخول بنجاح!");
      window.location.href = "dashboard.html"; // الانتقال إلى لوحة التحكم
    } else {
      alert(data.message || "البريد الإلكتروني أو كلمة المرور غير صحيحة.");
    }
  } catch (error) {
    console.error("حدث خطأ أثناء تسجيل الدخول:", error);
    alert("حدث خطأ. حاول مرة أخرى لاحقًا.");
  }
});
