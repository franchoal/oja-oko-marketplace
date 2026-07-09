# Oja-Oko Marketplace

# Product Bible

**Version:** 1.0

**Status:** Approved

**Last Updated:** July 8, 2026

---

# 1. Product Overview

Oja-Oko Marketplace is a digital agricultural marketplace that connects farmers directly with buyers through a secure, scalable and user-friendly platform.

The marketplace enables farmers to showcase agricultural products while enabling buyers to discover, compare and purchase products directly from verified farmers.

The platform serves as the digital bridge between agricultural producers and consumers.

---

# 2. Product Goals

The platform aims to:

- Connect farmers directly with buyers.
- Reduce dependence on middlemen.
- Improve product visibility.
- Improve agricultural commerce.
- Increase farmer income.
- Improve buyer confidence.
- Encourage transparent pricing.
- Support nationwide agricultural trade.

---

# 3. User Roles

The platform has three major users.

## Farmer

A farmer can:

- Register
- Login
- Manage profile
- Add products
- Edit products
- Delete products
- View own products
- Receive orders
- Accept or reject orders
- Track orders
- Receive payment notifications

---

## Buyer

A buyer can:

- Register
- Login
- Manage profile
- Browse products
- Search products
- Filter products
- View product details
- Save favourite products
- Add products to cart
- Place orders
- Make payments
- Track orders
- Review completed purchases

---

## Administrator

Administrators manage the entire platform.

Responsibilities include:

- User management
- Product moderation
- Category management
- Order monitoring
- Payment monitoring
- Delivery monitoring
- Analytics
- Reports
- System configuration

---

# 4. Authentication Module

Features include:

- Registration
- Login
- Logout
- Password Reset
- Email Verification
- JWT Authentication

---

# 5. Farmer Profile

Each farmer profile contains:

- Full Name
- Email
- Phone Number
- Location
- Profile Photo
- Farm Name
- Farm Description
- Verification Status

---

# 6. Buyer Profile

Each buyer profile contains:

- Full Name
- Email
- Phone Number
- Delivery Addresses
- Favourite Products
- Order History

---

# 7. Categories

Products are grouped into categories.

Examples include:

- Vegetables
- Fruits
- Tubers
- Grains
- Livestock
- Poultry
- Seafood
- Spices
- Dairy
- Others

Categories are managed by administrators.

---

# 8. Product Management

Each product contains:

- Product Name
- Category
- Description
- Price
- Quantity Available
- Measurement Unit
- Product Image
- Availability Status
- Farmer
- Date Created
- Last Updated

Farmers can:

- Create products
- Update products
- Delete products
- View their products

Buyers can:

- View products
- Search products
- Filter by category
- View product details

---

# 9. Search

Buyers can search using:

- Product Name
- Category
- Farmer
- Keywords

---

# 10. Shopping Cart

Buyers can:

- Add items
- Remove items
- Update quantities
- View totals

---

# 11. Orders

# Orders

## Order

Represents a buyer's purchase after checkout.

| Field | Type | Notes |
|--------|------|-------|
| id | BigAutoField | Primary Key |
| buyer | ForeignKey(User) | Buyer who placed order |
| status | CharField | Order lifecycle status |
| created_at | DateTimeField | |
| updated_at | DateTimeField | |

---

## OrderItem

Represents products contained in an order.

| Field | Type | Notes |
|--------|------|-------|
| id | BigAutoField | Primary Key |
| order | ForeignKey(Order) | |
| product | ForeignKey(Product) | |
| quantity | PositiveIntegerField | |
| price | DecimalField | Product price at purchase time |

---

# Order Status Lifecycle

Order progression:

Draft

↓

Pending

↓

Accepted

↓

Processing

↓

Ready

↓

Out for Delivery

↓

Delivered

↓

Completed


Cancelled orders may occur before delivery.

---

# Relationships

User (Buyer)

↓

Order

↓

OrderItem

↓

Product

Order lifecycle:

Draft

↓

Pending

↓

Accepted

↓

Processing

↓

Ready

↓

Out for Delivery

↓

Delivered

↓

Completed

