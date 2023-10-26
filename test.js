
let value= 660
let second = value % 60;
let minute = Math.floor(value / 60);
second = second < 10 ? '0' + second : second; 

console.log(`${minute}:${second}`) ;

