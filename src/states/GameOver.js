import Phaser from 'phaser'
import { centerGameObjects, setResponsiveWidth } from '../utils'

export default class extends Phaser.State {
  init (points) {
    this.points = points
    this.stage.backgroundColor = '#ffffff'
  }
  create () {
    this.gameName = 'planesbestscr'
    let startButton = this.add.button(
      this.world.centerX,
      0,
      'startButton',
      this.actionOnClick,
      this
    )
    let gameover = this.add.sprite(
      this.world.centerX,
      this.world.centerY,
      'gameover'
    )
    let points = this.add.sprite(this.world.centerX - 10, 50, 'level')
    let best = this.add.sprite(this.world.centerX - 10, 100, 'best')
    let style = { font: '38px Righteous', fill: '#999', align: 'left' }
    let pointsText = this.add.text(0, 0, this.points, style)
    let bestText = this.add.text(
      0,
      0,
      window.localStorage.getItem(this.gameName) || 0,
      style
    )

    centerGameObjects([
      startButton,
      gameover,
      points,
      best,
      pointsText,
      bestText
    ])

    pointsText.x = points.x + points.width * 0.5 + 12
    pointsText.y = points.y

    bestText.x = best.x + best.width * 0.5 + 12
    bestText.y = best.y

    setResponsiveWidth(startButton, 50, this.world)
    startButton.y = gameover.y + gameover.height + 10

    if (!window.localStorage.getItem(this.gameName)) {
      window.localStorage.setItem(this.gameName, this.points)
    }
    if (
      window.localStorage.getItem(this.gameName) &&
      window.localStorage.getItem(this.gameName) < this.points
    ) {
      window.localStorage.setItem(this.gameName, this.points)
    }
    bestText.setText(window.localStorage.getItem(this.gameName))
  }

  actionOnClick () {
    this.state.start('Game')
  }
}
