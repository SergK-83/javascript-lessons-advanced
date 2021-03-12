// 14. Запросы на сервер. Fetch, XMLHttpRequest (XHR), Ajax

const requestUrl = 'https://jsonplaceholder.typicode.com/users';

function sendRequest(method, url, body = null) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    xhr.open(method, url);

    xhr.responseType = 'json'; // указывам в каком формате получить ответ
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onload = () => {
      if (xhr.status >= 400) { // все,что больше статуса 400 - это ошибки
        reject(xhr.response);
      }
      // console.log(JSON.parse(xhr.response));
      resolve(xhr.response);
    }

    xhr.onerror = () => {
      reject(xhr.response);
    }

    xhr.send(JSON.stringify(body)); // здесь мы должны отправлять именно строку
  });
}

// sendRequest('GET', requestUrl)
//   .then(data => console.log(data))
//   .catch(err => console.log(err));

const postBody = {name: 'Serg', age: 25};

sendRequest('POST', requestUrl, postBody)
  .then( data => console.log(data) )
  .catch(err => console.log(err));
