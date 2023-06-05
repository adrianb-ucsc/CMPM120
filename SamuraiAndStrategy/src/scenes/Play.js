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
            align: 'left',
            padding: {
                top: 2,
                bottom: 2,
            },
            fixedWidth: game.config.width * (1 / 2)
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
            fixedWidth: game.config.width * (1 / 2)
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
        this.week = 1;

        this.buildingSupplies = 0;
        this.rice = 100;

        this.warriors = 0;
        this.deadWarriors = 0;
        this.samSt = 0;
        this.samSw = 0;
        this.samTe = 0;
        this.samStu = 0;
        this.merc = 0;

        function menuButton(x) {
            x.scene.start("menuScene");
        }

        //adding background and text
        this.add.sprite(game.config.width / 2, game.config.height / 2, 'map').setOrigin(0.5, 0.5);

        this.toMenu = new Buttont(this, game.config.width * (1 / 40), -5, "Menu", " (WARNING: may RESET progress)", menuConfig, menuButton);
        this.report = this.add.text(game.config.width * (2 / 8), game.config.height / 40, 'Your scouts have reported BANDITS in the area. \nYou should try to recruit some SAMURAI to DEFEND YOUR VILLAGE.', textConfig);

        this.add.text(game.config.width * (7 / 8), game.config.height / 40, 'Bandits:', titleConfig);

        this.add.text(game.config.width * (1 / 40), game.config.height / 40, 'Time: ', titleConfig);
        this.time = this.add.text(game.config.width * (3.65 / 40), game.config.height * (2 / 40), 'Spring, Week 1', subtitleConfig);

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
    }
    update() {

    }
}