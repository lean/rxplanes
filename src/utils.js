import Phaser from 'phaser'

export const centerGameObjects = (objects) => {
  objects.forEach(function (object) {
    object.anchor.setTo(0.5)
  })
}

export const getRandomInt = (min, max) => {
  if (max == null) {
    max = min
    min = 0
  }
  return min + Math.floor(Math.random() * (max - min + 1))
}

export const setResponsiveWidth = (sprite, percent, parent) => {
  let percentWidth = (sprite.texture.width - (parent.width / (100 / percent))) * 100 / sprite.texture.width
  sprite.width = parent.width / (100 / percent)
  sprite.height = sprite.texture.height - (sprite.texture.height * percentWidth / 100)
}

export const checkOverlap = (spriteA, spriteB) => {
  return Phaser.Rectangle.intersects(spriteA.getBounds(), spriteB.getBounds())
}

export const createCircle = (ctx, diameter, color) => {
  let circle = new Phaser.Graphics(ctx.game)
  circle.beginFill(color || 0xdddddd, 1)
  circle.drawCircle(0, 0, diameter)
  return circle
}