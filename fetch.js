// 14. Запросы на сервер. Fetch

// const requestUrl = 'https://jsonplaceholder.typicode.com/users';
//
// function sendRequest(method, url, body = null) {
// 	const headers = {
// 		'Content-Type': 'application/json'
// 	};
//
// 	return fetch(url, {
// 		method: method,
// 		body: JSON.stringify(body),
// 		headers: headers
// 	})
// 		.then(response => {
// 			if (response.ok) {
// 				return response.json();
// 			}
//
// 			return response.json().then(error => {
// 				const e = new Error('Что-то пошло не так...');
// 				e.data = error;
// 				throw e;
// 			});
// 		});
// }
//
// // sendRequest('GET', requestUrl)
// // 	.then(data => console.log(data))
// // 	.catch(err => console.log(err));
//
// const postBody = {name: 'Serg', age: 25};
//
// sendRequest('POST', requestUrl, postBody)
// 	.then(data => console.log(data))
// 	.catch(err => console.log(err));
