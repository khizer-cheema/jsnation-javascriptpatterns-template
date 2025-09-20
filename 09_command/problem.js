// Both below functions expect a command object with { action, account, amount }.
function deductFunds(command) {
  console.log(`Deducting ${command.amount} from account ${command.account}`);
}

function creditFunds(command) {
  console.log(`Crediting ${command.amount} to account ${command.account}`);
}
// command.action(command)
// e.g. deductFunds({ action: deductFunds, account: "12345", amount: 100 });

function executeTransaction(commands) {
  console.log("Starting transaction");
  try {
    commands.forEach((command) => command.action(command));
    console.log("Transaction committed successfully");
  } catch (error) {
    console.log("Transaction failed, rolling back");
    rollbackTransaction(commands);
    throw error;
  }
}
/**
 *
 * @param {*} commands.reverse()
 * Reverses the order of commands in the array.
 *Why? Because rollback should happen in the opposite order of execution.
 *👉 Example:
 *If we did:
 *Deduct funds from Account A
 *Credit Credit funds to Account B
 *On rollback, we must undo step 2 first, then step 1.
 *This ensures the system goes back to the exact original state.
 */
function rollbackTransaction(commands) {
  commands.reverse().forEach((command) => undoCommand(command));
  console.log("Transaction rolled back");
}

function undoCommand(command) {
  if (command.action === deductFunds) {
    console.log(
      `Undoing deduction of ${command.amount} from account ${command.account}`
    );
  } else if (command.action === creditFunds) {
    console.log(
      `Undoing credit of ${command.amount} to account ${command.account}`
    );
  }
}

// Example usage
const commands = [
  { action: deductFunds, account: "12345", amount: 100 },
  { action: creditFunds, account: "67890", amount: 100 },
];

executeTransaction(commands);
