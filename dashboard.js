let filteredData = []; // Declare filteredData globally
let sortState = 'HighestBUA'; // Initially set to 'HighestBUA'

// Load CSV and populate filters
document.addEventListener("DOMContentLoaded", function () {
    const csvFile = "properties.csv";

    Papa.parse(csvFile, {
        download: true,
        header: true,
        complete: function (results) {
            const data = results.data;
            initializeFilters(data);
            filteredData = data; // Initialize with all data
            displayResults(data);

            // Attach event listeners to all filter elements
            const filters = ["location", "developer", "Project", "Type", "Category", "DeliveryDate"];
            filters.forEach(filterId => {
                document.getElementById(filterId).addEventListener("change", function () {
                    filterData(data);
                });
            });

            // Attach event listeners for range filters
            document.getElementById("minPrice").addEventListener("input", function () {
                filterData(data);
            });
            document.getElementById("maxPrice").addEventListener("input", function () {
                filterData(data);
            });
            document.getElementById("minBUA").addEventListener("input", function () {
                filterData(data);
            });
            document.getElementById("maxBUA").addEventListener("input", function () {
                filterData(data);
            });

          // Sorting buttons
document.getElementById("sortByHighestBUA").addEventListener("click", function () {
    if (sortState === 'HighestBUA') {
        sortState = 'LowestPrice'; // Toggle to lowest price
        const sortedData = [...filteredData].sort((a, b) => (parseFloat(a.Price) || Infinity) - (parseFloat(b.Price) || Infinity));
        displayResults(sortedData);

        // Toggle active class
        document.getElementById("sortByHighestBUA").classList.add("active");
        document.getElementById("sortByLowestPrice").classList.remove("active");
    } else {
        sortState = 'HighestBUA'; // Toggle to highest BUA
        const sortedData = [...filteredData].sort((a, b) => (parseFloat(b.BUA) || 0) - (parseFloat(a.BUA) || 0));
        displayResults(sortedData);

        // Toggle active class
        document.getElementById("sortByHighestBUA").classList.remove("active");
        document.getElementById("sortByLowestPrice").classList.add("active");
    }
});

document.getElementById("sortByLowestPrice").addEventListener("click", function () {
    if (sortState === 'LowestPrice') {
        sortState = 'HighestBUA'; // Toggle to highest BUA
        const sortedData = [...filteredData].sort((a, b) => (parseFloat(b.BUA) || 0) - (parseFloat(a.BUA) || 0));
        displayResults(sortedData);

        // Toggle active class
        document.getElementById("sortByHighestBUA").classList.remove("active");
        document.getElementById("sortByLowestPrice").classList.add("active");
    } else {
        sortState = 'LowestPrice'; // Toggle to lowest price
        const sortedData = [...filteredData].sort((a, b) => (parseFloat(a.Price) || Infinity) - (parseFloat(b.Price) || Infinity));
        displayResults(sortedData);

        // Toggle active class
        document.getElementById("sortByHighestBUA").classList.add("active");
        document.getElementById("sortByLowestPrice").classList.remove("active");
    }
});

        },
    });
});

// Initialize filters dynamically
function initializeFilters(data) {
    const filterMappings = {
        location: "Location",
        developer: "Developer",
        Project: "Project",
        Type: "Type",
        Category: "Category",
        DeliveryDate: "DeliveryDate",
    };

    for (const [filterId, fieldName] of Object.entries(filterMappings)) {
        const uniqueValues = new Set(data.map(item => item[fieldName]?.trim()).filter(Boolean));
        populateFilterOptions(filterId, uniqueValues);
    }
}

function populateFilterOptions(filterId, options) {
    const select = document.getElementById(filterId);
    select.innerHTML = `<option value="">All</option>`; // Add default "All" option
    options.forEach(option => {
        const opt = document.createElement("option");
        opt.value = option;
        opt.textContent = option;
        select.appendChild(opt);
    });
}

// Filter and display data
function filterData(data) {
    const filters = {
        location: document.getElementById("location").value,
        developer: document.getElementById("developer").value,
        Project: document.getElementById("Project").value,
        Type: document.getElementById("Type").value,
        Category: document.getElementById("Category").value,
        DeliveryDate: document.getElementById("DeliveryDate").value,
    };

    const minPrice = parseFloat(document.getElementById("minPrice").value) || 0;
    const maxPrice = parseFloat(document.getElementById("maxPrice").value) || Infinity;
    const minBUA = parseFloat(document.getElementById("minBUA").value) || 0;
    const maxBUA = parseFloat(document.getElementById("maxBUA").value) || Infinity;

    filteredData = data.filter(item => {
        const price = parseFloat(item.Price) || 0;
        const bua = parseFloat(item.BUA) || 0;

        return (
            Object.keys(filters).every(key => {
                const filterValue = filters[key];
                const itemValue = item[key.charAt(0).toUpperCase() + key.slice(1)]?.trim();
                return filterValue === "" || itemValue === filterValue;
            }) &&
            price >= minPrice && price <= maxPrice &&
            bua >= minBUA && bua <= maxBUA
        );
    });
    
    // Update the unit count
    const unitCountElement = document.getElementById("unitCount");
    if (filteredData.length > 0) {
        unitCountElement.textContent = `Number of Units Available: ${filteredData.length}`;
    } else {
        unitCountElement.textContent = "No Units Match Your Filters.";
    }

    displayResults(filteredData);
}

// Display results in the table
function displayResults(data) {
    const tbody = document.querySelector("#results tbody");
    tbody.innerHTML = ""; // Clear existing rows

    data.forEach(row => {
        const tr = document.createElement("tr");
        tr.innerHTML = ` 
            <td>${row.Location || ""}</td>
            <td>${row.Developer || ""}</td>
            <td>${row.Project || ""}</td>
            <td>${row.Type || ""}</td>
            <td>${row.Category || ""}</td>
            <td>${row.Model || ""}</td>
            <td>${row.Floor || ""}</td>
            <td>${row.Price || ""}</td>
            <td>${row.DeliveryDate || ""}</td>
            <td>${row.DownPayment || ""}</td>
            <td>${row.Installments || ""}</td>
            <td>${row.Maintenance || ""}</td>
            <td>${row.Phase || ""}</td>
            <td>${row.BUA || ""}</td>
            <td>${row.GardenArea || ""}</td>
            <td>${row.LandArea || ""}</td>
            <td>${row.RoofArea || ""}</td>
            <td>${row.Parking || ""}</td>
        `;
        tbody.appendChild(tr);
    });
}
