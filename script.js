fetch('Table_Input.csv')
  .then(response => response.text())
  .then(data => {

    const rows = data.trim().split('\n');

    const tableBody = document.querySelector('#table1 tbody');

    let values = {};

    // Skip header row
    for (let i = 1; i < rows.length; i++) {

      const cols = rows[i].split(',');

      const index = cols[0].trim();

      // remove quotes if exist
      const value = Number(cols[1].replace(/"/g, '').trim());

      values[index] = value;

      const tr = document.createElement('tr');

      tr.innerHTML = `
        <td>${index}</td>
        <td>${value}</td>
      `;

      tableBody.appendChild(tr);
    }

    // Calculations
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