'use strict';
import { Container } from 'pixi.js-legacy';
import * as PIXI from 'pixi.js-legacy';

const GAMEPAD_VIEW_WIDTH = 480;
const GAMEPAD_VIEW_HEIGHT = 800;

const PRESS_UP_IDX = 0;
const PRESS_DOWN_IDX = 1;
const PRESS_LEFT_IDX = 2;
const PRESS_RIGHT_IDX = 3;

const D_PAD_PRESSED_KEY = ['KeyR', 'KeyF', 'KeyD', 'KeyG'];

const DEAD_ZONE = 30;

export class Gamepad extends Container {


  constructor() {
    super();
  }

  init(resources) {
    const graphics = new PIXI.Graphics();
    graphics.beginFill(0x0d2e41);
    graphics.drawRect(0, 0, GAMEPAD_VIEW_WIDTH, GAMEPAD_VIEW_HEIGHT);
    this.addChild(graphics);

    const dPadStyle = new PIXI.TextStyle({
      fontFamily: 'game-boy',
      fontSize: 200,
      fontStyle: '',
      fill: ['#44AD9F'],
      wordWrap: true,
      wordWrapWidth: 440,
    });

    const btnStyle = new PIXI.TextStyle({
      fontFamily: 'game-boy',
      fontSize: 90,
      fontStyle: '',
      fill: ['#44AD9F'],
      wordWrap: true,
      wordWrapWidth: 440,
    });

    const dPadView = new Container();
    dPadView.x = 120;
    dPadView.y = 150;

    const DPadPressed = [false, false, false, false];
    const DPadPressedBefore = [false, false, false, false,];

    const dPadTouch = new PIXI.Sprite(PIXI.Texture.EMPTY);
    dPadTouch.anchor.x = 0.5;
    dPadTouch.anchor.y = 0.5;
    dPadTouch.x = 0;
    dPadTouch.y = 0;
    dPadTouch.width = 180;
    dPadTouch.height = 220;
    dPadTouch.buttonMode = true;
    dPadTouch.interactive = true;
    dPadTouch.on('pointermove', evt => {
      console.log("pointermove")
      updateDPadPressed(evt);
    });
    dPadTouch.on('pointerdown', evt => {
      console.log("pointerdown")

      startDPadPressed();
      updateDPadPressed(evt);
    });
    dPadTouch.on('pointerup', evt => {
      console.log("pointerup")

      endDPadPressed();
    });
    dPadView.addChild(dPadTouch);

    const startDPadPressed = () => {
      for (let i = 0; i < DPadPressed.length; i++) {
        DPadPressed[i] = false;
        DPadPressedBefore[i] = false;
      }
    }

    const updateDPadPressed = evt => {
      const {x, y} = evt.data.getLocalPosition(dPadView);
      // console.log(`(${x}, ${y})`);

      if (Math.hypot(x, y) < 30) {
        return;
      }

      for (let i = 0; i < DPadPressedBefore.length; i++) {
        DPadPressedBefore[i] = false;
      }

      const x1 = x;
      const y1 = y;
      const x2 = -1;
      const y2 = 0;

      const dot = x1 * x2 + y1 * y2;
      const det = x1 * y2 - y1 * x2;
      const angle = Math.atan2(det, dot) * 180 / Math.PI + 180;

      // console.log(`angle: ${angle}`);

      if (angle < 15 || angle > 345) {
        // right
        console.log('→');
        DPadPressedBefore[PRESS_RIGHT_IDX] = true;
      } else if (angle >= 15 && angle <= 75) {
        // up-right
        console.log('↗︎');
        DPadPressedBefore[PRESS_UP_IDX] = true;
        DPadPressedBefore[PRESS_RIGHT_IDX] = true
      } else if (angle > 75 && angle < 105) {
        // up
        console.log('↑');
        DPadPressedBefore[PRESS_UP_IDX] = true;
      } else if (angle >= 105 && angle < 165) {
        // up-left
        console.log('↖︎');
        DPadPressedBefore[PRESS_UP_IDX] = true;
        DPadPressedBefore[PRESS_LEFT_IDX] = true;
      } else if (angle > 165 && angle < 195) {
        // left
        console.log('←');
        DPadPressedBefore[PRESS_LEFT_IDX] = true;
      } else if (angle >= 195 && angle <= 255) {
        // down-left
        console.log('↙︎');
        DPadPressedBefore[PRESS_DOWN_IDX] = true;
        DPadPressedBefore[PRESS_LEFT_IDX] = true;
      } else if (angle > 255 && angle < 285) {
        // down
        console.log('↓');
        DPadPressedBefore[PRESS_DOWN_IDX] = true;
      } else if (angle >= 285 && angle <= 345) {
        // down-right
        console.log('↘︎');
        DPadPressedBefore[PRESS_DOWN_IDX] = true;
        DPadPressedBefore[PRESS_RIGHT_IDX] = true;
      }

      for (let i = 0; i < DPadPressed.length; i++) {
        if (DPadPressedBefore[i] && !DPadPressed[i]) {
          window.dispatchEvent(new KeyboardEvent('keydown', { code: D_PAD_PRESSED_KEY[i] }));
        } else if (!DPadPressedBefore[i] && DPadPressed[i]) {
          window.dispatchEvent(new KeyboardEvent('keyup', { code: D_PAD_PRESSED_KEY[i] }));
        }

        DPadPressed[i] = DPadPressedBefore[i];
      }
    }

    const endDPadPressed = () => {
      for (let i = 0; i < DPadPressed.length; i++) {
        if (DPadPressed[i]) {
          window.dispatchEvent(new KeyboardEvent('keyup', { code: D_PAD_PRESSED_KEY[i] }));
        }
      }
    }

    const dPadText = new PIXI.Text('S', dPadStyle);
    dPadText.anchor.x = 0.5;
    dPadText.anchor.y = 0.5;
    dPadText.x = 0;
    dPadText.y = -7;
    dPadView.addChild(dPadText);



    const gr  = new PIXI.Graphics();
    gr.beginFill(0xffffff);
    gr.drawCircle(0, 0, 30);
    gr.endFill();
    const grt = renderer.generateTexture(gr);
    const ss = new PIXI.Sprite(grt);
    ss.anchor.x = 0.5;
    ss.anchor.y = 0.5;
    ss.x = 0;
    ss.y = 0;
    dPadView.addChild(ss);

    this.addChild(dPadView);

    const aTouch = new PIXI.Text('a', btnStyle);
    aTouch.anchor.x = 0.5;
    aTouch.anchor.y = 0.5;
    aTouch.x = 280;
    aTouch.y = 200;
    aTouch.buttonMode = true;
    aTouch.interactive = true;
    aTouch.on('pointerdown', evt => {
      window.dispatchEvent(new KeyboardEvent('keydown', { code: 'KeyZ' }));
      evt.target.scale.x = 1.2;
      evt.target.scale.y = 1.2;
    });
    aTouch.on('pointerup', evt => {
      window.dispatchEvent(new KeyboardEvent('keyup', { code: 'KeyZ' }));
      evt.target.scale.x = 1;
      evt.target.scale.y = 1;

    });
    this.addChild(aTouch);

    const bTouch = new PIXI.Text('b', btnStyle);
    bTouch.anchor.x = 0.5;
    bTouch.anchor.y = 0.5;
    bTouch.x = 400;
    bTouch.y = 150;
    bTouch.buttonMode = true;
    bTouch.interactive = true;
    bTouch.on('pointerdown', evt => {
      window.dispatchEvent(new KeyboardEvent('keydown', { code: 'KeyZ' }));
      evt.target.scale.x = 1.2;
      evt.target.scale.y = 1.2;
    });
    bTouch.on('pointerup', evt => {
      window.dispatchEvent(new KeyboardEvent('keyup', { code: 'KeyZ' }));
      evt.target.scale.x = 1;
      evt.target.scale.y = 1;
    });
    this.addChild(bTouch);
  }
}
