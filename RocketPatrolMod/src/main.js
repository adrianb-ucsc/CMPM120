/*
Adrian Bruce
Garden Patrol
Approx. 22 hours (including time spent making assets)

5-Point Tier [5 total from this tier]
>Create a new scrolling tile sprite for the background (5)
10-Point Tier[50 total from this tier]
>Create 4 new explosion sound effects and randomize which one plays on impact (10)
>Display the time remaining (in seconds) on the screen (10)
>Using a texture atlas, create a new animated sprite for the Spaceship enemies (10)
>Create a new title screen (e.g., new artwork, typography, layout) (10)
>Implement parallax scrolling for the background (10)
15-Point Tier[45 total from this tier]
>Create a new enemy Spaceship type (w/ new artwork) that's smaller, moves faster, and is worth more points (15)
>Implement a new timing/scoring mechanism that adds time to the clock for successful hits (15)
>Implement mouse control for player movement and mouse click to fire (15)

Total = [5] + [50] + [45] = 100

Additional Stuff:
>Added "launcher" for "rocket" (a stem for the flower, which persists when flower is fired)
>New animation for explosion using spritesheet
>New texture for rocket

Sources used: Phaser documentation, course materials, this tutorial for texture atlases: https://www.joshmorony.com/how-to-create-animations-in-phaser-with-a-texture-atlas/
*/
let config = {
    type: Phaser.CANVAS,
    width: 640,
    height: 480,
    pixelArt: true,
    scene: [Menu, Play]
}
let game = new Phaser.Game(config);
// reserve keyboard vars
let keyF, keyR, keyLEFT, keyRIGHT;
//set UI sizes
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;
