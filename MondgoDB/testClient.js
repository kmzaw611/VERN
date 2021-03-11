/*
 * Now using Postman to test server requests 
 * Can ignore this stuff for now
 */


const readline = require('readline');
const http = require('http');

const rl = readline.createInterface({
    input : process.stdin,
    output : process.stdout
});

const options = {
    host: 'localhost',
    path: '/',
    port: '3000',
    method: 'POST'
};

callback = function (response) {
    

}

/*
let num1 = Math.floor(Math.random() * 10) + 1;
let num2 = Math.floor(Math.random() * 10) + 1;
let answer = num1 + num2;

rl.question('What is ' + num1 + ' + ' + num2 + '?', (userInput)=>{
    if (userInput.trim() == answer) {
        rl.close();
    }
    else {
        rl.setPrompt('Incorrect response please try again\n');
        rl.prompt();
        rl.on('line',(userInput)=>{
            if (userInput.trim() == answer)
                rl.close();
            else {
                rl.setPrompt('Your answer of ' + userInput + ' is incorrect');
                rl.prompt();
            }
        });
    }
});

rl.on('close', ()=>{
    console.log('Correct!!!');
});
*/

