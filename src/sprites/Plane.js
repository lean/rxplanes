import Phaser from 'phaser'

export default class extends Phaser.Sprite {
  constructor ({ game, pointsEvent, x, y, asset, scale }) {
    super(game, x, y, asset)
    this.game = game
    this.pointsEvent = pointsEvent
    this.anchor.setTo(0.5)
    this.scale.setTo(scale, scale)
    this.inputEnabled = true
    this.events.onInputDown.add(this.onClick, this)
  }
  onClick () {
    let tween = this.game.add.tween(this)
    if (this.alive) {
      this.tint = 0x000000
      this.pointsEvent()
      this.alive = false
      tween.onComplete.add(this.destroy, this)
      tween.to(
        {
          alpha: 0,
          rotation: this.game.rnd.between(-2, 1),
          y: this.y + 10
        },
        500,
        'Linear',
        true
      )
    }
  }

  destroy () {
    this.scale.setTo(0.1, 0.1)
    this.rotation = 0
    this.x = this.game.rnd.between(50, this.game.world.width - 50)
    this.y = this.game.rnd.between(50, this.game.world.height - 50)

    setTimeout(() => {
      this.tint = 0xffffff
      this.alive = true
      this.game.add.tween(this).to({ alpha: 1 }, 500, 'Linear', true)
    }, 1000 * this.game.rnd.between(1, 3))
  }
}
