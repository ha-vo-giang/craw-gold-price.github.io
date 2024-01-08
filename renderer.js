const type = {
  vang: 'VANG',
  ngoai_te: 'NGOAI_TE'
}

var eventSource = new EventSource('https://api.vangsaigon.vn/api/server-sent-events/get-price');

eventSource.onmessage = function (event) {
    let data = JSON.parse(event.data)
    renderData(data)
};

eventSource.onerror = function(error) {
  console.error('Encountered error: ' + error);
};

eventSource.onopen = function(event) {
  console.log('Connection opened');
};

function renderData(data) {
  let resultGroup = groupBy(data.objectSocket, (c) => c.type)
  let html_reference_gold_price = ''
  let html_domestic_sjc = ''
  let html_foreign_currency_reference = ''

  resultGroup[type.vang].forEach(value => {
    if(value.name === 'Vàng TG') value.gPA = 0
    html_reference_gold_price += `
    <tr>
      <th>${value.name}</th>
      <td>${formatHtmlCurrency(value.buy)}</td>
      <td>${formatHtmlCurrency(value.sell)}</td>
      <td style="${getColor(value.changePercent)}">${value.changePercent}</td>
      <td style="${getColor(value.gPA)}">${formatHtmlCurrency(value.gPA)}</td>
    </tr>
    `
  });
  data.objectApi.goldScjTcNh.forEach(value => {
    html_domestic_sjc += `
    <tr>
      <th>${value.name}</th>
      <td>${formatHtmlCurrency(value.buy)}</td>
      <td>${formatHtmlCurrency(value.sell)}</td>
      <td style="${getColor(value.change)}">${formatHtmlCurrency(value.change)}</td>
    </tr>
    `
  });
  resultGroup[type.ngoai_te].forEach(value => {
    html_foreign_currency_reference += `
    <tr>
      <th><span><img src="${value.imageUrl}" alt="PHP" width="14" height=""> ${value.name}</span></th>
      <td>${formatHtmlCurrency(value.buy)}</td>
      <td>${formatHtmlCurrency(value.sell)}</td>
      <td style="${getColor(value.price)}">${formatHtmlCurrency(value.price)}</td>
      <td style="${getColor(value.changePercent)}">${value.changePercent}</td>
    </tr>
    `
  });

  $("#reference_gold_price tbody").html(html_reference_gold_price)
  $("#domestic_sjc tbody").html(html_domestic_sjc)
  $("#foreign_currency_reference tbody").html(html_foreign_currency_reference)
  console.log(data)
}

function groupBy(xs, f) {
  return xs.reduce((r, v, i, a, k = f(v)) => ((r[k] || (r[k] = [])).push(v), r), {});
}

function formatHtmlCurrency(amount) {
  return formatCurrency(amount);
}

function formatCurrency(amount) {
  return amount.toLocaleString('en-US');
}

function getColor(text) {
  return (text + '').includes('-') ? 'color:rgb(246, 70, 93);' : 'color:rgb(14, 203, 129);';
}