class Play extends Phaser.Scene{
    constructor(){
        super("playScene");
    }
    preload(){
        this.load.image('map', './assets/SamuraiGameMap.png');
        this.load.atlas('banditTrack', './assets/BanditTrack.png', 'assets/BanditTrack.json');
    }
    create() {
        let textConfig = {
            fontFamily: 'EastSea',
            fontSize: '28px',
            color: '#1e1e1e',
            align: 'left',
            padding: {
                top: 2,
                bottom: 2,
            },
            fixedWidth: game.config.width*(1/2)
        }
        let titleConfig = {
            fontFamily: 'EastSea',
            fontSize: '64px',
            color: '#1e1e1e',
            align: 'left',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }
        this.add.sprite(game.config.width/2, game.config.height/2, 'map').setOrigin(0.5, 0.5);
        
        this.report = this.add.text(game.config.width*(2/8), game.config.height/40, 'Your scouts have reported BANDITS in the area. \nYou should try to recruit some SAMURAI to DEFEND YOUR VILLAGE.', textConfig);
        
        this.add.text(game.config.width*(7/8), game.config.height/40, 'Bandits:', titleConfig);
        
        this.time = this.add.text(game.config.width*(1/40), game.config.height/40, 'Time:', titleConfig);
        this.add.text(game.config.width*(1/40), game.config.height*(4/40), 'Resources:', titleConfig);
        this.add.text(game.config.width*(1/40), game.config.height*(17/40), 'Defenses:', titleConfig);
    }
    update(){
       
    }
}