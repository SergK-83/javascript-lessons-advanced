'use strict';

// Проверка включения strict mode
// function func() {return this}
// const a = func();
// console.log(a === global);
//
/*
В нестрогом режиме здесь this вернет глобальный объект.
Когда мы вызываем функцию как функцию (не как метод объекта), эта функция будет выполнена в глобальном контексте. Значением переменной this в данном случае будет ссылка на глобальный объект. Однако, если функция вызывается как функция в строгом режиме (strict mode) — значением this будет undefined.
 */

// Interview JavaScript

// let foo = [1, 2, 3, 4];
// let bar = foo;
// bar.push(5);
//
// console.log(foo); // [1, 2, 3, 4, 5]

//==========================================

// console.log(undefined == 0); // false (undefined и null "==" только самим себе и друг другу)
// console.log(undefined == undefined); // true
// console.log(undefined == null); // true
// console.log(undefined === 0); // false
// console.log(undefined >= 0); // false (Здесь undefined -> NaN - false при любых сравнениях)
// console.log(null >= 0); // true
// console.log(false == 0); // true
// console.log(NaN === NaN) //false (NaN – это специальное числовое значение, которое возвращает false при любых сравнениях.)

//==========================================

// console.log('scrip start');
//
// setTimeout(function () {
//   console.log('setTimout 0')
// });
//
// let p = new Promise(function(resolve, reject) {
//   console.log('Создание промиса');
//   resolve();
// });
//
// p.then(function (){
//   console.log('promise_1');
// }).then(function () {
//   console.log('promise_2');
// });
//
// console.log('script end');
//
// p.then(function (){
//   console.log('promise_3');
// }).then(function () {
//   console.log('promise_4');
// });

/*
scrip start
Создание промиса
script end
promise_1
promise_3
promise_2
promise_4
setTimout 0
 */

//==========================================

// function Dog(name) {
//   this.name = name;
//   this.run = function () {
//     console.log('dog is running');
//   }
// }
//
// Dog.bark = function () {
//   console.log(this);
//   console.log(this.name + ' say woof');
// };
//
// let fido = new Dog('fido');
//
// fido.run(); // dog is running
//
// fido.bark(); // ошибка, пытаемся вызвать статический метод (недоступен для объектов). Будет доступен, если сделаем Dog.prototype.bark.

//==========================================

// «Чистая» функция - это функция, которая выводит свои данные основываясь исключительно на свои входные данные и не вызывает побочных эффектов в приложении.

function multiply(a, b) {
  const result = a * b;
  localStorage.set('result', result);
  return result;
} // данная функция не является чистой, т.к. делает изменения во вне ( localStorage.set('result', result) ) - side effect

//==========================================

// Глубокое копирование объекта

const food = {beef: '?', bacon: '?'}

// "Spread"
const newFood_1 = {...food};

// "Object.assign"
const newFood_2 = Object.assign({}, food)

// "JSON"
const newFood_3 = JSON.parse(JSON.stringify(food))

// ==========================================

/*
Задача: написать функцию.
dog dgo -> true
dog dfo -> false
doog ddog -> false
 */

// function compString(str1, str2) {
//   if (str1.length !== str2.length) {
//     return false;
//   }
//
//   const sortStr1 = str1.toLowerCase().split('').sort();
//   const sortStr2 = str2.toLowerCase().split('').sort();
//
//
//   return sortStr1.join() === sortStr2.join();
// }
//
// console.log(compString('dog', 'dgo'));

// ==========================================

/*
 Задача: реализовать функцию flat()
 Метод flat() возвращает новый массив, в котором все элементы вложенных подмассивов были рекурсивно "подняты" на указанный уровень depth.
 */

const arrForFlat = [1, 2, [3, 4, [5, 6]]];

function flatten(arr, num = 0) {
  let level = 0;

  function customFlat(arr, level) {
    if (level === num) {
      return arr.reduce((acc, item) => {
        return [...acc, item]
      }, []);
    }

    return arr.reduce((acc, item) => {
      return Array.isArray(item) ? [...acc, ...customFlat(item, level + 1)] : [...acc, item];
    }, []);
  }

  return customFlat(arr, level);
}

