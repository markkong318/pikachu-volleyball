import { Container } from 'pixi.js-legacy';
import * as PIXI from 'pixi.js-legacy';

const APP_VIEW_WIDTH = 480;
const APP_VIEW_HEIGHT = 800;

const STAGE_WIDTH = 432;
const STAGE_HEIGHT = 304;

export class App {
  constructor(renderer, stage, gamePad) {
    this.renderer = renderer;





    this.appView = new Container();
    this.initApp();

    this.stage = stage;
    this.initStage();
    this.appView.addChild(this.stage);

    this.gamepad = gamePad;
    this.initGamepad();
    this.appView.addChild(this.gamepad);

    window.appView = this.appView;
  }

  initStage() {
    const graphics = new PIXI.Graphics();
    graphics.beginFill(0xfff000);
    graphics.drawRect(0, 0, STAGE_WIDTH, STAGE_HEIGHT);
    this.stage.addChild(graphics);

    const scale = Math.min(
      APP_VIEW_WIDTH / STAGE_WIDTH,
      APP_VIEW_HEIGHT / STAGE_HEIGHT
    );

    this.stage.scale.x = scale;
    this.stage.scale.y = scale;
  }

  initGamepad() {
    this.gamepad.x = 0;
    this.gamepad.y = this.stage.height;
  }

  initApp() {
    const graphics = new PIXI.Graphics();
    graphics.beginFill(0x00ff00);
    graphics.drawRect(0, 0, APP_VIEW_WIDTH, APP_VIEW_HEIGHT);
    this.appView.addChild(graphics);

    if (this.renderer.width > this.renderer.height) {
      const scale = Math.min(
        this.renderer.screen.width / APP_VIEW_WIDTH,
        this.renderer.screen.height / APP_VIEW_HEIGHT / 2
      );

      this.appView.scale.x = scale;
      this.appView.scale.y = scale;

      this.appView.x = APP_VIEW_WIDTH / 2;
      this.appView.y = 0;
    } else {
      this.appView.height = this.renderer.height * this.renderer.width / this.appView.width;
      this.appView.width = this.renderer.width;
      // this.appView.height = this.renderer.height;
    }
  }
}
