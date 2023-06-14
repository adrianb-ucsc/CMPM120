class Defeat extends Phaser.Scene{
    constructor(){
        super("defeatScene");
    }
    preload(){
        this.load.image('defeatBg', './assets/defeatScreen.png');
    }
    create() {
        let menuConfig = {
            fontFamily: 'EastSea',
            fontSize: '22px',
            color: '#1e1e1e',
            align: 'left',
            padding: {
                top: 0,
                bottom: 2,
            },
            fixedWidth: 0
        }
        this.add.sprite(game.config.width/2, game.config.height/2, 'defeatBg').setOrigin(0.5, 0.5);
        this.toMenu = new Buttont(this, game.config.width * (1 / 40), -5, "Menu", "Go to Menu", menuConfig, menuConfig);
        this.toMenu.on('pointerdown', () => this.scene.start("menuScene"));
    }
    update(){
        
    }
}