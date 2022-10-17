import inquirer from "inquirer";

let player_actions: string[] = ["Attack", "Drink Health potion", "Run"];
let game_actions: string[] = ["Continue Fighting", "Exit dungeon"];

// game variables
let enemies: string[] = [
  "Skeleton",
  "Zombie",
  "Warrior",
  "Assassin",
  "Gladiator",
];
let max_enemy_health: number = 75;
let enemy_attack_damage: number = 25;

// player variables
let health: number = 100;
let attack_damage: number = 50;
let num_health_potions: number = 3;
let health_potion_heal_amount: number = 30;
let health_potion_drop_chance: number = 50; // Percantage

let running: boolean = true;

async function gameOptionPrompt(options: string[]): Promise<string> {
  const answers = await inquirer.prompt({
    name: "action",
    type: "list",
    message: `Select option.`,
    choices: options,
    default() {
      return "Attack";
    },
  });
  return answers.action;
}

function setEnemy() {
  enemy_health = Math.floor(Math.random() * max_enemy_health);
  enemy = enemies[Math.ceil(Math.random() * enemies.length - 1)];
}

function attack() {
  const damageDealt: number = Math.round(Math.random() * attack_damage);
  const damageTaken: number = Math.round(Math.random() * enemy_attack_damage);

  enemy_health -= damageDealt;
  health -= damageTaken;

  console.log(`\t You sting the ${enemy} for ${damageDealt} damage.`);
  console.log(`\t You receive ${damageTaken} in retaliation!`);
  if (health < 1) {
    console.log(
      "\t you have taken too much damage, your are too weak to go on."
    );
    console.log(`Come later kid, with some attitude.`);
    process.exit(0);
  }
}

function drinkHealthPotion() {
  if (num_health_potions > 0 && health <= 100) {
    health += health_potion_heal_amount;
    health = health > 100 ? 100 : health;
    num_health_potions--;
    console.log(
      `\t You drink a health potion, healing yourself for ${health_potion_heal_amount} \n\t You now have health ${health} HP \n\t You have ${num_health_potions} health potions left.\n`
    );
  } else {
    console.log(
      `You have no health potions left, Defeat enemy for a chance to get one!`
    );
  }
}

let enemy_health: number = Math.floor(Math.random() * max_enemy_health);
let enemy: string = enemies[Math.ceil(Math.random() * enemies.length - 1)];

console.log("\t# Welcome to the Dungeon!");
while (running) {
  console.log("-----------------------------------------------");

  // setting up Enemy
  setEnemy();
  console.log(`\t# ${enemy} has appeared #\n`);

  //   GAME:
  while (enemy_health > 0) {
    console.log(`\tYour HP: ${health}`);
    console.log(`\t${enemy}'s HP: ${enemy_health}`);
    console.log(`\t\n What would you like to do?`);

    const action: string = await gameOptionPrompt(player_actions);

    switch (action) {
      case "Attack":
        attack();
        break;

      case "Drink Health potion":
        drinkHealthPotion();
        break;
      case "Run":
        console.log(`\t You ran away from the enemy, ${enemy}!`);
        setEnemy();
        continue;
      // continue GAME;

      default:
        console.log(`Invalid command`);
        break;
    }
  }
  if (health < 1) {
    console.log(`You limp out of the dungeon, weak for battle.`);
    process.exit(0);
  }

  console.log("-----------------------------------------------");
  console.log(` # ${enemy} was defeated! #`);
  console.log(` # You have ${health} HP left #`);

  if (Math.floor(Math.random() * 100) < health_potion_drop_chance) {
    num_health_potions++;
    console.log(`# The ${enemy} dropped a health potion! #`);
    console.log(`# You now have ${num_health_potions} health potion(s). #`);
  }

  console.log("-----------------------------------------------");

  const action: string = await gameOptionPrompt(game_actions);
  switch (action) {
    case "Continue Fighting":
      console.log(`You continue on your adventure!`);
      break;
    case "Exit dungeon":
      console.log(`You exit the dungeon, successfull from your adventures!`);
      console.log("#######################");
      console.log("# THANKS FOR PLAYING! #");
      console.log("#######################");

      process.exit(0);

    default:
      break;
  }
}
