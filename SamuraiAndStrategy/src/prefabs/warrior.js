class Warrior{
    constructor(typeNum){
        switch(typeNum){
            case 0:
                this.type = "Thief";
                this.testRes = "This candidate isn't a samurai, they're a thief! They won't help, they'll steal the payment and run!"
                break;
            case 1:
                this.type = "Samurai(Strategist)";
                this.testRes = "A samurai skilled in strategy. They will help ensure the village has strong defenses."
                break;
            case 2:
                this.type = "Samurai(Swordsman)";
                this.testRes = "A samurai skilled in swordsmanship. They won't have any trouble killing bandits."
                break;
            case 3:
                this.type = "Samurai(Teacher)";
                this.testRes = "This samurai seems to be a wise and disciplined teacher. They will have an easier time training the villagers."
                break;
            case 4:
                this.type = "Samurai(Student)";
                this.testRes = "This samurai is young and still training, but they may be able to help an experienced samurai work more quickly."
                break;
            default:
                this.type = "Mercenary";
                this.testRes = "This warrior isn't a samurai, but they do have combat experience. Their help is probably easier to afford."
                break;
        }
        this.typeNum = typeNum;
        this.str = 1.25;
        this.plan = 0.25;
        this.trainR = 0.25;
        this.cost = 10;
        this.cost = Phaser.Math.Between(10, 15);
        this.studentBonus = 1;
        this.location = 0;
        this.recruitSuccess = true;
        if(this.type == "Samurai(Strategist)"){
            this.plan = 1;
        }
        if(this.type=="Samurai(Swordsman)"){
            this.str = 2;
        }
        if(this.type=="Samurai(Teacher)"){
            this.trainR = 1;
        }
        if(this.type=="Samurai(Student)"){
            this.studentBonus = 1.25;
            this.plan = 0.2;
            this.trainR = 0.2;
        }
        if(this.type=="Mercenary"){
            this.str = 1;
            this.cost /= 2;
        }
        if(this.type=="Thief"){
            this.recruitSuccess = false;
        }
    }
    gettypeNum(){
        return this.typeNum;
    }
    attack(){
        return this.str*this.studentBonus;
    }
    test(){
        if(this.type!="Mercenary"){
            this.cost =Math.floor(this.cost*(Phaser.Math.FloatBetween(1.1, 2.0))) ;
        }
        return this.testRes; 
    }
    getPlan(){
        return this.plan;
    }
    getTrainR(){
        return this.trainR;
    }
    getCost(){
        return this.cost;
    }
    getStudentBonus(){
        return this.studentBonus;
    }
    getType(){
        return this.type;
    }
    setLocation(x){
        this.location = x;
    }
    recruit(){
        return this.recruitSuccess;
    }
    remake(x){
        switch(x){
            case 0:
                this.type = "Thief";
                this.testRes = "This candidate isn't a samurai, they're a thief! They won't help, they'll steal the payment and run!"
                break;
            case 1:
                this.type = "Samurai(Strategist)";
                this.testRes = "A samurai skilled in strategy. They will help ensure the village has strong defenses."
                break;
            case 2:
                this.type = "Samurai(Swordsman)";
                this.testRes = "A samurai skilled in swordsmanship. They won't have any trouble killing bandits."
                break;
            case 3:
                this.type = "Samurai(Teacher)";
                this.testRes = "This samurai seems to be a wise and disciplined teacher. They will have an easier time training the villagers."
                break;
            case 4:
                this.type = "Samurai(Student)";
                this.testRes = "This samurai is young, and still learning, but they could help an experienced samurai work more efficiently."
                break;
            default:
                this.type = "Mercenary";
                this.testRes = "This warrior isn't a samurai, but they do have combat experience. Their help is probably easier to afford, too."
                break;
        }
        this.typeNum = x;
        this.str = 1.25;
        this.plan = 0.25;
        this.trainR = 0.25;
        this.cost = 10;
        this.cost = Phaser.Math.Between(10, 15);
        this.studentBonus = 1;
        this.recruitSuccess = true;
        if(this.type == "Samurai(Strategist)"){
            this.plan = 1;
        }
        if(this.type=="Samurai(Swordsman)"){
            this.str = 2;
        }
        if(this.type=="Samurai(Teacher)"){
            this.trainR = 1;
        }
        if(this.type=="Samurai(Student)"){
            this.studentBonus = 1.25;
            this.plan = 0.2;
            this.trainR = 0.2
        }
        if(this.type=="Mercenary"){
            this.str -= 1;
            this.cost /= 2;
        }
        if(this.type=="Thief"){
            this.recruitSuccess = false;
        }
    }
}