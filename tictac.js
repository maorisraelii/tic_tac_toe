const ALL_WIN_COMBINATION = [
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [6, 4, 2],
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8]
];
//Player 'X' plays first
let xTurn = true;
let count = 0;

//Disable All Buttons
const disableButtons = () => {
  document.querySelectorAll(".block").forEach((element) => (element.disabled = true));
  //enable popup
  document.querySelector(".message").classList.remove("hide");
};

//Enable all buttons (For New Game and Restart)
const enableButtons = () => {
  document.querySelectorAll(".block").forEach((element) => {
    element.innerText = "";
    element.disabled = false;
  });
  //disable popup
  document.querySelector(".message").classList.add("hide");
};

//This function is executed when a player wins
const winFunction = (letter) => {
  disableButtons();
  if (letter == "X") {
    document.getElementById("text").innerHTML = "&#x1F389; <br> 'X' Wins";
  } else {
    document.getElementById("text").innerHTML = "&#x1F389; <br> 'O' Wins";
  }
};

//Function for draw
const drawFunction = () => {
  disableButtons();
  document.getElementById("text").innerHTML = "&#x1F60E; <br> It's a Draw";
};

//New Game
document.getElementById("restart_button2").addEventListener("click", () => {
  count = 0;
  enableButtons();
});
document.getElementById("restart_button").addEventListener("click", () => {
  count = 0;
  enableButtons();
});

//Win Logic
const winChecker = () => {
  //Loop through all win patterns
  for (let i of ALL_WIN_COMBINATION) {
    let [element1, element2, element3] = [
      document.querySelectorAll(".block")[i[0]].innerText,
      document.querySelectorAll(".block")[i[1]].innerText,
      document.querySelectorAll(".block")[i[2]].innerText,
    ];
    //Check if elements are filled
    //If 3 empty elements are same and would give win as would
    if (element1 != "" && (element2 != "") & (element3 != "")) {
      if (element1 == element2 && element2 == element3) {
        //If all 3 buttons have same values then pass the value to winFunction
        winFunction(element1);
      }
    }
  }
};

//Display X/O on click
document.querySelectorAll(".block").forEach((element) => {
  element.addEventListener("click", () => {
    if (xTurn) {
      xTurn = false;
      //Display X
      element.innerText = "X";
      element.disabled = true;
    } else {
      xTurn = true;
      //Display Y
      element.innerText = "O";
      element.disabled = true;
    }
    //Increment count on each click
    count += 1;
    if (count == 9) {
      drawFunction();
    }
    //Check for win on every click
    winChecker();
  });
});
//Enable Buttons and disable popup on page load
window.onload = enableButtons;
