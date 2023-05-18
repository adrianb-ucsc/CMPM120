/*
Adrian Bruce
Bat-venture
Approx. 18 hours (including time spent making new assets, but not including time spent during the last project on the assets that I reused)

Use multiple Scene classes (dictated by your game's style) (5)
>>Two scenes, menu and play.
Properly transition between Scenes and allow the player to restart w/out having to reload the page (5)
>>Yes. You can restart or get back to the menu when you reach game over.
Include in-game instructions using text or other means (e.g., tooltips, tutorial, diagram, etc.) (5)
>>There is text explaining the basic mechanics at the start of the game.
Have some form of player input/control appropriate to your game design (5)
>>Hold mouse click to fly(chose to do it this way instead of with the keyboard because of how I'm planning to expand this game for a project in ARTG 120)
Include one or more animated characters that use a texture atlas (5)
>>The enemy bugs are animated using a texture atlas
Simulate scrolling with a tileSprite (or equivalent means) (5)
>>Yes. Several tilesprites for parallax effect
Implement proper collision detection (via Arcade Physics or a custom routine) (5)
>>Made custom collision detection. Wanted to specifically detect when the bugs collide with the bat's head (you are eating them)
Have looping background music (5)
>>yes
Use a minimum of three sound effects for key mechanics, UI, and/or significant events appropriate to your game design (5)
>>there is a sound effect for flying, for eating bugs, and for selecting things in the menu.
Use randomness to generate escalating challenge, e.g. terrain, pickups, etc. (5)
>>As the game continues, the multiplier to your flying/falling speed increases. Can start at around 20 seconds. (In my experience,the game gets very hard once the multiplier gets to 7 or 8.)
Include some metric of accomplishment that a player can improve over time, e.g., score, survival time, etc. (5)
>>Score is based on the speed multiplier that you got to.
Be theoretically endless (5)
>>Theoretically yes. Practically I think at a certain point it is impossible for a human, since it just keeps getting faster.
Be playable for at least 15 seconds for a new player of low to moderate skill (5)
>>It should be.
Run without significant crashes or errors (5)
>>It did when I was testing it.
Include in-game credits for all roles, assets, music, etc. (5)
>>Credits are included. I did everything myself, so they are very short.

...do something technically interesting? Are you particularly proud of a programming technique you implemented? Did you look beyond the class examples and learn how to do something new? (5)
>>Honestly, I spent more time working on learning how to make the different sound effects than I did trying to learn how to do new technical stuff.
>>That being said, I did spend a lot of time researching how time works in phaser, both for the energy mechanic but also to figure out what the best options were for lining up the wing flap animation with the sound effect.
>>Mostly though, I was very happy with the increasing difficulty over time mechanic I decided to go with.
>>It is fairly simple, but it worked out exactly how I wanted it to, and honestly sometimes finding a simple way of doing something that works well is really the goal.
>>Basically, I multiply Math.random() with this.time.now, and if the result is >= the game timer variable (when it can start getting faster) then the speed increases.
>>I also have it check to make sure this hasn't happened in the last 5 seconds, so that if a player is playing for long enough the rate of acceleration is still manageable.
>>Also, I did some randomization for where the bugs reset to, so there's still only three of them (two later in the game) but they're not in set lanes anymore.
...have a great visual style? Does it use music or art that you're particularly proud of? Are you trying something new or clever with the endless runner form? (5)
>>I'm pretty proud of how the music turned out! I haven't done much work with making music digitally before, but I am really happy with it!

Sources used: Phaser documentation, course materials, this tutorial for texture atlases: https://www.joshmorony.com/how-to-create-animations-in-phaser-with-a-texture-atlas/
Pixel art made by me(Adrian Bruce) using https://www.piskelapp.com/ tool. SFX made by me using https://sfbgames.itch.io/chiptone tool. Music made by me using GarageBand app. 
*/
let config = {
    type: Phaser.CANVAS,
    width: 640,
    height: 480,
    pixelArt: true,
    scene: [Menu, Play]
}
let game = new Phaser.Game(config);
// reserve keyboard vars
let keyF, keyR, keyLEFT, keyRIGHT;
//set UI sizes
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;
