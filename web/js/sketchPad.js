class SketchPad {
  constructor(container, size = 400) {
    this.canvas = document.createElement("canvas");
    this.canvas.width = size;
    this.canvas.height = size;
    this.canvas.style = `
            background-color: white;
            box-shadow: 0px 0px 10px 2px black;
        `;
    container.appendChild(this.canvas);

    const lineBreak = document.createElement("br");
    container.appendChild(lineBreak);

    this.undoBtn = document.createElement("button");
    this.undoBtn.innerHTML = "UNDO";
    container.appendChild(this.undoBtn);

    this.ctx = this.canvas.getContext("2d");

    this.paths = [];

    this.isDrawing = false;

    // this.#redraw();

    // this.mousePositionText = document.createElement("p");
    // container.appendChild(this.mousePositionText);
    this.reset();
    this.#addEventListeners();
  }

  reset() {
    this.paths = [];
    this.isDrawing = false;
    this.#redraw();
  }

  #addEventListeners() {
    this.canvas.onmousedown = (e) => {
      //   const rect = this.canvas.getBoundingClientRect();
      //   const mouse = [
      //     Math.round(e.clientX - rect.left),
      //     Math.round(e.clientY - rect.top),
      //   ];
      const mouse = this.#getMouse(e);
      //   console.log(mouse);
      this.paths.push([mouse]);
      this.isDrawing = true;
    };

    this.canvas.onmousemove = (e) => {
      if (this.isDrawing) {
        // const rect = this.canvas.getBoundingClientRect();
        // const mouse = [
        //   Math.round(e.clientX - rect.left),
        //   Math.round(e.clientY - rect.top),
        // ];
        const mouse = this.#getMouse(e);
        // this.path.push(mouse);
        const lastPath = this.paths[this.paths.length - 1];
        lastPath.push(mouse);
        this.#redraw();
        // this.isDrawing = false;
        console.log(this.paths.length);
        // this.mousePositionText.textContent = `Mouse position : ${mouse[0]} - ${mouse[1]}`;
      }
    };

    document.onmouseup = () => {
      this.isDrawing = false;
    };

    this.canvas.ontouchstart = (e) => {
      const location = e.touches[0];
      this.canvas.onmousedown(location);
    };

    this.canvas.ontouchmove = (e) => {
      const location = e.touches[0];
      this.canvas.onmousemove(location);
    };

    document.ontouchend = () => {
      document.onmouseup();
    };

    this.undoBtn.onclick = () => {
      this.paths.pop();
      this.#redraw();
    };
  }

  #redraw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    draw.paths(this.ctx, this.paths);

    if (this.paths.length > 0) {
      this.undoBtn.disabled = false;
    } else {
      this.undoBtn.disabled = true;
    }
  }

  #getMouse = (e) => {
    const rect = this.canvas.getBoundingClientRect();
    return [
      Math.round(e.clientX - rect.left),
      Math.round(e.clientY - rect.top),
    ];
  };
}

// const sketchPad = new SketchPad(sketchPadContainer);
//const sketchPadContainer = document.querySelector("#sketchPadContainer");

// document.querySelector("#advanceBtn").onclick = () => {
//   console.log("Clicked!");
// };
