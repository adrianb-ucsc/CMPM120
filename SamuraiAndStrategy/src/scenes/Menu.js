class Menu extends Phaser.Scene{
    constructor(){
        super("menuScene");
    }
    preload(){
        //load audio
        this.load.image('spring1', './assets/spring1.png');

    }
    create() {
        this.add.sprite(game.config.width/2, game.config.height/2, 'title').setOrigin(0.5, 0.5);
    }
    update(){
        
    }
}