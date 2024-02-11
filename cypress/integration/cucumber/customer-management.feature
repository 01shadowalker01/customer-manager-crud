Feature: Customer Management

        Scenario: Manage a customer
            Given I am on the "New Customer" page
             When I create a new customer with the following details
                  | Firstname | Lastname | DateOfBirth | PhoneNumber   | Email                | BankAccountNumber |
                  | John      | Doe      | 1990-01-01  | +989193456789 | john.doe@example.com | 12345678          |
             Then I should see "Customer created"
              And I should see the following customer details
                  | Firstname | Lastname | DateOfBirth | PhoneNumber   | Email                | BankAccountNumber |
                  | John      | Doe      | Jan 1, 1990 | +989193456789 | john.doe@example.com | 12345678          |
             When I visit the "New Customer" page
              And I create a new customer with the following details
                  | Firstname | Lastname | DateOfBirth | PhoneNumber   | Email                | BankAccountNumber |
                  | John      | Doe      | 1990-01-01  | +989193456789 | john.doe@example.com | 12345678          |
             Then I should see "Customer with this information already exists"
             When I go back to "Customer List" page
              And I update the customer "John Doe" with the following details
                  | Firstname | Lastname | DateOfBirth | PhoneNumber   | Email                | BankAccountNumber |
                  | Jane      | Doe      | 1990-01-01  | +989198765432 | jane.doe@example.com | 87654321          |
             Then I should see "Customer updated"
              And I should see the following customer details
                  | Firstname | Lastname | DateOfBirth | PhoneNumber   | Email                | BankAccountNumber |
                  | Jane      | Doe      | Jan 1, 1990 | +989198765432 | jane.doe@example.com | 87654321          |
             When I delete the customer "Jane Doe"
             Then I should see "Customer deleted"
              And I should not see customer with "jane.doe@example.com" email