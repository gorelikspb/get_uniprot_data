async function fetchProteinData() {
    const proteinSelect = document.getElementById("proteinSelect");
    const accessionNumber = proteinSelect.value;

    try {
        const response = await fetch(`https://rest.uniprot.org/uniprotkb/${accessionNumber}.txt`);
        if (!response.ok) {
            throw new Error(`Error fetching data for ${accessionNumber}: ${response.statusText}`);
        }

        const data = await response.text();
        displayProteinInfo(data);
    } catch (error) {
        console.error(error);
        document.getElementById("proteinInfo").innerText = `Failed to fetch data: ${error.message}`;
    }
}

function displayProteinInfo(data) {
    const lines = data.split("\n");
    let proteinInfo = {
        id: null,
        names: [],
        geneName: null,
        organism: null
    };

    lines.forEach(line => {
        if (line.startsWith("ID")) {
            proteinInfo.id = line.split(" ")[1];
        } else if (line.startsWith("DE")) {
            proteinInfo.names.push(line.slice(5));
        } else if (line.startsWith("GN")) {
            proteinInfo.geneName = line.split("=")[1].split(";")[0];
        } else if (line.startsWith("OS")) {
            proteinInfo.organism = line.slice(5);
        }
    });

    const proteinInfoDiv = document.getElementById("proteinInfo");
    proteinInfoDiv.innerHTML = `
        <h2>Protein ID: ${proteinInfo.id}</h2>
        <h3>Protein Names:</h3>
        <ul>${proteinInfo.names.map(name => `<li>${name}</li>`).join('')}</ul>
        <p><strong>Gene Name:</strong> ${proteinInfo.geneName}</p>
        <p><strong>Organism:</strong> ${proteinInfo.organism}</p>
    `;
}
