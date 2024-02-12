document.addEventListener("DOMContentLoaded", function () {
    const gameContainer = document.getElementById("game-container");
  
  function addPiece(shape, initialDegree, hasEyes) {
    const pieceBorder = document.createElement("div");
    pieceBorder.classList.add("border");
    const pipePiece = document.createElement("div");
    pipePiece.classList.add("bg-square");
    pipePiece.setAttribute("data-initial-degree", initialDegree || 0);
    pipePiece.setAttribute("data-counter", 0);
    pieceBorder.appendChild(pipePiece);
  
    if (shape !== "empty") {
      pipePiece.style.cursor = "pointer";
      pipePiece.addEventListener("click", () => {
        rotatePiece.call(pipePiece);
        applyColor.call(pipePiece);
      });
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
      rectanglePiece2.appendChild(tShapePiece);
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
  
    gameContainer.appendChild(pieceBorder);
    rotatePiece.call(pipePiece);
    applyColor.call(pipePiece);
    
  }
      triggerBlinking();
  
    // Function to blink the eyes once
  function blinkEyes() {
    const eyes = document.querySelectorAll('.eye');
    eyes.forEach((eye) => {
      eye.style.animation = 'blink 0.1s ease-out';
      setTimeout(() => {
        eye.style.animation = 'none';
      }, 100); 
    });
  }
  
  // Function to trigger blinking at random intervals within 5 seconds
  function triggerBlinking() {
    setInterval(blinkEyes, 5000);
  }
  
    function rotatePiece() {
      let counter = parseInt(this.getAttribute("data-counter")) || 0;
      let rotation =
        parseInt(this.getAttribute("data-initial-degree")) + (counter % 4) * 90;
  
      this.style.transform = `rotate(${rotation}deg)`;
      this.setAttribute("data-rotation", rotation);
      this.setAttribute("data-counter", counter + 1);
    }
  
    function isCorrect() {
      let counter = parseInt(this.getAttribute("data-counter")) || 0;
      let initialDegree = parseInt(this.getAttribute("data-initial-degree")) || 0;
      let shapeType = this.querySelector(":last-child").classList[0]; // Get the class of the first child element
  
      let correct = true;
      if (shapeType === "rectangle") {
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
      this.classList.add("show-color");
      eyes.forEach(eye => {
        eye.style.display = 'block';
      });
    } else {
      this.classList.remove("show-color");
      eyes.forEach(eye => {
        eye.style.display = 'none';
      });
    }
  }
  
  
    //1st row
    addPiece("empty", 0);
    addPiece("empty", 0);
  
    addPiece("rectangle", 0);
    addPiece("empty", 0);
  
    addPiece("empty", 0);
    addPiece("empty", 0);
  
    addPiece("empty", 0);
    addPiece("rectangle", 0);
  
    addPiece("empty", 0);
    addPiece("empty", 0);
  
    addPiece("empty", 0);
    addPiece("round", 0);
  
    //2nd row
    addPiece("round", 0);
    addPiece("round", 90);
  
    addPiece("t-shape", 0);
    addPiece("round", 90, true);
  
    addPiece("round", 0);
    addPiece("round", 90);
  
    addPiece("round", 0, true);
    addPiece("t-shape", 180);
  
    addPiece("round", 0);
    addPiece("round", 90, true);
  
    addPiece("empty", 0);
    addPiece("t-shape", 180, true);
  
    //3rd row
    addPiece("round", 0);
    addPiece("t-shape", 180, true);
  
    addPiece("rectangle", 0);
    addPiece("rectangle", 0);
  
    addPiece("rectangle", 0, true);
    addPiece("empty", 0);
  
    addPiece("rectangle", 0);
    addPiece("rectangle", 0);
  
    addPiece("t-shape", 0);
    addPiece("round", 180);
  
    addPiece("empty", 0);
    addPiece("rectangle", 0);
  
    //4th row
    addPiece("round", 270);
    addPiece("round", 180);
  
    addPiece("round", 270);
    addPiece("round", 180);
  
    addPiece("round", 270);
    addPiece("round", 180);
  
    addPiece("round", 270);
    addPiece("round", 180);
  
    addPiece("round", 270);
    addPiece("round", 180);
  
    addPiece("round", 270);
    addPiece("round", 180);
  
    //5th row
    addPiece("empty", 0);
    addPiece("empty", 0);
    addPiece("empty", 0);
  
    addPiece("rectangle", 0);
    addPiece("empty", 0);
  
    addPiece("empty", 0);
  
    addPiece("empty", 0);
  
    addPiece("rectangle", 0);
    addPiece("empty", 0);
  
    addPiece("rectangle", 0);
    addPiece("empty", 0);
    addPiece("empty", 0);
  
    //6th row
    addPiece("empty", 0);
  
    addPiece("round", 0);
    addPiece("t-shape", 90);
  
    addPiece("t-shape", 0);
    addPiece("round", 90);
  
    addPiece("short-rect", 270);
  
    addPiece("short-rect", 270);
  
    addPiece("t-shape", 0);
    addPiece("round", 180);
  
    addPiece("rectangle", 0);
    addPiece("empty", 0);
    addPiece("empty", 0);
  
    //7th row
    addPiece("empty", 0);
  
    addPiece("round", 270);
    addPiece("t-shape", 180);
  
    addPiece("rectangle", 0);
    addPiece("rectangle", 0);
  
    addPiece("rectangle", 0);
  
    addPiece("rectangle", 0);
  
    addPiece("t-shape", 0);
    addPiece("round", 90);
  
    addPiece("rectangle", 0);
    addPiece("empty", 0);
    addPiece("empty", 0);
  
    //8th row
    addPiece("empty", 0);
  
    addPiece("empty", 0);
    addPiece("rectangle", 0);
  
    addPiece("short-rect", 270);
    addPiece("short-rect", 270);
  
    addPiece("short-rect", 270);
  
    addPiece("rectangle", 0);
  
    addPiece("short-rect", 270);
    addPiece("short-rect", 270);
  
    addPiece("round", 270);
    addPiece("round", 180);
    addPiece("empty", 0);
  
    //9th row
    addPiece("empty", 0);
    addPiece("round", 270);
    addPiece("round", 180);
  
    addPiece("empty", 0);
  
    addPiece("empty", 0);
    addPiece("round", 270);
  
    addPiece("round", 180);
    addPiece("empty", 0);
  
    addPiece("empty", 0);
    addPiece("empty", 0);
  
    addPiece("empty", 0);
    addPiece("empty", 0);
  
    //11th row
    addPiece("round", 0);
    addPiece("t-shape", 90);
    addPiece("round", 90);
  
    addPiece("round", 0);
    addPiece("round", 90);
  
    addPiece("round", 0);
    addPiece("round", 90);
  
    addPiece("t-shape", 90);
    addPiece("round", 90);
  
    addPiece("round", 0);
    addPiece("t-shape", 90);
  
    addPiece("empty", 90);
  
    //12th row
    addPiece("rectangle", 0);
    addPiece("rectangle", 0);
    addPiece("rectangle", 0);
  
    addPiece("rectangle", 0);
    addPiece("rectangle", 0);
  
    addPiece("rectangle", 0);
    addPiece("rectangle", 0);
  
    addPiece("rectangle", 0);
    addPiece("round", 180);
  
    addPiece("round", 270);
    addPiece("rectangle", 0);
  
    addPiece("empty", 0);
  
    //13th row
    addPiece("short-rect", 270);
    addPiece("short-rect", 270);
    addPiece("short-rect", 270);
  
    addPiece("short-rect", 270);
    addPiece("short-rect", 270);
  
    addPiece("round", 270);
    addPiece("round", 180);
  
    addPiece("rectangle", 0);
    addPiece("empty", 0);
  
    addPiece("empty", 0);
    addPiece("rectangle", 0);
    addPiece("empty", 0);
  
    //14th row
    addPiece("empty", 0);
    addPiece("empty", 0);
    addPiece("empty", 0);
    addPiece("empty", 0);
    addPiece("empty", 0);
    addPiece("empty", 0);
    addPiece("round", 270);
    addPiece("round", 180);
    addPiece("empty", 0);
    addPiece("empty", 0);
    addPiece("round", 270);
    addPiece("round", 180);
  
    //15th row
    addPiece("empty", 0);
    addPiece("t-shape", 0);
    addPiece("round", 90);
  
    addPiece("round", 0);
    addPiece("rectangle", 90);
  
    addPiece("empty", 0);
    addPiece("t-shape", 0);
  
    addPiece("short-rect", 90);
    addPiece("short-rect", 90);
  
    addPiece("short-rect", 90);
    addPiece("short-rect", 90);
    addPiece("empty", 0);
  
    //16th row
    addPiece("empty", 0);
    addPiece("rectangle", 0);
    addPiece("empty", 0);
  
    addPiece("round", 270);
    addPiece("round", 90);
  
    addPiece("empty", 0);
    addPiece("rectangle", 0);
  
    addPiece("rectangle", 0);
    addPiece("rectangle", 0);
  
    addPiece("rectangle", 0);
    addPiece("rectangle", 0);
    addPiece("empty", 0);
  
    //17th row
    addPiece("empty", 0);
    addPiece("short-rect", 270);
    addPiece("empty", 0);
  
    addPiece("rectangle", 90);
    addPiece("round", 180);
  
    addPiece("round", 270);
    addPiece("round", 180);
  
    addPiece("round", 270);
    addPiece("round", 180);
  
    addPiece("t-shape", 0);
    addPiece("round", 180);
    addPiece("empty", 0);
  
    //17th row
    addPiece("empty", 0);
    addPiece("short-rect", 90);
    addPiece("short-rect", 90);
    addPiece("short-rect", 90);
  
    addPiece("round", 90);
    addPiece("round", 0);
  
    addPiece("short-rect", 90);
    addPiece("short-rect", 90);
  
    addPiece("rectangle", 90);
    addPiece("round", 90);
    addPiece("empty", 0);
    addPiece("empty", 0);
  
    //18th row
    addPiece("empty", 0);
    addPiece("rectangle", 0);
    addPiece("rectangle", 0);
    addPiece("rectangle", 0);
  
    addPiece("t-shape", 0);
    addPiece("t-shape", 180);
  
    addPiece("round", 270);
    addPiece("t-shape", 180);
  
    addPiece("round", 0);
    addPiece("round", 180);
    addPiece("empty", 0);
    addPiece("empty", 0);
  
    //19th row
    addPiece("empty", 0);
    addPiece("round", 270);
    addPiece("t-shape", 270);
    addPiece("round", 180);
  
    addPiece("round", 180);
    addPiece("round", 270);
  
    addPiece("empty", 0);
    addPiece("rectangle", 0);
  
    addPiece("round", 270);
    addPiece("rectangle", 90);
    addPiece("empty", 0);
    addPiece("empty", 0);
  
    //20th row
    addPiece("empty", 0);
    addPiece("empty", 0);
    addPiece("empty", 0);
    addPiece("empty", 0);
    addPiece("empty", 0);
    addPiece("empty", 0);
    addPiece("round", 270);
    addPiece("round", 180);
    addPiece("empty", 0);
    addPiece("empty", 0);
    addPiece("empty", 0);
    addPiece("empty", 0);
  });
  
  //TODO: add reset button
  //TODO: fix border color
  //TODO: fix cap display