# fsmone-scrapper

This is a _pretty_ basic web scrapper for FSMone. Some background information: FSMone is an online brokerage and the intention behind this little project was due to the inability to set price targets and stop losses on the website. 

I wanted those features in one place to remind myself of the various price points I set for the stocks I am invested in. 

# How It's Built
The data is being scrapped by this browser-friendly JavaScript [file](browser-scrapper.js). It retrieves the inner/outerHTML of relevant elements. `indices = [5,8,10,11,13,14,15]` are the respective columns for "Ticker", "Quantity", "Weighted Average Cost", "Last Price", "Unrealised P/L (USD)", "Unrealised P/L (%)", "Market Value". You may edit these freely. `indices[index] += 16` simply moves the elements in `indices` to the next ticker. 

It is then processed by a Python [script](excel.py). In the Python script, there are a few things being done:
* Remove sold stocks
* Add newly bought stocks
* Retain price targets and stop losses

A feature that's nice to have will be highlighting positive/negative profits/losses, but that's still being sorted out. 

In the Python script, the functions used are `.csv`-centric, but if for example, `.xlsx` is more to your liking, you can change the following:
* `read_csv` → `read_excel`
* `to_csv` → `to_excel`

# Installation
1. Create a new folder: `mkdir new_folder`
2. `cd` into the new folder: `cd new_folder`
3. Clone this repository: `git clone https://github.com/teo-jun-xiong/fsmone-scrapper.git`
4. `pip install pandas` if valid

# Usage
1. Copy the code from [browser-scrapper.js](browser-scrapper.js), replicated here:
```javascript
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
```
2. Open up the developer tools in your browser, and paste the code into the console. Enter `data` in the console and copy the result.
3. In `excel.py`, replace `portfolio = [[]]` with `portfolio = {your_data}`. You may wish to rename the file created.
4. Run `python3 excel.py`, and your portfolio will be created as `portfolio.csv` (default).

Hope this helps! 
