let properties = [];

function loadCSV() {
    fetch('properties.csv')
        .then(response => response.text())
        .then(csvData => {
            Papa.parse(csvData, {
                complete: function(results) {
                    properties = results.data.map(property => ({
                        location: property.Location?.trim() || "N/A",
                        developer: property.Developer?.trim() || "N/A",
                        project: property.Project?.trim() || "N/A",
                        type: property.Type?.trim() || "N/A",
                        category: property.Category?.trim() || "N/A",
                        model: property.Model?.trim() || "N/A",
                        floor: property.Floor?.trim() || "N/A",
                        price: parseFloat(property.Price?.replace(/,/g, '')) || 0,
                        deliveryDate: property.DeliveryDate?.trim() || "N/A",
                        downpayment: parseFloat(property["Down payment"]?.replace(/,/g, '')) || 0,
                        installments: parseFloat(property.Installments?.replace(/,/g, '')) || 0,
                        maintenance: property.Maintinance?.trim() || "N/A",
                        phase: property.Phase?.trim() || "N/A",
                        bua: parseFloat(property.BUA?.replace(/,/g, '')) || 0,
                        gardenArea: parseFloat(property["Garden Area"]?.replace(/,/g, '')) || 0,
                        landArea: parseFloat(property["LandArea"]?.replace(/,/g, '')) || 0,
                        roofArea: parseFloat(property["RoofArea"]?.replace(/,/g, '')) || 0,
                        parking: property.Parking?.trim() || "N/A",
                    }));
                    displayResults(properties);
                },
                header: true,
                skipEmptyLines: true,
            });
        })
        .catch(error => console.error("Error loading CSV:", error));
}

function filterProperties() {
    const location = document.getElementById("location").value.toLowerCase().trim();
    const developer = document.getElementById("developer").value.toLowerCase().trim();
    const type = document.getElementById("type").value.toLowerCase().trim();
    const deliveryDate = document.getElementById("deliveryDate").value.toLowerCase().trim();
    const budgetRange = document.getElementById("budgetRange").value.trim();
    const downpayment = document.getElementById("downpayment").value.trim();

    let filtered = properties;

    // Apply filters
    if (location && location !== "all") {
        filtered = filtered.filter(p => p.location.toLowerCase() === location);
    }
    if (developer && developer !== "all") {
        filtered = filtered.filter(p => p.developer.toLowerCase() === developer);
    }
    if (type && type !== "all") {
        filtered = filtered.filter(p => p.type.toLowerCase() === type);
    }
    if (deliveryDate && deliveryDate !== "all") {
        filtered = filtered.filter(p => p.deliveryDate.toLowerCase() === deliveryDate);
    }

    // Handle budget range filter
    if (budgetRange && budgetRange !== "all") {
        const [min, max] = budgetRange.split('-').map(Number);
        filtered = filtered.filter(p => p.price >= min && p.price <= max);
    }

    // Handle downpayment filter
    if (downpayment && downpayment !== "all") {
        const [min, max] = downpayment.split('-').map(Number);
        filtered = filtered.filter(p => p.downpayment >= min && p.downpayment <= max);
    }

    displayResults(filtered);
}

function displayResults(filteredProperties) {
    const results = document.getElementById("results");
    if (filteredProperties.length === 0) {
        results.innerHTML = "<p>No results found.</p>";
    } else {
        results.innerHTML = filteredProperties.map(p => {
            return `
                <p>
                    Location: ${p.location}, Developer: ${p.developer}, Type: ${p.type}, Price: ${p.price}, Delivery Date: ${p.deliveryDate}, 
                    Down Payment: ${p.downpayment}, BUA: ${p.bua}, Garden Area: ${p.gardenArea}, Land Area: ${p.landArea}, Roof Area: ${p.roofArea}
                </p>
            `;
        }).join('');
    }
}

document.addEventListener("DOMContentLoaded", loadCSV);
document.getElementById("searchButton").addEventListener("click", filterProperties);
