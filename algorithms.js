/*
Матрица 2х2. Разкрытие по спирали спервого элемента в правую сторону
 */

const arr2 = [];
let counter = 1;

for (let i = 0; i < 7; i++) {
  arr2[i] = [];
  for (let j = 0; j < 7; j++) {
    arr2[i][j] = counter++;
  }
}

function func(sizeTotal, arr) {
  const newArr = [];
  let i = 0;
  let j = 0;
  let direction = 'X_TO_R';
  let sizeCurrent = sizeTotal;
  let total = [].concat(...arr).length;

  function pass(sizeCurrent, i, j, total) {
    for (let k = 0; k < 4; k++) {
      if (total === 1) {
        newArr.push(arr[i][j]);
        return;
      };

      switch (direction) {
        case 'X_TO_R':
          for (j; j < sizeCurrent - 1; j++) {
            newArr.push(arr[i][j]);
            total = total - 1 ;
          }
          direction = 'Y_TO_B';
          break;

        case 'Y_TO_B':
          for (i; i < sizeCurrent - 1; i++) {
            newArr.push(arr[i][j]);
            total = total - 1;
          }
          direction = 'X_TO_L';
          break;

        case 'X_TO_L':
          for (j; j > (sizeTotal - sizeCurrent); j--) {
            newArr.push(arr[i][j]);
            total = total -1;
          }
          direction = 'Y_TO_T';
          break;

        case 'Y_TO_T':
          for (i; i > (sizeTotal - sizeCurrent); i--) {
            newArr.push(arr[i][j]);
            total = total - 1;
          }
          direction = 'X_TO_R';
          break;
      }
    }
    pass(sizeCurrent - 1, i + 1, j + 1, total);
  }

  pass(sizeCurrent, i, j, total);
  console.log(newArr);
}

func(7, arr2);
