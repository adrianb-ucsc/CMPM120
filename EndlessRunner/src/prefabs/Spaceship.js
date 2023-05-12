// Spaceship prefab
class Spaceship extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, speed, fprefix) {
      super(scene, x, y, texture, frame);
  
      // add object to existing scene
      scene.add.existing(this);
      this.moveSpeed = speed;
      this.home = this.y;
      this.isfreeze = false;
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
        this.isfreeze = true;
    }
    update(){
        //move spaceship left
        if(!this.isfreeze){
        if(this.x>0-this.width){
           this.x-=this.moveSpeed; 
        }
        if(this.x<=0-this.width&&Math.floor(Math.random()*4)==3){
            this.reset();
        }
        }
        
    }

    reset(){
        this.x = game.config.width;
        this.y =this.home;
    }
}