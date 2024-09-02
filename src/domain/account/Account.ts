export default class Account {
  id: string;
  balance: number;
  userId: string;

  constructor(id: string, balance: number, userId: string) {
    this.id = id;
    this.balance = balance;
    this.userId = userId;
  }

  increaseBalance(amount: number): void {
    this.balance += amount;
  }

  decreaseBalance(amount: number): void {
    this.balance -= amount;
  }

  isAccountEligibleForTransfer(amount: number): boolean {
    if ((this.balance - amount) > 0) {
      return true;
    }

    return false;
  }
}
