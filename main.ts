controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    directionRequest = "up"
})
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    directionRequest = "left"
})
scene.onHitWall(SpriteKind.Enemy, function (sprite, location) {
    setGhostMovementDirection(getAllowedDirections(ghost))
})
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    directionRequest = "right"
})
controller.down.onEvent(ControllerButtonEvent.Pressed, function () {
    directionRequest = "down"
})
function setPlayerMovementDirection (movementOptions: any[]) {
    if (directionRequest == "up" && movementOptions[0]) {
        direction = "up"
    } else if (directionRequest == "down" && movementOptions[1]) {
        direction = "down"
    } else if (directionRequest == "left" && movementOptions[2]) {
        direction = "left"
    } else if (directionRequest == "right" && movementOptions[3]) {
        direction = "right"
    }
}
function getAllowedDirections (sprite: Sprite) {
    // up
    // down
    // left
    // right
    allowedDirections = [
    false,
    false,
    false,
    false
    ]
    if ((sprite.x + 24) % 16 == 0) {
        if (!(tiles.tileAtLocationIsWall(sprite.tilemapLocation().getNeighboringLocation(CollisionDirection.Top)))) {
            allowedDirections[0] = true
        }
        if (!(tiles.tileAtLocationIsWall(sprite.tilemapLocation().getNeighboringLocation(CollisionDirection.Bottom)))) {
            allowedDirections[1] = true
        }
    } else {
        allowedDirections = [
        false,
        false,
        true,
        true
        ]
    }
    if ((sprite.y + 24) % 16 == 0) {
        if (!(tiles.tileAtLocationIsWall(sprite.tilemapLocation().getNeighboringLocation(CollisionDirection.Left)))) {
            allowedDirections[2] = true
        }
        if (!(tiles.tileAtLocationIsWall(sprite.tilemapLocation().getNeighboringLocation(CollisionDirection.Right)))) {
            allowedDirections[3] = true
        }
    } else {
        allowedDirections = [
        true,
        true,
        false,
        false
        ]
    }
    return allowedDirections
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Food, function (sprite, otherSprite) {
    info.changeScoreBy(1)
    sprites.destroy(otherSprite)
    music.play(music.tonePlayable(220, music.beat(BeatFraction.Eighth)), music.PlaybackMode.UntilDone)
})
function move (sprite: Sprite, direction: string) {
    if (direction == "up") {
        sprite.y += -1
    } else if (direction == "down") {
        sprite.y += 1
    } else if (direction == "left") {
        sprite.x += -1
    } else if (direction == "right") {
        sprite.x += 1
    }
}
function setGhostMovementDirection (movementOptions: any[]) {
    randomDirections = []
    for (let index = 0; index <= movementOptions.length - -1; index++) {
        if (index == 0) {
            randomDirections.push("up")
        } else if (index == 1) {
            randomDirections.push("down")
        } else if (index == 2) {
            randomDirections.push("left")
        } else if (index == 3) {
            randomDirections.push("right")
        }
    }
    ghostDirection = randomDirections._pickRandom()
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    game.gameOver(false)
})
let randomDirections: string[] = []
let allowedDirections: boolean[] = []
let directionRequest = ""
let ghostDirection = ""
let ghost: Sprite = null
let maxScore = 0
let pellet: Sprite = null
let direction = ""
tiles.setCurrentTilemap(tilemap`level`)
let pacman = sprites.create(img`
    . . . . . 5 5 5 5 5 5 . . . . . 
    . . . 5 5 5 5 5 5 5 5 5 5 . . . 
    . . 5 5 5 5 5 5 5 5 5 5 5 5 . . 
    . 5 5 5 5 5 5 5 5 5 5 5 5 5 5 . 
    5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 
    f f f f f f f f f f f f f f f f 
    5 5 5 f f f 5 5 5 5 f f f 5 5 5 
    5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 
    5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 
    5 5 5 5 5 f f f f f f 5 5 5 5 5 
    5 5 5 5 5 f f f f f f 5 5 5 5 5 
    5 5 5 5 5 f f f f f f 5 5 5 5 5 
    5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 
    5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 
    5 5 . 5 5 5 . 5 5 . 5 5 5 . 5 5 
    5 . . . 5 . . . . . . 5 . . . 5 
    `, SpriteKind.Player)
direction = "right"
tiles.placeOnTile(pacman, tiles.getTileLocation(1, 1))
for (let emptyTile of tiles.getTilesByType(assets.tile`transparency16`)) {
    pellet = sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . d d . . . . . . . 
        . . . . . . . d d . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, SpriteKind.Food)
    tiles.placeOnTile(pellet, emptyTile)
    maxScore += 1
}
ghost = sprites.create(img`
    . . . . . 2 2 2 2 2 2 . . . . . 
    . . . 2 2 2 2 2 2 2 2 2 2 . . . 
    . . 2 2 2 2 2 2 2 2 2 2 2 2 . . 
    . 2 2 2 2 2 2 2 2 2 2 2 2 2 2 . 
    2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
    f f f f f f f f f f f f f f f f 
    2 2 2 f f f 2 2 2 2 f f f 2 2 2 
    2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
    2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
    2 2 2 2 2 f f f f f f 2 2 2 2 2 
    2 2 2 2 2 f f f f f f 2 2 2 2 2 
    2 2 2 2 2 f f f f f f 2 2 2 2 2 
    2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
    2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
    2 2 . 2 2 2 . 2 2 . 2 2 2 . 2 2 
    2 . . . 2 . . . . . . 2 . . . 2 
    `, SpriteKind.Enemy)
ghostDirection = "left"
tiles.placeOnTile(ghost, tiles.getTileLocation(8, 6))
game.setGameOverPlayable(false, music.melodyPlayable(music.smallCrash), false)
game.onUpdateInterval(10, function () {
    setPlayerMovementDirection(getAllowedDirections(pacman))
    move(pacman, direction)
    move(ghost, ghostDirection)
    if (info.score() == maxScore) {
        game.gameOver(true)
    }
})
game.onUpdateInterval(3000, function () {
    setGhostMovementDirection(getAllowedDirections(ghost))
})
