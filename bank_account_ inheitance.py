# Objective:
# Create a base class BankAccount and subclasses SavingsAccount with their own features.

# Requirements:

# BankAccount has:
# Attributes: account_holder, balance
# Methods: deposit(amount)

# SavingsAccount:
# Extra method: add_interest(), which adds 5% interest to balance.

class BankAccount:
    def __init__(self,account_holder,balance):
        self.account_holder = account_holder
        self.balance =  balance
    def deposit(self,amount):
        self.balance+= amount
        print(f"deposited amount is {amount}")
    def display(self):
        print(f"{self.account_holder} balance is{self.balance} ") 
class SavingsAccount(BankAccount):
    def add_interest(self):
        self.interest = (5/100)*self.balance
        self.balance =  self.balance + self.interest 

    def display_savings(self) : 
            
         print(f"The balance is { self.balance - self.interest} after adding intrest {self.account_holder} account  balance is {self.balance}")


accountsave =SavingsAccount("sanjay",3000)

  

accountsave.add_interest()
accountsave.display_savings()

        

            