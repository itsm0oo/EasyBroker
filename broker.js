// متغير لتخزين بيانات العقارات
let properties = [];

// دالة لتحميل وتحليل ملف CSV من المشروع
function loadCSV() {
    fetch('properties.csv') // تحميل الملف properties.csv من المشروع
        .then(response => response.text()) // قراءة البيانات النصية من الملف
        .then(csvData => {
            Papa.parse(csvData, { // استخدام مكتبة PapaParse لتحليل البيانات
                complete: function(results) {
                    console.log("CSV file loaded successfully");
                    console.log("Raw Data:", results.data); // عرض البيانات الخام في الكونسول
                    properties = results.data.map(property => ({
                        location: property.Location?.trim() || "N/A",
                        developer: property.Developer?.trim() || "N/A",
                        project: property.Project?.trim() || "N/A",
                        type: property.Type?.trim() || "N/A",
                        category: property.Category?.trim() || "N/A",
                        model: property.Model?.trim() || "N/A",
                        floor: property.Floor?.trim() || "N/A",
                        budget: parseFloat(property.Price).replace || 0,
                        downPayment: parseFloat(property.DownPayment) || 0,
                        installments: parseFloat(property.Installments?.replace(/,/g, '') || 0),
                        deliveryDate: property.DeliveryDate?.trim() || "N/A",
                        maintenance: property.Maintenance?.trim() || "N/A",
                        parking: property.Parking?.trim() || "N/A",
                        phase: property.Phase?.trim() || "N/A",
                        bua: parseFloat(property.BUA) || 0,
                        gardenArea: parseFloat(property.GardenArea) || 0,
                        landArea: parseFloat(property.LandArea) || 0,
                        roofArea: parseFloat(property.RoofArea) || 0,
                    }));
                    console.log("Mapped Properties:", properties); // عرض العقارات المهيأة
                    displayResults(properties); // عرض البيانات بعد التحميل
                },
                header: true, // استخدام أول صف كعناوين
                skipEmptyLines: true, // تجاهل الأسطر الفارغة
            });
        })
        .catch(error => {
            console.error("Error loading CSV file:", error);
        });
}

// دالة لتصفية العقارات بناءً على المعايير المختارة
function filterProperties() {
    console.log("Filtering properties...");

    const location = document.getElementById("location")?.value.trim().toLowerCase() || "";
    const developer = document.getElementById("developer")?.value.trim().toLowerCase() || "";
    const type = document.getElementById("type")?.value.trim().toLowerCase() || "";
    const budgetRange = document.getElementById("budgetRange")?.value.trim() || "";
    const downpayment = document.getElementById("downpayment")?.value.trim() || "";
    const installments = document.getElementById("installments")?.value.trim() || "";
    const deliveryDate = document.getElementById("deliveryDate")?.value.trim().toLowerCase() || "";

    // Parse ranges into min and max
    const [minBudget, maxBudget] = budgetRange
        ? budgetRange.split("-").map(value => parseFloat(value) || 0)
        : [0, Infinity];
    const [minDownpayment, maxDownpayment] = downpayment
        ? downpayment.split("-").map(value => parseFloat(value) || 0)
        : [0, Infinity];
    const [minInstallments, maxInstallments] = installments
        ? installments.split("-").map(value => parseFloat(value) || 0)
        : [0, Infinity];

    const filteredProperties = properties.filter(property => {
        const matchesLocation = !location || property.location.toLowerCase() === location;
        const matchesDeveloper = !developer || property.developer.toLowerCase() === developer;
        const matchesType = !type || property.type.toLowerCase() === type;
        const matchesBudget = property.budget >= minBudget && property.budget <= maxBudget;
        const matchesDownpayment = property.downPayment >= minDownpayment && property.downPayment <= maxDownpayment;
        const matchesInstallments = property.installments >= minInstallments && property.installments <= maxInstallments;
        const matchesDeliveryDate = !deliveryDate || property.deliveryDate.toLowerCase() === deliveryDate;

        return matchesLocation &&
            matchesDeveloper &&
            matchesType &&
            matchesBudget &&
            matchesDownpayment &&
            matchesInstallments &&
            matchesDeliveryDate;
    });

    console.log("Filtered Properties:", filteredProperties);

    displayResults(filteredProperties);

    console.log("Filtered Properties:", filteredProperties); // عرض العقارات المصفاة في الكونسول

    // عرض العقارات المصفاة
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
        list.classList.add('property-list'); // إضافة كلاس للقائمة

        filteredProperties.forEach(property => {
            const listItem = document.createElement('li');
            listItem.classList.add('property-item'); // إضافة كلاس لكل عنصر

            // إنشاء محتوى التفاصيل
            const detailsContainer = document.createElement('div');
            detailsContainer.classList.add('property-details');

            // الحقول المطلوبة
            const fields = [
                { label: "Location", value: property.location },
                { label: "Developer", value: property.developer },
                { label: "Project", value: property.project || "N/A" },
                { label: "Type", value: property.type },
                { label: "Category", value: property.category || "N/A" },
                { label: "Model", value: property.model || "N/A" },
                { label: "Floor", value: property.floor || "N/A" },
                { label: "Price", value: `${property.budget || "N/A"} EGP` },
                { label: "DeliveryDate", value: property.deliveryDate || "N/A" },
                { label: "DownPayment", value: `${property.downPayment || "N/A"} EGP` },
                { label: "Maintenance", value: property.maintenance || "N/A" },
                { label: "Parking", value: property.parking || "N/A" },
                { label: "Phase", value: property.phase || "N/A" },
                { label: "BUA", value: `${property.bua || "N/A"} sqm` },
                { label: "GardenArea", value: `${property.gardenArea || "N/A"} sqm` },
                { label: "LandArea", value: `${property.landArea || "N/A"} sqm` },
                { label: "RoofArea", value: `${property.roofArea || "N/A"} sqm` },
            ];

            // عرض كل الحقول
            fields.forEach(field => {
                const fieldDiv = document.createElement('div');
                fieldDiv.classList.add('property-field');
                fieldDiv.textContent = `${field.label}: ${field.value}`;
                detailsContainer.appendChild(fieldDiv);
            });

            listItem.appendChild(detailsContainer);
            list.appendChild(listItem);
        });

        resultsContainer.appendChild(list);
    }
}

// إضافة مستمع الحدث على زر البحث
document.getElementById("searchButton").addEventListener("click", filterProperties);

// تحميل ملف CSV تلقائيًا عند تحميل الصفحة
document.addEventListener("DOMContentLoaded", function() {
    loadCSV(); // تحميل البيانات من ملف properties.csv
});
