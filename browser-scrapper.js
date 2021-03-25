let arr = document.querySelectorAll("tbody")[7].querySelectorAll("td");
let indices = [5, 8, 10, 11, 13, 14, 15];
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
    indices[index] += 16;
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

let data = new Array(parsed.length / 7)
  .fill()
  .map((_) => parsed.splice(0, 7))
  .sort(foo);

for (let i = 1; i < data.length; i++) {
  data[i].push("0");
  data[i].push("0");
}
