import { Container } from 'pixi.js-legacy';
import * as PIXI from 'pixi.js-legacy';

const APP_VIEW_WIDTH = 480;
const APP_VIEW_HEIGHT = 800;

const STAGE_WIDTH = 432;
const STAGE_HEIGHT = 304;

export class App {
  constructor(renderer, stage, gamePad) {
    this.renderer = renderer;
    this.stage = stage;
    this.gamePad = gamePad;


    this.appView = new Container();
    const appGraphics = new PIXI.Graphics();
    appGraphics.beginFill(0x00ff00);
    appGraphics.drawRect(0, 0, APP_VIEW_WIDTH, APP_VIEW_HEIGHT);
    appGraphics.lineStyle(1, 0xff0000);

    this.appView.addChild(appGraphics);



    const stageGraphics = new PIXI.Graphics();
    stageGraphics.beginFill(0xfff000);
    stageGraphics.drawRect(0, 0, STAGE_WIDTH, STAGE_HEIGHT);
    this.stage.addChild(stageGraphics);

    this.resizeStage();

    // console.log('stage range: ' + this.stage.width + ' x ' + this.stage.height);
    //
    // this.appView = new Container();
    // const appGraphics = new PIXI.Graphics();
    // appGraphics.beginFill(0x00ff00);
    // appGraphics.drawRect(0, 0, APP_VIEW_WIDTH - 2, APP_VIEW_HEIGHT/2);
    // appGraphics.lineStyle(1, 0xff0000);
    // this.appView.addChild(appGraphics);
    //
    this.appView.addChild(this.stage);
    //
    this.resizeApp();

    window.appView = this.appView;
  }

  resizeStage() {
    const scale = Math.min(
      APP_VIEW_WIDTH / STAGE_WIDTH,
      APP_VIEW_HEIGHT / STAGE_HEIGHT
    );

    console.log("stage width x :" + this.stage.width);
    console.log("stage scale x :" + this.stage.scale.x);
    console.log("stage scale:" + scale);

    this.stage.scale.x = scale;
    this.stage.scale.y = scale;

    console.log("stage width x :" + this.stage.width);
    console.log("stage scale x :" + this.stage.scale.x);
    console.log("stage scale:" + scale);
  }

  resizeApp() {
    if (this.renderer.width > this.renderer.height) {
      const scale = Math.min(
        this.renderer.screen.width / APP_VIEW_WIDTH,
        this.renderer.screen.height / APP_VIEW_HEIGHT / 2
      );

      console.log("rw: " + this.renderer.width);
      console.log("rh: " + this.renderer.height);

      console.log("scale: " + scale);

      this.appView.scale.x = scale;
      this.appView.scale.y = scale;



      this.appView.x = APP_VIEW_WIDTH / 2;
      this.appView.y = 0;

      console.log("gx: " + this.appView.x);
      console.log("gy: " + this.appView.y);
    } else {
      console.log("====>")
      console.log("rsw: " + this.renderer.screen.width);
      console.log("rsh: " + this.renderer.screen.height);

      this.appView.width = this.renderer.width;
      this.appView.height = this.renderer.height;

    }
  }
}
