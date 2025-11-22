// Script per comprimere automaticamente le immagini con sharp
const fs = require('fs');
const path = require('path');

// Check se sharp è installato
let sharp;
try {
    sharp = require('sharp');
} catch (e) {
    console.log('❌ Sharp non installato!');
    console.log('📦 Installa con: npm install sharp');
    console.log('');
    process.exit(1);
}

console.log('🗜️  Compressione Immagini - Voliamo in Alto\n');

// Configurazione
const config = {
    quality: 85, // Qualità JPEG (80-90 è ottimale)
    maxWidth: 1920, // Larghezza massima
    maxHeight: 1080, // Altezza massima
    createBackup: true // Backup immagini originali
};

// Directory
const imagesDir = path.join(__dirname, 'images');
const servicesDir = path.join(imagesDir, 'services');
const backupDir = path.join(__dirname, 'images-backup');

// Crea backup directory
if (config.createBackup && !fs.existsSync(backupDir)) {
    fs.mkdirSync(backupDir);
    fs.mkdirSync(path.join(backupDir, 'services'));
    console.log('📁 Cartella backup creata\n');
}

// Funzione compressione
async function compressImage(inputPath, outputPath, relativePath) {
    const originalSize = fs.statSync(inputPath).size;
    
    try {
        // Backup originale
        if (config.createBackup) {
            const backupPath = path.join(backupDir, relativePath);
            fs.copyFileSync(inputPath, backupPath);
        }

        // Comprimi con sharp
        await sharp(inputPath)
            .resize(config.maxWidth, config.maxHeight, {
                fit: 'inside',
                withoutEnlargement: true
            })
            .jpeg({ quality: config.quality, progressive: true })
            .toFile(outputPath + '.tmp');

        // Sostituisci originale
        fs.renameSync(outputPath + '.tmp', outputPath);

        const newSize = fs.statSync(outputPath).size;
        const saved = ((originalSize - newSize) / originalSize * 100).toFixed(1);
        
        console.log(`  ✅ ${path.basename(inputPath)}`);
        console.log(`     ${(originalSize / 1024 / 1024).toFixed(2)} MB → ${(newSize / 1024 / 1024).toFixed(2)} MB (-${saved}%)`);
        
        return { originalSize, newSize, saved: parseFloat(saved) };
    } catch (error) {
        console.log(`  ❌ Errore con ${path.basename(inputPath)}: ${error.message}`);
        return null;
    }
}

// Processa directory
async function processDirectory(dir, relativePath = '') {
    const files = fs.readdirSync(dir);
    const results = [];

    for (const file of files) {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        const relPath = path.join(relativePath, file);

        if (stat.isFile() && /\.(jpg|jpeg|png)$/i.test(file)) {
            // Salta file già ottimizzati WebP
            if (file.endsWith('.webp')) continue;
            
            const result = await compressImage(filePath, filePath, relPath);
            if (result) results.push(result);
        }
    }

    return results;
}

// Esegui compressione
(async () => {
    console.log('📸 Compressione immagini principali...\n');
    const mainResults = await processDirectory(imagesDir);

    console.log('\n📸 Compressione immagini servizi...\n');
    const serviceResults = await processDirectory(servicesDir, 'services');

    // Statistiche finali
    const allResults = [...mainResults, ...serviceResults];
    const totalOriginal = allResults.reduce((sum, r) => sum + r.originalSize, 0);
    const totalNew = allResults.reduce((sum, r) => sum + r.newSize, 0);
    const totalSaved = ((totalOriginal - totalNew) / totalOriginal * 100).toFixed(1);

    console.log('\n📊 RISULTATI:');
    console.log(`   Immagini processate: ${allResults.length}`);
    console.log(`   Dimensione originale: ${(totalOriginal / 1024 / 1024).toFixed(2)} MB`);
    console.log(`   Dimensione compressa: ${(totalNew / 1024 / 1024).toFixed(2)} MB`);
    console.log(`   Spazio risparmiato: ${(totalOriginal - totalNew) / 1024 / 1024).toFixed(2)} MB (-${totalSaved}%)`);
    console.log('');
    console.log('✅ Compressione completata!');
    
    if (config.createBackup) {
        console.log(`💾 Backup salvato in: ${backupDir}`);
    }
    
    console.log('');
    console.log('🚀 Prossimi passi:');
    console.log('   1. Testa il sito in locale');
    console.log('   2. Se tutto ok: git add . && git commit && git push');
    console.log('   3. Railway farà il deploy automaticamente!');
})();

