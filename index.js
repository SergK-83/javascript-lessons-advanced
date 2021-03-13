'use strict'

// ### 1. prototype - это определенный объект, который присутствует у объектов и он вызывается по цепочке сверху вниз. С помощью этого объекта мы расширяем свойства объектов или классов. И с помощью него мы можем устраивать определенное наследование внутри js.
const person = new Object({
	name: 'Max',
	age: 25,
	greet: function () {
		console.log('Greet!');
	}
});

Object.prototype.sayHello = function () {
	console.log('Hello');
};

const lena = Object.create(person);

lena.name = 'Elena';

const str = new String('I am string');

// console.log(str.sayHello());

const array = [1, 2, 3, 4, 5];

// function multBy(arr, n) {
//     return arr.map(function (i) {
//         return i * n;
//     });
// }

Array.prototype.multBy = function (n) {
	return this.map(function (i) {
		return i * n;
	});
}

// console.log(array.multBy(2));

// ==============================================

// ### 2. Контекст this. Как работает call, bind, apply

function hello() {
	console.log('Hello', this);
}

// const person2 = {
//   name: 'Max',
//   age: 25,
//   sayHello: hello,
//   sayHelloWindow: hello.bind(window),
//   logInfo: function (job, phone) {
//     console.log(this);
//     console.group(`${this.name} info:`)
//     console.log(`Name is ${this.name}`);
//     console.log(`Age is ${this.age}`);
//     console.log(`Job is ${job}`);
//     console.log(`Phone is ${phone}`);
//     console.groupEnd();
//   }
// };
//
// const lena2 = {
//   name: 'Elena2',
//   age: 23
// }

// person2.logInfo.bind(lena2, 'Frontend', '8-999-999-99-99')();
// // метод bind() возвращает новую функцию, не вызывая её
//
// person2.logInfo.call(lena2, 'Frontend', '8-999-999-99-99');
// // метод call() сразу вызывает функцию
//
// person2.logInfo.apply(lena2, ['Frontend', '8-999-999-99-99']);
// // метод apply() сразу вызывает функцию, второй параметр всегда массив

// =================================================

// ### 3. Замыкания. Как они работают

function createCalcFunc(n) {
	return function () {
		console.log(1000 * n);
	}
}

const calc = createCalcFunc(42);

// calc();

function createIncrementor(n1) {
	return function (n2) {
		return n1 + n2;
	};
}

const addOne = createIncrementor(1);

// console.log(addOne(10));

function urlGenerator(domain) {
	return function (url) {
		return `https://${url}.${domain}`;
	}
}

const comUrl = urlGenerator('com');
const ruUrl = urlGenerator('ru');

// console.log(comUrl('google'));
// console.log(ruUrl('yandex'));

/*
 Написать свою функцию bind
 Пример работы:

 function logPerson() {
    console.log(`Person: ${this.name}, ${this.age}, ${this.job}`);
 }

 const person3 = {name: "Volt", age: 22, job: 'Frontend'};
 const person4 = {name: "Jon", age: 23, job: 'SMM'};

 bind(person3, logPerson);
 bind(person4, logPerson);
 */

function logPerson() {
	console.log(`Person: ${this.name}, ${this.age}, ${this.job}`);
}

const person3 = {name: "Volt", age: 22, job: 'Frontend'};
const person4 = {name: "Jon", age: 23, job: 'SMM'};

function bind(context, fn) {
	return function (...args) {
		fn.apply(context, args);
	}();
}

// bind(person3, logPerson);
// bind(person4, logPerson);

// ===============================================

// ### 4. Асинхронность.Что такое Event Loop. JS SetTimeout 0

/*
Как Event Loop работает:

console.log('Start1');
console.log('Start2');

setTimeout(function () {
    console.log('Inside timeout, after 2 sec');
}, 2000);

Программа бежит по строчкам кода.
Когда интерпретатор доходит до setTimout, он закидывает его (setTimout) в стек Call Stack. В стеке определяется что setTimout - это некий браузерный api. Далее setTimout выкидывается из стека, но регистрируется вложенная в него функция "console.log('Inside timeout, after 2 sec');". Далее ожидается пока браузерный api выполнит setTimout, после чего функция "console.log('Inside timeout, after 2 sec');" попадает в так называемую очередь Callback Queue. Здесь в цикле Event Loop проверяется, если функция готова, то она закидывается обратно в стек и выполняется. Т.е. поток не блокируется.
Асинхронные операции: setTimeout, слушатели событий (scroll, click), работа с сервером.
 */

