// Filter properties based on the selected criteria
function filterProperties() {
    console.log("Filtering properties...");

    const location = document.getElementById("location").value;
    const developer = document.getElementById("developer").value;
    const type = document.getElementById("type").value;
    const budgetRange = document.getElementById("budgetRange").value;
    const downpayment = document.getElementById("downpayment").value;
    const installments = document.getElementById("installments").value;
    const DelivaryDate = document.getElementById("DelivaryDate").value;

    // Parse budget, downpayment, and installments ranges
    const [minBudget, maxBudget] = budgetRange ? budgetRange.split("-").map(Number) : [0, Infinity];
    const [minDownpayment, maxDownpayment] = downpayment ? downpayment.split("-").map(Number) : [0, Infinity];
    const [minInstallments, maxInstallments] = installments ? installments.split("-").map(Number) : [0, Infinity];

    // Filter properties
    const filteredProperties = properties.filter(property => {
        const matchesLocation = !location || property.location === location;
        const matchesDeveloper = !developer || property.developer === developer;
        const matchesType = !type || property.type === type;
        const matchesBudget = property.budget >= minBudget && property.budget <= maxBudget;
        const matchesDownpayment = property.downpayment >= minDownpayment && property.downpayment <= maxDownpayment;
        const matchesInstallments = property.installments >= minInstallments && property.installments <= maxInstallments;
        const matchesDelivaryDate = !DelivaryDate || property.DelivaryDate === DelivaryDate;

        return (
            matchesLocation &&
            matchesDeveloper &&
            matchesType &&
            matchesBudget &&
            matchesDownpayment &&
            matchesInstallments &&
            matchesDelivaryDate
        );
    });

    console.log("Filtered Properties:", filteredProperties);
    displayResults(filteredProperties);
}

// Display filtered properties
function displayResults(filteredProperties) {
    const resultsContainer = document.getElementById("results");
    resultsContainer.innerHTML = "";

    if (filteredProperties.length === 0) {
        resultsContainer.innerHTML = '<p>لا توجد عقارات بناءً على معايير البحث.</p>';
    } else {
        const list = document.createElement("ul");

        filteredProperties.forEach(property => {
            const listItem = document.createElement("li");

            // Create a container for property details
            const detailsContainer = document.createElement("div");
            detailsContainer.classList.add("property-details");

            // Add type and location
            const typeLocation = document.createElement("div");
            typeLocation.classList.add("property-location");
            typeLocation.textContent = `${property.type} في ${property.location}`;
            detailsContainer.appendChild(typeLocation);

            // Add developer
            const developer = document.createElement("div");
            developer.classList.add("property-developer");
            developer.textContent = `المطور: ${property.developer}`;
            detailsContainer.appendChild(developer);

            // Add budget
            const budget = document.createElement("div");
            budget.classList.add("property-price");
            budget.textContent = `السعر: ${property.budget} EGP`;
            detailsContainer.appendChild(budget);

            // Add delivery date
            const deliveryDate = document.createElement("div");
            deliveryDate.classList.add("property-delivery");
            deliveryDate.textContent = `تاريخ التسليم: ${property.DelivaryDate}`;
            detailsContainer.appendChild(deliveryDate);

            // Append details to the list item
            listItem.appendChild(detailsContainer);
            list.appendChild(listItem);
        });

        resultsContainer.appendChild(list);
    }
}
