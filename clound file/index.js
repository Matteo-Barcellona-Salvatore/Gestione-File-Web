let files = JSON.parse(localStorage.getItem('files')) || [];

function uploadFiles() {
    const fileInput = document.getElementById('file-upload');
    for (let file of fileInput.files) {
        const reader = new FileReader();

        reader.onload = function (e) {
            const base64Data = e.target.result;

            files.push({
                name: file.name,
                size: file.size,
                lastModified: file.lastModified,
                type: file.type,
                data: base64Data
            });

            localStorage.setItem('files', JSON.stringify(files));
            displayFiles();
        };

        reader.readAsDataURL(file);
    }
}

function displayFiles() {
    const fileList = document.getElementById('file-list');
    fileList.innerHTML = '';

    files.forEach((file, index) => {
        const li = document.createElement('li');

        const fileName = document.createElement('span');
        fileName.classList.add('file-name');
        fileName.textContent = file.name;

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Elimina';
        deleteButton.classList.add('delete');
        deleteButton.onclick = () => deleteFile(index);

        const downloadButton = document.createElement('button');
        downloadButton.textContent = 'Scarica';
        downloadButton.classList.add('download');
        downloadButton.onclick = () => downloadFile(file.data, file.name);

        const analyzeButton = document.createElement('button');
        analyzeButton.textContent = 'Analizza';
        analyzeButton.classList.add('analyze');
        analyzeButton.onclick = () => {
            const extension = file.name.includes('.') ? file.name.split('.').pop() : 'N/A';
            alert(`📄 File: ${file.name}\n📦 Tipo MIME: ${file.type || 'sconosciuto'}\n🧩 Estensione: ${extension}`);
        };

        li.appendChild(fileName);
        li.appendChild(deleteButton);
        li.appendChild(downloadButton);
        li.appendChild(analyzeButton);

        fileList.appendChild(li);
    });
}

function deleteFile(index) {
    files.splice(index, 1);
    localStorage.setItem('files', JSON.stringify(files));
    displayFiles();
}

function downloadFile(fileData, fileName) {
    const link = document.createElement('a');
    link.href = fileData;
    link.download = fileName;
    link.click();
}

window.onload = function () {
    displayFiles();
};
