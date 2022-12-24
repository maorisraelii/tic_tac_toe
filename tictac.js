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
var time = 0;
var timerDiv = document.getElementById("counter");
let is_x_turn = true;
let turns_till_now = 0;
//--------------------------------------------//
//פונקציות למימוש טיימר
function timer(){
    timeout = setTimeout(function(){
        time++;
        timerDiv.innerHTML = 31-time;
        time_over()
        timer()
    }, 1000)
}
//פונרציה לעצירת הטיימר בסוף משחק
function stop(){
    clearTimeout(timeout);
    timerDiv.innerHTML = "הקלק כדי להתחיל"
}
//פונקציה הבודקת אם נגמר הזמן והמשתמש הפסיד
function time_over(){
    if (time > 31){
        if(is_x_turn){
            winFunction("O")
        }
        else{
            winFunction("X")
        }

    }
}
//-------------------------------------------//
// אתחול המשחק אחרי שקפצה הודעת משחק או תיקו 
document.getElementById("restart_button2").addEventListener("click", () => {
    turns_till_now = 0;
    time = 0;
    enableButtons();
    stop()
    is_x_turn = true;
  });
document.getElementById("restart_button").addEventListener("click", () => {
    turns_till_now = 0;
    time = 0;
    enableButtons();
    stop()
    is_x_turn = true;
  });
//-----------------------------------------//
//בדיקת ניצחון או תיקו והקפצת הודעות בהתאם
const winFunction = (letter) => {
    disableButtons();
    if (letter == "X") {
      document.getElementById("text").innerHTML = "ה-&#10060; ניצח";
    } else {
      document.getElementById("text").innerHTML = "ה-&#11093; ניצח";
    }
};
const drawFunction = () => {
    disableButtons();
    document.getElementById("text").innerHTML = "<u>תיקו</u><br> &#11093; &#61; &#10060; ";
};
//--------------------------------------//
//ריצת המשחק וסימון איקס או עיגול בהתאם לתור
document.querySelectorAll(".block").forEach((element) => {
    element.addEventListener("click", () => {
        if(turns_till_now == 0){
            timer();
        }
        if (is_x_turn) {
        is_x_turn = false;
        element.innerText = "X";
        element.disabled = true;
        time = 0;
        } else {
        is_x_turn = true;
        element.innerText = "O";
        element.disabled = true;
        time = 0;
        }
        turns_till_now += 1;
        if (turns_till_now == 9) {
        drawFunction();
        stop()
        }
        winChecker();
    });
});
//------------------------------------//
//ביטול כל הכפתורים או איפשור שלהם בסוף או תחילת משחק
const disableButtons = () => {
  document.querySelectorAll(".block").forEach((element) => (element.disabled = true));

  document.querySelector(".message").classList.remove("hide");
};
const enableButtons = () => {
  document.querySelectorAll(".block").forEach((element) => {
    element.innerText = "";
    element.disabled = false;
  });
  document.querySelector(".message").classList.add("hide");
};
//-----------------------------------//
//בדיקת הניצחון אם יש קומבינציה של סימנים זהים על אחד הרצפים שהוזנו בהתחלה
const winChecker = () => {
  for (let i of ALL_WIN_COMBINATION) {
    let [element1, element2, element3] = [
      document.querySelectorAll(".block")[i[0]].innerText,
      document.querySelectorAll(".block")[i[1]].innerText,
      document.querySelectorAll(".block")[i[2]].innerText,
    ];
    if (element1 != "" && (element2 != "") & (element3 != "")) {
      if (element1 == element2 && element2 == element3) {
        winFunction(element1);
      }
    }
  }
};
window.onload = enableButtons;