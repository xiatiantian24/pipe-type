document.addEventListener("DOMContentLoaded", function () {
  const gameContainer = document.getElementById("game-container");

  function addPiece(shape, initialDegree, hasEyes) {
    const pieceBorder = document.createElement("div");
    pieceBorder.classList.add("border");
    const pipePiece = document.createElement("div");
    pipePiece.classList.add("bg-square");
    pipePiece.setAttribute("data-initial-degree", initialDegree || 0);
    pipePiece.setAttribute("data-counter", 0);
    pipePiece.style.mixBlendMode = "screen";
    pipePiece.style.background = "#eee";
    pieceBorder.appendChild(pipePiece);

    if (shape !== "empty") {
      pipePiece.style.cursor = "pointer";
      pipePiece.addEventListener("click", () => {
        rotatePiece.call(pipePiece);
        applyColor.call(pipePiece);
      });
    }

    if (hasEyes) {
      // Add eyes
      const eyesContainer = document.createElement("div");
      eyesContainer.classList.add("eyes-container");

      const eyeLeft = document.createElement("div");
      eyeLeft.classList.add("eye");
      eyeLeft.classList.add("eye-left");
      eyesContainer.appendChild(eyeLeft);

      const eyeRight = document.createElement("div");
      eyeRight.classList.add("eye");
      eyeRight.classList.add("eye-right");
      eyesContainer.appendChild(eyeRight);

      pipePiece.appendChild(eyesContainer);
    }

    if (shape === "rectangle") {
      const rectanglePiece1 = document.createElement("div");
      rectanglePiece1.classList.add("rectangle");
      pipePiece.appendChild(rectanglePiece1);
    } else if (shape === "t-shape") {
      const tShapePiece = document.createElement("div");
      tShapePiece.classList.add("t-shape");
      const rectanglePiece2 = document.createElement("div");
      rectanglePiece2.classList.add("rectangle");
      pipePiece.appendChild(rectanglePiece2);
      pipePiece.appendChild(tShapePiece);
    } else if (shape === "short-rect") {
      const shortRecPiece = document.createElement("div");
      shortRecPiece.classList.add("t-shape");
      pipePiece.appendChild(shortRecPiece);
    } else if (shape === "round") {
      const roundCap = document.createElement("div");
      roundCap.classList.add("round-cap");
      const roundWrap = document.createElement("div");
      roundWrap.classList.add("round-wrap");
      const roundPiece = document.createElement("div");
      roundPiece.classList.add("round");
      pipePiece.appendChild(roundCap);
      roundCap.appendChild(roundWrap);
      roundWrap.appendChild(roundPiece);
    }

    gameContainer.appendChild(pieceBorder);
    rotatePiece.call(pipePiece);
    applyColor.call(pipePiece);
  }


   //toggle eye visibility
   function toggleEyesVisibility() {
    const eyesContainers = document.querySelectorAll('.eyes-container');
    const toggleButton = document.getElementById('toggle-eyes');
    
    eyesContainers.forEach(eyesContainer => {
      if (eyesContainer.style.visibility === 'hidden') {
        eyesContainer.style.visibility = 'visible';
      } else {
        eyesContainer.style.visibility = 'hidden';
      }
    });
  
    toggleButton.classList.toggle('active');
  }

  document.getElementById('toggle-eyes').addEventListener('click', toggleEyesVisibility);

  
  function randomDelay() {
    const eyesContainers = document.body.querySelectorAll('.eyes-container');
    eyesContainers.forEach(eyesContainer => {
      let delay = Math.floor(Math.random() * 5000);
      eyesContainer.querySelectorAll('.eye').forEach(eye => {
        eye.style.animationDelay = delay + "ms";
      });
    });
  }

  function rotatePiece() {
    let counter = parseInt(this.getAttribute("data-counter")) || 0;
    let rotation =
      parseInt(this.getAttribute("data-initial-degree")) + (counter) * 90;

    this.style.transform = `rotate(${rotation}deg)`;
    this.style.transition = "transform 0.3s ease-in-out";
    this.setAttribute("data-rotation", rotation);
    this.setAttribute("data-counter", counter + 1);
  }

  function isCorrect() {
    let counter = parseInt(this.getAttribute("data-counter")) || 0;
    let initialDegree = parseInt(this.getAttribute("data-initial-degree")) || 0;
    let shapeType = this.lastChild.classList;

    let correct = true;
    if (shapeType == "rectangle") {
      correct = counter % 2 === 1;
    } else {
      correct = (counter - 1) % 4 === 0;
    }

    console.log(
      `Piece type: ${shapeType}, Counter: ${counter}, isCorrect: ${correct}`
    );
    return correct;
  }

  function applyColor() {
    const piece = this.firstElementChild;
    const eyes = this.querySelectorAll('.eye');

    if (!piece) return;

    const correct = isCorrect.call(this);

    if (correct) {
      this.style.mixBlendMode = "screen";
      eyes.forEach(eye => {
        eye.style.display = 'block';
      });
    } else {
      this.style.mixBlendMode = "normal";
      eyes.forEach(eye => {
        eye.style.display = 'none';
      });
    }
  }

  function reset() {
    const resetButton = document.getElementById("reset");
    resetButton.addEventListener("click", () => {
      const pipePieces = document.querySelectorAll(".bg-square");
      pipePieces.forEach(pipePiece => {
        const initialDegree = parseInt(pipePiece.getAttribute("data-initial-degree"));
        pipePiece.style.transform = `rotate(${initialDegree}deg)`;
        pipePiece.setAttribute("data-counter", 1);
        pipePiece.style.mixBlendMode = "screen";
        pipePiece.style.background = "#eee";
      });
    });
  }

  reset();

  //
  addPiece("empty", 0);

  addPiece("empty", 0);
  addPiece("empty", 0);

  addPiece("rectangle", 0, true);
  addPiece("empty", 0);

  addPiece("empty", 0);
  
  addPiece("empty", 0);
  addPiece("empty", 0);

  addPiece("rectangle", 0);
  addPiece("empty", 0);

  addPiece("empty", 0);
  addPiece("empty", 0);


  //
  addPiece("empty", 0);

  addPiece("round", 0);
  addPiece("round", 90);

  addPiece("rectangle", 0);
  addPiece("empty", 0);

  addPiece("short-rect", 270, true);

  addPiece("round", 0);
  addPiece("round", 90);

  addPiece("t-shape", 0);
  addPiece("round", 180);
  addPiece("empty", 0);
  addPiece("empty", 0);


  //
  addPiece("empty", 0);

  addPiece("rectangle", 0, true);
  addPiece("empty", 0);

  addPiece("rectangle", 0);
  addPiece("empty", 0);

  addPiece("rectangle", 0);

  addPiece("rectangle", 0, true);
  addPiece("empty", 0);

  addPiece("t-shape", 0);
  addPiece("round", 90, true);

  addPiece("empty", 0);
  addPiece("empty", 0);


  //
  addPiece("empty", 0);

  addPiece("round", 270);
  addPiece("round", 180);

  addPiece("round", 270);
  addPiece("round", 180);

  addPiece("short-rect", 270);

  addPiece("round", 270);
  addPiece("round", 180);

  addPiece("short-rect", 270);
  addPiece("short-rect", 270);

  addPiece("empty", 0);
  addPiece("empty", 0);


  //2nd row
  addPiece("empty", 0);
  addPiece("round", 0);
  addPiece("round", 90);


  addPiece("empty", 0);
  addPiece("t-shape", 90, true);
  addPiece("round", 90);

  addPiece("short-rect", 270, true);

  addPiece("t-shape", 90, true);
  addPiece("round", 90);

  addPiece("round", 0);
  addPiece("round", 90, true);

  addPiece("empty", 0);

  //3rd row
  addPiece("empty", 0);
  addPiece("round", 0);
  addPiece("t-shape", 180, true);
  addPiece("empty", 0);

  addPiece("t-shape", 0);

  addPiece("round", 180);
 

  addPiece("rectangle", 0);

  addPiece("t-shape", 0);
  addPiece("round", 180);

  addPiece("t-shape", 0);
  addPiece("round", 180);

  addPiece("empty", 0);

  //4th row
  addPiece("empty", 0);
  addPiece("round", 270);
  addPiece("round", 180);
  addPiece("empty", 0);


  addPiece("rectangle", 0);

  addPiece("empty", 0);
  addPiece("short-rect", 270);

  addPiece("rectangle", 0);
  addPiece("empty", 0);

  addPiece("round", 270);
  addPiece("round", 180);

  addPiece("empty", 0);


  //5th row
  addPiece("empty", 0);
  addPiece("empty", 0);
  addPiece("empty", 0);

  addPiece("round", 270);
  addPiece("round", 180);
  addPiece("empty", 0);

  addPiece("round", 270);
  addPiece("round", 180);
  addPiece("empty", 0);

  addPiece("empty", 0);
  addPiece("empty", 0);
  addPiece("empty", 0);

  randomDelay();
});