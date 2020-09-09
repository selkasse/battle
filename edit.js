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

const playerEdit = document.getElementById('player-edit');
const monsterEdit = document.getElementById('monster-edit');

console.log(playerAttack, playerArmor, playerHealth);
console.log(monsterAttack, monsterArmor, monsterHealth);

