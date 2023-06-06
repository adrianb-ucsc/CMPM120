class Buttont extends Phaser.GameObjects.Text {
    constructor(sc, x, y, text, text2, style1, style2) {
        super(sc, x, y, text, style1);

        sc.add.existing(this);   // add to existing, displayList, updateList
        this.setInteractive({
            cursor: 'url(./assets/brushcursorselect.cur), pointer'
        });
        this.txt = text;
        this.txt2 = text2;
        this.style1 = style1;
        this.style2 = style2;
        this.on('pointerover', () => this.hover());
        this.on('pointerout', () => this.away());
    }
    changeText(txt){
        this.txt = txt;
    }
    changeText2(txt2){
        this.txt2 = txt2;
    }
    hover(){
        this.setText(this.txt2);
        this.setStyle(this.style2);
    }
    away(){
        this.setText(this.txt)
        this.setStyle(this.style1)
    }
}