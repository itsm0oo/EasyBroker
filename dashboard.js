// Load CSV and populate filters
document.addEventListener("DOMContentLoaded", function () {
    const csvFile = "properties.csv";

    Papa.parse(csvFile, {
        download: true,
        header: true,
        complete: function (results) {
            const data = results.data;
            initializeFilters(data);
            displayResults(data);

            document.getElementById("location").addEventListener("change", function () {
                filterData(data);
            });

            document.getElementById("developer").addEventListener("change", function () {
                filterData(data);
            });
        },
    });
});

// Initialize filters dynamically
function initializeFilters(data) {
    const locationSet = new Set(data.map(item => item.Location));
    const developerSet = new Set(data.map(item => item.Developer));

    populateFilterOptions("location", locationSet);
    populateFilterOptions("developer", developerSet);
}

function populateFilterOptions(filterId, options) {
    const select = document.getElementById(filterId);
    options.forEach(option => {
        const opt = document.createElement("option");
        opt.value = option;
        opt.textContent = option;
        select.appendChild(opt);
    });
}

// Filter and display data
function filterData(data) {
    const locationFilter = document.getElementById("location").value;
    const developerFilter = document.getElementById("developer").value;

    const filteredData = data.filter(item => {
        return (
            (locationFilter === "" || item.Location === locationFilter) &&
            (developerFilter === "" || item.Developer === developerFilter)
        );
    });

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
            <td>${row.price || ""}</td>
            <td>${row.DeliveryDate || ""}</td>
            <td>${row.DownPayment || ""}</td>
            <td>${row.Installments || ""}</td>
            <td>${row.Maintinance || ""}</td>
            <td>${row.Phase || ""}</td>
            <td>${row.BUA || ""}</td>
            <td>${row.GardenArea || ""}</td>
            <td>${row.landArea || ""}</td>
            <td>${row.RoofArea || ""}</td>
            <td>${row.Parking || ""}</td>
        `;
        tbody.appendChild(tr);
    });
}
