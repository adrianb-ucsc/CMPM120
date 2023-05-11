// Spaceship prefab
class Bat extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, speed) {
      super(scene, x, y, texture, frame);
  
      // add object to existing scene
      scene.add.existing(this);
      this.points = pointValue;
      this.moveSpeed = speed;
      this.end = false;
      this.up = false;
      this.anims.create({
        key: 'fly',
        frameRate: 5,
        repeat: -1,
        frames: this.anims.generateFrameNumbers(texture, {start: 0, end: 1, first: 0})
      });
    }
    goUP(){
        this.up = true;
    }
    goDOWN(){
        this.up = false;
    }
    update(){
        //move spaceship left
        if(!this.end){
            if(this.up = true){
                this.anims.play('fly');
                if(this.y > this.height){
                  this.y-=this.moveSpeed;
                }
            }
            else{
                this.anims.stop('fly');
                this.y+=this.moveSpeed;
            }
            if(this.y>=game.config.height+this.height){
                this.end = true;
            } 
        } 
    }
}