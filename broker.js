// متغير لتخزين بيانات العقارات
let properties = [];

// دالة لتحميل وتحليل ملف CSV من المشروع
function loadCSV() {
    fetch('properties.csv')  // تحميل الملف properties.csv من المشروع
        .then(response => response.text())  // قراءة البيانات النصية من الملف
        .then(csvData => {
            Papa.parse(csvData, {  // استخدام مكتبة PapaParse لتحليل البيانات
                complete: function(results) {
                    console.log("CSV file loaded successfully");
                    console.log(results.data);  // عرض البيانات في الكونسول
                    properties = results.data;
                    displayResults(properties);  // عرض البيانات بعد التحميل
                },
                header: true,  // استخدام أول صف كعناوين
                skipEmptyLines: true,  // تجاهل الأسطر الفارغة
            });
        })
        .catch(error => {
            console.error("Error loading CSV file:", error);
        });
}

// دالة لتصفية العقارات بناءً على المعايير المختارة
function filterProperties() {
    console.log("Filtering properties...");

    const location = document.getElementById("location").value;
    const developer = document.getElementById("developer").value;
    const type = document.getElementById("type").value;
    const budgetRange = document.getElementById("budgetRange").value;
    const downpayment = document.getElementById("downpayment").value;
    const installments = document.getElementById("installments").value;
    const deliveryDate = document.getElementById("deliveryDate").value;  // Corrected

    // تقسيم نطاق الميزانية إلى الحد الأدنى والحد الأقصى
    const [minBudget, maxBudget] = budgetRange ? budgetRange.split("-").map(Number) : [0, Infinity];
    const [minDownpayment, maxDownpayment] = downpayment ? downpayment.split("-").map(Number) : [0, Infinity];
    const [minInstallments, maxInstallments] = installments ? installments.split("-").map(Number) : [0, Infinity];

    // تصفية العقارات بناءً على المعايير المختارة
    const filteredProperties = properties.filter(property => {
        const matchesLocation = !location || location === "" || property.location === location;
        const matchesDeveloper = !developer || developer === "" || property.developer === developer;
        const matchesType = !type || type === "" || property.type === type;
        const matchesBudget = (property.budget >= minBudget && property.budget <= maxBudget);
        const matchesDownpayment = (property.downpayment >= minDownpayment && property.downpayment <= maxDownpayment);
        const matchesInstallments = (property.installments >= minInstallments && property.installments <= maxInstallments);
        const matchesDeliveryDate = !deliveryDate || deliveryDate === "" || property.deliveryDate === deliveryDate;  // Corrected

        return matchesLocation && matchesDeveloper && matchesType && matchesBudget && matchesDownpayment && matchesInstallments && matchesDeliveryDate;
    });

    console.log(filteredProperties);  // عرض العقارات المصفاة في الكونسول

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
        
        filteredProperties.forEach(property => {
            const listItem = document.createElement('li');
            
            // Create container for property details
            const detailsContainer = document.createElement('div');
            detailsContainer.classList.add('property-details');

            // Property type and location
            const typeLocation = document.createElement('div');
            typeLocation.classList.add('property-location');
            typeLocation.textContent = `${property.type} in ${property.location}`;
            detailsContainer.appendChild(typeLocation);

            // Developer information
            const developer = document.createElement('div');
            developer.classList.add('property-developer');
            developer.textContent = `dev: ${property.developer}`;
            detailsContainer.appendChild(developer);

            filteredProperties.forEach(property => {
                const listItem = document.createElement('li');
                
                // Create container for property details
                const detailsContainer = document.createElement('div');
                detailsContainer.classList.add('property-details');
            
                // Property type and location
                const typeLocation = document.createElement('div');
                typeLocation.classList.add('property-location');
                typeLocation.textContent = `${property.type} in ${property.location}`;
                detailsContainer.appendChild(typeLocation);
            
                // Developer information
                const developer = document.createElement('div');
                developer.classList.add('property-developer');
                developer.textContent = `Dev: ${property.developer}`;
                detailsContainer.appendChild(developer);
            
                // Budget and price details
                const budget = document.createElement('div');
                budget.classList.add('property-price');
                budget.textContent = `${property.budget} EGP`;
                detailsContainer.appendChild(budget);
            
                // Delivery Date
                const deliveryDate = document.createElement('div');
                deliveryDate.classList.add('property-delivery-date');
                deliveryDate.textContent = `Delivery Date: ${property.deliveryDate}`;
                detailsContainer.appendChild(deliveryDate);
            
                // Append the details container to the list item
                listItem.appendChild(detailsContainer);
                
                // Add the list item to the list
                list.appendChild(listItem);
            });
             
            // Budget and price details
            const budget = document.createElement('div');
            budget.classList.add('property-price');
            budget.textContent = `${property.budget} EGP`;
            detailsContainer.appendChild(budget);

            // Append the details container to the list item
            listItem.appendChild(detailsContainer);
            
            // Add the list item to the list
            list.appendChild(listItem);
        });

        resultsContainer.appendChild(list);
    }
}

// إضافة مستمع الحدث على زر البحث
document.getElementById("searchButton").addEventListener("click", filterProperties);

// تحميل ملف CSV تلقائيًا عند تحميل الصفحة
document.addEventListener("DOMContentLoaded", function() {
    loadCSV();  // تحميل البيانات من ملف properties.csv
});
