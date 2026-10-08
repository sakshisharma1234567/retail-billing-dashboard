# Retail Billing Dashboard

A responsive retail billing dashboard built with React.js and TypeScript.  
The application provides a practical interface for managing products, viewing sales statistics, and handling customer bills.

## Features

### Authentication
- Login with email/username and password
- Client-side form validation
- Mock authentication without a backend
- User session stored using localStorage
- Logout functionality

### Dashboard
- Total Sales
- Total Bills
- Total Products
- Low Stock Products
- Recent billing information
- Low-stock product alerts
- Responsive dashboard layout

### Product Management
- Product listing in a responsive table
- Product name, category, price, stock and status
- Search products
- Filter products by category
- Pagination
- Add new product
- Form validation
- Stock status display

### Billing
- View billing records
- Search bills by invoice, customer or product
- Pagination
- Create new bill
- Customer and product details
- Quantity and price calculation
- Paid/Pending status
- Responsive billing layout

### Responsive Design
The dashboard is designed to work across:
- Desktop
- Tablet
- Mobile

Mobile navigation is provided through a responsive menu drawer.

## Tech Stack

- React.js
- TypeScript
- Vite
- Tailwind CSS
- Lucide React
- HTML5
- CSS3
- LocalStorage

## Project Structure

```text
retail-billing-dashboard/
│
├── public/
│
├── src/
│   ├── components/
│   │   ├── Billing.tsx
│   │   ├── Dashboard.tsx
│   │   └── ...
│   │
│   ├── data/
│   │   └── products.ts
│   │
│   ├── types/
│   │   └── product.ts
│   │
│   ├── App.tsx
│   ├── index.css
│   └── main.tsx
│
├── package.json
├── vite.config.ts
├── tsconfig.json
└── README.md