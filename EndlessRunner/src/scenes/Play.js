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
        this.load.spritesheet('explosion', './assets/explosion.png', {frameWidth: 32, frameHeight: 64, startFrame: 0, endFrame: 7});
        //load atlas
       // this.load.atlas('bug', 'assets/shipAtlas.png', 'assets/ship.json');
    }
    create() {
        this.wings = this.sound.add('sfx_wing', {
            loop: true,
          });
        this.music = this.sound.add('bgmusic', {
            loop: true,
            volume: 0.5
        });
        this.music.play();
        //place tile sprite
        this.startTime=this.time.now;
        this.sky = this.add.tileSprite(0, 0, 640, 480, 'sky').setOrigin(0, 0);
        this.season3 = this.add.tileSprite(0, 0, 640, 480, 'summer3').setOrigin(0,0);
        this.season2 = this.add.tileSprite(0, 0, 640, 480, 'summer2').setOrigin(0,0);
        this.goFasterChance=0;
        this.speedmod = 1;
        //green UI background
        this.sky.setInteractive({});
        //add rocket(p1)
        //this.p1Rocket = new Rocket(this, game.config.width/2, game.config.height - borderUISize - 2*borderPadding, 'flower').setOrigin(0.5, 0);
        this.p1Bat = new Bat(this, game.config.width/2 - 2*borderUISize, game.config.height/2, 'bat', 1, game.settings.spaceshipSpeed/2).setOrigin(0.5, 0);
        this.floor = this.add.tileSprite(0, -borderUISize, 640, 480, 'springfloor').setOrigin(0, 0);
       // this.ship01 = new Spaceship(this, game.config.width + borderUISize * 6, borderUISize * 6, 'bug', 0, 1, game.settings.spaceshipSpeed, "ship-").setOrigin(0,0);
        //this.ship02 = new Spaceship(this, game.config.width + borderUISize*3, borderUISize*7 + borderPadding*2, 'bug', 0, 1, game.settings.spaceshipSpeed, "ship-").setOrigin(0,0);
       // this.ship03 = new Spaceship(this, game.config.width, borderUISize*8 + borderPadding*4, 'bug', 0, 1, game.settings.spaceshipSpeed, "ship-").setOrigin(0,0);
        this.ship04 = new Spaceship(this, game.config.width + borderUISize * 6, borderUISize * 5, 'bug2', 0, 1.5*game.settings.spaceshipSpeed,"ship2-").setOrigin(0,0.5);
        this.ship05 = new Spaceship(this, game.config.width + borderUISize*3, borderUISize*4 + borderPadding*2, 'bug2', 0, 1.5*game.settings.spaceshipSpeed, "ship2-").setOrigin(0,0.5);
        this.ship06 = new Spaceship(this, game.config.width, borderUISize*8 + borderPadding*2, 'bug2', 0, 1.5*game.settings.spaceshipSpeed, "ship2-").setOrigin(0,0.5);
        //foreground
        this.season1 = this.add.tileSprite(0, 0, 640, 480, 'summer1').setOrigin(0,0);
        //white borders
        this.add.rectangle(0, 0, game.config.width, borderUISize, 0x655057).setOrigin(0, 0);
        this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0x655057).setOrigin(0,0);
        this.add.rectangle(0, 0, borderUISize, game.config.height, 0x655057).setOrigin(0, 0);
        this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0x655057).setOrigin(0,0); 
        //this.plant = this.add.sprite(game.config.width/2, game.config.height - borderUISize, 'plant2').setOrigin(0.5, 1);
        // define keys
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        //animation config
        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion', {start: 0, end: 7, first: 0}),
            frameRate: 12
        });
        this.energyMax = 5000;
        this.energy = this.energyMax;
        this.energyBar = ['░░░░░','▓░░░░','▓▓░░░', '▓▓▓░░', '▓▓▓▓░', '▓▓▓▓▓'];
        //initialize score
        this.p1Score = 0;
          // display score
        let scoreConfig = {
            fontFamily: 'courier',
            fontSize: '18px',
            color: '#F0CF8E',
            align: 'right',
            padding: {
                top: 5,
                left: borderUISize,
                bottom: 5,
            },
            fixedWidth: 0
        }
        this.startmessage=this.add.text(game.config.width/2, game.config.height/2, 'Click to start', scoreConfig).setOrigin(0.5);
        this.timeR = this.add.text(borderUISize, borderUISize*2 + borderPadding*2, "Eat bugs for energy", scoreConfig);
        this.scoreL = this.add.text(borderUISize, borderUISize+borderPadding*2, "Hold mouse button to fly", scoreConfig);
        // GAME OVER flag
        this.gameOver = false;
        // 60-second play clock
        scoreConfig.fixedWidth = 0;
        this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
            this.ship06.reset();
            this.ship06.freeze();
            this.goFasterChance=1;
        }, null, this);
    }
    update(){
        this.p1Bat.setgTime(this.time.now);
        if(this.p1Bat.start){
            if(this.energy > 0){
                this.input.on('gameobjectdown', (pointer, gameObject, event) => {
                this.p1Bat.goUP();
                this.startmessage.text = ' ';
                this.time.now=0;
                });
            }
        }else{
        if (this.p1Bat.end == true){
            this.gameEnd();
        }
        //check key input for restart
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)) {
            this.music.stop();
            this.scene.restart();
        }
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.scene.start("menuScene");
        }
       
        this.season3.tilePositionX += 0.75;
        this.season3.tilePositionY -= 0.1;
        this.season2.tilePositionX += 1;
        this.season2.tilePositionY -= 0.2;
        this.season1.tilePositionX += 1.5;
        this.season1.tilePositionY -= 0.3;
        
        if(!this.gameOver){
            if(this.goFasterChance>=1){
                if(Math.random()*this.time.now>=game.settings.gameTimer&&this.time.now-this.goFasterChance>5000){
                    this.goFasterChance=this.time.now;
                    this.p1Bat.goFaster();
                    this.speedmod+=1;
                    this.scoreL.text = "Speed Modifier: x" + this.speedmod;
                }
            }
            if(this.energy > this.energyMax - this.p1Bat.flyTime){
                if(this.energyMax-this.p1Bat.flyTime > 0){
                    this.energy = this.energyMax - this.p1Bat.flyTime;
                }else{
                    this.energy = 0;
                }
                
            }
            if(this.energy == 0){
                this.p1Bat.goDOWN();
            }
            this.timeR.text = "Energy: "+ this.energyBar[Math.floor((this.energy)/1000)];
            this.sky.tilePositionX += 0.5;
            this.floor.tilePositionX += 2;
            if(!this.wings.isPlaying && this.p1Bat.up){
                this.wings.play();
            }
           // if(this.input.x-this.p1Rocket.x<=(-2)){
             //   this.p1Rocket.moveLeft();
           // }else if(this.input.x-this.p1Rocket.x>=2){
           //     this.p1Rocket.moveRight();
           // }
            if(this.energy > 0){
                this.input.on('gameobjectdown', (pointer, gameObject, event) => {
                //this.p1Rocket.fire();

                this.p1Bat.goUP();
            });
            }
            this.input.on('gameobjectup', (pointer, gameObject, event) => {
                this.p1Bat.goDOWN();
                this.wings.stop();
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
    }
    gameEnd(){
        if(!this.gameOver){
        let endConfig = {
            fontFamily: 'courier',
            fontSize: '28px',
            color: '#F0CF8E',
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
        this.add.text(game.config.width/2, game.config.height/2, 'SCORE: '+this.speedmod, endConfig).setOrigin(0.5);
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
        switch(Math.floor(Math.random()*4)){
            case 0:
                ship.x += game.config.width;
            case 1:
                ship.y -= borderUISize;
                ship.x += borderUISize;
            case 2:
                ship.y -= borderUISize;
                break;
            case 3:
                ship.y += borderUISize;
                ship.x += borderUISize;
                break;
        }      
        
        //create explosion sprite
        boom.anims.play('explode');             // play explode animation
        boom.on('animationcomplete', () => {    // callback after anim completes
            ship.alpha = 1;                       // make ship visible again
            boom.destroy();                       // remove explosion sprite
        });
        //score add and repaint
        if(this.energy < this.energyMax){
            if(this.energy + 1000 <= this.energyMax){
                this.energy += 1000;
            }else{
                this.energy = this.energyMax;
            }
        }
        this.timeR.text = "Energy: "+ this.energyBar[Math.floor((this.energy-this.p1Bat.flyTime)/1000)];
        this.scoreL.text = "Speed Modifier: x" + this.speedmod;
        this.sound.play('sfx_chomp');
        
    }
}