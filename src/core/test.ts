import { Battle } from "./battle";
import { Elve } from "./elves";
import { Player } from "./player";
import { Skill } from "./skill";

const skill1 = new Skill(31);
const skill2 = new Skill(31);

// create elves
const elve1 = new Elve(31);
elve1.skills = [skill1];
const elve2 = new Elve(31);
elve2.skills = [skill2];

// create players
const player1 = new Player(31);
player1.bagElves = [elve1];
player1.currentElve = elve1;

const player2 = new Player(31);
player2.bagElves = [elve2];
player2.currentElve = elve2;

// start battle
const battle = new Battle(player1, player2);

export const test = () => battle.takeTurn(31);
