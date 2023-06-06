class Warrior{
    constructor(typeNum){
        switch(typeNum){
            case 0:
                this.type = "Thief";
                this.testRes = "This candidate isn't a samurai, they're a thief! They won't help, they'll steal the payment and run!"
                break;
            case 1:
                this.type = "Strat";
                this.testRes = "A samurai skilled in strategy. They will help ensure the village has strong defenses."
                break;
            case 2:
                this.type = "Sword";
                this.testRes = "A samurai skilled in swordsmanship. They won't have any trouble killing bandits."
                break;
            case 3:
                this.type = "Teach";
                this.testRes = "This samurai seems to be a wise and disciplined teacher. They will have an easier time training the villagers."
                break;
            case 4:
                this.type = "Student";
                this.testRes = "This samurai is young and still training, but they may be able to help an experienced samurai work more quickly."
                break;
            default:
                this.type = "Merc";
                this.testRes = "This warrior isn't a samurai, but they do have combat experience. Their help is probably easier to afford."
                break;
        }
        this.str = 5;
        this.def = 5;
        this.plan = 1;
        this.trainR = 1;
        this.cost = 10;
        this.cost = Phaser.Math.Between(5, 10);
        this.studentMult = 1;
        this.recruitSuccess = true;
        if(this.type == "Strat"){
            this.plan *= 2;
        }
        if(this.type=="Sword"){
            this.str *= 1.5;
            this.def *= 1.5;
        }
        if(this.type=="Teach"){
            this.trainR = 2;
        }
        if(this.type=="Student"){
            this.studentMult = 1.5;
        }
        if(this.type=="Merc"){
            this.str -= 1;
            this.def -= 1;
            this.cost /= 2;
        }
        if(this.type=="Thief"){
            this.recruitSuccess = false;
        }
    }
    attack(){
        return this.str;
    }
    test(){
        if(this.type!="Merc"){
            this.cost =Math.floor(this.cost*(Phaser.Math.FloatBetween(1.0, 2.0))) ;
        }
        return this.testRes; 
    }
    getTrainR(){
        return this.trainR;
    }
    getDefense(){
        return this.def;
    }
    getCost(){
        return this.cost;
    }
    getStudentMult(){
        return this.StudentMult;
    }
    getType(){
        return this.type;
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
                this.type = "Strat";
                this.testRes = "A samurai skilled in strategy. They will help ensure the village has strong defenses."
                break;
            case 2:
                this.type = "Sword";
                this.testRes = "A samurai skilled in swordsmanship. They won't have any trouble killing bandits."
                break;
            case 3:
                this.type = "Teach";
                this.testRes = "This samurai seems to be a wise and disciplined teacher. They will have an easier time training the villagers."
                break;
            case 4:
                this.type = "Student";
                this.testRes = "This samurai is young, and still learning, but they may be able to help a more experienced samurai work more efficiently."
                break;
            default:
                this.type = "Merc";
                this.testRes = "This warrior isn't a samurai, but they do have combat experience. Their help is probably easier to afford, too."
                break;
        }
        this.str = 5;
        this.def = 5;
        this.plan = 1;
        this.trainR = 1;
        this.cost = 10;
        this.cost = Phaser.Math.Between(5, 10);
        this.studentMult = 1;
        this.recruitSuccess = true;
        if(this.type == "Strat"){
            this.plan *= 2;
        }
        if(this.type=="Sword"){
            this.str *= 1.5;
            this.def *= 1.5;
        }
        if(this.type=="Teach"){
            this.trainR = 2;
        }
        if(this.type=="Student"){
            this.studentMult = 1.5;
        }
        if(this.type=="Merc"){
            this.str -= 1;
            this.def -= 1;
            this.cost /= 2;
        }
        if(this.type=="Thief"){
            this.recruitSuccess = false;
        }
    }
}