/*
http://latentflip.com/loupe
 */

// ================================================

// ### 5. Promise - это определенная обертка над асинхронностью, которая добавляет удобства для написания кода

// console.log('Request data...');

// const p = new Promise(function (resolve, reject) {
//     setTimeout(() => {
//         console.log('Preparing data...');
//         const backendData = {
//             server: 'aws',
//             port: 2000,
//             status: 'working'
//         };
//         resolve(backendData);
//     }, 2000);
// });
//
// p.then(data => {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             data.modified = true;
//             resolve(data);
//         }, 2000)
//     });
// })
//     .then(clientData => {
//         clientData.fromPromise = true;
//         return clientData;
//     })
//     .then(data => {
//         console.log('Modified', data);
//     })
//     .catch(err => console.error('Error: ', err))
//     .finally(() => console.log('Finally'));

const sleep = ms => {
	return new Promise(resolve => {
		setTimeout(() => resolve(), ms);
	});
};

// sleep(2000).then(() => console.log('After 2 sec'));
// sleep(3000).then(() => console.log('After 3 sec'));

// Promise.all([sleep(2000), sleep(5000)]).then(() => {
//     console.log('All promises'); // отработает, когда выполнятся все промисы
// });
//
// Promise.race([sleep(2000), sleep(5000)]).then(() => {
//     console.log('Race promises'); // отработает, когда выполнится самый быстрый promise
// });

// ===========================================================

// ### 6. Объекты с Object.create. Что такое getters, setters

const person5 = Object.create(
	{
		calculateAge() {
			console.log('Age: ', new Date().getFullYear() - this.birthYear);
		}
	},
	{
		name: {
			value: 'Sergey',
			enumerable: true,
			writable: true,
			configurable: true
		},
		birthYear: {
			value: 1983,
			enumerable: false,
			writable: false,
			configurable: false
		},
		age: {
			get() {
				return new Date().getFullYear() - this.birthYear;
			},
			set(value) {
				document.body.style.background = '#ccc';
				console.log('Set age ', value);
			}
		},
		logName: {
			value: function () {
				console.log(this.name);
			},
			enumerable: true
		}
	}
);


// for (let key in person5) {
//     if (person5.hasOwnProperty(key)) {
//         console.log(key + ': ' + person5[key]);
//     }
// }

// ======================================================

// ### 7. Все о ES6 Классах

class Animal {
	static type = 'ANIMAL'; // static переменная доступна только у самоого класса Animal

	constructor(options) {
		this.name = options.name;
		this.age = options.age;
		this.hasTail = options.hasTail;
	}

	voice() {
		console.log('I am Animal');
	}
}

// const animal = new Animal({
//    name: 'Animal',
//    age: 5,
//    hasTail: true
// });

class Cat extends Animal {
	static type = 'CAT';

	constructor(options) {
		super(options);
		this.color = options.color;
	}

	voice() {
		super.voice();
		console.log('I am cat');
	}

	get ageInfo() {
		return this.age * 7;
	}

	set ageInfo(newAge) {
		this.age = newAge;
	}
}

const cat = new Cat({
	name: 'Cat',
	age: 7,
	hasTail: true,
	color: 'black'
});

class Component {
	constructor(selector) {
		this.$el = document.querySelector(selector);
	}

	hide() {
		this.$el.style.display = 'none';
	}

	show() {
		this.$el.style.display = 'block';
	}
}

class Box extends Component {
	constructor(options) {
		super(options.selector);
		this.$el.style.width = this.$el.style.height = options.size + 'px';
		this.$el.style.backgroundColor = options.backgroundColor;
	}
}

// const box1 = new Box({
//     selector: '#box1',
//     size: 100,
//     backgroundColor: 'red'
// });

class Circle extends Box {
	constructor(options) {
		super(options);
		this.$el.style.borderRadius = '50%';
	}
}

// const circle = new Circle({
//     selector: '#circle1',
//     size: 90,
//     backgroundColor: 'green'
// })

// ===================================================

// ### 8. Async, Await. Работа с сервером c fetch

const delay = ms => {
	return new Promise(resolve => setTimeout(() => resolve(), ms));
};

// delay(2000).then(() => console.log('2 sec'));

