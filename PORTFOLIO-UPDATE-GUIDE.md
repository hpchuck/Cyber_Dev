# Portfolio Data Update Guide

## Overview
This portfolio has been cleaned up to remove all placeholder/demo/fictional content. The app now contains only verified information (the actual Cyber Dev Portfolio project) and placeholder fields that need to be updated with your real information.

## Data Source Issue
**Important**: The portfolio uses Zustand for state management with localStorage persistence. After the first load, the app saves data to localStorage and uses that instead of the JSON file. This means updating `initial-data.json` won't immediately reflect on the website.

## How to Update Your Portfolio

### Step 1: Update the Data File
Edit `/src/data/initial-data.json` with your real information:

1. **Projects**: Add your actual projects (currently only contains the Cyber Dev Portfolio)
2. **Skills**: Update with your actual skills (currently limited to technologies used in this portfolio)
3. **Experiences**: Add your work experience (currently empty)
4. **Pricing Plans**: Add your service pricing (currently empty)
5. **Testimonials**: Add real testimonials (currently empty)

### Step 2: Update Contact Information
Update the following files with your real contact details:

1. **Email**: 
   - `/src/components/ContactSection.tsx` - Update `your.email@domain.com`
   - `/src/components/FooterSection.tsx` - Update `your.email@domain.com`

2. **Social Links**:
   - `/src/components/ContactSection.tsx` - Update LinkedIn and Twitter URLs
   - `/src/components/FooterSection.tsx` - Update social media links

3. **Admin Credentials**:
   - `/src/store/useStore.ts` - Update admin email and password for the admin panel

### Step 3: Clear Browser Storage
After updating the data, you need to clear the browser's localStorage to see the changes:

#### Option A: Use the Clear Storage Script
1. Open your browser's Developer Tools (F12)
2. Go to the Console tab
3. Copy and paste the contents of `clear-storage.js` into the console
4. Press Enter to run the script

#### Option B: Manual Clear
1. Open Developer Tools (F12)
2. Go to Application tab (Chrome) or Storage tab (Firefox)
3. Under Storage, click on "Local Storage"
4. Delete all entries related to your portfolio
5. Refresh the page

### Step 4: Verify Changes
After clearing storage, refresh your portfolio website. The app should now display your updated information from the JSON file.

## Current Status

### ✅ Cleaned Up (No Placeholder Content)
- Projects: Only real "Cyber Dev Portfolio" project
- Skills: Only technologies used in this portfolio
- Contact: Updated to use proper placeholders
- Admin: Updated credentials format

### ❌ Empty/Need Real Data
- Experiences: Empty array (add your work history)
- Pricing Plans: Empty array (add your service pricing)
- Testimonials: Empty array (add real client testimonials)
- Contact info: Placeholder email and social links need your real information

## Tips for Adding Real Data

1. **Projects**: Include project title, description, tech stack, GitHub link, and live demo URL
2. **Skills**: Organize by categories (Frontend, Backend, Database, etc.)
3. **Experience**: Include company, role, period, description, and achievements
4. **Pricing**: Add your actual service packages and pricing
5. **Testimonials**: Get permission before adding client testimonials

## Development Notes
- The app uses TypeScript, so maintain the existing data structure
- Images should be hosted externally (Unsplash URLs are used for placeholders)
- All arrays can be empty - the components handle empty states gracefully
- The admin panel allows editing data through the UI (after logging in)

## Next Steps
1. Update `initial-data.json` with your real resume information
2. Replace placeholder contact information
3. Clear browser storage using the provided script
4. Test the website to ensure all data displays correctly
5. Update admin credentials for security
