//Base class for bank accounts
function Account(accountNumber, balance) {
  this.accountNumber = accountNumber;
  this.balance = balance;
}

//deposite method to add amount to the balance
Account.prototype.deposit = function (amount) {
  if (amount > 0) {
    this.balance += amount;
    console.log(`Deposited: ${amount}. New balance: ${this.balance}`);
  } else {
    console.log("Deposit amount must be positive.");
  }
};

//withdraw method to subtract amount from the balance
Account.prototype.withdraw = function (amount) {
  if (amount > 0 && amount <= this.balance) {
    this.balance -= amount;
    console.log(`Withdrawn: ${amount}. New balance: ${this.balance}`);
  } else {
    console.log("Insufficient funds or invalid withdrawal amount.");
  }
};

//get balance method to return the current balance
Account.prototype.getBalance = function () {
  return this.balance;
};

//savings account
function SavingsAccount(accountNumber, balance, interestRate) {
  Account.call(this, accountNumber, balance);
  this.interestRate = interestRate;
}

SavingsAccount.prototype = Object.create(Account.prototype);
SavingsAccount.prototype.constructor = SavingsAccount;

SavingsAccount.prototype.addInterest = function () {
  const interest = this.balance * (this.interestRate / 100);
  this.balance += interest;
  console.log(`Interest added: ${interest}. New balance: ${this.balance}`);
};

// Current account
function CurrentAccount(accountNumber, balance, overdraftLimit) {
  Account.call(this, accountNumber, balance);
  this.overdraftLimit = overdraftLimit;
}

CurrentAccount.prototype = Object.create(Account.prototype);
CurrentAccount.prototype.constructor = CurrentAccount;

CurrentAccount.prototype.withdraw = function (amount) {
  if (amount > 0 && amount <= this.balance + this.overdraftLimit) {
    this.balance -= amount;

    if (this.balance < -this.overdraftLimit) {
      console.log("Overdraft limit exceeded!");
      this.balance += amount; // نرجع الفلوس لو عدى الحد
    } else {
      console.log(`Withdrawn: ${amount}. New balance: ${this.balance}`);
    }
  } else {
    console.log("Invalid amount or exceeds overdraft limit.");
  }
};

// Demonstration of the classes
console.log("===== Savings Account =====");
const savings = new SavingsAccount(101, 1000, 5);
savings.deposit(500);
savings.withdraw(300);
savings.addInterest();
console.log("Final Balance:", savings.getBalance());

console.log("===== Current Account =====");
const current = new CurrentAccount(202, 500, 300);
current.deposit(200);
current.withdraw(700);
current.withdraw(200);
console.log("Final Balance:", current.getBalance());
