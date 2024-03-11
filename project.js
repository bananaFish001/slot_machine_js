// To build a slot machine steps:
// 1: How much money the user will deposit?
// 2: No. of lines the user wants to bet on (1, 2 or 3 lines)
// 3: Collect the bet amount.
// 4: Spin the slot machine.
// 5: Check if the user won.
// 6: If won, give the user their winnings.

const PromptSync = require('prompt-sync');

// 7: Play again or not depending on the amount of money the user has left.
const prompt = require('prompt-sync')();


const COLS = 3;
const ROWS = 3;

const SYMBOLS_COUNT = {
  "A": 2,
  "B": 4,
  "C": 6,
  "D": 8
}

const SYMBOLS_VALUES = {
  "A": 5,
  "B": 4,
  "C": 3,
  "D": 2
}



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

const spin = () => {
  const symbols = [];
  for(const [symbol, count] of Object.entries(SYMBOLS_COUNT)){
    for(let i = 0; i < count; i++){
      symbols.push(symbol);
    }
  }
  const reels = [];
  for(let i = 0; i < COLS; i++){
    reels.push([])
    const reelSymbols = [...symbols];
    for(let j = 0; j < ROWS; j++){
      const randomIndex = Math.floor(Math.random() * reelSymbols.length)
      const selectedSymbol = reelSymbols[randomIndex];
      reels[i].push(selectedSymbol);
      reelSymbols.splice(randomIndex, 1);
    }
  }
  return reels;
};

const transpose = (reels) => {
  const rows = [];
  for(let i = 0; i < ROWS; i++){
    rows.push([]);
    for(let j = 0; j < COLS; j++){
      rows[i].push(reels[j][i]);
    }
  }
  return rows;
};

const printRows = (transposedMatrix) =>{
  for(const row of transposedMatrix){
    let rowString = "";
    for(const[i, symbol] of row.entries()){
      rowString += symbol;
      if(i != row.length - 1){
        rowString += " | "
      }
    }
    console.log(rowString);
  }
};

const getWinnings = (bet, lines, transposedMatrix) => {
  let winnings = 0;
  for(let row = 0; row < lines; row++){
    const symbols = transposedMatrix[row];
    let allSame = true;

    for(const symbol of symbols){
      if(symbol != symbols[0]){
        allSame = false;
        break;
      }
    }
    if(allSame){
      winnings += bet * SYMBOLS_VALUES[symbols[0]];
    }
  }
  return winnings;
};

const game = () => {
  let balance = depsoit();
  
  while(true){
    console.log(`You have net balance of ${balance}`)
    const lines = getNumberOfLines();
    const bet = getBet(balance, lines);
    balance -= bet*lines;
    const reels = spin();
    console.log(reels);

    const transposedMatrix = transpose(reels);
    console.log(transposedMatrix);

    printRows(transposedMatrix);

    const winnings = getWinnings(bet, lines, transposedMatrix);
    balance += winnings;
    console.log(`You won, ${winnings}`);

    if(balance <= 0){
      console.log(`You ran out of money.`);
      break;
    }

    const playAgain = prompt("Do you want to play again (y/n)?");
    if(playAgain != "y") break;
  }
}

game();






