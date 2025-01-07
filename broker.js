document.getElementById('fileInput').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
        parseCSV(file);
    }
});

function parseCSV(file) {
    Papa.parse(file, {
        complete: function(results) {
            console.log(results);
            const data = results.data;
            loadFilters(data);
            displayData(data);
        }
    });
}

function loadFilters(data) {
    const locationFilter = document.getElementById('locationFilter');
    const developerFilter = document.getElementById('developerFilter');
    
    // Get unique values for location and developer
    const locations = [...new Set(data.map(item => item[0]))];
    const developers = [...new Set(data.map(item => item[1]))];
    
    // Add options to the location filter
    locations.forEach(location => {
        const option = document.createElement('option');
        option.value = location;
        option.text = location;
        locationFilter.appendChild(option);
    });
    
    // Add options to the developer filter
    developers.forEach(developer => {
        const option = document.createElement('option');
        option.value = developer;
        option.text = developer;
        developerFilter.appendChild(option);
    });
    
    locationFilter.addEventListener('change', filterData);
    developerFilter.addEventListener('change', filterData);
}

function filterData() {
    const locationFilter = document.getElementById('locationFilter').value;
    const developerFilter = document.getElementById('developerFilter').value;
    
    // Get all data again from PapaParse
    Papa.parse(document.getElementById('fileInput').files[0], {
        complete: function(results) {
            let filteredData = results.data;
            
            if (locationFilter !== 'all') {
                filteredData = filteredData.filter(item => item[0] === locationFilter);
            }
            
            if (developerFilter !== 'all') {
                filteredData = filteredData.filter(item => item[1] === developerFilter);
            }
            
            displayData(filteredData);
        }
    });
}

function displayData(data) {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '';
    
    const table = document.createElement('table');
    const headerRow = document.createElement('tr');
    const headers = ['Location', 'Developer', 'Project', 'Type', 'Category', 'Model', 'Floor', 'Price', 'Delivery Date', 'Down Payment', 'Installments', 'Maintenance', 'Phase', 'BUA', 'Garden Area', 'Land Area', 'Roof Area', 'Parking'];
    
    headers.forEach(header => {
        const th = document.createElement('th');
        th.textContent = header;
        headerRow.appendChild(th);
    });
    
    table.appendChild(headerRow);
    
    data.forEach(item => {
        const row = document.createElement('tr');
        item.forEach(cell => {
            const td = document.createElement('td');
            td.textContent = cell;
            row.appendChild(td);
        });
        table.appendChild(row);
    });
    
    resultsDiv.appendChild(table);
}
