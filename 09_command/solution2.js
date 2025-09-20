// Command factory
const createCommand = (execute, undo) => ({ execute, undo });

// Specialized commands
const createCreditFundsCommand = (account, amount) =>
  createCommand(
    () => console.log(`Crediting ${amount} to account ${account}`),
    () => console.log(`Undoing credit of ${amount} to account ${account}`)
  );

const createDeductFundsCommand = (account, amount) =>
  createCommand(
    () => console.log(`Deducting ${amount} from account ${account}`),
    () => console.log(`Undoing deduction of ${amount} from account ${account}`)
  );

// Transaction manager
const createTransactionManager = () => {
  let commands = [];

  const addCommand = (command) => {
    commands.push(command);
  };

  const executeTransaction = () => {
    console.log("Starting transaction...");
    try {
      commands.forEach((command) => command.execute()); // 🔥 executes logs
      console.log("Transaction committed successfully.");
    } catch (error) {
      console.log("Transaction failed, rolling back...");
      rollbackTransaction();
      throw error;
    }
  };

  const rollbackTransaction = () => {
    commands
      .slice()
      .reverse()
      .forEach((command) => command.undo()); // 🔄 reverse undo
    console.log("Transaction rolled back.");
  };

  return { addCommand, executeTransaction, rollbackTransaction };
};

// Client code
const transactionManager = createTransactionManager();

transactionManager.addCommand(createCreditFundsCommand("1234", 100));
transactionManager.addCommand(createDeductFundsCommand("4321", 200));

transactionManager.executeTransaction();
