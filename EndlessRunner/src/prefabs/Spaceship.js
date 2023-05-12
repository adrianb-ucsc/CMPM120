// Spaceship prefab
class Spaceship extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, pointValue, speed, fprefix) {
      super(scene, x, y, texture, frame);
  
      // add object to existing scene
      scene.add.existing(this);
      this.points = pointValue;
      this.moveSpeed = speed;
      this.anims.create({
        key: 'flap',
        frameRate: 10,
        repeat: -1,
        frames: this.anims.generateFrameNames(texture,{prefix: fprefix, suffix: '.png', start:1, end: 2})
      });
    this.anims.play('flap');
    }
    freeze(){
        this.anims.stop('flap');
    }
    update(){
        //move spaceship left
        this.x-=this.moveSpeed;
        if(this.x<=0-this.width){
            this.reset();
        }
    }

    reset(){
        this.x = game.config.width;
    }
}