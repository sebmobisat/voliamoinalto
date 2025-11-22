// Script per ottimizzare automaticamente le immagini
const fs = require('fs');
const path = require('path');
const https = require('https');

console.log('🖼️  Ottimizzazione Immagini - Voliamo in Alto\n');
console.log('📊 Analizzando immagini...\n');

// Directory immagini
const imagesDir = path.join(__dirname, 'images');
const servicesDir = path.join(imagesDir, 'services');

// Funzione per ottenere dimensione file
function getFileSizeInMB(filePath) {
    const stats = fs.statSync(filePath);
    return (stats.size / (1024 * 1024)).toFixed(2);
}

// Scansione immagini
function scanImages(dir) {
    const files = fs.readdirSync(dir);
    let totalSize = 0;
    const imageFiles = [];

    files.forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);

        if (stat.isFile() && /\.(jpg|jpeg|png)$/i.test(file)) {
            const size = getFileSizeInMB(filePath);
            totalSize += parseFloat(size);
            imageFiles.push({ file, path: filePath, size });

            console.log(`  ${file.padEnd(40)} ${size} MB`);
        }
    });

    return { imageFiles, totalSize };
}

console.log('📁 Immagini principali:');
const mainImages = scanImages(imagesDir);

console.log('\n📁 Immagini servizi:');
const serviceImages = scanImages(servicesDir);

const totalSize = mainImages.totalSize + serviceImages.totalSize;
const totalFiles = mainImages.imageFiles.length + serviceImages.imageFiles.length;

console.log(`\n📊 TOTALE: ${totalFiles} immagini JPG/PNG - ${totalSize.toFixed(2)} MB\n`);

// Raccomandazioni
console.log('💡 RACCOMANDAZIONI:\n');

const heavyImages = [
    ...mainImages.imageFiles.filter(img => parseFloat(img.size) > 1),
    ...serviceImages.imageFiles.filter(img => parseFloat(img.size) > 1)
];

if (heavyImages.length > 0) {
    console.log('⚠️  Immagini da ottimizzare (> 1 MB):');
    heavyImages.forEach(img => {
        console.log(`   - ${path.basename(img.path)} (${img.size} MB)`);
    });
    console.log('');
}

console.log('🚀 Per ottimizzare automaticamente:');
console.log('   1. Installa sharp: npm install sharp');
console.log('   2. Esegui: node compress-images.js');
console.log('');
console.log('🌐 Oppure usa strumenti online:');
console.log('   - https://tinypng.com/ (PNG/JPG)');
console.log('   - https://squoosh.app/ (tutti i formati)');
console.log('   - https://compressor.io/ (batch)');
console.log('');
console.log('🎯 Obiettivo: ridurre del 70-80% mantenendo qualità');

