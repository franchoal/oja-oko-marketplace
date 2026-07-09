# Oja-Oko Marketplace
## Database Schema

This document defines the database structure for the Oja-Oko Marketplace MVP.

Only models approved in the Product Bible should be included here.

---

# Users

## User

| Field | Type | Notes |
|--------|------|-------|
| id | BigAutoField | Primary Key |
| email | EmailField | Unique |
| first_name | CharField | |
| last_name | CharField | |
| phone_number | CharField | |
| role | CharField | buyer / farmer |
| is_active | BooleanField | |
| is_staff | BooleanField | |
| is_verified | BooleanField | |
| created_at | DateTimeField | |
| updated_at | DateTimeField | |

---

# Products

## Category

| Field | Type | Notes |
|--------|------|-------|
| id | BigAutoField | Primary Key |
| name | CharField | Unique |
| slug | SlugField | Unique |

---

## Product

| Field | Type | Notes |
|--------|------|-------|
| id | BigAutoField | Primary Key |
| farmer | ForeignKey(User) | Farmer |
| category | ForeignKey(Category) | |
| name | CharField | |
| description | TextField | |
| price | DecimalField | |
| quantity | PositiveIntegerField | |
| unit | CharField | kg, bag, basket, etc. |
| image | ImageField | |
| is_available | BooleanField | |
| created_at | DateTimeField | |
| updated_at | DateTimeField | |

---

# Shopping Cart

## Cart

Each buyer owns one active shopping cart.

| Field | Type | Notes |
|--------|------|-------|
| id | BigAutoField | Primary Key |
| buyer | OneToOneField(User) | One cart per buyer |
| created_at | DateTimeField | |
| updated_at | DateTimeField | |

---

## CartItem

Represents one product inside a buyer's cart.

| Field | Type | Notes |
|--------|------|-------|
| id | BigAutoField | Primary Key |
| cart | ForeignKey(Cart) | |
| product | ForeignKey(Product) | |
| quantity | PositiveIntegerField | |

---

# Relationships

User (Buyer)
    │
    │ OneToOne
    ▼
Cart
    │
    │ OneToMany
    ▼
CartItem
    │
    │ ManyToOne
    ▼
Product
    │
    ▼
Category

---

# MVP Notes

The following are intentionally **not** included in the MVP:

- Coupons
- Promo Codes
- Wishlists
- Saved Carts
- Guest Carts
- Shipping Costs
- Tax Calculations
- Multiple Active Carts
- Inventory Reservations

These features may be added in future versions if approved in the Product Bible.