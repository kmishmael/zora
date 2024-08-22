## API ROUTES

### Prerequisites
To run this section of the project, you need to have the following installed in your machine:
 - Python
 - Mysql

First we need to install the dependencies. I recommend that you use a virtual environment for this.
Let's do the installation in the `api-gateway` folder:

```bash
pip install -r requirements.txt
```

Once that is done, now let's create our database. Use mysql cli tool to create the database. Name it as you prefer. I recommend naming it `zora` but that's entirely up to you.
login to mysql using cli tool

```bash
mysql -u YOUR_USERNAME_HERE -p
```
replace your username with the appropriate one and you'll be prompted to input the password. Once you are in, create the database. Run this SQL command to create it
```sql
CREATE DATABASE zora;
```
once you are done, now lets add the environment variables. In the folder `api-gateway`, create a file called `.env` and it will have the following data:
```bash
DATABASE_USER=YOUR_USERNAME
DATABASE_PASSWORD=YOUR_PASSWORD
DATABASE_HOST=127.0.0.1:3306
DATABASE_NAME=zora
```
replace the values appropriately in line with your installation.

Finally, we can now run the project. To run it use the command
```bash
flask run
```

It should now start the server running on port, mostly `5000`

> Some routes are missing from here, check the code for all routes. Also, the routes are not secured. Please do that if you wish to use this code anywhere.
### User Routes
- GET /users: Retrieve a list of all users.
- GET /users/{id}: Retrieve details of a specific user.
- POST /users: Create a new user.
- PUT /users/{id}: Update details of an existing user.
- DELETE /users/{id}: Delete a user.

### Product Routes
- GET /products: Retrieve a list of all products.
- GET /products/{id}: Retrieve details of a specific product.
- POST /products: Create a new product.
- PUT /products/{id}: Update details of an existing product.
- DELETE /products/{id}: Delete a product.

### Product Image Routes
- GET /products/{product_id}/images: Retrieve images for a specific product.
- POST /products/{product_id}/images: Upload an image for a product.
- DELETE /products/{product_id}/images/{image_id}: Delete an image for a product.

### Branch Routes
- GET /branches: Retrieve a list of all branches.
- GET /branches/{id}: Retrieve details of a specific branch.
- POST /branches: Create a new branch.
- PUT /branches/{id}: Update details of an existing branch.
- DELETE /branches/{id}: Delete a branch.

### Category Routes
- GET /categories: Retrieve a list of all categories.
- GET /categories/{id}: Retrieve details of a specific category.
- POST /categories: Create a new category.
- PUT /categories/{id}: Update details of an existing category.
- DELETE /categories/{id}: Delete a category.

### Incentive Routes
- GET /incentives: Retrieve a list of all incentives.
- GET /incentives/{id}: Retrieve details of a specific incentive.
- POST /incentives: Create a new incentive.
- PUT /incentives/{id}: Update details of an existing incentive.
- DELETE /incentives/{id}: Delete an incentive.

### Feedback Routes
- GET /feedback: Retrieve a list of all feedback.
- GET /feedback/{id}: Retrieve details of a specific feedback.
- POST /sales/{sale_id}/feedback: Create feedback for a specific sale.
- PUT /feedback/{id}: Update feedback details.
- DELETE /feedback/{id}: Delete feedback.

### Commission Routes
- GET /commissions: Retrieve a list of all commissions.
- GET /commissions/{id}: Retrieve details of a specific commission.
- POST /commissions: Create a new commission.
- PUT /commissions/{id}: Update details of an existing commission.
- DELETE /commissions/{id}: Delete a commission.

### Sale Routes
- GET /sales: Retrieve a list of all sales.
- GET /sales/{id}: Retrieve details of a specific sale.
- POST /sales: Create a new sale.
- PUT /sales/{id}: Update details of an existing sale.
- DELETE /sales/{id}: Delete a sale.

### Performance Goal Routes
- GET /performance-goals: Retrieve a list of all performance goals.
- GET /performance-goals/{id}: Retrieve details of a specific performance goal.
- POST /performance-goals: Create a new performance goal.
- PUT /performance-goals/{id}: Update details of an existing performance goal.
- DELETE /performance-goals/{id}: Delete a performance goal.

### Audit Log Routes
- GET /audit-logs: Retrieve a list of all audit logs.
- GET /audit-logs/{id}: Retrieve details of a specific audit log.
- POST /audit-logs: Create a new audit log.
- DELETE /audit-logs/{id}: Delete an audit log.
