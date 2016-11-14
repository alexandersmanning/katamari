# Katamari

This is a simple browser version of Katamari Damacy, using EaselJS and Howler.js to make a full interactive experience.

## Background

Katamari (clump) Damacy (soul) is a Japanese game series, in which the player is a tiny ball that, through rolling over other smaller object, continues to grow and take over other objects, culminating in the taking over of planets and universe. I would like to make a simple form of that using two dimensions, and circles of varying sizes, making it something similar to [The Big Fish](http://www.funinbrowser.com/?g=4), but using keyboard controls instead. What differentiates this version, is that I wanted the user interaction, and the katamari's to make music by bouncing off each other and the wall, and the user consuming a katamari. Below is the gist of the game

1) A player starts as a small ball, that can only "consume"/collect balls its size or smaller 
2) As the player consumes katamari, it continues to get larger, allowing it to consume larger pieces 
3) If a user hits a katamari that is larger than itself, the game will end. 

## Functionality & MVP

Users will be able to:

1. Start a game
2. Turn on the music
3. Move themselves around using the arrow keys on the keyboard.
4. By holding down the arrow key, the player will continue to accelarate in that direction

In addition, this project will include:

1. An About modal describing the background and rules of the game
2. Appropriate elastic-collision physics
3. Pleasing sounds, provided by the hatnote project, for katamari interaction
2. A production Readme

## Wireframes

This app will consist of a single screen with a main screen, a legend for game controls, abilty to silence the music, and footer nav links to the Github, my LinkedIn, and the About modal. Game controls will include up, down, left, right, and a start (enter) button.

Mainscreen with Controls
![main screen](http://imgur.com/a/oEloB)
![Modal](http://imgur.com/a/n7goJ)


## Technologies

This project will be implemented with the following technologies:

Vanilla JavaScript game logic,
React for Modal/About page, and page structruing
Easel.js with HTML5 Canvas for DOM manipulation and rendering,
Howler.js to load interaction sounds
Webpack to bundle and serve up the various scripts.

These will be the classes for my project:

1. MovingObjects: This will be the base class for the katamari and user objects, and will contains the move logic, object interaction logic, and drawing of objects
  + Katamari: This will contain the logic for the katamari/bouncing balls, including sounds, size, and speed, and move logic
  + User logic will contain moving through inputs, sounds, and logic for interactions
2. Game: The game class will contain logic for adding katamari, drawing every item on the canvas, and appropriately choosing starting locations and sizes for the katamari. It will also contain the base logic for moving all of the katamari, checking for collisions of two objects, and playing individual sounds when appropriate
3. GameView will provide the the basic logic for setting the time interval and starting the game

To handle the physics and vectors, I will create a util file that can be accessed by the items and game during the collision and creation methods


Implementation Timeline
Since I made some headway during the weekend:

Day 1: Implement ball/user logic, working with packages such as keymaster to implement movement. Clean up game dynamics, so that it can be won (an appropriate number of each size ball). Debug rare issue of katamari sometimes sticking to one another:

Goals: 

1. Have a moving ball that can eat katamari and grow
2. Ensure there are enough katamari of each size to make it a reasonable game

Day 2: Add start, stop, and play again logic to the game view, so that the user can more appropriately interact with the game.

Goals:

1. Finish debugging physics side to fix sticking issue with game
2. Start and Stop logic in game view. Upon losing, allow the user to play again. 
3. Add mute button for players who don't want to hear the sound

Day 3: Clean up the website, adding CSS, an About modal using react

1. Have a presentable and clean website, with about explanation of the game, and link to my github.
2. Ensure transitions work appropriately, and the website has a consisten style

Day 4: Assuming everything goes to schedule, add bonus features, starting with lives, and then levels.

Bonus features

1. Multilple lives, so that when a play is hit, they only shrink, they do not instantly "die"
2. Multiple stages, or game regeneration after a player gets large enough
