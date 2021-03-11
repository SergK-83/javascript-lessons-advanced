// 1. prototype - это определенный объект, который присутствует у объектов и он вызывается по цепочке сверху вниз. С помощью этого объекта мы расширяем свойства объектов или классов. И с помощью него мы можем устраивать определенное наследование внутри js.
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

// 2. Контекст this. Как работает call, bind, apply

function hello() {
  console.log('Hello', this);
}

const person2 = {
  name: 'Max',
  age: 25,
  sayHello: hello,
  sayHelloWindow: hello.bind(window),
  logInfo: function (job, phone) {
    console.log(this);
    console.group(`${this.name} info:`)
    console.log(`Name is ${this.name}`);
    console.log(`Age is ${this.age}`);
    console.log(`Job is ${job}`);
    console.log(`Phone is ${phone}`);
    console.groupEnd();
  }
};

const lena2 = {
  name: 'Elena2',
  age: 23
}

// person2.logInfo.bind(lena2, 'Frontend', '8-999-999-99-99')();
// // метод bind() возвращает новую функцию, не вызывая её
//
// person2.logInfo.call(lena2, 'Frontend', '8-999-999-99-99');
// // метод call() сразу вызывает функцию
//
// person2.logInfo.apply(lena2, ['Frontend', '8-999-999-99-99']);
// // метод apply() сразу вызывает функцию, второй параметр всегда массив

// =================================================

// 3. Замыкания. Как они работают

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

// 4. Асинхронность.Что такое Event Loop. JS SetTimeout 0

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

// 5. Promise - это определенная обертка над асинхронностью, которая добавляет удобства для написания кода

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

// 6. Объекты с Object.create. Что такое getters, setters

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

// 7. Все о ES6 Классах

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

// 8. Async, Await. Работа с сервером c fetch

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

// 9. Proxy. Объекты, функции, классы.

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

// 10. Proxy. Примеры.

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
