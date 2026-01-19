#!/usr/bin/env node

/**
 * Bulk Product Image Updater
 * 
 * This script automatically updates product image paths in products.ts
 * for products where image files exist in /public/images/products/
 * 
 * Usage: node update-product-images.js
 */

const fs = require('fs');
const path = require('path');

const productsFile = path.join(__dirname, 'src/data/products.ts');
const imagesDir = path.join(__dirname, 'public/images/products');

// Read the products file
let productsContent = fs.readFileSync(productsFile, 'utf8');

// Get list of image files
const imageFiles = fs.existsSync(imagesDir) 
  ? fs.readdirSync(imagesDir).filter(file => 
      /\.(jpg|jpeg|png|webp)$/i.test(file)
    )
  : [];

console.log(`\n📸 Found ${imageFiles.length} images in /public/images/products/\n`);

// Create a map of slug to image filename
const slugToImage = {};
imageFiles.forEach(file => {
  // Remove extension to get slug
  const slug = file.replace(/\.(jpg|jpeg|png|webp)$/i, '');
  slugToImage[slug] = `/images/products/${file}`;
});

let updateCount = 0;
let notFoundCount = 0;
const notFoundImages = [];

// Find and replace image URLs for products with matching images
Object.keys(slugToImage).forEach(slug => {
  // Find the product block by slug
  const slugPattern = `slug: '${slug}',`;
  const slugIndex = productsContent.indexOf(slugPattern);
  
  if (slugIndex === -1) {
    notFoundImages.push(slug);
    notFoundCount++;
    return;
  }
  
  // Find the image field after the slug (within next 100 lines or so)
  const productSection = productsContent.substring(slugIndex, slugIndex + 5000);
  const imageMatch = productSection.match(/image:\s*'[^']+',/);
  
  if (imageMatch) {
    const oldImage = imageMatch[0];
    const newImage = `image: '${slugToImage[slug]}',`;
    
    // Only replace if it's different (not already using local path)
    if (oldImage !== newImage) {
      productsContent = productsContent.replace(oldImage, newImage);
      updateCount++;
      console.log(`✅ Updated: ${slug}`);
    } else {
      console.log(`✓ Already updated: ${slug}`);
    }
  }
});

// Write the updated content back
fs.writeFileSync(productsFile, productsContent, 'utf8');

// Print summary
console.log(`\n📊 Summary:`);
console.log(`   ✅ Updated: ${updateCount} products`);
if (notFoundCount > 0) {
  console.log(`   ⚠️  Products not found for ${notFoundCount} images:`);
  notFoundImages.forEach(slug => console.log(`      - ${slug}`));
}
console.log(`\n✨ Done! Check src/data/products.ts to review changes.\n`);


