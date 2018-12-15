import Phaser from 'phaser'
import WebFont from 'webfontloader'
import config from '../config'

export default class extends Phaser.State {
  init () {
    this.stage.backgroundColor = '#EDEEC9'
    this.fontsReady = false
    this.fontsLoaded = this.fontsLoaded.bind(this)
  }

  preload () {
    if (config.webfonts.length) {
      WebFont.load({
        google: {
          families: config.webfonts
        },
        active: this.fontsLoaded
      })
    }

    let text = this.add.text(
      this.world.centerX,
      this.world.centerY,
      'loading fonts',
      { font: '16px Arial', fill: '#dddddd', align: 'center' }
    )
    text.anchor.setTo(0.5, 0.5)

    this.load.image('loaderBg', './assets/images/loader-bg.png')
    this.load.image('loaderBar', './assets/images/loader-bar.png')

    this.load.json('config', 'config.json')
    this.load.image('startButton', './assets/images/start.png')
    this.load.image('instructions', './assets/images/instructions.png')
    this.load.image('best', './assets/images/best.png')
    this.load.image('level', './assets/images/level.png')
    this.load.image('gameover', './assets/images/gameover.png')
    this.load.image('gamename', './assets/images/game-name.png')
    this.load.image('background', './assets/images/bg.jpg')
    this.load.image('plane1', './assets/images/plane_02.png')
    this.load.image('plane2', './assets/images/plane_05.png')
  }

  render () {
    if (config.webfonts.length && this.fontsReady) {
      this.state.start('Splash')
    }
    if (!config.webfonts.length) {
      this.state.start('Splash')
    }
  }

  fontsLoaded () {
    this.fontsReady = true
  }
}
