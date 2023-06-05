class Play extends Phaser.Scene{
    constructor(){
        super("playScene");
    }
    preload(){
        this.load.image('map', './assets/SamuraiGameMap.png');
        this.load.atlas('banditTrack', './assets/BanditTrack.png', 'assets/BanditTrack.json');
    }
    create() {
        this.add.sprite(game.config.width/2, game.config.height/2, 'map').setOrigin(0.5, 0.5);
    }
    update(){
       
    }
}