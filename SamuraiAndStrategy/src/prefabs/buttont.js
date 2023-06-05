class Buttont extends Phaser.GameObjects.Text {
    constructor(sc, x, y, text, text2, style, effect) {
        super(sc, x, y, text, style);

        sc.add.existing(this);   // add to existing, displayList, updateList
        this.setInteractive();
        this.on('pointerover', () => this.setText(text+text2));
        this.on('pointerout', () => this.setText(text));
        this.on('pointerdown', () => effect(sc));
    }
}