const url = 'https://jsonplaceholder.typicode.com/todos/1';

// https://jsonplaceholder.typicode.com/

// function fetchTodos() {
//   console.log('Fetch todos started...')
//   return delay(2000)
//     .then(() => {
//       return fetch(url); // fetch возвращает promise
//     })
//     .then(response => response.json())
// }
//
// fetchTodos()
//   .then(data => {
//     console.log(data);
//   })
//   .catch(error => console.error(error));

// чтобы использовать await функция должна быть async
async function fetchAsyncTodos() { // async function всегда возвращает promise
	console.log('Fetch todos started...')
	try {
		await delay(2000); // пока await не завершится, дальше код не выполнится
		const response = await fetch(url);
		return await response.json();
	} catch (err) {
		console.error(err);
	} finally {
		console.log('finally');
	}
}

// fetchAsyncTodos().then(data => console.log(data));

// ==================================================

// ### 9. Proxy. Объекты, функции, классы.

// proxy with objects
const user = {
	name: 'Serg',
	age: 25,
	job: 'Fullstack'
}

const op = new Proxy(user, {
	get(target, prop) {
		console.log(`Getting prop ${prop}`);

		if (!(prop in target)) {
			return prop.split('_').map(p => target[p]).join(' ');
		}

		return target[prop];
	},
	set(target, prop, value) {
		if (prop in target) {
			target[prop] = value;
		} else {
			throw new Error(`No "${prop}" field in target`);
		}
	},
	has(target, prop) {
		return ['name', 'name', 'job'].includes(prop);
	},
	deleteProperty(target, prop) {
		console.log(`deleting of ${prop}`);
		delete target[prop];
		return true;
	}
});

// proxy with functions

const log = text => `Log: ${text}`;

const fp = new Proxy(log, {
	apply(target, thisArg, args) {
		console.log('Calling fn...');

		return target.apply(thisArg, args).toUpperCase();
	}
});

// proxy with classes

class UserForProxy {
	constructor(name, age) {
		this.name = name;
		this.age = age;
	}
}

const UserProxy = new Proxy(UserForProxy, {
	construct(target, args) {
		console.log('Construct...');

		return new Proxy(new target(...args), {
			get(target, prop) {
				console.log(`Getting prop "${prop}"`);
				return target[prop];
			}
		});
	}
});

// const p = new UserProxy('Max', 30);

// ====================================================

// ### 10. Proxy. Примеры.

// Wrapper
const withDefaultValue = (target, defaultValue = 0) => {
	return new Proxy(target, {
		get: (obj, prop) => (prop in obj ? obj[prop] : defaultValue)
	});
}

const position = withDefaultValue(
	{
		x: 24,
		y: 42
	},
	0
);

// Hidden properties
const withHiddenProps = (target, prefix = '_') => {
	return new Proxy(target, {
		has: (obj, prop) => (prop in obj) && (!prop.startsWith(prefix)),
		ownKeys: obj => Reflect.ownKeys(obj)
			.filter(p => !p.startsWith(prefix)),
		get: (obj, prop, receiver) => (prop in receiver ? obj[prop] : void 0)
	});
}

const data = withHiddenProps({
	name: 'Serg',
	age: 25,
	_uid: '123123' // свойства, начинающиеся с "_" будут недоступны ('_uid' in data, for (let key in data) console.log(key), Object.keys(data)
});

/*
Optimization
Поиск элемента по id.
Здесь arr.find() (по-сути цикл по всему массиву) при многократном использовании может быть весьма затратной операцией при большом количестве элементов в массиве. С помощью proxy можно создать обертку, которая будет существенно оптимизировать данный процесс.
 */
const userData = [
	{id: 1, name: 'Serg', job: 'Fullstack', age: 25},
	{id: 2, name: 'Max', job: 'Student', age: 23},
	{id: 3, name: 'Jon', job: 'Backend', age: 32},
];

const IndexArray = new Proxy(Array, {
	construct(target, [args]) {
		const index = {};
		args.forEach(item => index[item.id] = item);

		return new Proxy(new target(...args), {
			get(arr, prop) {
				switch (prop) {
					case 'push':
						return item => {
							index[item.id] = item; // немного поправили стандартный push для array.
							arr[prop].call(arr, item);
						};
					case 'findById': // создали новый метод для array
						return id => index[id];
					default:
						return arr[prop];
				}
			}
		});
	}
});

