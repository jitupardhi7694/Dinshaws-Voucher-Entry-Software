const searchBox = document.querySelector('#search');
searchBox.addEventListener('input', searchTable);

const resetButton = document.querySelector('button[type="reset"]');
resetButton.addEventListener('click', resetTable);

function searchTable() {
    const input = this.value.toLowerCase();
    const rows = document.querySelectorAll('#regrowdata');
    let found = false;
    rows.forEach((row) => {
        const columns = row.querySelectorAll('td');
        let rowFound = false;
        columns.forEach((col) => {
            const text = col.textContent.toLowerCase();
            if (text.indexOf(input) !== -1) {
                rowFound = true;
            }
        });
        if (rowFound) {
            row.style.display = '';
            found = true;
        } else {
            row.style.display = 'none';
        }
    });
    const noRecordFoundRow = document.querySelector('#noRecordFoundRow');
    if (found) {
        if (noRecordFoundRow) {
            noRecordFoundRow.style.display = 'none';
        }
    } else if (noRecordFoundRow) {
        noRecordFoundRow.style.display = '';
    } else {
        const tbody = document.querySelector('tbody');
        const newRow = tbody.insertRow();
        newRow.id = 'noRecordFoundRow';
        const cell = newRow.insertCell();
        cell.colSpan = '20';
        cell.classList.add('text-center');
        cell.textContent = 'No Record Found';
    }
}

function resetTable() {
    const rows = document.querySelectorAll('#regrowdata');
    rows.forEach((row) => (row.style.display = ''));
    searchBox.value = '';
    searchBox.placeholder = 'Search';

    // Check if any search results are currently being displayed
    const foundRows = document.querySelectorAll(
        '#regrowdata:not([style*="display: none"])'
    );
    const noRecordFoundRow = document.querySelector('#noRecordFoundRow');

    // If no search results are found, display the "No Record Found" text
    if (foundRows.length === 0) {
        if (noRecordFoundRow) {
            noRecordFoundRow.style.display = '';
        } else {
            const tbody = document.querySelector('tbody');
            const newRow = tbody.insertRow();
            newRow.id = 'noRecordFoundRow';
            const cell = newRow.insertCell();
            cell.colSpan = '17';
            cell.classList.add('text-center');
            cell.textContent = 'No Record Found';
        }
    } else if (noRecordFoundRow) {
        noRecordFoundRow.style.display = 'none';
    }
}

// function previewImage(inputElem, previewElem) {
//     const file = document.getElementsByClassName(inputElem).files;
//     // validate file size before preview
//     if (fileSizeValidation(inputElem, previewElem) === false) {
//         return;
//     }
//     if (fileTypeValidation(inputElem) === false) {
//         return;
//     }
//     if (file.length > 0) {
//         const reader = new FileReader();
//         reader.onload = function (e) {
//             document
//                 .getElementById(previewElem)
//                 .setAttribute('src', e.target.result);
//         };
//         reader.readAsDataURL(file[0]);
//         this.fileName = event.target.files[0].name;
//         console.log('this.fileName', this.fileName);
//     }
// }
