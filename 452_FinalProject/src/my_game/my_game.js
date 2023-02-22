"use strict"; // Operate in Strict mode such that variables must be declared before used!

import engine from "../engine/index.js";

class MyGame extends engine.Scene {
  constructor() {
    super();
    this.kBg = "assets/bg.png";
    this.kBgNormal = "assets/bg_normal.png";

    // The camera to view the scene
    this.mCamera = null;
  }

  load() {
    engine.texture.load(this.kBg);
    engine.texture.load(this.kBgNormal);
  }

  unload() {
    engine.texture.unload(this.kBg);
    engine.texture.unload(this.kBgNormal);
  }

  init() {
    // Step A: set up the cameras
    this.mCamera = new engine.Camera(
      vec2.fromValues(50, 40), // position of the camera
      100, // width of camera
      [0, 0, 640, 480] // viewport (orgX, orgY, width, height)
    );
    this.mCamera.setBackgroundColor([0.8, 0.8, 0.8, 1]);
    // sets the background to gray

    this.lightSource = new engine.LightSource();
    this.lightSource.getXform().setXPos(50);
    this.lightSource.getXform().setYPos(40);

    // Large background image
    this.bgR = new engine.NormalMapRenderable(
      this.kBg,
      this.kBgNormal,
      this.lightSource
    );
    this.bgR.getXform().setSize(100, 100);
    this.bgR.getXform().setPosition(50, 40);
  }

  //   _drawCamera(camera) {
  //     camera.setViewAndCameraMatrix();
  //     this.mBg.draw(camera);
  //   }

  // This is the draw function, make sure to setup proper drawing environment, and more
  // importantly, make sure to _NOT_ change any state.
  draw() {
    // Step A: clear the canvas
    engine.clearCanvas([0.9, 0.9, 0.9, 1.0]); // clear to light gray
    this.mCamera.setViewAndCameraMatrix();

    // Step  B: Draw with all three cameras
    this.bgR.draw(this.mCamera);
  }
  // The update function, updates the application state. Make sure to _NOT_ draw
  // anything from this function!
  update() {
    if (engine.input.isKeyPressed(engine.input.keys.W)) {
      this.bgR.getXform().incYPosBy(0.5);
    }
    if (engine.input.isKeyPressed(engine.input.keys.A)) {
      this.bgR.getXform().incXPosBy(-0.5);
    }
    if (engine.input.isKeyPressed(engine.input.keys.S)) {
      this.bgR.getXform().incYPosBy(-0.5);
    }
    if (engine.input.isKeyPressed(engine.input.keys.D)) {
      this.bgR.getXform().incXPosBy(0.5);
    }
    if (engine.input.isKeyPressed(engine.input.keys.Up)) {
      this.lightSource.getXform().incYPosBy(0.5);
    }
    if (engine.input.isKeyPressed(engine.input.keys.Left)) {
      this.lightSource.getXform().incXPosBy(-0.5);
    }
    if (engine.input.isKeyPressed(engine.input.keys.Down)) {
      this.lightSource.getXform().incYPosBy(-0.5);
    }
    if (engine.input.isKeyPressed(engine.input.keys.Right)) {
      this.lightSource.getXform().incXPosBy(0.5);
    }
    if (engine.input.isKeyPressed(engine.input.keys.P)) {
      this.lightSource.incIntensityBy(0.05);
    }
    if (engine.input.isKeyPressed(engine.input.keys.O)) {
      this.lightSource.incIntensityBy(-0.05);
    }
  }
}

window.onload = function () {
  engine.init("GLCanvas");

  let myGame = new MyGame();
  myGame.start();
};
