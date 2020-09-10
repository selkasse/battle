// * Override console.log to print to page
(function () {
    var old = console.log;
    var logger = document.getElementById('log');
    console.log = function () {
      for (var i = 0; i < arguments.length; i++) {
        if (typeof arguments[i] == 'object') {
            logger.innerHTML += (JSON && JSON.stringify ? JSON.stringify(arguments[i], undefined, 2) : arguments[i]) + '<br />';
        } else {
            logger.innerHTML += arguments[i] + '<br />';
        }
      }
    }
})();



let player = {
    name: "player",
    attackPower: 3,
    armor: 3,
    currentHealth: 30,
    totalHealth: 30,
    stance: "neutral"
}

let monster = {
    name: "monster",
    attackPower: 2,
    armor: 4,
    currentHealth: 25,
    totalHealth: 25, 
    stance: "neutral"
}
function round(value, decimals) {
    return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
}

const playerDiv = document.getElementById('player');
const monsterDiv = document.getElementById('monster');

function displayPlayfield(){

    playerDiv.innerHTML = `player <hr />
        Attack Power: ${player.attackPower} <br />
        Armor: ${player.armor} <br />
        Health: ${round(player.currentHealth, 0)} / ${player.totalHealth} <br />
        Stance: ${player.stance}`
    
    monsterDiv.innerHTML = `monster <hr />
        Attack Power: ${monster.attackPower} <br />
        Armor: ${monster.armor} <br />
        Health: ${round(monster.currentHealth, 0)} / ${monster.totalHealth} <br />
        Stance: ${monster.stance}`
}

const delay = ms => new Promise(res => setTimeout(res, ms));



const attack = async function(e){
    let attacker;
    let defender;
    if(e){
        player.stance = "attack";
        monster.stance = "defend";
        attacker = player;
        defender = monster;
    }
    else {
        player.stance = "defend";
        monster.stance = "attack";
        attacker = monster;
        defender = player;
    }

    
    const armorRatio = attacker.attackPower / defender.armor;
    let dmg;

    if (armorRatio > 1){
        dmg = attacker.attackPower - defender.armor;
    }
    else {
        dmg = armorRatio * attacker.attackPower;
    }

    dmg = round(dmg, 0);
    defender.currentHealth -= dmg;
    displayPlayfield();

    console.log(`${attacker.name} did ${dmg} damage to ${defender.name} \n\n`)
    // * If the player's turn has ended, switch to monster auto attack
    // * If the monster's turn has ended, switch to player manual attack
    if(player.stance == "attack"){
        if(monster.currentHealth > 0){
            await delay(500);
            attack();
        }
        else{
            playerDiv.innerHTML += `<br /><p style="color: green;">Player defeated monster</p>`
        }
    }
    else{
        console.log('***********************************');
    }
}

const playerAttack = document.getElementById('player-attack');


playerAttack.addEventListener("click", attack);

displayPlayfield();

const queryString = location.search.substring(1);
if(queryString){
    // console.log(queryString);
    const split = queryString.split("|");

    let playerAttack = split[0].split("=")[1];
    let playerArmor = split[1].split("=")[1];
    let playerHealth = split[2].split("=")[1];

    let monsterAttack = split[3].split("=")[1];
    let monsterArmor = split[4].split("=")[1];
    let monsterHealth = split[5].split("=")[1];

    player.attackPower = playerAttack;
    player.armor = playerArmor;
    player.totalHealth = playerHealth;
    player.currentHealth = playerHealth;

    monster.attackPower = monsterAttack;
    monster.armor = monsterArmor;
    monster.totalHealth = monsterHealth;
    monster.currentHealth = monsterHealth;

    displayPlayfield();
}

const edit = document.getElementById('edit');
edit.href +=
    `?playerAttackPower=${player.attackPower}|` +
    `playerArmor=${player.armor}|` +
    `playerHealth=${player.totalHealth}|` +
    `monsterAttackPower=${monster.attackPower}|` +
    `monsterArmor=${monster.armor}|` +
    `monsterHealth=${monster.totalHealth}|`;
