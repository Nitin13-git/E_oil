📁 HOW TO UPLOAD PRODUCT IMAGES (LOCAL)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📍 WHERE TO PUT IMAGES:
   Folder: /public/images/products/

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📝 NAMING CONVENTION:

   Option 1: Use product slug (RECOMMENDED)
   ────────────────────────────────────────
   • Find the product slug in src/data/products.ts
   • Example: slug: 'lavender-essential-oil'
   • Upload as: lavender-essential-oil.jpg (or .png)

   Option 2: Use product ID
   ─────────────────────────
   • Example: id: '2'
   • Upload as: 2.jpg (or .png)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🔄 AFTER UPLOADING:

   1. Open: src/data/products.ts
   2. Find the product you want to update
   3. Change the image field from:
      
      image: 'https://images.unsplash.com/photo-XXXXX',
      
      TO:
      
      image: '/images/products/your-image-name.jpg',
      
   4. Save and refresh browser

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📋 EXAMPLE:

   Product: Lavender Essential Oil
   Slug: lavender-essential-oil
   
   1. Upload image as: /public/images/products/lavender-essential-oil.jpg
   
   2. Update in products.ts:
      image: '/images/products/lavender-essential-oil.jpg',

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✅ ACCEPTED FORMATS: .jpg, .jpeg, .png, .webp

✅ RECOMMENDED SIZE: 400x400px to 800x800px (square images work best)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━


