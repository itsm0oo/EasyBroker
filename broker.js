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
        
            // Location
            const location = document.createElement('div');
            location.classList.add('property-location');
            location.textContent = `Location: ${property.location}`;
            detailsContainer.appendChild(location);
        
            // Developer
            const developer = document.createElement('div');
            developer.classList.add('property-developer');
            developer.textContent = `Developer: ${property.developer}`;
            detailsContainer.appendChild(developer);
        
            // Project
            const project = document.createElement('div');
            project.classList.add('property-project');
            project.textContent = `Project: ${property.project || "N/A"}`;
            detailsContainer.appendChild(project);
        
            // Type
            const type = document.createElement('div');
            type.classList.add('property-type');
            type.textContent = `Type: ${property.type}`;
            detailsContainer.appendChild(type);
        
            // Category
            const category = document.createElement('div');
            category.classList.add('property-category');
            category.textContent = `Category: ${property.category || "N/A"}`;
            detailsContainer.appendChild(category);
        
            // Model
            const model = document.createElement('div');
            model.classList.add('property-model');
            model.textContent = `Model: ${property.model || "N/A"}`;
            detailsContainer.appendChild(model);
        
            // Floor
            const floor = document.createElement('div');
            floor.classList.add('property-floor');
            floor.textContent = `Floor: ${property.floor || "N/A"}`;
            detailsContainer.appendChild(floor);
        
            // Price
            const price = document.createElement('div');
            price.classList.add('property-price');
            price.textContent = `Price: ${property.price || "N/A"} EGP`;
            detailsContainer.appendChild(price);
        
            // Delivery Date
            const deliveryDate = document.createElement('div');
            deliveryDate.classList.add('property-delivery-date');
            deliveryDate.textContent = `Delivery Date: ${property.deliveryDate || "N/A"}`;
            detailsContainer.appendChild(deliveryDate);
        
            // Down Payment
            const downPayment = document.createElement('div');
            downPayment.classList.add('property-downpayment');
            downPayment.textContent = `Down Payment: ${property.downPayment || "N/A"} EGP`;
            detailsContainer.appendChild(downPayment);
        
            // Maintenance
            const maintenance = document.createElement('div');
            maintenance.classList.add('property-maintenance');
            maintenance.textContent = `Maintenance: ${property.maintenance || "N/A"}`;
            detailsContainer.appendChild(maintenance);
        
            // Parking
            const parking = document.createElement('div');
            parking.classList.add('property-parking');
            parking.textContent = `Parking: ${property.parking || "N/A"}`;
            detailsContainer.appendChild(parking);
        
            // Phase
            const phase = document.createElement('div');
            phase.classList.add('property-phase');
            phase.textContent = `Phase: ${property.phase || "N/A"}`;
            detailsContainer.appendChild(phase);
        
            // BUA
            const bua = document.createElement('div');
            bua.classList.add('property-bua');
            bua.textContent = `BUA: ${property.bua || "N/A"} sqm`;
            detailsContainer.appendChild(bua);
        
            // Garden Area
            const gardenArea = document.createElement('div');
            gardenArea.classList.add('property-garden-area');
            gardenArea.textContent = `Garden Area: ${property.gardenArea || "N/A"} sqm`;
            detailsContainer.appendChild(gardenArea);
        
            // Land Area
            const landArea = document.createElement('div');
            landArea.classList.add('property-land-area');
            landArea.textContent = `Land Area: ${property.landArea || "N/A"} sqm`;
            detailsContainer.appendChild(landArea);
        
            // Roof Area
            const roofArea = document.createElement('div');
            roofArea.classList.add('property-roof-area');
            roofArea.textContent = `Roof Area: ${property.roofArea || "N/A"} sqm`;
            detailsContainer.appendChild(roofArea);
        
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
