// بيانات العقارات (مثال)
const properties = [
    { location: "sahel", type: "apartment", budget: 6000000, downpayment: 500000, installments: 10000 },
    { location: "new_cairo", type: "villa", budget: 15000000, downpayment: 5000000, installments: 24 },
    { location: "october", type: "office", budget: 25000000, downpayment: 8000000, installments: 36 },
    { location: "sahel", type: "store", budget: 12000000, downpayment: 3000000, installments: 18 },
    { location: "new_cairo", type: "villa", budget: 18000000, downpayment: 4000000, installments: 24 },
    { location: "october", type: "apartment", budget: 5000000, downpayment: 1500000, installments: 10 }
];

// دالة لتصفية العقارات بناءً على المعايير المختارة
function filterProperties() {
    // الحصول على القيم المدخلة من النموذج
    const location = document.getElementById("location").value;
    const type = document.getElementById("type").value;
    const budgetRange = document.getElementById("budgetRange").value;
    const downpayment = document.getElementById("downpayment").value;
    const installments = document.getElementById("installments").value;

    // تقسيم نطاق الميزانية إلى الحد الأدنى والحد الأقصى
    const [minBudget, maxBudget] = budgetRange ? budgetRange.split("-").map(Number) : [0, Infinity];
    const [minDownpayment, maxDownpayment] = downpayment ? downpayment.split("-").map(Number) : [0, Infinity];
    const [minInstallments, maxInstallments] = installments ? installments.split("-").map(Number) : [0, Infinity];

    // تصفية العقارات بناءً على المعايير المختارة
    const filteredProperties = properties.filter(property => {
        const matchesLocation = !location || location === "" || property.location === location;
        const matchesType = !type || type === "" || property.type === type;
        const matchesBudget = (property.budget >= minBudget && property.budget <= maxBudget);
        const matchesDownpayment = (property.downpayment >= minDownpayment && property.downpayment <= maxDownpayment);
        const matchesInstallments = (property.installments >= minInstallments && property.installments <= maxInstallments);

        return matchesLocation && matchesType && matchesBudget && matchesDownpayment && matchesInstallments;
    });

    // عرض العقارات التي تم تصفيتها
    displayResults(filteredProperties);
}

// دالة لعرض العقارات المصفاة
function displayResults(filteredProperties) {
    const resultsContainer = document.getElementById("results");
    resultsContainer.innerHTML = ''; // مسح النتائج السابقة

    if (filteredProperties.length === 0) {
        resultsContainer.innerHTML = '<p>لا توجد عقارات بناءً على معايير البحث.</p>';
    } else {
        const list = document.createElement('ul');
        filteredProperties.forEach(property => {
            const listItem = document.createElement('li');
            listItem.textContent = `${property.type} في ${property.location} - الميزانية: ${property.budget} EGP`;
            list.appendChild(listItem);
        });
        resultsContainer.appendChild(list);
    }
}

// إضافة مستمع الحدث على زر البحث
document.getElementById("searchButton").addEventListener("click", filterProperties);

// عرض جميع العقارات بشكل افتراضي عند تحميل الصفحة
document.addEventListener("DOMContentLoaded", function() {
    displayResults(properties);
});
