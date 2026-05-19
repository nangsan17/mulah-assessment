fetch('Table_Input.csv')
  .then(response => response.text())
  .then(data => {

    const rows = data.trim().split('\n');

    const tableBody = document.querySelector('#table1 tbody');

    let values = {};

    for (let i = 1; i < rows.length; i++) {

      const cols = rows[i].split(',');

      const index = cols[0].trim();

      const value = Number(cols[1].replace(/"/g, '').trim());

      values[index] = value;

      const tr = document.createElement('tr');

      tr.innerHTML = `
        <td>${index}</td>
        <td>${value}</td>
      `;

      tableBody.appendChild(tr);
    }

  
    const alpha = values['A5'] + values['A20'];
    const beta = values['A15'] / values['A7'];
    const charlie = values['A13'] * values['A12'];

    document.getElementById('alpha').textContent = alpha;
    document.getElementById('beta').textContent = beta;
    document.getElementById('charlie').textContent = charlie;
  })
  .catch(error => {
    console.error('Error loading CSV:', error);
  });

document.addEventListener('click', function(e) {

  if (e.target.tagName === 'TD' && e.target.cellIndex === 1) {

    const currentValue = e.target.innerText;

    const input = document.createElement('input');

    input.type = 'number';
    input.value = currentValue;

    input.style.width = '80px';
    input.style.padding = '5px';
    input.style.borderRadius = '8px';
    input.style.border = 'none';

    e.target.innerHTML = '';
    e.target.appendChild(input);

    input.focus();

    input.addEventListener('blur', () => {

      e.target.innerHTML = input.value;

      updateTable2();
    });
  }
});

function updateTable2() {

  const rows = document.querySelectorAll('#table1 tbody tr');

  let values = {};

  rows.forEach(row => {

    const index = row.cells[0].innerText;

    const value = Number(row.cells[1].innerText);

    values[index] = value;
  });

  document.getElementById('alpha').textContent =
    values['A5'] + values['A20'];

  document.getElementById('beta').textContent =
    values['A15'] / values['A7'];

  document.getElementById('charlie').textContent =
    values['A13'] * values['A12'];
}