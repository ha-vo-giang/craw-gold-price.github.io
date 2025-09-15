const type = {
  vang: 'VANG',
  ngoai_te: 'NGOAI_TE'
}

const socket = io('https://ato.io.vn');
socket.on('vang247:prices:response', (data) => {
    renderAllTables(data.data)
});

setInterval(() => {
  $('.time_current').text(moment().format("DD/MM/YYYY HH:mm:ss"))
}, 200);

function renderAllTables(data) {
  // 1. Giá vàng tham khảo (vsg_gold_table + goldenFund95, goldenFund99)
  let html_reference_gold_price = '';
  if (data.vsg_gold_table) {
    data.vsg_gold_table.forEach(row => {
      html_reference_gold_price += `
        <tr>
          <th>${row.name}</th>
          <td class="numeric">${formatHtmlCurrency(row.saigon.buy)}</td>
          <td class="numeric">${formatHtmlCurrency(row.saigon.sell)}</td>
          <td class="numeric" style="${getColor(row.saigon.buy_change)}">${formatHtmlCurrency(row.saigon.buy_change)}</td>
          <td class="numeric" style="${getColor(row.gap)}">${formatHtmlCurrency(row.gap)}</td>
        </tr>
      `;
    });
  }
  // Bổ sung goldenFund95, goldenFund99 nếu có
  if (data.goldenFund95) {
    const row = data.goldenFund95;
    html_reference_gold_price += `
      <tr>
        <th>${row.name}</th>
        <td class="numeric">${formatHtmlCurrency(row.saigon.buy)}</td>
        <td class="numeric">${formatHtmlCurrency(row.saigon.sell)}</td>
        <td class="numeric" style="${getColor(row.saigon.buy_change)}">${formatHtmlCurrency(row.saigon.buy_change)}</td>
        <td class="numeric" style="${getColor(row.gap)}">${formatHtmlCurrency(row.gap)}</td>
      </tr>
    `;
  }
  if (data.goldenFund99) {
    const row = data.goldenFund99;
    html_reference_gold_price += `
      <tr>
        <th>${row.name}</th>
        <td class="numeric">${formatHtmlCurrency(row.saigon.buy)}</td>
        <td class="numeric">${formatHtmlCurrency(row.saigon.sell)}</td>
        <td class="numeric" style="${getColor(row.saigon.buy_change)}">${formatHtmlCurrency(row.saigon.buy_change)}</td>
        <td class="numeric" style="${getColor(row.gap)}">${formatHtmlCurrency(row.gap)}</td>
      </tr>
    `;
  }
  $("#reference_gold_price tbody").html(html_reference_gold_price);

  // 2. Giá vàng toàn quốc (goldNationWide)
  let html_gold_nationwide = '';
  if (data.goldNationWide) {
    data.goldNationWide.forEach(row => {
      html_gold_nationwide += `
        <tr>
          <th>${row.name}</th>
          <td class="numeric">${formatHtmlCurrency(row.hanoi.buy)}</td>
          <td class="numeric">${formatHtmlCurrency(row.hanoi.sell)}</td>
          <td class="numeric" style="${getColor(row.hanoi.buy_change)}">${formatHtmlCurrency(row.hanoi.buy_change)}</td>
          <td class="numeric">${formatHtmlCurrency(row.saigon.buy)}</td>
          <td class="numeric">${formatHtmlCurrency(row.saigon.sell)}</td>
          <td class="numeric" style="${getColor(row.saigon.buy_change)}">${formatHtmlCurrency(row.saigon.buy_change)}</td>
        </tr>
      `;
    });
  }
  $("#gold_nationwide tbody").html(html_gold_nationwide);

  // 3. Giá vàng SJC trong nước (sjcNationWide)
  let html_domestic_sjc = '';
  if (data.sjcNationWide) {
    data.sjcNationWide.forEach(row => {
      html_domestic_sjc += `
        <tr>
          <th>${row.name}</th>
          <td class="numeric">${formatHtmlCurrency(row.hanoi.buy)}</td>
          <td class="numeric">${formatHtmlCurrency(row.hanoi.sell)}</td>
          <td class="numeric" style="${getColor(row.hanoi.buy_change)}">${formatHtmlCurrency(row.hanoi.buy_change)}</td>
          <td class="numeric">${formatHtmlCurrency(row.saigon.buy)}</td>
          <td class="numeric">${formatHtmlCurrency(row.saigon.sell)}</td>
          <td class="numeric" style="${getColor(row.saigon.buy_change)}">${formatHtmlCurrency(row.saigon.buy_change)}</td>
        </tr>
      `;
    });
  }
  // Nếu muốn giữ bảng cũ chỉ có Sài Gòn, hãy điều chỉnh lại html và bảng tương ứng
  $("#domestic_sjc tbody").html(html_domestic_sjc);

  // 4. Ngoại tệ tham khảo (currencyNationWide)
  let html_foreign_currency_reference = '';
  if (data.currencyNationWide) {
    data.currencyNationWide.forEach(row => {
      html_foreign_currency_reference += `
        <tr>
          <th>${row.name}</th>
          <td class="numeric">${formatHtmlCurrency(row.hanoi.buy)}</td>
          <td class="numeric">${formatHtmlCurrency(row.hanoi.sell)}</td>
          <td class="numeric" style="${getColor(row.hanoi.buy_change)}">${formatHtmlCurrency(row.hanoi.buy_change)}</td>
          <td class="numeric">${formatHtmlCurrency(row.saigon.buy)}</td>
          <td class="numeric">${formatHtmlCurrency(row.saigon.sell)}</td>
          <td class="numeric" style="${getColor(row.saigon.buy_change)}">${formatHtmlCurrency(row.saigon.buy_change)}</td>
          <td class="numeric">${row.rate ? formatHtmlCurrency(row.rate) : 0}</td>
        </tr>
      `;
    });
  }
  $("#foreign_currency_reference tbody").html(html_foreign_currency_reference);

  // 5. Giá bạc tham khảo (silver_price)
  let html_silver_reference = '';
  if (data.silver_price) {
    data.silver_price.forEach(row => {
      html_silver_reference += `
        <tr>
          <th>${row.name}</th>
          <td class="numeric">${formatHtmlCurrency(row.hanoi.buy)}</td>
          <td class="numeric">${formatHtmlCurrency(row.hanoi.sell)}</td>
          <td class="numeric" style="${getColor(row.hanoi.buy_change)}">${formatHtmlCurrency(row.hanoi.buy_change)}</td>
          <td class="numeric">${formatHtmlCurrency(row.saigon.buy)}</td>
          <td class="numeric">${formatHtmlCurrency(row.saigon.sell)}</td>
          <td class="numeric" style="${getColor(row.saigon.buy_change)}">${formatHtmlCurrency(row.saigon.buy_change)}</td>
        </tr>
      `;
    });
  }
  $("#silver_reference tbody").html(html_silver_reference);
}

function formatHtmlCurrency(amount) {
  if (amount === null || amount === undefined || isNaN(amount)) return '-';
  return formatCurrency(amount);
}

function formatCurrency(amount) {
  return Number(amount).toLocaleString('en-US');
}

function getColor(text) {
  return (text + '').includes('-') ? 'color:rgb(246, 70, 93);' : 'color:rgb(14, 203, 129);';
}