Cancelled orders may occur before delivery.

---

# 12. Payments

Supported payment methods:

- Card
- Bank Transfer
- Wallet (Future)

Payment statuses:

- Pending
- Successful
- Failed
- Refunded
# Payments

## Payment

Represents payment information for an order.

| Field | Type | Notes |
|--------|------|-------|
| id | BigAutoField | Primary Key |
| order | OneToOneField(Order) | One payment per order |
| method | CharField | Card / Bank Transfer |
| status | CharField | Pending / Successful / Failed / Refunded |
| amount | DecimalField | Payment amount |
| created_at | DateTimeField | |
| updated_at | DateTimeField | |

---

# Payment Methods

Available MVP methods:

- Card
- Bank Transfer

Future:

- Wallet

---

# Payment Status Lifecycle

Pending

↓

Successful


or


Pending

↓

Failed


or


Successful

↓

Refunded

---

# Relationship

Order

↓

Payment

---

# 13. Delivery

# Delivery

## Delivery

Represents delivery information attached to an order.

| Field | Type | Notes |
|--------|------|-------|
| id | BigAutoField | Primary Key |
| order | OneToOneField(Order) | One delivery per order |
| address | TextField | Delivery location |
| status | CharField | Delivery lifecycle status |
| tracking_number | CharField | Delivery tracking reference |
| estimated_delivery_date | DateField | Expected delivery date |
| created_at | DateTimeField | |
| updated_at | DateTimeField | |

---

# Delivery Status Lifecycle

Pending

↓

Assigned

↓

Picked Up

↓

In Transit

↓

Delivered


---

# Relationship

Order

↓

Delivery

# 14. 
# Notifications

Represents a notification sent to a user.

| Field | Type | Notes |
|--------|------|-------|
| id | BigAutoField | Primary Key |
| user | ForeignKey(User) | Notification recipient |
| title | CharField | Notification title |
| message | TextField | Notification content |
| notification_type | CharField | Registration / Product / Order / Payment / Delivery |
| is_read | BooleanField | Read status |
| created_at | DateTimeField | |

---

# Notification Types

Available notification types:

- Registration
- Product Approval
- New Order
- Payment Update
- Delivery Update

---

# Relationship

User

↓

Notifications

---

# 15. Reviews

## Review

Represents a buyer review of a product.

| Field | Type | Notes |
|--------|------|-------|
| id | BigAutoField | Primary Key |
| buyer | ForeignKey(User) | User who submitted review |
| product | ForeignKey(Product) | Reviewed product |
| rating | PositiveIntegerField | Product rating |
| comment | TextField | Review content |
| created_at | DateTimeField | Review date |

---

# Review Rules

- Only buyers can submit reviews.
- Reviews are allowed after successful delivery.
- Reviews belong to products.

---

# Relationship

User (Buyer)

↓

Review

↓

Product

---

# 16. Wishlist

Buyers can save products for future purchases.

---

# 17
# Analytics

Analytics does not store independent data.

Metrics are calculated from existing application data.

---

## Available Metrics

### User Growth

Source:

User model

Measures:

- Total users
- New users over time


### Product Growth

Source:

Product model

Measures:

- Total products
- Products created over time


### Orders

Source:

Order model

Measures:

- Total orders
- Order status distribution


### Revenue

Source:

Payment model

Measures:

- Successful payment totals


### Active Farmers

Source:

User model

Criteria:

Users with farmer role and active status.


### Active Buyers

Source:

User model

Criteria:

Users with buyer role and active status.


---

## Access

Analytics endpoints are restricted to administrators.
---

# 18. Security

The platform enforces:

- JWT Authentication
- Password hashing
- Permission-based access
- Secure API endpoints
- Data validation

---

# 19. Non-Functional Requirements

The platform must be:

- Secure
- Reliable
- Responsive
- Scalable
- Maintainable
- Mobile Friendly

---

# 20. Product Philosophy

Every feature added to Oja-Oko Marketplace must answer one question:

> Does this feature improve agricultural commerce for farmers and buyers?

If the answer is **No**, it does not belong in Version 1 without formal approval.