// Sample data for properties
const properties = [
    { id: 1, location: 'sahel', type: 'apartment', bedrooms: '2BR', budget: 7000000, downpayment: 1000000, installments: 12 },
    { id: 2, location: 'new_cairo', type: 'villa', villaType: 'standalone', budget: 12000000, downpayment: 1500000, installments: 24 },
    { id: 3, location: 'october', type: 'apartment', bedrooms: '3BR', budget: 9000000, downpayment: 2000000, installments: 18 },
    { id: 4, location: 'sahel', type: 'villa', villaType: 'townhouse', budget: 15000000, downpayment: 3000000, installments: 36 }
];

// Function to filter properties based on form input
function filterProperties(event) {
    event.preventDefault();

    // Get form values
    const location = document.getElementById('location').value.toLowerCase();
    const type = document.getElementById('type').value;
    const budgetRange = document.getElementById('budgetRange').value;
    const downpayment = document.getElementById('downpayment').value;
    const installments = document.getElementById('installments').value;
    const bedrooms = document.getElementById('bedrooms') ? document.getElementById('bedrooms').value : ''; // Only for apartments
    const villaType = document.getElementById('villaType') ? document.getElementById('villaType').value : ''; // Only for villas

    // Split budget range into min and max
    let [minBudget, maxBudget] = [0, Infinity];
    if (budgetRange) {
        [minBudget, maxBudget] = budgetRange.split('-').map(Number);
    }

    // Filter properties based on multiple criteria
    const filteredProperties = properties.filter(property => {
        // Check location
        const matchesLocation = location === '' || property.location.toLowerCase().includes(location);
        
        // Check type
        const matchesType = type === '' || property.type === type;
        
        // Check budget range
        const matchesBudget = property.budget >= minBudget && property.budget <= maxBudget;
        
        // Check downpayment
        const matchesDownpayment = downpayment === '' || property.downpayment <= downpayment;
        
        // Check installments
        const matchesInstallments = installments === '' || property.installments <= installments;
        
        // Check bedrooms for apartments
        const matchesBedrooms = bedrooms === '' || (property.type === 'apartment' && property.bedrooms === bedrooms);
        
        // Check villa type for villas
        const matchesVillaType = villaType === '' || (property.type === 'villa' && property.villaType === villaType);

        // Return true if all conditions are met
        return matchesLocation && matchesType && matchesBudget && matchesDownpayment && matchesInstallments && matchesBedrooms && matchesVillaType;
    });

    // Display filtered properties
    displayProperties(filteredProperties);
}

// Function to display filtered properties
function displayProperties(properties) {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = ''; // Clear previous results

    // If no properties match, show a message
    if (properties.length === 0) {
        resultsDiv.innerHTML = '<p>No properties found matching your criteria.</p>';
        return;
    }

    // Otherwise, display the filtered properties
    properties.forEach(property => {
        const propertyDiv = document.createElement('div');
        propertyDiv.classList.add('property');
        propertyDiv.innerHTML = `
            <h3>Property ID: ${property.id}</h3>
            <p>Location: ${property.location}</p>
            <p>Type: ${property.type}</p>
            <p>Budget: ${property.budget.toLocaleString()}</p>
            <p>Downpayment: ${property.downpayment.toLocaleString()}</p>
            <p>Installments: ${property.installments} months</p>
            ${property.bedrooms ? `<p>Bedrooms: ${property.bedrooms}</p>` : ''}
            ${property.villaType ? `<p>Villa Type: ${property.villaType}</p>` : ''}
        `;
        resultsDiv.appendChild(propertyDiv);
    });
}

// Add event listener to the form
document.getElementById('searchForm').addEventListener('submit', filterProperties);