// console.log(arrForFlat.flat(2));
//
// console.log(flatten(arrForFlat, 2));

// ==========================================
// interview Diasoft. Вопрос: что будет в выводе и почему?

// function Abc() {
//   let private = 'private_abc';
//   this.public = 'public_abc';
//
//   this.methodA = function() {
//     console.log(private);
//     console.log(this.public);
//   };
//
//   this.methodB = () => {
//     console.log(private);
//     console.log(this.public);
//   };
// }
//
// function Bcd() {
//   let private = 'private_bcd';
//   this.public = 'public_bcd';
// }
//
// let abc = new Abc();
// let bcd = new Bcd();
//
// bcd.methodA = abc.methodA;
// bcd.methodB = abc.methodB;
//
// bcd.methodA();
// bcd.methodB();

// Деструктуризация
// ===========================================

// const b = 23;
//
// const obj = {
//   a: 1,
//   b: 2,
//   c: 3,
//   d: 4
// };
// let {b: bb, d} = obj;
//
// // console.log(bb, d);
//
// function print({a, c} = {}) {
//   console.log(a, c);
// }
//
// print(obj);

// ЗАДАЧА. Что будет в консоли ???
// ============================================

// function b() {
//   function b() {
//
//     var b = function () {
//       console.log('шарик находится');
//       console.log(b);
//       b = 'под колпачком 3';
//     }
//
//     return b;
//   }
//
//   b = b();
//   b();
//   b = 'под колпачком 2';
// }
//
// b(); // шарик находится [Function: b]
//
// var b = 'под колпачком 1';

// ЗАДАЧА. Найти все наборы анаграмм.
// ============================================

const strAnagr = 'адрес карп кума мир мука парк рим среда стук рост сорт трос';

function getAnagrams(string) {
  let arr = string.split(' ');
  const res = [];

  function func(arr) {
    if (!arr.length) return null;

    const word = arr[0];
    const sortingWord = word.toLowerCase().split('').sort().join();

    arr.splice(0, 1);

    const arrAnagr = arr
      .filter(item => item.toLowerCase().split('').sort().join() === sortingWord);

    if (arrAnagr.length) {
      arrAnagr.forEach(word => {
        arr = arr.filter(item => item !== word);
      });

      arrAnagr.unshift(word);
      res.push(arrAnagr);
    }

    func(arr);
  }

  func(arr);

  console.log(res);
}

function getAnagrams2(string) {
  const arr = string.split(' ');
  const list = {};
  const res = [];

  arr.forEach(word => {
    const prop = word.toLowerCase().split('').sort().join('');

    list[prop] = arr.filter(item => item.toLowerCase().split('').sort().join('') === prop);
  });

  for (let key in list) {
    if (list.hasOwnProperty(key)) {
      list[key].length > 1 ? res.push(list[key]) : null;
    }
  }

  console.log(res);
}

function getAnagrams3(string) {
  const arr = string.split(' ');
  const anagrams = new Map();

  arr.forEach(word => {
    const key = word.split('').sort().join('');
    const arrVal = anagrams.get(key) || [];

    anagrams.set(key, [...arrVal, word]);
  });

  const res = Array.from(anagrams.values()).filter(arr => arr.length > 1);

  console.log(res);
}

// getAnagrams3(strAnagr);

// ЗАДАЧА. Складывать все цифры в числе, пока не останется одна цифра (однозначное число) с помощью рекурсии и без рекурсии.
// ============================================

function getDigitsSumRec(num) {
  if (num < 10) return num;

  const arr = String(num).split('');
  const sum = arr.reduce((acc, item) => acc + Number(item), 0);

  return getDigitsSumRec(sum);
}

// console.log(getDigitsSumRec(87653));

function getDigitsSum(num) {
  while (num >= 10) {
    const arr = String(num).split('');
    num = arr.reduce((acc, item) => acc + Number(item), 0);
  }
  return num;
}

// console.log(getDigitsSum(87653));

let a = 1;
let b = 2;

console.log(a ^ b);

[a, b] = [b, a];

// console.log('a: ' + a, 'b: ' + b);
