fetch('Table_Input.csv')
  .then(response => response.text())
  .then(data => {

    const rows = data.trim().split('\n');

    const tableBody = document.querySelector('#table1 tbody');

    let values = {};

    for (let i = 1; i < rows.length; i++) {

      const cols = rows[i].split(',');

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

    document.querySelectorAll('.editable').forEach(cell => {

      cell.addEventListener('click', function () {

        // Prevent multiple inputs
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

          const newValue = Number(input.value);

          this.innerHTML = newValue;

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
    console.error('CSV Loading Error:', error);
  });


function updateTable2(values) {

  const alpha = values['A5'] + values['A20'];

  const beta = values['A15'] / values['A7'];

  const charlie = values['A13'] * values['A12'];

  document.getElementById('alpha').textContent = alpha;

  document.getElementById('beta').textContent = beta;

  document.getElementById('charlie').textContent = charlie;
}