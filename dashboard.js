let filteredData = []; // Declare globally

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
                    filteredData = filterData(data);
                });
            });

            // Attach event listeners for range filters
            document.getElementById("minPrice").addEventListener("input", function () {
                filteredData = filterData(data);
            });
            document.getElementById("maxPrice").addEventListener("input", function () {
                filteredData = filterData(data);
            });
            document.getElementById("minBUA").addEventListener("input", function () {
                filteredData = filterData(data);
            });
            document.getElementById("maxBUA").addEventListener("input", function () {
                filteredData = filterData(data);
            });

            // Sorting and displaying the results
            document.getElementById("sortByHighestBUA").addEventListener("click", function () {
                const sortedData = [...filteredData].sort((a, b) => (parseFloat(b.BUA) || 0) - (parseFloat(a.BUA) || 0));
                displayResults(sortedData);
            });

            document.getElementById("sortByLowestPrice").addEventListener("click", function () {
                const sortedData = [...filteredData].sort((a, b) => (parseFloat(a.Price) || Infinity) - (parseFloat(b.Price) || Infinity));
                displayResults(sortedData);
            });
        },
    });
});

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
    return filteredData; // Return the filtered data
}
