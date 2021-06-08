'use strict';
import { Container } from 'pixi.js-legacy';
import * as PIXI from 'pixi.js-legacy';

const GAMEPAD_VIEW_WIDTH = 480;
const GAMEPAD_VIEW_HEIGHT = 800;

const PRESS_UP = Symbol('up');
const PRESS_DOWN = Symbol('down');
const PRESS_LEFT = Symbol('left');
const PRESS_RIGHT = Symbol('right');
const PRESS_NONE = Symbol('none');

const D_PAD_UP_TEXT = 'W';
const D_PAD_DOWN_TEXT = 'X';
const D_PAD_LEFT_TEXT = 'A';
const D_PAD_RIGHT_TEXT = 'D';
const D_PAD_NONE_TEXT = 'S';

const D_PAD_UP_KEY = 'KeyR';
const D_PAD_DOWN_KEY = 'KeyF';
const D_PAD_LEFT_KEY = 'KeyD';
const D_PAD_RIGHT_KEY = 'KeyG';

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
      fontSize: 180,
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
    dPadView.x = 100;
    dPadView.y = 150;
    dPadView.buttonMode = true;
    dPadView.interactive = true;

    let lastDPadPress;
    let isDPadPress = false;

    const dPadButton = new PIXI.Sprite(PIXI.Texture.WHITE);
    dPadButton.anchor.x = 0.5;
    dPadButton.anchor.y = 0.5;
    dPadButton.x = 0;
    dPadButton.y = 0;
    dPadButton.width = 180;
    dPadButton.height = 180;
    dPadButton.buttonMode = true;
    dPadButton.interactive = true;
    dPadButton.on('pointermove', evt => {
      console.log("pointermove")

      if (!isDPadPress) {
        return;
      }

      const {x, y} = evt.data.getLocalPosition(dPadView);
      processDPadDown(x, y);
    });
    dPadButton.on('pointerdown', evt => {
      console.log("pointerdown")

      isDPadPress = true;

      const {x, y} = evt.data.getLocalPosition(dPadView);
      processDPadDown(x, y);
    });
    dPadButton.on('pointerup', evt => {
      console.log("pointerup")

      isDPadPress = false;
      processDPadUp();
    });
    dPadView.addChild(dPadButton);

    const dPad = new PIXI.Text('S', dPadStyle);
    dPad.anchor.x = 0.5;
    dPad.anchor.y = 0.5;
    dPad.x = 0;
    dPad.y = 0;
    dPadView.addChild(dPad);

    const dPadUpBtn = new PIXI.Sprite(PIXI.Texture.EMPTY);
    dPadUpBtn.width = 50;
    dPadUpBtn.height = 50;
    dPadUpBtn.anchor.x = 0.5;
    dPadUpBtn.anchor.y = 0.5;
    dPadUpBtn.x = 0;
    dPadUpBtn.y = -40;
    dPadView.addChild(dPadUpBtn);

    const dPadDownBtn = new PIXI.Sprite(PIXI.Texture.EMPTY);
    dPadDownBtn.width = 50;
    dPadDownBtn.height = 50;
    dPadDownBtn.anchor.x = 0.5;
    dPadDownBtn.anchor.y = 0.5;
    dPadDownBtn.x = 0;
    dPadDownBtn.y = 55;
    dPadView.addChild(dPadDownBtn);

    const dPadLeftBtn = new PIXI.Sprite(PIXI.Texture.EMPTY);
    dPadLeftBtn.width = 50;
    dPadLeftBtn.height = 50;
    dPadLeftBtn.anchor.x = 0.5;
    dPadLeftBtn.anchor.y = 0.5;
    dPadLeftBtn.x = -50;
    dPadLeftBtn.y = 5;
    dPadView.addChild(dPadLeftBtn);

    const dPadRightBtn = new PIXI.Sprite(PIXI.Texture.EMPTY);
    dPadRightBtn.width = 50;
    dPadRightBtn.height = 50;
    dPadRightBtn.anchor.x = 0.5;
    dPadRightBtn.anchor.y = 0.5;
    dPadRightBtn.x = 50;
    dPadRightBtn.y = 5;
    dPadView.addChild(dPadRightBtn);

    const processDPadDown = (x, y) => {
      let dPadPress;
      if (x > dPadUpBtn.x - dPadUpBtn.width / 2 && x < dPadUpBtn.x + dPadUpBtn.width && y > dPadUpBtn.y - dPadUpBtn.height / 2 && y < dPadUpBtn.y + dPadUpBtn.height / 2) {
        dPadPress = PRESS_UP;
      } else if (x > dPadDownBtn.x - dPadDownBtn.width / 2 && x < dPadDownBtn.x + dPadDownBtn.width && y > dPadDownBtn.y - dPadDownBtn.height / 2 && y < dPadDownBtn.y + dPadDownBtn.height / 2) {
        dPadPress = PRESS_DOWN;
      } else if (x > dPadLeftBtn.x - dPadLeftBtn.width / 2 && x < dPadLeftBtn.x + dPadLeftBtn.width && y > dPadLeftBtn.y - dPadLeftBtn.height / 2 && y < dPadLeftBtn.y + dPadLeftBtn.height / 2) {
        dPadPress = PRESS_LEFT;
      } else if (x > dPadRightBtn.x - dPadRightBtn.width / 2 && x < dPadRightBtn.x + dPadRightBtn.width && y > dPadRightBtn.y - dPadRightBtn.height / 2 && y < dPadRightBtn.y + dPadRightBtn.height / 2) {
        dPadPress = PRESS_RIGHT;
      } else {
        dPadPress = PRESS_NONE;
      }

      if (lastDPadPress === dPadPress) {
        return;
      }

      lastDPadPress = dPadPress;

      switch (dPadPress) {
        case PRESS_UP:
          window.dispatchEvent(new KeyboardEvent('keydown', { code: D_PAD_UP_KEY }));
          dPad.text = D_PAD_UP_TEXT;
          break;
        case PRESS_DOWN:
          window.dispatchEvent(new KeyboardEvent('keydown', { code: D_PAD_DOWN_KEY }));
          dPad.text = D_PAD_DOWN_TEXT;
          break;
        case PRESS_LEFT:
          window.dispatchEvent(new KeyboardEvent('keydown', { code: D_PAD_LEFT_KEY }));
          dPad.text = D_PAD_LEFT_TEXT;
          break;
        case PRESS_RIGHT:
          window.dispatchEvent(new KeyboardEvent('keydown', { code: D_PAD_RIGHT_KEY }));
          dPad.text = D_PAD_RIGHT_TEXT;
          break;
        case PRESS_NONE:
          dPad.text = D_PAD_NONE_TEXT;
          break;
      }
    };

    const processDPadUp = () => {
      if (lastDPadPress === D_PAD_NONE_TEXT) {
        return;
      }

      switch (lastDPadPress) {
        case PRESS_UP:
          window.dispatchEvent(new KeyboardEvent('keyup', { code: D_PAD_UP_KEY }));
          break;
        case PRESS_DOWN:
          window.dispatchEvent(new KeyboardEvent('keyup', { code: D_PAD_DOWN_KEY }));
          break;
        case PRESS_LEFT:
          window.dispatchEvent(new KeyboardEvent('keyup', { code: D_PAD_LEFT_KEY }));
          break;
        case PRESS_RIGHT:
          window.dispatchEvent(new KeyboardEvent('keyup', { code: D_PAD_RIGHT_KEY }));
          break;
        case PRESS_NONE:
          dPad.text = D_PAD_NONE_TEXT;
          break;
      }

      lastDPadPress = D_PAD_NONE_TEXT;

      dPad.text = D_PAD_NONE_TEXT;
    }

    this.addChild(dPadView);

    const aBtn = new PIXI.Text('a', btnStyle);
    aBtn.anchor.x = 0.5;
    aBtn.anchor.y = 0.5;
    aBtn.x = 280;
    aBtn.y = 200;
    aBtn.buttonMode = true;
    aBtn.interactive = true;
    aBtn.on('pointerdown', evt => {
      window.dispatchEvent(new KeyboardEvent('keydown', { code: 'KeyZ' }));
      evt.target.scale.x = 1.2;
      evt.target.scale.y = 1.2;
    });
    aBtn.on('pointerup', evt => {
      window.dispatchEvent(new KeyboardEvent('keyup', { code: 'KeyZ' }));
      evt.target.scale.x = 1;
      evt.target.scale.y = 1;

    });
    this.addChild(aBtn);

    const bBtn = new PIXI.Text('b', btnStyle);
    bBtn.anchor.x = 0.5;
    bBtn.anchor.y = 0.5;
    bBtn.x = 400;
    bBtn.y = 150;
    bBtn.buttonMode = true;
    bBtn.interactive = true;
    bBtn.on('pointerdown', evt => {
      window.dispatchEvent(new KeyboardEvent('keydown', { code: 'KeyZ' }));
      evt.target.scale.x = 1.2;
      evt.target.scale.y = 1.2;
    });
    bBtn.on('pointerup', evt => {
      window.dispatchEvent(new KeyboardEvent('keyup', { code: 'KeyZ' }));
      evt.target.scale.x = 1;
      evt.target.scale.y = 1;
    });
    this.addChild(bBtn);
  }
}
