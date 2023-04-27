class Menu extends Phaser.Scene{
    constructor(){
        super("menuScene");
    }
    preload(){
        //load audio
        this.load.audio('sfx_select', './assets/blip_select12.wav');
        this.load.audio('sfx_explosion', './assets/explosion38.wav');
        this.load.audio('sfx_rocket', './assets/rocket_shot.wav');
        this.load.image('summerf', './assets/background-summer.png');

    }
    create() {
        let menuConfig = {
            fontFamily: 'Papyrus',
            fontSize: '36px',
            color: '#246605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }
        this.add.rectangle(0, 0, 640, 480, 0xA4B0A7).setOrigin(0, 0);
        
        this.add.text(game.config.width/2, game.config.height/2 - borderUISize - borderPadding, '⚘ GARDEN    PATROL ⚘', menuConfig).setOrigin(0.5);
        menuConfig.color = '#448605';
        menuConfig.fontSize = '28px';
        this.add.text(game.config.width/2, game.config.height/2 + borderUISize + borderPadding, 'use mouse to move. click to fire', menuConfig).setOrigin(0.5);
        this.add.sprite(0, game.config.height - borderUISize, 'summerf').setOrigin(0, 1);
        this.add.rectangle(0, 0, game.config.width, borderUISize, 0x843605).setOrigin(0, 0);
        this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0x843605).setOrigin(0,0);
        this.add.rectangle(0, 0, borderUISize, game.config.height, 0x843605).setOrigin(0, 0);
        this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0x843605).setOrigin(0,0); 
        this.add.text(game.config.width/2, game.config.height/2 + 2*borderUISize + 2*borderPadding, 'press ← for novice or → for expert', menuConfig).setOrigin(0.5);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    }
    update(){
        if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            // easy mode
            game.settings = {
              spaceshipSpeed: 2,
              gameTimer: 60000    
            }
            this.sound.play('sfx_select');
            this.scene.start('playScene');    
        }
          if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
            // hard mode
            game.settings = {
              spaceshipSpeed: 4,
              gameTimer: 45000    
            }
            this.sound.play('sfx_select');
            this.scene.start('playScene');    
        }
    }
}