const users = new IndexArray(userData);

// ======================================================

// ### 11. Генераторы. Symbol iterator, for of

// Генераторы. Порционно выдаем результат
function* strGenerator() {
	yield 'H';
	yield 'e';
	yield 'l';
	yield 'l';
	yield 'o';
}

const strGen = strGenerator();

// console.log(strGen.next());
// console.log(strGen.next().value);
// console.log(strGen.next().value);

function* numberGen(n = 10) {
	for (let i = 0; i < n; i++) {
		yield i;
	}
}

const num = numberGen(7);

const iterator = { // повторяем логику генератора
	gen(n = 10) {
		let i = 0;
		return {
			next() {
				if (i < n) {
					return {value: ++i, done: false};
				}
				return {value: undefined, done: true};
			}
		}
	}
}

const itr = iterator.gen(7);

// console.log(itr.next());
// console.log(itr.next().value);
// console.log(itr.next().value);

function* iter(n = 10) {
	for (let i = 0; i < n; i++) {
		yield i;
	}
}

// в генераторах определен Symbol.iterator, который позволяет работать в цикле for...of

// for (let k of strGenerator) {
//   console.log(k);
// }

// ================================================

// ### 12. Методы массивов (forEach, map, filter, reduce, find, findIndex). Js Массивы.

const peopleList = [
	{id: 1, name: 'Serg', job: 'Fullstack', age: 25, budget: 150000},
	{id: 2, name: 'Max', job: 'Student', age: 23, budget: 25000},
	{id: 3, name: 'Jon', job: 'Backend', age: 32, budget: 5400},
	{id: 4, name: 'Vera', job: 'Backend', age: 17, budget: 38000},
];

// for (let i = 0; i < peopleList.length; i++) {
//   console.log(peopleList[i]);
// }

// for (let item of peopleList) { // ES6 синтаксис
//   console.log(item);
// }

// ForEach
// peopleList.forEach(function (item, index, array) {
//   console.log(item);
//   console.log(index);
//   console.log(array);
// });

// peopleList.forEach(people => console.log(people));

// Map создает новый массив
const newList = peopleList
	.map((people, index, arr) => {
		return `${people.name} ${people.age}`;
	});

// Filter фильтрует по условию исходный массив.
const filteredList = peopleList
	.filter((people, index, arr) => people.age > 17);

// Reduce
const budgetSum = peopleList
	.reduce((sum, people, index, arr) => sum + people.budget, 0);

// Find находим по условию нужный элемент
const itemSerg = peopleList
	.find((people, index, arr) => people.name === 'Serg');

// FindIndex находим индекс элемента
const itemSergIndex = peopleList
	.findIndex((people, index, arr) => people.name === 'Serg');

// Выстраиваем цепочку методов - чейны
const newArrData = peopleList
	.filter(people => people.budget > 10000)
	.map(people => {
		return {
			info: `${people.name} ${people.age}`,
			budget: people.budget * 1.3
		}
	})
	.reduce((acc, item) => acc + item.budget, 0);

// ================================================

// ### 13. Map, Set, WeakMap, WeakSet

const obj_13 = {
	name: 'Serg',
	age: 37,
	job: 'fullstack'
};

const entries_13 = [
	['name', 'Serg'],
	['age', 37],
	['job', 'fullstack']
];

// console.log(Object.entries(obj_13)); // [ [ 'name', 'Serg' ], [ 'age', 37 ], [ 'job', 'fullstack' ] ]
//
// console.log(Object.fromEntries(entries_13)); // { name: 'Serg', age: 37, job: 'fullstack' }

// map

const map_13 = new Map(entries_13);

// console.log(map_13.get('job'));

map_13
	.set('newField', 42)
	.set(obj_13, 'Value of object') // здесть ключами могут быть объекты
	.set(NaN, 'NaN ??'); // ключом может быть даже NaN

// console.log(map_13);
// map_13.delete('job'); // удаление ключа
// console.log(map_13.has('job')); // проверка наличия ключа
// console.log(map_13.size);
// map_13.clear(); // очистка карты
// console.log(map_13.size);

// console.log(map_13.entries())

// for (let [key, value] of map_13) { // при итерации по карте по умолчанию вызывается метод entries()
//   console.log(key, value);
// }

// console.log(map_13.values()); // вывод значений
// console.log(map_13.keys());

