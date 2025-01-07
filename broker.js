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
                        category: property.category?.trim() || "N/A",
                        model: property.Model?.trim() || "N/A",
                        floor: property.Floor?.trim() || "N/A",
                        price: parseFloat(property.price.replace(/,/g, '')) || 0,
                        deliveryDate: property.DeliveryDate?.trim() || "N/A",
                        downPayment: parseFloat(property["Down payment"]?.replace(/,/g, '')) || 0,
                        installments: parseFloat(property.Installments?.replace(/,/g, '')) || 0,
                        maintenance: property.maintinance?.trim() || "N/A",
                        phase: property.Phase?.trim() || "N/A",
                        bua: parseFloat(property.BUA) || 0,
                        gardenArea: parseFloat(property["Garden Area"]) || 0,
                        landArea: parseFloat(property.landArea) || 0,
                        roofArea: parseFloat(property.RoofArea) || 0,
                        parking: property.Parking?.trim() || "N/A",
                    }));
                    displayResults(properties); // Show all properties initially
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
    const budgetRange = document.getElementById("budgetRange").value;
    const downPayment = document.getElementById("downpayment").value;
    const installments = document.getElementById("installments").value;

    const filtered = properties.filter(p => {
        return (
            (location === "" || p.location.toLowerCase() === location) &&
            (developer === "" || p.developer.toLowerCase() === developer) &&
            (type === "" || p.type.toLowerCase() === type) &&
            (deliveryDate === "" || p.deliveryDate.toLowerCase() === deliveryDate) &&
            (budgetRange === "" || isWithinRange(p.price, budgetRange)) &&
            (downPayment === "" || isWithinRange(p.downPayment, downPayment)) &&
            (installments === "" || isWithinRange(p.installments, installments))
        );
    });

    displayResults(filtered);
}

function isWithinRange(value, range) {
    const [min, max] = range.split("-").map(Number);
    return value >= min && value <= max;
}

function displayResults(filteredProperties) {
    const results = document.getElementById("results");

    if (filteredProperties.length === 0) {
        results.innerHTML = "<p>No results found.</p>";
        return;
    }

    results.innerHTML = filteredProperties
        .map(p => `
            <div class="property">
                <h3>${p.project} (${p.type})</h3>
                <p><strong>Location:</strong> ${p.location}</p>
                <p><strong>Developer:</strong> ${p.developer}</p>
                <p><strong>Price:</strong> ${p.price.toLocaleString()} EGP</p>
                <p><strong>Delivery Date:</strong> ${p.deliveryDate}</p>
                <p><strong>BUA:</strong> ${p.bua} m²</p>
                <p><strong>Parking:</strong> ${p.parking}</p>
            </div>
        `)
        .join('');
}

document.addEventListener("DOMContentLoaded", loadCSV);
document.getElementById("searchButton").addEventListener("click", filterProperties);
