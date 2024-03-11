// To build a slot machine steps:
// 1: How much money the user will deposit?
// 2: No. of lines the user wants to bet on (1, 2 or 3 lines)
// 3: Collect the bet amount.
// 4: Spin the slot machine.
// 5: Check if the user won.
// 6: If won, give the user their winnings.
// 7: Play again or not depending on the amount of money the user has left.
const prompt = require('prompt-sync')();

const depsoit = () => {
  while(true){
    const depsoit_amount = prompt("Enter a deposit amount: ");
    const numberDepositAmount = parseFloat(depsoit_amount);

    if(isNaN(numberDepositAmount) || numberDepositAmount <= 0){
      console.log("Invalid Deposit, try again")
    }else{
      return numberDepositAmount;
    }

  }
};

const getNumberOfLines = () => {
  while(true){
      const lines= prompt("Enter the number of lines to bet on(1-3): ");
      const numberOfLines = parseFloat(lines);

      if(isNaN(numberOfLines) || numberOfLines <= 0 || numberOfLines > 3){
        console.log("Invalid Deposit, try again")
      }else{
        return numberOfLines;
      }

    }
};

const getBet = (balance, lines) => {
  while(true){
        const bet = prompt("Enter the bet amount per line: ");
        const numberBetAmount = parseFloat(bet);

        if(isNaN(numberBetAmount) || numberBetAmount <= 0 || numberBetAmount > balance/lines){
          console.log("Invalid Bet, try again")
        }else{
          return numberBetAmount;
        }

      }

};

let balance = depsoit();
const numberOfLines = getNumberOfLines();
const bet = getBet(balance, numberOfLines);
