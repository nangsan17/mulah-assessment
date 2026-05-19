fetch('Table_Input.csv')
  .then(response => response.text())
  .then(data => {

    const tableBody = document.querySelector('#table1 tbody');

    let values = {};

    // Split rows properly
    const rows = data.trim().split(/\r?\n/);

    // Skip header
    for (let i = 1; i < rows.length; i++) {

      // Support comma or semicolon CSV
      const cols = rows[i].split(/,|;/);

      const index = cols[0].replace(/"/g, '').trim();

      const value = Number(
        cols[1].replace(/"/g, '').trim()
      );

      values[index] = value;

      const tr = document.createElement('tr');

      tr.innerHTML = `
        <td>${index}</td>
        <td class="editable">${value}</td>
      `;

      tableBody.appendChild(tr);
    }

    updateTable2(values);

    // Editable cells
    document.querySelectorAll('.editable').forEach(cell => {

      cell.addEventListener('click', function () {

        if (this.querySelector('input')) return;

        const oldValue = this.innerText;

        const input = document.createElement('input');

        input.type = 'number';
        input.value = oldValue;

        input.style.width = '80px';
        input.style.padding = '8px';
        input.style.borderRadius = '8px';
        input.style.border = 'none';
        input.style.textAlign = 'center';

        this.innerHTML = '';
        this.appendChild(input);

        input.focus();

        input.addEventListener('blur', () => {

          this.innerHTML = input.value;

          // Rebuild values object
          values = {};

          document.querySelectorAll('#table1 tbody tr')
            .forEach(row => {

              const key = row.cells[0].innerText;

              const val = Number(row.cells[1].innerText);

              values[key] = val;
            });

          updateTable2(values);
        });
      });
    });
  })

  .catch(error => {
    console.error(error);
  });

function updateTable2(values) {

  document.getElementById('alpha').textContent =
    (values['A5'] || 0) + (values['A20'] || 0);

  document.getElementById('beta').textContent =
    ((values['A15'] || 0) / (values['A7'] || 1)).toFixed(2);

  document.getElementById('charlie').textContent =
    (values['A13'] || 0) * (values['A12'] || 0);
}