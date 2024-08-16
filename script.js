document.getElementById('fetch-button').addEventListener('click', function() {
    // Get the selected ID from the dropdown
    const selectedId = document.getElementById('id-selection').value;
    
    // Get the custom ID from the input field
    const customId = document.getElementById('custom-id').value.trim();
    
    // Determine which ID to use
    const idToFetch = selectedId || customId;
    
    // If no ID is provided, show an alert
    if (!idToFetch) {
        alert('Please select or enter a UniProt ID.');
        return;
    }
    
    // Fetch data from UniProt
    fetch(`https://rest.uniprot.org/uniprotkb/${idToFetch}.txt`)
        .then(response => response.text())
        .then(data => {
            // Display the fetched data
            document.getElementById('protein-data').textContent = data;
        })
        .catch(error => {
            // Handle errors
            document.getElementById('protein-data').textContent = 'Error fetching data. Please check the UniProt ID and try again.';
        });
});
