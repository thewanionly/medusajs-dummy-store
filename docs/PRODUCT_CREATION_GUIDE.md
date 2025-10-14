# 📦 Product Creation & Medusa-Sanity Sync Guide

This comprehensive guide provides step-by-step instructions for creating products in Medusa that automatically sync with Sanity CMS.

## 🎯 **Overview**

Your integration automatically syncs product data between:
- **Medusa Backend**: E-commerce logic, pricing, inventory
- **Sanity CMS**: Content management, enhanced descriptions, media
- **Storefront**: Displays combined data from both systems

---

## 🚀 **Prerequisites**

### 1. **Environment Setup**
```bash

# Start all apps in development mode
pnpm dev
turbo dev

# Services should be available at:
# - Medusa Admin: http://localhost:9000/app
# - Sanity Studio: http://localhost:3333
# - Storefront: http://localhost:8000
```


### 2. **Sanity Permissions**
Ensure your Sanity token has proper permissions:
1. Go to [Sanity Dashboard](https://sanity.io/manage)
2. Select your project
3. Go to **API** → **Tokens**
4. Ensure your token has **Editor** or **Admin** permissions

---

## 📝 **Step-by-Step Product Creation**

### **Step 1: Access Medusa Admin**

1. **Open Admin Dashboard**
   ```
   http://localhost:9000/app
   ```

2. **Login** with your admin credentials

3. **Navigate to Products**
   - Click **Products** in the sidebar
   - Click **Create Product** button

### **Step 2: Basic Product Information**

Fill out the required product details:

#### **📋 Basic Details**
```
✅ Required Fields:
├── Title: "Premium Cotton T-Shirt"
├── Handle: "premium-cotton-tshirt" (auto-generated)
├── Description: "Soft, comfortable cotton t-shirt..."
├── Status: "Published" or "Draft"
└── Subtitle: "Perfect for everyday wear" (optional)
```

#### **🏷️ Categorization**
```
✅ Categories:
├── Select from existing: Shirts, Sweatshirts, Pants, Merch
└── Or create new categories as needed
```

#### **🏪 Sales Channels**
```
✅ Sales Channel:
└── Select "Default Sales Channel"
```

### **Step 3: Product Options & Variants**

#### **🎛️ Product Options**
```
✅ Create Options (if product has variations):
├── Size: S, M, L, XL
├── Color: Black, White, Navy
└── Material: Cotton, Polyester (optional)
```

#### **🔄 Product Variants**
For each combination of options:
```
✅ Variant Details:
├── Title: "S / Black"
├── SKU: "TCOTT-S-BLK"
├── Prices:
│   ├── EUR: €25.00
│   └── USD: $30.00
├── Inventory:
│   ├── Manage Inventory: Yes
│   └── Quantity: 100
└── Weight: 200g (optional)
```

### **Step 4: Media & Images**

```
✅ Product Images:
├── Upload primary product image
├── Add variant-specific images
├── Include lifestyle shots
└── Recommended: 1200x1200px, JPG/PNG
```

### **Step 5: Advanced Settings**

#### **🚚 Shipping**
```
✅ Shipping Profile:
└── Select "Default Shipping Profile"
```

#### **📊 SEO & Metadata**
```
✅ SEO Settings:
├── Meta Title: "Premium Cotton T-Shirt | Your Store"
├── Meta Description: "Shop our premium cotton t-shirt..."
└── Handle: Ensure it's SEO-friendly
```

### **Step 6: Save & Publish**

1. **Review** all entered information
2. **Click "Save"** to create the product
3. **Set Status** to "Published" if ready
4. **Automatic Sync** will trigger to Sanity

---

## 🔄 **Understanding the Sync Process**

### **What Happens Automatically:**

#### **1. Product Created Event**
```
✅ When you save a product in Medusa:
├── Product.created event is triggered
├── Sanity sync subscriber listens for the event
├── Product data is sent to sync workflow
└── Document is created/updated in Sanity
```

#### **2. Sync Workflow Execution**
```
✅ Sync Process:
├── 🔍 Fetches product data from Medusa
├── 🔄 Transforms data for Sanity schema
├── 📤 Creates/updates Sanity document
├── 🔗 Creates link between Medusa product and Sanity document
└── ✅ Logs success/failure status
```

#### **3. Data Transformation**
```
✅ Medusa → Sanity Mapping:
├── title → title
├── description → description
├── handle → slug
├── status → status
├── thumbnail → thumbnail
├── images → gallery (array)
├── categories → categories (references)
└── metadata → additional fields
```

---

## 🔍 **Monitoring Sync Status**

### **Via Medusa Admin**

1. **Product Detail Page**
   - Open any product in Medusa admin
   - Scroll to **Sanity Sync Widget**
   - View sync status and document link

2. **Sync Status Indicators**
   ```
   ✅ Synced: Document exists in Sanity
   ⏳ Pending: Sync in progress
   ❌ Failed: Sync encountered error
   🔄 Manual Sync: Trigger sync manually
   ```

### **Via Sanity Studio**

1. **Open Sanity Studio**
   ```
   http://localhost:3333
   ```

2. **Check Products**
   - Navigate to **Products** document type
   - Verify product appears with correct data
   - Check Medusa product ID in document
---

### **How to Manual Sync:**

#### **1. Single Product Sync**
```bash
# Via Admin UI
1. Go to product detail page
2. Click "Sync to Sanity" button in widget
3. Monitor status updates

#### **2. Bulk Product Sync**
```bash
# Sync all products
curl -X POST http://localhost:9000/admin/sanity/sync-all
```

#### **3. Re-sync After Schema Changes**
```bash
# After updating Sanity schema, re-sync all products
cd apps/medusa
pnpm exec medusa exec ./src/scripts/sync-all-products.ts
```

---

## 🎨 **Enhancing Products in Sanity**

After products sync to Sanity, enhance them with CMS-specific content:

### **1. Rich Content**
```
✅ In Sanity Studio:
├── 📝 Enhanced descriptions with rich text
├── 🎨 Additional image galleries
├── 📊 Product specifications
├── 🏷️ Marketing badges
├── 📈 SEO metadata
└── 🔗 Related products
```

### **2. Content Fields Available**
```typescript
✅ Sanity Product Schema:
├── title: string (synced from Medusa)
├── slug: slug (synced from Medusa)
├── description: text (synced from Medusa)
├── thumbnail: image (synced from Medusa)
├── gallery: array of images
├── status: string (synced from Medusa)
├── categories: array of references
├── badge: string (CMS-only)
├── featured: boolean (CMS-only)
└── medusaProductId: string (sync link)
```

---

## 📱 **Testing in Storefront**

### **View Product Data**

1. **Navigate to Storefront**
   ```
   http://localhost:8000/dk/store
   ```

2. **Check Product Display**
   - Products list shows Medusa data
   - Product detail pages combine Medusa + Sanity
   - Enhanced descriptions from Sanity
   - Images from both systems

---

### **1. Product Creation Workflow**
```
✅ Recommended Flow:
├── 1. Create product in Medusa (basic info)
├── 2. Wait for automatic sync to complete
├── 3. Enhance product in Sanity (rich content)
├── 4. Verify display in storefront
└── 5. Make live by publishing
```

### **2. Data Management**
```
✅ Guidelines:
├── Use Medusa for: pricing, inventory, variants
├── Use Sanity for: marketing copy, additional media
├── Keep handles/slugs consistent between systems
├── Use categories to organize products
└── Monitor sync status regularly
```

### **3. Performance Optimization**
```
✅ Tips:
├── Optimize images before upload
├── Use appropriate image formats (WebP)
├── Batch product creation for better performance
├── Monitor sync workflow execution times
└── Regular cleanup of failed sync attempts
```