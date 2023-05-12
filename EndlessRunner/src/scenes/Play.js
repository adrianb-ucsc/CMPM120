class Play extends Phaser.Scene{
    constructor(){
        super("playScene");
    }
    preload(){
        //this.load.image('flower', './assets/flower.png');
        //this.load.spritesheet('bug', './assets/ship.png', {frameWidth: 64, frameHeight: 32, startFrame: 0, endFrame:1});
        this.load.atlas('bug2', './assets/ship2Atlas.png', 'assets/ship2.json');
        this.load.image('sky', './assets/backgroundsky.png');
        this.load.spritesheet('bat', './assets/bat.png', {frameWidth: 128, frameHeight: 96, startFrame: 0, endFrame: 1});
        this.load.image('summerf', './assets/background-summer.png');
        this.load.image('summer3', './assets/summer3.png');
        this.load.image('summer2', './assets/summer2.png');
        this.load.image('summer1', './assets/summer1.png');
        //this.load.image('plant1', './assets/Plant1.png');
       // this.load.image('plant2', './assets/Plant2.png');
       // this.load.image('plant3', './assets/Plant3.png');
        // load spritesheet
        this.load.spritesheet('explosion', './assets/explosion.png', {frameWidth: 64, frameHeight: 32, startFrame: 0, endFrame: 8});
        //load atlas
       // this.load.atlas('bug', 'assets/shipAtlas.png', 'assets/ship.json');
    }
    create() {
        //place tile sprite
        this.startTime=this.time.now;
        this.sky = this.add.tileSprite(0, 0, 640, 480, 'sky').setOrigin(0, 0);
        this.season3 = this.add.tileSprite(0, 0, 640, 480, 'summer3').setOrigin(0,0);
        this.season2 = this.add.tileSprite(0, 0, 640, 480, 'summer2').setOrigin(0,0);
        this.floor = this.add.tileSprite(0, -borderUISize, 640, 480, 'summerf').setOrigin(0, 0);
        //green UI background
        this.sky.setInteractive({});
        
        //add rocket(p1)
        //this.p1Rocket = new Rocket(this, game.config.width/2, game.config.height - borderUISize - 2*borderPadding, 'flower').setOrigin(0.5, 0);
        this.p1Bat = new Bat(this, game.config.width/2 - 2*borderUISize, game.config.height/2, 'bat', 1, game.settings.spaceshipSpeed/2).setOrigin(0.5, 0);
        //add spaceships
       // this.ship01 = new Spaceship(this, game.config.width + borderUISize * 6, borderUISize * 6, 'bug', 0, 1, game.settings.spaceshipSpeed, "ship-").setOrigin(0,0);
        //this.ship02 = new Spaceship(this, game.config.width + borderUISize*3, borderUISize*7 + borderPadding*2, 'bug', 0, 1, game.settings.spaceshipSpeed, "ship-").setOrigin(0,0);
       // this.ship03 = new Spaceship(this, game.config.width, borderUISize*8 + borderPadding*4, 'bug', 0, 1, game.settings.spaceshipSpeed, "ship-").setOrigin(0,0);
        this.ship04 = new Spaceship(this, game.config.width + borderUISize * 6, borderUISize * 5, 'bug2', 0, 5, 1.5*game.settings.spaceshipSpeed,"ship2-").setOrigin(0,0.5);
        this.ship05 = new Spaceship(this, game.config.width + borderUISize*3, borderUISize*4 + borderPadding*2, 'bug2', 0, 5, 1.5*game.settings.spaceshipSpeed, "ship2-").setOrigin(0,0.5);
        this.ship06 = new Spaceship(this, game.config.width, borderUISize*8 + borderPadding*2, 'bug2', 0, 5, 1.5*game.settings.spaceshipSpeed, "ship2-").setOrigin(0,0.5);
        //foreground
        this.season1 = this.add.tileSprite(0, 0, 640, 480, 'summer1').setOrigin(0,0);
        //white borders
        this.add.rectangle(0, 0, game.config.width, borderUISize, 0x843605).setOrigin(0, 0);
        this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0x843605).setOrigin(0,0);
        this.add.rectangle(0, 0, borderUISize, game.config.height, 0x843605).setOrigin(0, 0);
        this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0x843605).setOrigin(0,0); 
        //this.plant = this.add.sprite(game.config.width/2, game.config.height - borderUISize, 'plant2').setOrigin(0.5, 1);
        // define keys
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        //animation config
        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion', {start: 0, end: 8, first: 0}),
            frameRate: 15
        });
        //initialize score
        this.p1Score = 0;
          // display score
        let scoreConfig = {
            fontFamily: 'courier',
            fontSize: '28px',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                left: borderUISize,
                bottom: 5,
            },
            fixedWidth: 0
        }
        this.scoreLeft = this.add.text(borderUISize, borderUISize*2 + borderPadding*2, "Click to fire", scoreConfig);
        this.timeRight = this.add.text(borderUISize, borderUISize+borderPadding*2, "⧖" + 0.001*game.settings.gameTimer, scoreConfig);
        // GAME OVER flag
        this.gameOver = false;
        // 60-second play clock
        scoreConfig.fixedWidth = 0;
        this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
            this.timeRight.text = "⧖0";
            this.gameEnd();
        }, null, this);
    }
    update(){
        if (this.p1Bat.end == true){
            this.gameEnd();
        }
        //check key input for restart
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)) {
            this.scene.restart();
        }
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.scene.start("menuScene");
          }
        this.sky.tilePositionX += 0.5;
        this.season3.tilePositionX += 0.75;
        this.season3.tilePositionY -= 0.1;
        this.season2.tilePositionX += 1;
        this.season2.tilePositionY -= 0.2;
        this.season1.tilePositionX += 1.5;
        this.season1.tilePositionY -= 0.3;
        this.floor.tilePositionX += 2;
        if(!this.gameOver){
            this.timeRight.text = "⧖" + Math.ceil((this.clock.delay - (this.time.now-this.startTime)) * 0.001);
           // if(this.input.x-this.p1Rocket.x<=(-2)){
             //   this.p1Rocket.moveLeft();
           // }else if(this.input.x-this.p1Rocket.x>=2){
           //     this.p1Rocket.moveRight();
           // }
            
            this.input.on('gameobjectdown', (pointer, gameObject, event) => {
                //this.p1Rocket.fire();
                this.p1Bat.goUP();
            });
            this.input.on('gameobjectup', (pointer, gameObhect, event) => {
                this.p1Bat.goDOWN();
            });
            //this.p1Rocket.update();
            this.p1Bat.update();
            //if(this.p1Rocket.x!=this.plant.x){
            //    this.plant.x=this.p1Rocket.x;
            //}
           // this.ship01.update();
            //this.ship02.update();
            //this.ship03.update(); 
            this.ship04.update();
            this.ship05.update();
            this.ship06.update(); 
        }
        //check for collisions
       // if(this.checkCollision(this.p1Rocket, this.ship03)) {
         //   this.p1Rocket.reset();
           // this.shipExplode(this.ship03);
          //}
          //if (this.checkCollision(this.p1Rocket, this.ship02)) {
            //this.p1Rocket.reset();
            //this.shipExplode(this.ship02);
          //}
          //if (this.checkCollision(this.p1Rocket, this.ship01)) {
            //this.p1Rocket.reset();
            //this.shipExplode(this.ship01);
          //}
          if (this.checkCollision(this.p1Bat, this.ship04)) {
            this.shipExplode(this.ship04);
          }
          if (this.checkCollision(this.p1Bat, this.ship05)) {
            this.shipExplode(this.ship05);
          }
          if (this.checkCollision(this.p1Bat, this.ship06)) {
            this.shipExplode(this.ship06);
          }
    }
    gameEnd(){
        if(!this.gameOver){
        let endConfig = {
            fontFamily: 'courier',
            fontSize: '28px',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                left: borderUISize,
                bottom: 5,
            },
            fixedWidth: 0
        }
        this.ship04.freeze();
        this.ship05.freeze();
        this.ship06.freeze();
        this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', endConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart or ← for Menu', endConfig).setOrigin(0.5);
        this.gameOver = true;
        }
    }
    checkCollision(rocket, ship){
        if (ship.x >= rocket.x && ship.x < rocket.x + rocket.width/2 &&
            ship.y > rocket.y && ship.y <= rocket.y + rocket.height/2) {
            return true;
        } else {
            return false;
        }
    }
    shipExplode(ship){
        let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0, 0);
        ship.reset(); 
        //create explosion sprite
        boom.anims.play('explode');             // play explode animation
        boom.on('animationcomplete', () => {    // callback after anim completes
            ship.alpha = 1;                       // make ship visible again
            boom.destroy();                       // remove explosion sprite
        });
        //score add and repaint
        this.clock.delay += ship.points*1000;
        this.p1Score += ship.points;
        this.scoreLeft.text = "❁"+this.p1Score;
        this.timeRight.text = "⧖" + Math.ceil((this.clock.delay - (this.time.now-this.startTime)) * 0.001);
        switch(Math.floor(Math.random()*4)){
            case 0:
                this.sound.play('sfx_explosion1');
                break;
            case 1:
                this.sound.play('sfx_explosion2');
                break;
            case 2:
                this.sound.play('sfx_explosion3');
                break;
            case 3:
                this.sound.play('sfx_explosion4');
                break;
        }   
    }
}