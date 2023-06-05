class Menu extends Phaser.Scene{
    constructor(){
        super("menuScene");
    }
    preload(){
        //load audio
        this.load.image('menuBg', './assets/SamuraiGameMenu.png');
        this.load.spritesheet('playButton', './assets/SamuraiGamePlay.png', {frameWidth: 203, frameHeight: 88});
        this.load.spritesheet('credButton', './assets/SamuraiGameCredits.png', {frameWidth: 286, frameHeight: 107});
    }
    create() {
        this.add.sprite(game.config.width/2, game.config.height/2, 'menuBg').setOrigin(0.5, 0.5);
        this.clickCred = new Buttons(this, game.config.width*(12/16), game.config.height*(6/16), 'credButton', 0, {}).setOrigin(0, 1);
        function playEffect(x){
            x.scene.start('playScene');
        }
        this.clickPlay = new Buttons(this, game.config.width*(12/16), game.config.height*(3/16), 'playButton', 0, playEffect).setOrigin(0, 1);
    
    }
    update(){
        
    }
}