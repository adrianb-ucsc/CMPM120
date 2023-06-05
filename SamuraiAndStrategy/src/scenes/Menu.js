class Menu extends Phaser.Scene{
    constructor(){
        super("menuScene");
    }
    preload(){
        //load audio
        this.load.image('menuBg', './assets/SamuraiGameMenu.png');
        this.load.spritesheet('playButton', './assets/SamuraiGamePlay.png', {frameWidth: 203, frameHeight: 89});
        this.load.spritesheet('credButton', './assets/SamuraiGameCredits.png', {frameWidth: 286, frameHeight: 108});

    }
    create() {
        this.add.sprite(game.config.width/2, game.config.height/2, 'menuBg').setOrigin(0.5, 0.5);
        this.add.sprite(game.config.width*(3/4), 10+game.config.height/2, 'credButton').setOrigin(0, 1);
        this.add.sprite(game.config.width*(3/4), (-10)+game.config.height/2, 'playButton').setOrigin(0, 0);
    }
    update(){
        
    }
}