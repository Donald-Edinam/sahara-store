# AfriMart E-commerce Backend

This is the backend service for the AfriMart e-commerce platform. It provides RESTful APIs for managing users, products, carts, and orders. The project is built using Node.js, Express, and MongoDB.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
  - [Authentication](#authentication)
  - [User Management](#user-management)
  - [Product Management](#product-management)
  - [Cart Management](#cart-management)
  - [Order Management](#order-management)
- [Contributing](#contributing)
- [License](#license)


## Installation

1. **Clone the repository:**

    ```bash
    git clone https://github.com/yourusername/afrimart-backend.git
    cd afrimart-backend
    ```

2. **Install dependencies:**

    ```bash
    npm install
    ```

3. **Start the server:**

    ```bash
    npm start
    ```

## API Endpoints

### Authentication

- **Register a new user**

    ```http
    POST /auth/register
    ```

    - **Request Body:**
    
      ```json
      {
        "name": "John Doe", // Optional
        "email": "johndoe@example.com",
        "password": "yourpassword",
        "phone": "yourphone",
        "role": "Customer" // or "Admin", "Seller"   Optional
      }
      ```

- **Login a user**

    ```http
    POST /auth/login
    ```

    - **Request Body:**
    
      ```json
      {
        "email": "johndoe@example.com",
        "password": "yourpassword"
      }
      ```


### Products

- **Get all products**

    ```http
    GET /api/products
    ```

- **Create a new product (Admin/Seller only)**

    ```http
    POST /api/products
    ```

    - **Request Body:**
    
      ```json
      {
        "name": "Product Name",
        "price": 99.99,
        "description": "Product description",
        "category": "Category Name",
        "stock": 100,
        "tags": ["tag1", "tag2"],  // Optional
        "imageUrl": "Linktourl"
      }
      ```

- **Get a single product by ID**

    ```http
    GET /api/products/:id
    ```

### Cart

- **Get the user's cart**

    ```http
    GET /api/carts
    ```

    - **Description:**
        - Fetch the cart associated with the authenticated user.
    
    - **Headers:**
    
      ```json
      {
        "Authorization": "Bearer <your_token_here>"
      }
      ```

    - **Response:**
    
      ```json
      {
        "_id": "Cart ObjectId",
        "userId": "User ObjectId",
        "products": [
          {
            "productId": {
              "_id": "Product ObjectId",
              "name": "Product Name",
              "price": 99.99
            },
            "quantity": 2
          }
        ]
      }
      ```

- **Add a product to the cart**

    ```http
    POST /api/carts
    ```

    - **Description:**
        - Add a product to the authenticated user's cart. If the cart does not exist, it will be created.
    
    - **Headers:**
    
      ```json
      {
        "Authorization": "Bearer <your_token_here>"
      }
      ```

    - **Request Body:**
    
      ```json
      {
        "productId": "Product ObjectId",
        "quantity": 2
      }
      ```

    - **Response:**
    
      ```json
      {
        "_id": "Cart ObjectId",
        "userId": "User ObjectId",
        "products": [
          {
            "productId": "Product ObjectId",
            "quantity": 2
          }
        ]
      }
      ```

- **Update the quantity of a product in the cart**

    ```http
    PUT /api/carts
    ```

    - **Description:**
        - Update the quantity of a specific product in the user's cart.
    
    - **Headers:**
    
      ```json
      {
        "Authorization": "Bearer <your_token_here>"
      }
      ```

    - **Request Body:**
    
      ```json
      {
        "productId": "Product ObjectId",
        "quantity": 3
      }
      ```

    - **Response:**
    
      ```json
      {
        "_id": "Cart ObjectId",
        "userId": "User ObjectId",
        "products": [
          {
            "productId": "Product ObjectId",
            "quantity": 3
          }
        ]
      }
      ```

- **Remove a product from the cart**

    ```http
    DELETE /api/carts
    ```

    - **Description:**
        - Remove a product from the user's cart.
    
    - **Headers:**
    
      ```json
      {
        "Authorization": "Bearer <your_token_here>"
      }
      ```

    - **Request Body:**
    
      ```json
      {
        "productId": "Product ObjectId"
      }
      ```

    - **Response:**
    
      ```json
      {
        "_id": "Cart ObjectId",
        "userId": "User ObjectId",
        "products": []
      }
      ```

    - **Note:**
        - If the cart becomes empty after removing the product, the `products` array will be empty.