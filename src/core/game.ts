import { Application } from 'pixi.js'

export class Game {
  public app?: Application

  constructor() {
    const app = new Application({
      width: 640, // 画布宽度
      height: 480, // 画布高度
      backgroundColor: 0x1099BB, // 背景颜色
    })

    this.app = app
  }

  public getView() {
    return this.app?.view
  }
}
