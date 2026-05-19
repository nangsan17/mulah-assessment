fetch('./Table_Input.csv')
  .then(response => response.text())
  .then(data => {

    const lines = data.trim().split('\n');

    const tableBody = document.querySelector('#table1 tbody');

    let values = {};

    for (let i = 1; i < lines.length; i++) {

      const [index, value] = lines[i]
        .split(',')
        .map(item => item.trim());

      values[index] = Number(value);

      const row = `
        <tr>
          <td>${index}</td>
          <td class="editable">${value}</td>
        </tr>
      `;

      tableBody.innerHTML += row;
    }

    document.getElementById('alpha').innerText =
  values['A5'] + values['A20'];

    document.getElementById('beta').innerText =
      values['A15'] / values['A7'];

    document.getElementById('charlie').innerText =
      values['A13'] * values['A12'];
  });