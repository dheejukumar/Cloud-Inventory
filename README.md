📦 Cloud-Based Inventory Management System (Serverless)

A serverless inventory management web application designed for local retailers and small businesses to track stock levels, manage products, and receive real-time low-stock alerts using AWS cloud services.
📦 Cloud-Based Inventory Management System (Serverless)

A serverless inventory management web application designed for local retailers and small businesses to track stock levels, manage products, and receive real-time low-stock alerts using AWS cloud services.
🛠️ Tech Stack
Frontend

HTML5

CSS3

JavaScript (Vanilla JS)

Hosted on Amazon S3 (Static Website Hosting)

Backend (Serverless)

AWS Lambda (Python 3.11)

Amazon API Gateway (REST API)

Database & Messaging

Amazon DynamoDB – Inventory storage

DynamoDB Streams – Detect stock changes

Amazon SNS – Low-stock email/SMS alerts

Monitoring & Security

AWS IAM – Least-privilege access control

✨ Features
📊 Inventory Dashboard

View all products in real time

Displays quantity, threshold, and last updated time

Auto-refresh after updates

➕ Product Management

Add new products with:

Product ID

Product Name

Quantity

Threshold level

Stored securely in DynamoDB

🛒 Order Processing

Place orders directly from the UI

Quantity automatically reduced in database

Prevents ordering more than available stock

🚨 Low Stock Alerts

Automatically triggers when:

old_quantity >= threshold AND new_quantity < threshold


Notifications sent via Amazon SNS

Works even if stock is updated outside the UI (DynamoDB console, API)

🔄 Event-Driven Architecture

DynamoDB Stream → Lambda → SNS

No polling, no cron jobs

⚡ Fully Serverless

No servers to manage

Scales automatically

Pay only for usage

🧩 Architecture Overview

User interacts with Frontend (S3-hosted website)

UI calls API Gateway

API Gateway triggers Lambda functions

Lambda performs:

CRUD operations on DynamoDB

Order processing

DynamoDB Streams detect changes

Stream Lambda checks threshold logic

SNS sends low-stock alerts

Add Product:

User fills product form

Frontend sends POST request to /products

Lambda stores item in DynamoDB

Product appears instantly on dashboard

Place Order:

User places order from UI

Backend reduces quantity atomically

DynamoDB Streams capture the update

Stream Lambda evaluates threshold

SNS sends alert if stock is low

📈 Benefits

✅ No server maintenance

✅ Real-time inventory tracking

✅ Automatic notifications

✅ Highly scalable

✅ Secure by design (IAM roles)

✅ Production-grade cloud architecture

🧪 APIs Used
Method	Endpoint	Description
GET	/products	Fetch all inventory items
POST	/products	Add a new product
POST	/inventory-order	Place an order & reduce stock

🔐 Security & Best Practices

Separate IAM roles for:

Inventory CRUD Lambda

Order Lambda

Stream/SNS Lambda

Principle of Least Privilege

CORS-enabled APIs

CloudWatch logging enabled

🧠 What I Learned

Designing event-driven architectures

Handling frontend–backend data contracts

Using DynamoDB Streams effectively

Debugging real-world CORS & API Gateway issues

Building production-ready serverless systems
Amazon CloudWatch – Logs & monitoring

