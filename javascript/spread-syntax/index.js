// Objects

const pikachu = { name: 'Pikachu' };
const stats = { hp: 40, attack: 60, defense: 45 };

'Bad Object Code 💩'

pikachu['hp'] = stats.hp;
pikachu['attack'] = stats.attack;
pikachu['defense'] = stats.defense;

// OR

const lv10 = Object.assign(pikachu, stats);
const lv11 = Object.assign(pikachu, { hp: 45 });

'Good Object Code ✅'

const lv12 = {...pikachu, ...stats}
const lv13 = {...pikachu, hp: 45 }

// Arrays 

let pokemon = ['Arbok', 'Raichu', 'Sandshrew'];

'Bad Array Code 💩'

pokemon.push('Bulbasaur')
pokemon.push('Metapod')
pokemon.push('Weedle')

'Good Array Code ✅'

// Push 
pokemon = [...pokemon, 'Bulbasaur', 'Metapod', 'Weedle']

// Unshift
pokemon = ['Bulbasaur', 'Metapod', 'Weedle', ...pokemon]

// Splice
pokemon = ['Bulbasaur', ...pokemon, 'Metapod', 'Weedle', ]