class Menu extends Phaser.Scene{
    constructor(){
        super("menuScene");
    }
    preload(){
        //load audio
        this.load.audio('sfx_select', './assets/sound (6).wav');
        this.load.image('spring1', './assets/spring1.png');
        this.load.image('spring2', './assets/spring2.png');
        this.load.image('spring3', './assets/spring3.png');
        this.load.image('springfloor', './assets/background-spring.png');
        this.load.image('title', './assets/titleBig.png');
        this.load.audio('sfx_chomp', './assets/chomp.wav');
        this.load.audio('sfx_wing', './assets/wing.wav');
        this.load.audio('sfx_explosion1', './assets/sound.wav');
        this.load.audio('sfx_explosion2', './assets/sound (1).wav');
        this.load.audio('sfx_explosion3', './assets/sound (2).wav');
        this.load.audio('sfx_explosion4', './assets/sound (3).wav');
        this.load.audio('sfx_rocket', './assets/sound (5).wav');

    }
    create() {
        let menuConfig = {
            fontFamily: 'courier',
            fontSize: '24px',
            stroke: '#40213D',
            strokeThickness: 2,
            color: '#7F4A7A',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }
        this.add.rectangle(0, 0, 640, 480, 0x98A4AE).setOrigin(0, 0);
        this.springBack = this.add.tileSprite(0, 0, 640, 480, 'spring3').setOrigin(0,0);
        this.springMid = this.add.tileSprite(0, 0, 640, 480, 'spring2').setOrigin(0,0);
        this.springFront = this.add.tileSprite(0, 0, 640, 480, 'spring1').setOrigin(0,0);
        this.add.sprite(0, game.config.height - borderUISize, 'springfloor').setOrigin(0, 1);
        this.add.sprite(game.config.width/2, game.config.height/2 - borderUISize - borderPadding, 'title').setOrigin(0.5, 0.5);
        this.add.text(game.config.width/2, game.config.height - 3* borderUISize - 2*borderPadding, '[→] Expert', menuConfig).setOrigin(0.5);
        this.add.rectangle(0, 0, game.config.width, borderUISize, 0x843605).setOrigin(0, 0);
        this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0x843605).setOrigin(0,0);
        this.add.rectangle(0, 0, borderUISize, game.config.height, 0x843605).setOrigin(0, 0);
        this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0x843605).setOrigin(0,0);
        this.add.text(game.config.width/2, game.config.height/2 + 2*borderUISize + 2*borderPadding, '[←] Novice', menuConfig).setOrigin(0.5);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    }
    update(){
        this.springBack.tilePositionX += 0.1;
        this.springBack.tilePositionY -= 0.5;
        this.springMid.tilePositionX += 0.2;
        this.springMid.tilePositionY -= 0.75;
        this.springFront.tilePositionX += 0.3;
        this.springFront.tilePositionY -= 1;
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