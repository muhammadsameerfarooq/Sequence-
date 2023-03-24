const startGameButton = document.createElement("button");
startGameButton.innerText = "Yes";
startGameButton.addEventListener("click", () => {
  // Call the function to start the game here
});

const message = document.createElement("p");
message.innerText = "Do you want to start the game?";

// Display the message and button only when Player 1's cards are shown
if (player === 1) {
  document.body.appendChild(message);
  document.body.appendChild(startGameButton);
}
var current_Player = "X";
var current_Color = "blue";
var win = false;
let scoreX = 0;
let scoreY = 0;

document.getElementById("Player1cards").style.display = "block";
document.getElementById("Player2cards").style.display = "none";
document.getElementById("player").innerHTML = "1";
// if (confirm("Do you want to play the game?")) {
//   Swal.fire({
//     icon: "success",
//     title: "Hooray...",
//     text: "Game Is Starting .",
//   });
//   document.getElementById("game-container").innerHTML = `
//       <h1></h1>
//       <!-- Game HTML code goes here -->
//     `;

function make_a_turn(row, col) {
  var box = document.getElementById("box_" + row + "_" + col);

  if (box.value === "X" || box.value == "Y") {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "This box already has a value and cannot be changed.",
    });
    return;
  }

  if (!box.classList.contains("selected")) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "You Can't Mark Your Turn Here.",
    });
    return;
  } else {
    box.classList.remove("selected");

    var ele = document.getElementsByClassName("boxclass");

    for (var element of ele) {
      element.classList.remove("selected");
    }
  }
  box.value = current_Player;
  box.classList.add(current_Color);

  var result = checking_game(row, col);

  if (result == "Win") {
    Swal.fire({
      icon: "success",
      title: "Congratulations!",
      text: "Player " + current_Color + " won the game.",
      showCancelButton: true,
      confirmButtonText: "Restart",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        location.reload();
      }
    });
  }
  if (result == "MessageX") {
    Swal.fire({
      title: current_Player + " Your score is : " + scoreX,
      icon: "success",
    });
  }
  if (result == "MessageY") {
    Swal.fire({
      title: current_Player + " Your score is : " + scoreY,
      icon: "success",
    });
  }

  switch_player();
}

function switch_player() {
  if (current_Player == "X") {
    current_Player = "Y";
    current_Color = "green";
    document.getElementById("Player2cards").style.display = "block";
    document.getElementById("player").innerHTML = "2";
    document.getElementById("Player1cards").style.display = "none";
  } else if (current_Player == "Y") {
    debugger;
    current_Player = "X";
    current_Color = "blue";
    document.getElementById("player").innerHTML = "1";
    document.getElementById("Player1cards").style.display = "block";
    document.getElementById("Player2cards").style.display = "none";
  }
}

function checking_game(row, col) {
  //Vertically
  for (let i = 1; i <= 6; i++) {
    let count = 0;
    for (let j = i; j <= i + 4; j++) {
      if (document.getElementById(`box_${j}_${col}`).value == current_Player) {
        count++;
      }
    }

    if (count == 5) {
      for (let j = i; j <= i + 4; j++) {
        document.getElementById(`box_${j}_${col}`).classList.add("changecolor");
      }

      if (current_Player == "X") {
        scoreX++;
        if (scoreX == 3) {
          return "Win";
        } else {
          return "MessageX";
        }
      } else {
        scoreY++;
        if (scoreY == 3) {
          return "Win";
        } else {
          return "MessageY";
        }
      }
    }
  }
  //Check Horizontally
  let count = 0;
  for (let i = 1; i <= 10; i++) {
    if (document.getElementById(`box_${row}_${i}`).value == current_Player) {
      count++;
    } else {
      count = 0;
    }

    if (count == 5) {
      for (let j = i; j >= i - 4; j--) {
        document.getElementById(`box_${row}_${j}`).classList.add("changecolor");
      }
      if (current_Player == "X") {
        scoreX++;
        if (scoreX == 3) {
          return "Win";
        } else {
          return "MessageX";
        }
      } else {
        scoreY++;
        if (scoreY == 3) {
          return "Win";
        } else {
          return "MessageY";
        }
      }
    }
  }

  //Diagonally

  // check for diagonal win from top-left to bottom-right
  count = 0;
  let i = row,
    j = col;
  while (i <= 10 && j <= 10) {
    if (document.getElementById(`box_${i}_${j}`).value == current_Player) {
      count++;
    } else {
      count = 0;
    }

    if (count == 5) {
      for (let k = 0; k < 5; k++) {
        document
          .getElementById(`box_${i - k}_${j - k}`)
          .classList.add("changecolor");
      }
      if (current_Player == "X") {
        scoreX++;
        if (scoreX == 3) {
          return "Win";
        } else {
          return "MessageX";
        }
      } else {
        scoreY++;
        if (scoreY == 3) {
          return "Win";
        } else {
          return "MessageY";
        }
      }
    }

    i++;
    j++;
  }
  // check for diagonal win from bottom-right to top-left
  count = 0;
  (i = row), (j = col);
  while (i >= 1 && j >= 1) {
    if (document.getElementById(`box_${i}_${j}`).value == current_Player) {
      count++;
    } else {
      count = 0;
    }

    if (count == 5) {
      for (let k = 0; k < 5; k++) {
        document
          .getElementById(`box_${i + k}_${j + k}`)
          .classList.add("changecolor");
      }
      if (current_Player == "X") {
        scoreX++;
        if (scoreX == 3) {
          return "Win";
        } else {
          return "MessageX";
        }
      } else {
        scoreY++;
        if (scoreY == 3) {
          return "Win";
        } else {
          return "MessageY";
        }
      }
    }
    i--;
    j--;
  }

  // check for diagonal win from bottom-left to top-right
  count = 0;
  (i = row), (j = col);
  while (i >= 1 && j <= 10) {
    if (document.getElementById(`box_${i}_${j}`).value == current_Player) {
      count++;
    } else {
      count = 0;
    }

    if (count == 5) {
      for (let k = 0; k < 5; k++) {
        document
          .getElementById(`box_${i + k}_${j - k}`)
          .classList.add("changecolor");
      }
      if (current_Player == "X") {
        scoreX++;
        if (scoreX == 3) {
          return "Win";
        } else {
          return "MessageX";
        }
      } else {
        scoreY++;
        if (scoreY == 3) {
          return "Win";
        } else {
          return "MessageY";
        }
      }
    }

    i--;
    j++;
  }
  // check for diagonal win from top-right to bottom-left
  count = 0;
  (i = row), (j = col);
  while (i <= 10 && j >= 1) {
    if (document.getElementById(`box_${i}_${j}`).value == current_Player) {
      count++;
    } else {
      count = 0;
    }

    if (count == 5) {
      for (let k = 0; k < 5; k++) {
        document
          .getElementById(`box_${i - k}_${j + k}`)
          .classList.add("changecolor");
      }
      if (current_Player == "X") {
        scoreX++;
        if (scoreX == 3) {
          return "Win";
        } else {
          return "MessageX";
        }
      } else {
        scoreY++;
        if (scoreY == 3) {
          return "Win";
        } else {
          return "MessageY";
        }
      }
    }
    i++;
    j--;
  }
  // no diagonal win
  return false;
}
// } else {
//   Swal.fire({
//     icon: "error",
//     title: "Oops...",
//     text: "You Can't Play The Game As You Have Clicked On Cancel.",
//   });
//   document.getElementById("game-container").innerHTML = `
//     <h1></h1>
//     <!-- Game UI HTML code goes here -->
//   `;
// }