// map_13.forEach((val, key, map) => {
//   console.log(key, val);
// });

// const arr_13 = [...map_13];
// const arr_13_2 = Array.from(map_13);
// const mapObj_13 = Object.fromEntries(map_13);
//
// console.log(mapObj_13);

// ПРИМЕР map. Для каждого пользователя нужно записать, когда он посещал сайт
const users_13 = [
	{name: 'Alex', age: 23},
	{name: 'Max', age: 28},
	{name: 'Irina', age: 24},
];

const visitsUsers_13 = new Map();

visitsUsers_13
	.set(users_13[0], new Date())
	.set(users_13[1], new Date(new Date().getTime() + 1000 * 60))
	.set(users_13[2], new Date(new Date().getTime() + 5000 * 60));

function lastVisit(user) {
	return visitsUsers_13.get(user);
}

// console.log( lastVisit(users_13[1]) );

// Set

const set_13 = new Set([1, 2, 3, 3, 4, 5, 5, 6]);

// console.log(set_13); // { 1, 2, 3, 4, 5, 6 } значения в единственном экземпляре

set_13.add(10).add(20).add(20);

// console.log(set_13.has(40));
// console.log(set_13.size);

// set_13.delete(2);
// set_13.clear();

// console.log(set_13.values());
// console.log(set_13.keys());
// console.log(set_13.entries());

// for (let key of set_13) {
//   console.log(key);
// }

// ПРИМЕР set. Возврат уникальных знычений из массива
function uniqueValues(arr) {
	return [...new Set(arr)]; // Array.from(new Set(arr))
}

// console.log(uniqueValues([1, 2, 3, 3, 4, 5, 5, 6]));

// WeakMap с помощью этого можно избегать различных утечек данных в javascript. Ключами могут являться только объекты

let obj_13_2 = {name: 'weakmap'};

// const arr_13 = [obj_13_2];
//
// obj_13_2 = null;
//
// console.log(obj_13_2);

const weakMap = new WeakMap([ // ключами могут являться только объекты
	[obj_13_2, 'obj data']
]);
// у WeakMap есть только get, set, delete, has

obj_13_2 = null;

// console.log(weakMap.has(obj_13_2)); // false
// console.log(weakMap);

// ПРИМЕР WeakMap. Если в кэше есть пользователь, возвращаем его значение. Если пользователя нет в кэше, сначала добавляем в кэш пользователя, добавляем ему значение и затем возврашаем его.
const cache = new WeakMap();

function cacheUser(user) {
	if (!cache.has(user)) {
		cache.set(user, Date.now());
	}
	return cache.get(user);
}

let userLena = {name: 'Lena'};
let userMax = {name: 'Max'};

cacheUser(userLena);
cacheUser(userMax);

userLena = null;

// console.log(cache.has(userLena));
// console.log(cache.has(userMax));

// WeakSet. Значениями могут являться только объекты. И Если какой-то объект вычищается сборщиком мусора, то тогда он удаляется из WeakSet.

const users_13_2 = [
	{name: 'Alex', age: 23},
	{name: 'Max', age: 28},
	{name: 'Irina', age: 24},
];

const visits_13 = new WeakSet();

visits_13.add(users_13_2[0]).add(users_13_2[1]);

users_13_2.splice(1, 1);

// console.log(visits_13.has(users_13_2[0]));
// console.log(visits_13.has(users_13_2[1]));

// =================================================

// 14. Запросы на сервер. Fetch, XMLHttpRequest (XHR), Ajax

// XMLHttpRequest - Смотреть файл xhr.js

// Fetch - Смотреть файл fetch.js

// ==================================================

// 15. Spread и Rest - операторы в ES6 синтаксисе.

const citiesRussia = ["Москва", "Казань", "Томск", "Новосибирск"];
const citiesEurope = ["Берлин", "Прага", "Париж"];

// Spread
// console.log(...citiesRussia); // Москва Казань Томск Новосибирск. Разворачивает массив строк.

const allCitiesConcat = citiesEurope.concat(citiesRussia, "Вашингтон")
const allCities = [...citiesRussia, "Вашингтон", ...citiesEurope];

// console.log(allCities); // объединили массивы в один

const citiesRussiaWithPopulation = {
	Moscow: 20,
	SaintPetersburg: 8,
	Kazan: 5,
	Novosibirsk: 3
};

