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
    jpegQuality: 85, // Qualità JPEG (80-90 è ottimale)
    pngQuality: 90, // Qualità PNG (80-95 è ottimale)
    webpQuality: 85, // Qualità WebP (80-90 è ottimale)
    maxWidth: 1920, // Larghezza massima
    maxHeight: 1080, // Altezza massima
    createBackup: true, // Backup immagini originali
    convertToWebP: true, // Converti in WebP (mantieni originali)
    optimizePNG: true, // Ottimizza PNG
    replaceOriginals: false // Sostituisci originali con WebP (false = mantieni entrambi)
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
    const ext = path.extname(inputPath).toLowerCase();
    const isPNG = ext === '.png';
    const isJPG = ['.jpg', '.jpeg'].includes(ext);
    
    try {
        // Backup originale
        if (config.createBackup) {
            const backupPath = path.join(backupDir, relativePath);
            const backupDirPath = path.dirname(backupPath);
            if (!fs.existsSync(backupDirPath)) {
                fs.mkdirSync(backupDirPath, { recursive: true });
            }
            fs.copyFileSync(inputPath, backupPath);
        }

        let sharpInstance = sharp(inputPath)
            .resize(config.maxWidth, config.maxHeight, {
                fit: 'inside',
                withoutEnlargement: true
            });

        // Applica compressione in base al formato
        if (isPNG && config.optimizePNG) {
            sharpInstance = sharpInstance.png({ 
                quality: config.pngQuality,
                compressionLevel: 9,
                adaptiveFiltering: true
            });
        } else if (isJPG) {
            sharpInstance = sharpInstance.jpeg({ 
                quality: config.jpegQuality, 
                progressive: true,
                mozjpeg: true
            });
        } else {
            // Mantieni formato originale
            sharpInstance = sharpInstance;
        }

        await sharpInstance.toFile(outputPath + '.tmp');

        // Sostituisci originale con retry per gestire file aperti
        let retries = 3;
        while (retries > 0) {
            try {
                // Se il file esiste, rimuovilo prima
                if (fs.existsSync(outputPath)) {
                    fs.unlinkSync(outputPath);
                }
                fs.renameSync(outputPath + '.tmp', outputPath);
                break;
            } catch (error) {
                retries--;
                if (retries === 0) {
                    // Se fallisce, mantieni il file .tmp e segnala
                    console.log(`     ⚠️  File potrebbe essere aperto, mantieni ${path.basename(outputPath + '.tmp')}`);
                    throw error;
                }
                // Aspetta 500ms prima di riprovare
                await new Promise(resolve => setTimeout(resolve, 500));
            }
        }

        const newSize = fs.statSync(outputPath).size;
        const saved = ((originalSize - newSize) / originalSize * 100).toFixed(1);
        
        console.log(`  ✅ ${path.basename(inputPath)}`);
        console.log(`     ${(originalSize / 1024 / 1024).toFixed(2)} MB → ${(newSize / 1024 / 1024).toFixed(2)} MB (-${saved}%)`);
        
        // Crea anche versione WebP se richiesto
        if (config.convertToWebP && (isPNG || isJPG)) {
            const webpPath = outputPath.replace(ext, '.webp');
            const webpSize = fs.statSync(inputPath).size;
            
            await sharp(inputPath)
                .resize(config.maxWidth, config.maxHeight, {
                    fit: 'inside',
                    withoutEnlargement: true
                })
                .webp({ 
                    quality: config.webpQuality,
                    effort: 6 // 0-6, più alto = compressione migliore ma più lento
                })
                .toFile(webpPath);
            
            const webpNewSize = fs.statSync(webpPath).size;
            const webpSaved = ((webpSize - webpNewSize) / webpSize * 100).toFixed(1);
            
            console.log(`     📦 WebP creato: ${path.basename(webpPath)}`);
            console.log(`        ${(webpSize / 1024 / 1024).toFixed(2)} MB → ${(webpNewSize / 1024 / 1024).toFixed(2)} MB (-${webpSaved}%)`);
            
            // Se replaceOriginals è true, sostituisci l'originale con WebP
            if (config.replaceOriginals) {
                fs.unlinkSync(outputPath);
                fs.renameSync(webpPath, outputPath.replace(ext, '.webp'));
                console.log(`        ✨ Originale sostituito con WebP`);
            }
        }
        
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

        if (stat.isFile() && /\.(jpg|jpeg|png|webp)$/i.test(file)) {
            // Salta file .tmp e backup
            if (file.endsWith('.tmp') || file.includes('backup')) continue;
            
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
    console.log(`   Spazio risparmiato: ${((totalOriginal - totalNew) / 1024 / 1024).toFixed(2)} MB (-${totalSaved}%)`);
    
    if (config.convertToWebP) {
        console.log('');
        console.log('📦 Versioni WebP create per tutte le immagini JPG/PNG');
        console.log('   💡 WebP è supportato da tutti i browser moderni');
        console.log('   💡 Risparmio medio: 25-35% rispetto a JPEG/PNG ottimizzati');
    }
    
    console.log('');
    console.log('✅ Compressione completata!');
    
    if (config.createBackup) {
        console.log(`💾 Backup salvato in: ${backupDir}`);
    }
    
    console.log('');
    console.log('🚀 Prossimi passi:');
    console.log('   1. Testa il sito in locale');
    console.log('   2. Verifica che le immagini WebP si carichino correttamente');
    console.log('   3. Se tutto ok: git add . && git commit && git push');
    console.log('   4. Il deploy avverrà automaticamente!');
})();

