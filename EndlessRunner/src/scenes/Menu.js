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
        this.load.audio('sfx_chomp', './assets/chomp.wav');
        this.load.audio('sfx_wing', './assets/wing.wav');
        this.load.audio('bgmusic', './assets/BackgroundMusic.wav');

    }
    create() {
        let menuConfig = {
            fontFamily: 'fantasy',
            fontSize: '28px',
            stroke: '#F0CF8E',
            strokeThickness: 3,
            color: '#655057',
            align: 'center',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }
        this.add.rectangle(0, 0, 640, 480, 0x110829).setOrigin(0, 0);
        this.springBack = this.add.tileSprite(0, 0, 640, 480, 'spring3').setOrigin(0,0);
        this.springMid = this.add.tileSprite(0, 0, 640, 480, 'spring2').setOrigin(0,0);
        this.springFront = this.add.tileSprite(0, 0, 640, 480, 'spring1').setOrigin(0,0);
        this.add.sprite(0, game.config.height - borderUISize, 'springfloor').setOrigin(0, 1);
        this.add.text(game.config.width/2, game.config.height/2 - borderUISize - borderPadding, 'Bat-venture', menuConfig).setOrigin(0.5, 0.5);
        menuConfig.fontSize='20px';
        this.add.text(game.config.width/2, game.config.height - 3* borderUISize - 2*borderPadding, '[→] Play', menuConfig).setOrigin(0.5);
        this.add.rectangle(0, 0, game.config.width, borderUISize, 0x655057).setOrigin(0, 0);
        this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0x655057).setOrigin(0,0);
        this.add.rectangle(0, 0, borderUISize, game.config.height, 0x655057).setOrigin(0, 0);
        this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0x655057).setOrigin(0,0);
        this.credits=this.add.text(game.config.width/2, game.config.height/2 + 2*borderUISize + 2*borderPadding, '[←] Credits', menuConfig).setOrigin(0.5);
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
        if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
            // easy mode
            game.settings = {
              spaceshipSpeed: 2,
              gameTimer: 20000    
            }
            this.sound.play('sfx_select');
            this.scene.start('playScene');    
        }
          if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.sound.play('sfx_select');
            this.credits.text="Made in Phaser 3. \n Art, Sound, and Programming by Adrian Bruce"
        }
    }
}