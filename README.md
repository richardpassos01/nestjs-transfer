# What Was Done

This is a simple test to evaluate the architecture in NestJS. It is a basic version and there is room for significant improvement. Some tests might not use the best approaches.

## Steps to Run the Application

1. Configure the `.env` file with the correct values (use the `.env-example` as a base).

2. Run the following commands:
   - `npm run migration:up`
   - `npm run seed:run`
   - `npm start`

3. Next, make a request:
   - **POST**: `http://localhost:5050/create-transfer/1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed`
   - **BODY**:
     ```json
     {
         "sourceAccountId": "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d",
         "destinationAccountId": "2",
         "amount": 1
     }
     ```

4. You can then verify the data using an SQLite viewer.

## Necessary Improvements:

- **Enhance Integration Test Setup**: Explore more efficient methods for setting up integration tests in Jest.
- **Rename and Refactor**: Consider renaming "transfer" to "transactions".
- **Improve Error Handling**: Implement more robust error handling for the adapter response, which is currently untested.
- **Define Output Schema**: Develop a schema for the output to standardize responses.
- **Fix input Schema**: Fix input schema to receive positive values only.
- **Add Docker Compose Configuration**: Create a Docker Compose setup for both test and local environments, utilize `.env` with Jest, and move away from SQLite.
- **Conduct Code Review**: Perform a thorough code analysis and refactor where necessary. The current implementation was a quick weekend project and could benefit from further improvements.
