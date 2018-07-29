//variable declaration
const inputDiv = el(".input");
const outputDiv = el(".output");

//helper function to make code readable
function el(selector) {
  return document.querySelector(selector);
}

// function to change text color
function changeTextColor(textColorEl) {
  let red = textColorEl.children[1].value;
  let green = textColorEl.children[2].value;
  let blue = textColorEl.children[3].value;
  let color = `rgb(${red},${green},${blue})`;
  outputDiv.style.color = "" + color + "";
  el("span.text-color").textContent = color;
}

// function to change  change bg color
function changeBgColor(bgColorEl) {
  let red = bgColorEl.children[1].value;
  let green = bgColorEl.children[2].value;
  let blue = bgColorEl.children[3].value;
  let color = `rgb(${red},${green},${blue})`;
  outputDiv.style.backgroundColor = "" + color + "";
  el("span.bg-color").textContent = color;
}
// function to change  change border color
function changeBorderColor(borderColorEl) {
  let red = borderColorEl.children[1].value;
  let green = borderColorEl.children[2].value;
  let blue = borderColorEl.children[3].value;
  let color = `rgb(${red},${green},${blue})`;
  outputDiv.style.borderColor = "" + color + "";
  el("span.border-color").textContent = color;
}

//function to change height
function changeHeight(heightEl) {
  let heightVal = heightEl.children[1].value;
  outputDiv.style.height = "" + heightVal + "px";
  el("span.Height").textContent = "" + heightVal + "px";
}

//function to change width
function changeWidth(widthEl) {
  let widthVal = widthEl.children[1].value;
  outputDiv.style.width = "" + widthVal + "px";
  el("span.Width").textContent = "" + widthVal + "px";
}

// function to change output div's style
function changeOutputDiv(e) {
  if (e.target.tagName !== "INPUT") return;
  if (e.target.parentNode.classList.contains("color")) {
    let textColorDiv = e.target.parentNode;
    return changeTextColor(textColorDiv);
  }
  if (e.target.parentNode.classList.contains("bgcolor")) {
    let bgColorDiv = e.target.parentNode;
    return changeBgColor(bgColorDiv);
  }
  if (e.target.parentNode.classList.contains("height")) {
    let heightDiv = e.target.parentNode;
    return changeHeight(heightDiv);
  }
  if (e.target.parentNode.classList.contains("width")) {
    let widthDiv = e.target.parentNode;
    return changeWidth(widthDiv);
  }
  if (e.target.parentNode.classList.contains("border-color")) {
    let borderColorDiv = e.target.parentNode;
    return changeBorderColor(borderColorDiv);
  }
}

inputDiv.addEventListener("change", changeOutputDiv);