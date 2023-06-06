class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }
    preload() {
        this.load.image('map', './assets/SamuraiGameMap.png');
        this.load.atlas('banditTrack', './assets/BanditTrack.png', 'assets/BanditTrack.json');
    }
    create() {
        let textConfig = {
            fontFamily: 'EastSea',
            fontSize: '28px',
            color: '#1e1e1e',
            strokeThickness: 0,
            align: 'left',
            padding: {
                top: 0,
                bottom: 0,
            },
            fixedWidth: 0
        }
        let lonelyConfig = {
            fontFamily: 'EastSea',
            fontSize: '28px',
            color: '#1e1e1e',
            stroke: '#1e1e1e',
            strokeThickness: 1,
            align: 'left',
            padding: {
                top: 2,
                bottom: 2,
            },
            fixedWidth: 0
        }
        let buttonConfig = {
            fontFamily: 'EastSea',
            fontSize: '28px',
            color: '#1e1e1e',
            stroke:'#E13837',
            strokeThickness: 1,
            align: 'left',
            padding: {
                top: 2,
                bottom: 2,
            },
            fixedWidth: 0
        }
        let subtitleConfig = {
            fontFamily: 'EastSea',
            fontSize: '36px',
            color: '#1e1e1e',
            align: 'left',
            padding: {
                top: 5,
                bottom: 0,
            },
            fixedWidth: 0
        }
        let titleConfig = {
            fontFamily: 'EastSea',
            fontSize: '64px',
            color: '#1e1e1e',
            align: 'left',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }
        let menuConfig = {
            fontFamily: 'EastSea',
            fontSize: '22px',
            color: '#bfbfbf',
            align: 'left',
            padding: {
                top: 0,
                bottom: 2,
            },
            fixedWidth: 0
        }
        //Set initial number values
        //I wasn't able to find an exact estimate of the number of villagers who got trained to fight
        //but there is a scene where one villager gathers up the others in training who live in the three houses past the bridge
        //there are 6 of them, according to the script, so I'm assuming roughly 2 trainable villagers per house. That would be 76, which I am rounding to 75
        this.totVillagers = 75;
        //they say there are ~40 bandits, but the battle plan they use to track the bandits they kill has 33 spaces to track the deaths. 
        //I'm assuming, therefore, that killing 33 bandits is a victory.
        this.totBandits = 33;

        this.deadBandits = 0;
        this.deadVillagers = 0;

        this.t1Villagers = 0;
        this.t2Villagers = 0;

        //It was unclear when exactly the events in the movie took place, because they talk about the harvest, but refer to both rice and barley
        //as far as I learned from my research, these are often harvested at different times
        //I decided that the fighting with bandits should be in Winter, since from what I was able to find online, that's when most of that sequence was filmed
        //Plus, that would definitely put the bandits arriving after the harvest.
        //We start in Spring for the recruiting, then you have two seasons to prepare before the fighting begins.
        this.season = ['Spring', 'Summer', 'Fall', 'Winter'];
        this.seasonInd = 0;
        this.week = 1;

        this.buildingSupplies = 0;
        this.rice = 100;

        this.maxWarriors = 7;
        this.warriors = 0;
        this.warriorlist = new Array(7);
        this.deadWarriors = 0;
        this.samSt = 0;
        this.samSw = 0;
        this.samTe = 0;
        this.samStu = 0;
        this.merc = 0;


        //adding background and text
        this.add.sprite(game.config.width / 2, game.config.height / 2, 'map').setOrigin(0.5, 0.5);

        this.toMenu = new Buttont(this, game.config.width * (1 / 40), -5, "Menu", "Menu (WARNING: may RESET progress)", menuConfig, menuConfig);
        this.toMenu.on('pointerdown', () => this.scene.start("menuScene"));
        this.report1 = this.add.text(game.config.width * (2 / 8)-15, 18, 'Your scouts have reported bandits in the area.', textConfig);
        this.report2 = this.add.text(game.config.width * (2 / 8)-15, 18+game.config.height / 40, 'To defend your village, you will need to get some help.', textConfig);
        this.report3 = this.add.text(game.config.width * (2 / 8)-15, 18+game.config.height * (2/40), 'Try recruiting a samurai.', textConfig);

        this.add.text(game.config.width * (7 / 8), game.config.height / 40, 'Bandits:', titleConfig);

        this.add.text(game.config.width * (1 / 40), game.config.height / 40, 'Time: ', titleConfig);
        this.calndr = this.add.text(game.config.width * (3.65 / 40), game.config.height * (2 / 40), 'Spring, Week 1', subtitleConfig);

        this.add.text(game.config.width * (1 / 40), game.config.height * (4.5 / 40), 'Defenses:', titleConfig);
        this.northDef = this.add.text(game.config.width * (1 / 40), game.config.height * (8 / 40), 'North:' + '0', textConfig);
        this.eastDef = this.add.text(game.config.width * (1 / 40), game.config.height * (10 / 40), 'East:' + '0', textConfig);
        this.southDef = this.add.text(game.config.width * (1 / 40), game.config.height * (12 / 40), 'South:' + '0', textConfig);
        this.westDef = this.add.text(game.config.width * (1 / 40), game.config.height * (14 / 40), 'West:' + '0', textConfig);

        this.add.text(game.config.width * (1 / 40), game.config.height * (17 / 40), 'Resources:', titleConfig);
        this.uVil = this.add.text(game.config.width * (1 / 40), game.config.height * (20 / 40), 'Untrained Villagers: ' + (this.totVillagers - this.deadVillagers - this.t1Villagers - this.t2Villagers), textConfig);
        this.t1Vil = this.add.text(game.config.width * (1 / 40), game.config.height * (21 / 40), 'Novice Villagers: ' + (this.t1Villagers), textConfig);
        this.t1Vil = this.add.text(game.config.width * (1 / 40), game.config.height * (22 / 40), 'Expert Villagers: ' + (this.t2Villagers), textConfig);
        this.add.text(game.config.width * (1 / 40), game.config.height * (23 / 40), 'Warriors: ', textConfig);
        this.samStrat = this.add.text(game.config.width * (2 / 40), game.config.height * (24 / 40), 'Samurai (Strategist): ' + (this.samSt), textConfig);
        this.samSword = this.add.text(game.config.width * (2 / 40), game.config.height * (25 / 40), 'Samurai (Swordsman): ' + (this.samSw), textConfig);
        this.samTeach = this.add.text(game.config.width * (2 / 40), game.config.height * (26 / 40), 'Samurai (Teacher): ' + (this.samTe), textConfig);
        this.samStudent = this.add.text(game.config.width * (2 / 40), game.config.height * (27 / 40), 'Samurai (Student): ' + (this.samStu), textConfig);
        this.mercenary = this.add.text(game.config.width * (2 / 40), game.config.height * (28 / 40), 'Mercenaries: ' + (this.merc), textConfig);

        this.buildMats = this.add.text(game.config.width * (1 / 40), game.config.height * (30 / 40), 'Building Materials: ' + (this.buildingSupplies), textConfig);
        this.riceLeft = this.add.text(game.config.width * (1 / 40), game.config.height * (32 / 40), 'Rice: ' + (this.rice) + "%", textConfig);

        this.deadVilList = this.add.text(game.config.width * (1 / 40), game.config.height * (34 / 40), 'Dead Villagers: ' + (this.deadVillagers) , textConfig);
        this.deadWarList = this.add.text(game.config.width * (1 / 40), game.config.height * (36 / 40), 'Dead Warriors: ' + (this.deadWarriors) , textConfig);
    
        this.action1 = new Buttont(this, game.config.width * (2 / 8) -15, game.config.height*(31/40) , "o Recruit samurai.", "x Recruit the first samurai who agrees to help.", textConfig, lonelyConfig);
        this.action2 = new Buttont(this, game.config.width * (2 / 8) -15, game.config.height*(32/40) , "", "", textConfig, lonelyConfig);
        this.action3 = new Buttont(this, game.config.width * (2 / 8) -15, game.config.height*(33/40) , "", "", textConfig, lonelyConfig);
        this.action4 = new Buttont(this, game.config.width * (2 / 8) -15, game.config.height*(34/40) , "", "", textConfig, lonelyConfig);
        this.action1.on('pointerdown', () => this.action1Handler(this.seasonInd, this.week));
        this.action2.on('pointerdown', () => this.action2Handler(this.seasonInd, this.week));
        this.action3.on('pointerdown', () => this.action3Handler(this.seasonInd, this.week));
        this.action4.on('pointerdown', () => this.action4Handler(this.seasonInd, this.week));
    }
    update() {

    }
    startRecruitment(){
        this.leader = new Warrior(1);
        this.candidate = new Warrior(4);
        this.recruitWarrior(this.leader);
        this.action1.disableInteractive();
        this.action1.setText("Recruiting:")
        this.report3.setText('The samurai suggests you test the skills of potential recruits');
        
    };
    recruitWarrior(trgt){
        console.log("recruiting");
        this.nextWeek();
        this.canAfford = false;
        if(trgt.getCost()>this.rice){
            this.canAfford=false;
        }else{
            this.rice-=trgt.getCost();
            this.riceLeft.setText('Rice: ' + (this.rice) + "%");
            if(trgt.getType()=="Thief"){
                this.report1.setText('You were stolen from by a thief!.');
                this.report2.setText('You have ' + this.rice + '% of your rice left, and can recruit up to ' + (this.maxWarriors-this.warriors) + ' more warriors.');  
            }else{
                this.canAfford=true;
            }   
        }
        if(this.canAfford&&trgt.recruit()){
                this.warriorlist[this.warriors] = trgt;
                this.warriors+=1;
                switch(trgt.getType()){
                    case "Strat":
                        this.samSt +=1;
                        this.samStrat.setText('Samurai (Strategist): ' + (this.samSt));
                        this.report1.setText('You have recruited a samurai skilled in strategy.');
                        this.report2.setText('You have ' + this.rice + '% of your rice left, and can recruit up to ' + (this.maxWarriors-this.warriors) + ' more warriors.');
                        break;
                    case "Sword":
                        this.samSw +=1;
                        this.samSword.setText('Samurai (Swordsman): ' + (this.samSw));
                        this.report1.setText('You have recruited a samurai skilled in swordsmanship.');
                        this.report2.setText('You have ' + this.rice + '% of your rice left, and can recruit up to ' + (this.maxWarriors-this.warriors) + ' more warriors.');
                        break;
                    case "Teach":
                        this.samTe +=1;
                        this.samTeach.setText('Samurai (Teacher): ' + (this.samTe));
                        this.report1.setText('You have recruited a samurai skilled at training others.');
                        this.report2.setText('You have ' + this.rice + '% of your rice left, and can recruit up to ' + (this.maxWarriors-this.warriors) + ' more warriors.');
                        break;
                    case "Student":
                        this.samStu +=1;
                        this.samStudent.setText('Samurai (Student): ' + (this.samStu));
                        this.report1.setText('You have recruited a samurai student. They can help the more experienced warriors with basic tasks.');
                        this.report2.setText('You have ' + this.rice + '% of your rice left, and can recruit up to ' + (this.maxWarriors-this.warriors) + ' more warriors.');
                        break;
                    case "Merc":
                        this.merc +=1;
                        this.mercenary.setText('Mercenaries: ' + (this.merc));
                        this.report1.setText('You have recruited a mercenary.');
                        this.report2.setText('You have ' + this.rice + '% of your rice left, and can recruit up to ' + (this.maxWarriors-this.warriors) + ' more warriors.');
                        break;
                    default:
                        break;
                }
        }
        if(this.warriors>1){
            this.candidate.remake(Phaser.Math.Between(0, 5));
        }
    };
    nextWeek(){
        this.week += 1;
        if(this.week >12){
            nextSeason();
        }else{
            this.calndr.setText(this.season[this.seasonInd] + ', Week ' + this.week);
        }
        if(this.seasonInd == 0 && this.week >1){
            this.action2.setText("o Recruit the next candidate");
            this.action3.setText("o Test the next candidate");
            this.action2.txt = "o Recruit the next candidate";
            this.action2.txt2 = "x Recruit Cost: " + this.candidate.getCost() +"% of rice.";
            this.action3.txt = "o Test the next candidate";
            this.action3.txt2 = "x Discover their skills, reveal thieves (WARNING: May cause offense, increasing price)"
            this.action2.setInteractive();
            this.action3.setInteractive();
        }
    }
    nextSeason(){

    }
    testWarrior(trgt){
        this.action3.disableInteractive();
        this.action3.setText(trgt.test());
        this.action2.txt2 = "x Recruit Cost: " + this.candidate.getCost() +"% of rice.";
        this.action4.setText("o Dismiss the candidate");
        this.action4.txt = "o Dismiss the candidate";
        this.action4.txt2 = "x Dismiss the current candidate, but it may take time to find another.";
    }

    action1Handler(a, b){
        switch(a){
            case 0:
                switch(b){
                    case 1:
                        this.startRecruitment();
                        break;
                    default:
                        break;
                }
                break;
            default:
                break;
        }
    }

    action2Handler(a, b){
        switch(a){
            case 0:
                switch(b){
                    case 1:
                        break;
                    case 2:
                    case 3:
                    case 4:
                    case 5:
                    case 6:
                    case 7:
                    case 8:
                    case 9:
                    case 10:
                    case 11:
                    case 12:
                        this.recruitWarrior(this.candidate);
                    default:
                        break;
                }
                break;
            default:
                break;
        }
    }
    action3Handler(a, b){
        switch(a){
            case 0:
                switch(b){
                    case 1:
                        break;
                    case 2:
                    case 3:
                    case 4:
                    case 5:
                    case 6:
                    case 7:
                    case 8:
                    case 9:
                    case 10:
                    case 11:
                    case 12:
                        this.testWarrior(this.candidate);
                    default:
                        break;
                }
                break;
            default:
                break;
        }
    }
    action4Handler(a, b){
        switch(a){
            case 0:
                switch(b){
                    case 1:
                        break;
                    case 2:
                    case 3:
                    case 4:
                    case 5:
                    case 6:
                    case 7:
                    case 8:
                    case 9:
                    case 10:
                    case 11:
                    case 12:
                        this.nextWeek();
                        this.candidate.remake(Phaser.Math.Between(0, 5));
                    default:
                        break;
                }
                break;
            default:
                break;
        }
    }
}