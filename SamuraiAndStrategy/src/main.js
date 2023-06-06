/*
Adrian Bruce
Samurai & Strategy v0.11
Approx. 20 hours so far(including time spent making assets)
*/
let config = {
    type: Phaser.CANVAS,
    width: 1600,
    height: 900,
    autoCenter: true,
    scene: [Menu, Play]
}
let game = new Phaser.Game(config);
