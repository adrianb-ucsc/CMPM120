class Buttons extends Phaser.GameObjects.Sprite {
    constructor(sc, x, y, texture, frame, effect) {
        super(sc, x, y, texture, frame);

        sc.add.existing(this);   // add to existing, displayList, updateList
        this.setInteractive();
        this.on('pointerover', () => this.setFrame(1));
        this.on('pointerout', () => this.setFrame(0));
        this.on('pointerdown', () => effect(sc));
    }
}