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

function renderData(data){
    console.log(data)
}