const makeBigger = () => {
  alert("make larger!");
  let content = document.getElementsByClassName("content")[0];
  let h1 = document.querySelector("h1");
  content.style.fontSize = "72px";
  h1.style.fontSize = "72px";
};

const makeSmaller = () => {
  alert("make smaller!");
  let content = document.getElementsByClassName("content")[0];
  let h1 = document.querySelector("h1");
  content.style.fontSize = "8px";
  h1.style.fontSize = "8px";
};

//document.getElementById("bigger").addEventListener("click", makeBigger);
//document.getElementById("smaller").addEventListener("click", makeSmaller);
/*
Tips:
1. First, in the index.html file, add an onclick attribute to each button.
   The value of the attribute should be a call to the corresponding function
   (see class demos).

2. Then modify the body of the "makeBigger" and 
   "makeSmaller" functions (in between the curly braces)
   to target the body element and set it's font size.
*/
