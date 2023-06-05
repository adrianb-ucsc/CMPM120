class Warrior{
    constructor(typeNum){
        switch(typeNum){
            case 0:
                type = "Thief";
                break;
            case 1:
                type = "Strat";
                break;
            case 2:
                type = "Sword";
                break;
            case 3:
                type = "Teach";
                break;
            case 4:
                type = "Student";
                break;
            case 5:
                type = "Merc";
                break;
        }
        str = 5;
        def = 5;
        plan = 1;
        trainR = 1;
        cost = Phaser.Math.Between(5, 10);
        studentMult = 1;
        recruitSuccess = true;
        if(type == "Strat"){
            plan *= 2;
        }
        if(type=="Sword"){
            str *= 1.5;
            def *= 1.5;
        }
        if(type=="Teach"){
            trainR = 2;
        }
        if(type=="Student"){
            studentMult = 1.5;
        }
        if(type=="Merc"){
            str -= 1;
            def -= 1;
            cost /= 2;
        }
        if(type=="Thief"){
            recruitSuccess = false;
        }
    }
    attack(){
        return str;
    }
    test(){
        cost *= (Phaser.Math.FloatBetween(1.0, 2.0));
        return type;
    }
    getTrainR(){
        return trainR;
    }
    getDefense(){
        return def;
    }
    getCost(){
        return cost;
    }
    getStudentMult(){
        return StudentMult;
    }
    getType(){
        return type;
    }
    recruit(){
        return recruitSuccess;
    }
}