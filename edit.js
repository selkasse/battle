// * Get Player and Monster values from URL params,
// * passed in from the 'Edit Values' link
const queryString = location.search.substring(1);
const split = queryString.split("|");

let playerAttack = split[0].split("=")[1];
let playerArmor = split[1].split("=")[1];
let playerHealth = split[2].split("=")[1];

let monsterAttack = split[3].split("=")[1];
let monsterArmor = split[4].split("=")[1];
let monsterHealth = split[5].split("=")[1];

const playerAttackField = document.getElementById('player-attack');
playerAttackField.value = playerAttack;

const playerArmorField = document.getElementById('player-armor');
playerArmorField.value = playerArmor;

const playerHealthField = document.getElementById('player-health');
playerHealthField.value = playerHealth;

const monsterAttackField = document.getElementById('monster-attack');
monsterAttackField.value = monsterAttack;

const monsterArmorField = document.getElementById('monster-armor');
monsterArmorField.value = monsterArmor;

const monsterHealthField = document.getElementById('monster-health');
monsterHealthField.value = monsterHealth;

const saveButton = document.getElementById('save');
saveButton.addEventListener('click', () => {
    window.location.href = 
        `index.html?playerAttackPower=${playerAttackField.value}|` +
        `playerArmor=${playerArmorField.value}|` +
        `playerHealth=${playerHealthField.value}|` +
        `monsterAttackPower=${monsterAttackField.value}|` +
        `monsterArmor=${monsterArmorField.value}|` +
        `monsterHealth=${monsterHealthField.value}|`;
})

