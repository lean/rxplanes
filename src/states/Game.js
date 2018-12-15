import Phaser from 'phaser'
import Plane from '../sprites/Plane'

let planesTextures = ['plane1', 'plane2', 'plane1', 'plane2']

export default class extends Phaser.State {
  init () {
    this.points = 0
    this.stage.backgroundColor = '#8899FF'
  }

  preload () {}

  create () {
    this.pointsChange = () => this.updatePoints()
    this.scaleFactor = 0.0001
    this.createTexts()

    this.planes = this.game.add.group()

    this.planes.add(
      new Plane({
        game: this.game,
        pointsEvent: this.pointsChange,
        x: this.rnd.between(50, this.world.width - 50),
        y: this.rnd.between(50, this.world.height - 50),
        asset: planesTextures[0],
        scale: 0.1,
        alive: true
      })
    )
  }

  update () {
    this.planes.forEachAlive(child => {
      child.scale.x += this.scaleFactor
      child.scale.y += this.scaleFactor
      if (child.scale.x >= 0.3) {
        child.tint = 0xff0000
      }
      if (child.scale.x >= 0.4) {
        this.gameOver()
      }
    }, this)
  }

  createTexts () {
    let style = { font: '38px Righteous', fill: '#fff', align: 'center' }
    this.pointsText = this.add.text(this.world.centerX, 20, '0', style)
    this.pointsText.setShadow(2, 2, 'rgba(0,0,0,0.5)', 1)
    this.pointsText.anchor.setTo(0.5)
    this.pointsText.x = Math.floor(this.pointsText.x)
    this.pointsText.y = Math.floor(this.pointsText.y)
    this.pointsText.alpha = 0.5
  }

  updatePoints () {
    this.points++
    this.pointsText.setText(this.points)

    if (this.points === 2) {
      this.scaleFactor = 0.0005
      this.planes.add(
        new Plane({
          game: this.game,
          pointsEvent: this.pointsChange,
          x: this.rnd.between(50, this.world.width - 50),
          y: this.rnd.between(50, this.world.height - 50),
          asset: planesTextures[this.rnd.between(0, 3)],
          scale: 0.1,
          alive: true
        })
      )
    }
  }

  gameOver () {
    this.state.start('GameOver', true, false, this.points)
  }
}
