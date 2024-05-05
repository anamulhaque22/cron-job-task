# Node.js Internship Task

Welcome to the Node.js internship task! This task is designed to showcase my skills as a Node.js developer. Below, you'll find instructions on how to use the app, the API endpoint list, setup instructions, and how to run the app in development mode.

## How to Use the App

1. **Install Dependencies**: Ensure you have Node.js installed on your machine, then install project dependencies using npm or yarn:

```bash
npm i
or
yarn
```

2. **Set Up Environment Variables**: Create a `.env` file in the root directory and add the following variables:
   PORT=8080
   DB_HOST=localhost
   DB_PORT=3306
   DB_USER=root
   DB_PASS=password
   DB_NAME=cron_job_task

## API Endpoint List

All API endpoints start from `http://localhost:PORT/api/v1`.

1. **Add Product**

-   Endpoint: `/product`
-   Method: POST
-   Request Body:
    ```json
    {
        "name": "Iphone",
        "price": 222,
        "description": "lorem",
        "quantity": 10
    }
    ```

2. **Get All Products**

-   Endpoint: `/product`
-   Method: GET

3. **Get a Single Product**

-   Endpoint: `/product/:id`
-   Method: GET

4. **Update Product**

-   Endpoint: `/product/:id`
-   Method: PUT
-   Request Body:
    ```json
    {
        "name": "Iphone",
        "price": 222,
        "description": "lorem",
        "quantity": 10
    }
    ```

5. **Delete Product**

-   Endpoint: `/product/:id`
-   Method: DELETE

## Running the App in Development Mode

To run the app in development mode, use the following command:

```bash
npm run start:dev
or
yarn run start:dev
```
