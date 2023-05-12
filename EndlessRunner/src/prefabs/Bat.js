// Spaceship prefab
class Bat extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, speed) {
      super(scene, x, y, texture, frame);
      // add object to existing scene
      scene.add.existing(this);
      this.moveSpeed = speed;
      this.end = false;
      this.up = false;
      this.start = true;
      this.flyTime = 0;
      this.flyStart = 0;
      this.gameTime = 0;
      this.anims.create({
        key: 'fly',
        frameRate: 8,
        repeat: -1,
        frames: this.anims.generateFrameNumbers(texture, {start: 0, end: 1, first: 0})
      });
      this.anims.create({
        key: 'glide',
        frameRate: 8,
        repeat: 0,
        frames: this.anims.generateFrameNumbers(texture, {start: 1, end: 0, first: 0})
      });
      this.anims.create({
        key: 'land',
        frameRate: 8,
        repeat: 0,
        frames: this.anims.generateFrameNumbers(texture, {start: 0, end: 1, first: 0})
      });
    }
    setgTime(n){
      this.gameTime=n;
    }
    goUP(){
        if(this.start){
            this.start = false;
        }
        this.flyStart = this.gameTime;
        this.up = true;
        this.anims.stop('glide');
        this.anims.play('fly');;
    }
    goDOWN(){
        this.up = false;
        this.anims.stop('fly');
        this.anims.play('glide');
        this.flyTime = 0;
    }
    update(){
        //move spaceship left
        if(this.start != true){
            if(this.up == true){
                this.flyTime = this.gameTime-this.flyStart;
                if(this.y > game.config.height/15){
                  this.y-=this.moveSpeed;
                }
            }
            else{
                
                if (this.y < game.config.height){
                    this.y+=this.moveSpeed;
                    if(this.y>=game.config.height-this.height){
                        this.end = true;
                        this.anims.play('land');
                    }
                }
            }
        } 
    }
}