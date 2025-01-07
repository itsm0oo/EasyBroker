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
                        budget: parseFloat(property.Price) || 0,
                        // Additional fields here
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
    const filtered = properties.filter(p => p.location === location || location === "");
    displayResults(filtered);
}

function displayResults(filteredProperties) {
    const results = document.getElementById("results");
    results.innerHTML = filteredProperties.map(p => `<p>${p.location}</p>`).join('');
}

document.addEventListener("DOMContentLoaded", loadCSV);
document.getElementById("searchButton").addEventListener("click", filterProperties);
