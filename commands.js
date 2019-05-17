const fs = require('fs');

//write out data
function done(output) {
  process.stdout.write(output);
  process.stdout.write('\nprompt > ');
}

//handle error if input is not a valid command within the command library.
function errorHandler(input){
    process.stdout.write(input + "is not a valid command within the command library. Please try a valid command.");
}

function evaluateCmd(userInput) {
  //parses the user input to understand which command was typed
  const userInputArray = userInput.split(' ');
  const command = userInputArray[0];

  switch (command) {
    case 'echo':
    //we will add the functionality of the echo within the object commandLibrary
      commandLibrary.echo(userInputArray.slice(1).join(' '));
      break;
    case 'cat':
      commandLibrary.cat(userInputArray.slice(1));
      break;
    case "head":
      commandLibrary.head(userInputArray.slice(1));
      break;
    case "tail":
      commandLibrary.tail(userInputArray.slice(1));
      break;
    default:errorHandler;
  }
}
//where we will store the logic of our commands
const commandLibrary = {
 //the echo command
  'echo': function(userInput) {
    done(userInput);
  },
  //the cat command
  'cat': function(fullPath) {
    const fileName = fullPath[0];
    fs.readFile(fileName, (err, data) => {
      if (err) throw err;
      done(data);
    });
  },
  //the head command
  'head': function(fullPath) {
    const fileName = fullPath[0];
        fs.readFile(fileName, (err, data) => {
          if (err) throw err;
            let newArray = data.toString().split("\n");
            let numLines = newArray.slice(0, 5).join("\n");
            done(numLines);
        });
  },
  //the tail command
  'tail': function(fullPath) {
    const fileName = fullPath[0];
    fs.readFile(fileName, (err, data) => {
      if (err) throw err;
        let newArray = data.toString().split("\n");
        let numLines = newArray.slice(-3).join("\n");
        done(numLines);
    });
  }

};

module.exports.commandLibrary = commandLibrary;
module.exports.evaluateCmd = evaluateCmd;
