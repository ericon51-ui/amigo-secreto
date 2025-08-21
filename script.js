let participants = [];

function addName() {
    const nameInput = document.getElementById('nameInput');
    const name = nameInput.value.trim();
    
    if (name === '') {
        alert('Por favor ingresa un nombre');
        return;
    }
    
    if (participants.includes(name)) {
        alert('Este nombre ya fue agregado');
        return;
    }
    
    participants.push(name);
    updateNamesList();
    nameInput.value = '';
    nameInput.focus();
}

function updateNamesList() {
    const namesContainer = document.getElementById('namesContainer');
    namesContainer.innerHTML = '';
    
    participants.forEach((name, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            ${name}
            <button class="delete-btn" onclick="removeName(${index})">Eliminar</button>
        `;
        namesContainer.appendChild(li);
    });
}

function removeName(index) {
    participants.splice(index, 1);
    updateNamesList();
}

function drawNames() {
    if (participants.length < 2) {
        alert('Debe haber al menos 2 participantes');
        return;
    }
    
    // Crear una copia de los participantes
    let availableNames = [...participants];
    let results = [];
    
    // Asignar amigo secreto a cada persona
    for (let i = 0; i < participants.length; i++) {
        let giver = participants[i];
        
        // Filtrar para que nadie se sortee a sí mismo
        let possibleReceivers = availableNames.filter(name => name !== giver);
        
        // Si es el último y el único receptor disponible es él mismo, reiniciar
        if (possibleReceivers.length === 0) {
            return drawNames(); // Reiniciar el sorteo
        }
        
        // Seleccionar un receptor aleatorio
        let randomIndex = Math.floor(Math.random() * possibleReceivers.length);
        let receiver = possibleReceivers[randomIndex];
        
        // Eliminar el receptor de la lista de disponibles
        availableNames = availableNames.filter(name => name !== receiver);
        
        results.push({ giver, receiver });
    }
    
    displayResults(results);
}

function displayResults(results) {
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = '<h2>Resultados del Sorteo:</h2>';
    
    results.forEach(pair => {
        const resultItem = document.createElement('div');
        resultItem.className = 'result-item';
        resultItem.textContent = `${pair.giver} ➡️ ${pair.receiver}`;
        resultDiv.appendChild(resultItem);
    });
    
    resultDiv.style.display = 'block';
}
