# List of bugs:

- **B-1: Error message during login process (Incorrect "Username") shows error messages with actual credentials (For both "Username" and "Password" fields).**  
   Steps to reproduce:

  1.  Open http://localhost:4000/login
  2.  Fill "Username" field with "admin" value
  3.  Click on "Login" button
  4.  Observe error message: "You must provide a username (test) to log in"  
      **_Expected Result: Error message should inform about incorrect credentials without any hints about actual login or password. Example: "Login/password are incorrect"_**

- **B-2: Error message during login process (Incorrect "Password") shows error messages with actual credentials (For both "Username" and "Password" fields).**  
   Steps to reproduce:

  1.  Open http://localhost:4000/login
  2.  Fill "Username" field with "admin" value
  3.  Leave "Password" field empty
  4.  Click on "Login" button
  5.  Observe error message: "You must provide a password (test) to log in"  
      **_Expected Result: Error message should inform about incorrect credentials without any hints about actual login or password. Example: "Login/password are incorrect"_**

- **B-3: Error message during login process (Empty "Username", "Password" fields) shows error messages with actual credentials (For both "Username" and "Password" fields).**  
   Steps to reproduce:

  1.  Open http://localhost:4000/login
  2.  Fill "Username" field with "admin" value (incorrect)
  3.  Fill "Username" field with "admin" value (incorrect)
  4.  Click on "Login" button
  5.  Observe error message: "Invalid credentials. Username: test, Password: test"  
      **_Expected Result: Error message should inform about incorrect credentials without any hints about actual login or password. Example: "Login/password are incorrect"_**

- **B-4: Upon creation of contact with empty avatar field, created contact will have broken default image.**  
   Steps to reproduce:
  1.  Open http://localhost:4000/login
  2.  Login with correct credentials
  3.  Create contact without filling "Avatar URL" field
  4.  Observe broken image for created contact  
      **_Expected Result: Application should have default image placeholder._**
- **B-5: No mandatory fields is needed for contact creation.**  
   Steps to reproduce:

  1.  Open http://localhost:4000/login
  2.  Login with correct credentials
  3.  Click on "New" button
  4.  Leave all fields on contact from empty
  5.  Click on "Save"
  6.  Observe empty contact item added to the list  
      **_Expected Result: There is no point in creation such empty contact records, at least First and Last name fields should be required._**

- **B-6: Creation of empty contact by only clicking on "New" button.**  
   Steps to reproduce:

  1.  Open http://localhost:4000/login
  2.  Login with correct credentials
  3.  Click on "New" button
  4.  Click on "New" button again, once empty new contact form is loaded
  5.  Observe empty contact item added to the list
  6.  Repeat steps 4-5 for several times more
  7.  Observe bunch of new empty contact added to the list  
      **_Expected Result: Reoccurring clicks "New" button during active form for contact creation should not result in creation of new contact_**

- **B-7: It's possible to add exactly the same contact**  
   Steps to reproduce:
  1.  Open http://localhost:4000/login
  2.  Login with correct credentials
  3.  Click on "New" button
  4.  Fill all fields on contact from with "user_data"
  5.  Click on "Save"
  6.  Observe new contact item added to the list
  7.  Repeat steps 3-6
  8.  Observe two identical contacts presents in the contact list  
      **_Expected Result: Application should verify if contact with required field is already present in the system, unless requirements allow this_**
- **B-8: Notes text area should trim spaces and new line characters upon save**  
   Steps to reproduce:

  1.  Open http://localhost:4000/login
  2.  Login with correct credentials
  3.  Click on "New" button
  4.  Fill all fields on contact from except "Notes" with correct values
  5.  Fill "Notes" field with "

  Lorem ipsum dolor "  
  6. Click on "Save"  
  7. Observe new contact item and how "Notes" field value is displayed  
  **_Expected Result: Spaces and new line characters should not be saved at the beginning, or the end of the "Notes" values_**

- **B-9: It's possible to "copy" contact by combining behavior of "Edit" and "New" buttons**  
   Steps to reproduce:

  1.  Open http://localhost:4000/login
  2.  Login with correct credentials
  3.  Click on "New" button
  4.  Fill all fields on contact from with "user_data"
  5.  Click on "New" button
  6.  Observe that fields are not cleared
  7.  Click on "Save" button
  8.  Observe two identical contacts presents in the contact list  
      **_Expected Result: Application should clear any prefilled field, or close current from and open new one if user stars procedure of creating brand new contact._**
