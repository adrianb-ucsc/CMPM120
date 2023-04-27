// Spaceship prefab
class Spaceship extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, pointValue, speed) {
      super(scene, x, y, texture, frame);
  
      // add object to existing scene
      scene.add.existing(this);
      this.points = pointValue;
      this.moveSpeed = speed;
      this.anims.create({
        key: 'flap',
        frames: this.anims.generateFrameNumbers(texture, {start: 0, end: 1, first: 0}),
        frameRate: 5,
        repeat: -1
    });
    this.anims.play('flap');
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