const citiesEuropeWithPopulation = {
	Moscow: 30,
	Berlin: 10,
	Praha: 3,
	Paris: 2
};

// console.log(...citiesRussiaWithPopulation); // TypeError: Found non-callable @@iterator

// console.log({...citiesRussiaWithPopulation}); // Объекты нужно раскрывать в объекте. Происходит клонирование объектов в новый объект.

// console.log({...citiesRussiaWithPopulation, ...citiesEuropeWithPopulation});

// ПРАКТИКА.
// const numbers = [4, 6, 32, 98, 5];

// console.log(Math.max.apply(null, numbers));
// console.log(Math.max(...numbers));

// const divs = document.querySelectorAll('div');

// console.log(divs.map); // Error: divs.map is not a function. Здесь divs - это не массив, это спец. коллекция dom-элементов;

// const nodes = [...divs];

// console.log('divs is arr -', Array.isArray(divs));
// console.log('nodes is arr -', Array.isArray(nodes));
// console.log(nodes);

// Rest
function sum(a, b) {
	return a + b;
}

const numbers2 = [1, 3, 2, 5, 6];

// Здесь используем Spread!!
// console.log(sum(...numbers2)); // Результат 4. Здесь обработаюстя только два первых элемента.

function sum2(a, b, ...rest) { // здесь это оператор Rest !!
	// console.log(...rest); // здесь это оператор Spread !!
	return a + b + rest.reduce((total, currentVal) => total + currentVal, 0);
}

// console.log(sum2(...numbers2));

// const a = numbers2[0];
// const b = numbers2[1];

// const [a, b, ...other] = numbers2; // ДЕСТРУКТУРИЗАЦИЯ

// console.log(a, b, other);

const person_15 = {
	name: 'Max',
	age: 23,
	city: 'Moscow',
	country: 'Russia'
};

// const {city, age, ...info} = person_15; // ДЕСТРУКТУРИЗАЦИЯ

// console.log(city, age, info);

/*
Spread разворачивает массивы или объекты. Служит для создания новых массивов или объектов.
Rest собирает все параметры либо в массив (часто встречается в функциях) либо в объектах все остальные поля.
 */

// ============================================================

// 16. Все о Деструктуризации в JS.

// Деструктуризация с массивами
function calcValues(a, b) {
	return [
		a + b,
		undefined,
		a - b,
		a * b,
		a / b
	];
}

const [sum16, sum16_2 = 'Повторно сумма', , mult, ...other16] = calcValues(42, 10);

// console.log(sum16, sum16_2, mult, other16);

// Деструктуризация с объектами
const person_16 = {
	name: 'Max',
	age: '34',
	address: {
		country: 'Russia',
		city: 'Moscow'
	}
};

// const {
// 	name: firstName = 'Без имени',
// 	age,
// 	car = 'Машины нет',
// 	address: {city: homeTown, country}
// } = person_16;
//
// console.log(firstName, age, car, homeTown, country);
//
// const {name, ...info} = person_16; // применяем оператор Rest
//
// console.log(name, info);

function logPerson_16({name: firstName = '111', age}) {
	console.log(firstName + ' ' + age);
}

// logPerson_16(person_16);

// ============================================================

// 17. LocalStorage - это только браузерный api, работает только со строками
// В консоли браузера вкладка Application -> localStorage

const myNumber = 42;

// localStorage.removeItem('number');
//
// console.log(localStorage.getItem('number'));
//
// localStorage.setItem('number', myNumber.toString());
//
// console.log(localStorage.getItem('number'));
//
// localStorage.clear();

const object = {
	name: 'Max',
	age: 20
};

localStorage.setItem('person', JSON.stringify(object));

const raw = localStorage.getItem('person');
const personFromRaw = JSON.parse(raw);
personFromRaw.name = 'Serg';

// console.log(personFromRaw);

// Если приложение открыто в разных вкладках, то можно все это дело синхронизировать

// window.onstorage = () => {};

window.addEventListener('storage', event => { // это событие срабатывает, если мы сделаем, например, setItem в другой вкладке
	console.log(event);
});

/*
Вопрос на собеседовании: Разница между localStorage и cookie?

- localStorage намного больше, примерно 5 Mb данных мы можем хранить локально в браузере;
- cookie улетают с запосами на сервер ( сервер может это распарсить и прочитать ),
localStorage не улетает на сервер.
 */
