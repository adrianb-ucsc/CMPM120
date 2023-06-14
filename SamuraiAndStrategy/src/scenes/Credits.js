class Credits extends Phaser.Scene{
    constructor(){
        super("creditsScene");
    }
    preload(){
        this.load.image('creditsBg', './assets/creditsScreen.png');
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
        let subtitleConfig = {
            fontFamily: 'EastSea',
            fontSize: '36px',
            color: '#1e1e1e',
            align: 'center',
            padding: {
                top: 5,
                bottom: 0,
            },
            fixedWidth: 0
        }
        this.add.sprite(game.config.width/2, game.config.height/2, 'creditsBg').setOrigin(0.5, 0.5);
        this.toMenu = new Buttont(this, game.config.width * (1 / 40), -5, "Menu", "Go to Menu", menuConfig, menuConfig);
        this.toMenu.on('pointerdown', () => this.scene.start("menuScene"));
        this.credits = this.add.text(game.config.width/2-game.config.width/9, game.config.height/2-game.config.height/9, "Art, Programming, and Sound Design by Adrian Bruce \n\n\n Tools used: Phaser 3, VS Code, Procreate, GarageBand, leshylabs.com\n\n\nInspired by Akira Kurosawa's 1954 film, Seven Samurai", subtitleConfig).setAngle(-8);
    
    }
    update(){
        
    }
}