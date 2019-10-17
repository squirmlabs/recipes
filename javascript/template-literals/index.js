
const horse = {
  name: 'Topher',
  same: 'Large',
  skills: ['jousting', 'racing'],
  age: 7
};

function horseAge(str, age) {
  const ageStr = age > 5 ? 'old' : 'young';
  return `${str[0]}${ageStr} at ${age} years`;
}

// Advanced Tag
const bio2 = horseAge`This horse is ${horse.age}`;

console.log('bio2', bio2);
