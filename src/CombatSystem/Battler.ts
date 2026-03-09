export default class Battler {
    name: string;
    elements: any[];
    hp: number;

    constructor(name: string) {
        this.name = name;
        this.elements = [];
        this.hp = 20;
    }
}

// Animated HP Bar

// var fills = document.querySelectorAll(".healthbar_fill");
// var aliveCharacter = document.querySelector(".alive")
// var deadCharacter = document.querySelector(".dead")

// var health = 75;
// var maxHp = 100;

// function renderHealth() {
   
//    var percent = health / maxHp * 100;
   
//    //Update color
//    document.documentElement.style.setProperty('--bar-fill', '#57e705');
//    document.documentElement.style.setProperty('--bar-top',  '#6aff03');
   
//    if (percent <= 50) { //yellows
//       document.documentElement.style.setProperty('--bar-fill', '#d6ed20');
//       document.documentElement.style.setProperty('--bar-top',  '#d8ff48');   
//    }
//    if (percent <= 25) { //reds
//       document.documentElement.style.setProperty('--bar-fill', '#ec290a');
//       document.documentElement.style.setProperty('--bar-top',  '#ff3818');
//    }

//    if (percent === 0) {
//       aliveCharacter.style.display = "none";
//       deadCharacter.style.display = "block";
//    } else {
//       aliveCharacter.style.display = "block";
//       deadCharacter.style.display = "none";
//    }


//    fills.forEach(fill => {
//       fill.style.width = percent+"%";
//    })   
// }

// function updateHealth(change) {
//    health += change;
//    health = health > maxHp ? maxHp : health;
//    health = health < 0 ? 0 : health;

//    renderHealth();
// }


// //init
// updateHealth(0)

// CSS

// :root {
//    --bar-fill: #57e705;
//    --bar-top: #6aff03;
//    --pixel-size: 7;
// }

// body {
//    background: #de88ff;
// }

// .container {
//    width: calc(38px * var(--pixel-size));
//    margin: 4em auto;
// }
 
// .title {
//    width: calc(9px * var(--pixel-size));
//    margin-bottom: calc(2px * var(--pixel-size));
//    display: block;
// }
// .healthbar {
//    width: calc(38px * var(--pixel-size));
//    margin: 0 auto calc(2px * var(--pixel-size)) auto;
//    display: block;
// }

// .healthbar_fill {
// /*    width: 100%; */
//    fill: var(--bar-fill);
//    transition: width 0.1s ease-in, fill 0.2s linear;
// }
// .healthbar_fill-top {
//    fill: var(--bar-top);
// }


// .button-container {
//    display: flex;
//    justify-content: space-between;
//    margin-bottom: 1em;
// }
// .button {
//    padding: 0;
//    border: 1px solid rgba(0,0,0,0);
//    background: none;
//    cursor: pointer;
//    outline: none;  
// }
// .button:focus {
//    border: 1px solid white;
// }

// .button img {
//    width: calc(9px * var(--pixel-size));
//    image-rendering: pixelated;
   
// }

// .character {
//     width: calc(15px * var(--pixel-size));
//    image-rendering: pixelated;
//    margin: 0 auto;
//    display: block;
// }
// .dead {
//    display:none;
// }


// HTML

// <div class="container">
//     <svg class="title" xmlns="http://www.w3.org/2000/svg" viewBox="0 -0.5 9 7" shape-rendering="crispEdges">
//         <path stroke="#222034" d="M0 0h9M0 1h1M2 1h1M4 1h1M8 1h1M0 2h1M2 2h1M4 2h1M6 2h1M8 2h1M0 3h1M4 3h1M8 3h1M0 4h1M2 4h1M4 4h1M6 4h3M0 5h1M2 5h1M4 5h1M6 5h1M0 6h7" />
//         <path stroke="#ffffff" d="M1 1h1M3 1h1M5 1h3" />
//         <path stroke="#f2f2f5" d="M1 2h1M3 2h1M5 2h1M7 2h1M1 3h3M5 3h3M1 4h1M3 4h1M5 4h1M1 5h1M3 5h1M5 5h1" />
//     </svg>
//     <!-- Dynamic healthbar -->
//     <svg class="healthbar" xmlns="http://www.w3.org/2000/svg" viewBox="0 -0.5 38 9" shape-rendering="crispEdges">
//         <metadata>Made with Pixels to Svg https://codepen.io/shshaw/pen/XbxvNj</metadata>
//         <path stroke="#222034" d="M2 0h34M1 1h1M36 1h1M0 2h1M3 2h32M37 2h1M0 3h1M2 3h1M35 3h1M37 3h1M0 4h1M2 4h1M35 4h1M37 4h1M0 5h1M2 5h1M35 5h1M37 5h1M0 6h1M3 6h32M37 6h1M1 7h1M36 7h1M2 8h34" />
//         <path stroke="#ffffff" d="M2 1h34" />
//         <path stroke="#f2f2f5" d="M1 2h2M35 2h2M1 3h1M36 3h1M1 4h1M36 4h1M1 5h1M36 5h1M1 6h2M35 6h2M2 7h34" />
//         <path stroke="#323c39" d="M3 3h32" />
//         <path stroke="#494d4c" d="M3 4h32M3 5h32" />
//         <!-- Fill container -->
//         <svg x="3" y="2.5" width="32" height="3">
//             <rect class="healthbar_fill" height="3" />
//             <rect class="healthbar_fill healthbar_fill-top" height="1" />
//         </svg>
//     </svg>
   
//    <!-- Buttons -->
//     <div class="button-container">
//         <button class="button" onclick="updateHealth(-15)">
//             <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/21542/HealthDemoDown.png" alt="Less Health" />
//         </button>
//         <button class="button" onclick="updateHealth(15)">
//             <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/21542/HealthDemoUp.png" alt="More Health" />
//         </button>
//     </div>


//    <!-- Character -->
//     <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/21542/SeedCharacter.png" class="character alive" />
//     <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/21542/SeedCharacterDead.png" class="character dead" />
// </div>