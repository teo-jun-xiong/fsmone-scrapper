let arr = document.querySelectorAll("tbody")[7].querySelectorAll("td");
let indices = [5, 8, 10, 11, 13, 14, 15];
let numColumns = len(indices);
let interval = 16
let index = 0;
let parsed = [];

// retrieves relevant fields
for (let i = 0; i < arr.length; i++) {
  if (i === indices[index]) {
    if (index === 1) {
      parsed.push(arr[i].innerText);
    } else {
      parsed.push(arr[i].outerText);
    }
    indices[index] += interval;
    index++;
  }
  if (index === indices.length) {
    index = 0;
  }
}

let foo = (a, b) => {
  if (a[0] === b[0]) {
    return 0;
  } else {
    return a[0] < b[0] ? -1 : 1;
  }
};

let data = new Array(parsed.length / numColumns)
  .fill()
  .map((_) => parsed.splice(0, numColumns))
  .sort(foo);

// for price target and stop loss
for (let i = 1; i < data.length; i++) {
  data[i].push("0");
  data[i].push("0");
}
