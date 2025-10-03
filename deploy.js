#!/usr/bin/env node

// Deployment script for Foodidu vendor pages
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Foodidu Vendor Pages Deployment Script\n');

// Check if Firebase CLI is installed
try {
    execSync('firebase --version', { stdio: 'pipe' });
    console.log('✅ Firebase CLI detected');
} catch (error) {
    console.log('❌ Firebase CLI not found. Please install it first:');
    console.log('   npm install -g firebase-tools');
    process.exit(1);
}

// Check if firebase.json exists
if (!fs.existsSync('firebase.json')) {
    console.log('❌ firebase.json not found. Please run "firebase init" first.');
    process.exit(1);
}

// List all vendor pages
const publicDir = path.join(__dirname, 'public');
const vendorDirs = fs.readdirSync(publicDir, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory() && dirent.name !== 'images' && dirent.name !== 'components')
    .map(dirent => dirent.name);

console.log('📁 Vendor pages found:');
vendorDirs.forEach(dir => {
    const indexPath = path.join(publicDir, dir, 'index.html');
    if (fs.existsSync(indexPath)) {
        console.log(`   ✅ ${dir} → foodidu.com/${dir}`);
    } else {
        console.log(`   ❌ ${dir} → Missing index.html`);
    }
});

console.log(`\n📊 Total vendor pages: ${vendorDirs.length}`);

// Ask for confirmation
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('\n🤔 Deploy to Firebase? (y/N): ', (answer) => {
    if (answer.toLowerCase() === 'y' || answer.toLowerCase() === 'yes') {
        console.log('\n🚀 Deploying to Firebase...\n');
        
        try {
            // Deploy to Firebase
            execSync('firebase deploy', { stdio: 'inherit' });
            
            console.log('\n🎉 Deployment successful!');
            console.log('\n🌐 Your vendor pages are now live:');
            console.log('   • Homepage: https://foodidu.com');
            console.log('   • Vendors List: https://foodidu.com/vendors-list');
            
            vendorDirs.forEach(dir => {
                console.log(`   • ${dir}: https://foodidu.com/${dir}`);
            });
            
            console.log('\n💡 Tips:');
            console.log('   • Test each vendor page to ensure they work correctly');
            console.log('   • Update promo codes regularly for better engagement');
            console.log('   • Monitor Firebase Analytics for page performance');
            
        } catch (error) {
            console.log('\n❌ Deployment failed. Please check the error above.');
            process.exit(1);
        }
    } else {
        console.log('\n⏸️  Deployment cancelled.');
    }
    
    rl.close();
});

// Handle Ctrl+C
process.on('SIGINT', () => {
    console.log('\n\n⏸️  Deployment cancelled.');
    rl.close();
    process.exit(0);
});