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
      this.anims.create({
        key: 'fly',
        frameRate: 5,
        repeat: -1,
        frames: this.anims.generateFrameNumbers(texture, {start: 0, end: 1, first: 0})
      });
    }
    goUP(){
        if(this.start){
            this.start = false;
        }
        this.up = true;
    }
    goDOWN(){
        this.up = false;
    }
    update(){
        //move spaceship left
        if(this.start != true){
            if(this.up == true){
                this.anims.play('fly');
                if(this.y > this.height){
                  this.y-=this.moveSpeed;
                }
            }
            else{
                this.anims.stop('fly');
                if (this.y < game.config.height){
                    this.y+=this.moveSpeed;
                    if(this.y>=game.config.height){
                        this.alpha = 0;
                        this.end = true;
                    }
                }
            }
        } 
    }
}