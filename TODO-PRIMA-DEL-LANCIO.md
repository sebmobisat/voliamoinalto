# ⚠️ TODO PRIMA DEL LANCIO

## 🔴 CRITICI (DA FARE ASSOLUTAMENTE)

### 1. Aggiornare Informazioni di Contatto

**File: `index.html`**

Cerca e sostituisci:

```
info@voliamoinalto.com → LA_TUA_EMAIL_VERA
+39 380 123 4567 → IL_TUO_NUMERO_VERO
```

**Dove cercare:**
- Linea ~672: Sezione contatti email
- Linea ~684: Sezione contatti telefono  
- Linea ~842: Footer email
- Linea ~843: Footer telefono
- Linea ~459: Link mailto
- Linea ~463: Link tel

### 2. Aggiungere Link Social Media Reali

**File: `index.html` - Linea ~720**

Cerca:
```html
<a href="#" class="..."><i class="fab fa-instagram"></i></a>
<a href="#" class="..."><i class="fab fa-facebook"></i></a>
<a href="#" class="..."><i class="fab fa-youtube"></i></a>
<a href="#" class="..."><i class="fab fa-linkedin"></i></a>
```

Sostituisci con:
```html
<a href="https://instagram.com/TUO_ACCOUNT" class="...">
<a href="https://facebook.com/TUA_PAGINA" class="...">
<a href="https://youtube.com/@TUO_CANALE" class="...">
<a href="https://linkedin.com/in/TUO_PROFILO" class="...">
```

### 3. Aggiornare P.IVA

**File: `index.html` - Linea ~856**

Cerca:
```html
P.IVA: 12345678901
```

Sostituisci con la tua P.IVA reale.

---

## 🟡 IMPORTANTI (CONSIGLIATO)

### 4. Aggiungere Immagini e Video Reali

**Attualmente il sito usa placeholder colorati.**

#### Per Services:
1. Crea cartella: `images/portfolio/`
2. Aggiungi immagini ottimizzate (max 500KB ciascuna)
3. In `index.html` cerca le sezioni portfolio (linea ~490-590)
4. Sostituisci:

```html
<!-- PRIMA -->
<div class="aspect-video bg-gradient-to-br from-blue-400 to-purple-600">
    <i class="fas fa-play-circle text-white text-6xl"></i>
</div>

<!-- DOPO -->
<div class="aspect-video overflow-hidden">
    <img src="images/portfolio/progetto1.jpg" 
         alt="Descrizione progetto" 
         class="w-full h-full object-cover">
</div>
```

#### Per Foto Profilo "Chi Sono":
**File: `index.html` - Linea ~605**

Sostituisci:
```html
<div class="aspect-square bg-gradient-to-br from-blue-400 to-purple-600 rounded-2xl">
    <i class="fas fa-user text-white text-9xl opacity-50"></i>
</div>
```

Con:
```html
<div class="aspect-square rounded-2xl overflow-hidden shadow-2xl">
    <img src="images/sebastiano-orfeo.jpg" 
         alt="Sebastiano Orfeo - Pilota Droni" 
         class="w-full h-full object-cover">
</div>
```

### 5. Personalizzare Statistiche

**File: `index.html` - Linea ~132**

Aggiorna con i tuoi dati reali:
```html
<div class="text-3xl font-bold">500+</div> <!-- Numero progetti -->
<div class="text-3xl font-bold">5+</div>   <!-- Anni esperienza -->
```

### 6. Configurare Form Contatti

**Opzione A: Netlify Forms**

In `index.html`, linea ~461, aggiungi:
```html
<form id="contactForm" name="contact" method="POST" data-netlify="true" netlify-honeypot="bot-field">
    <input type="hidden" name="form-name" value="contact">
    <!-- resto del form -->
</form>
```

**Opzione B: Formspree**

Registrati su [formspree.io](https://formspree.io) e modifica:
```html
<form action="https://formspree.io/f/TUO_ID" method="POST">
```

---

## 🟢 OPZIONALI (MIGLIORIE)

### 7. Google Analytics

**File: `index.html` - Aggiungi prima di `</head>`**

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

### 8. Favicon

1. Crea favicon con [favicon.io](https://favicon.io/)
2. Scarica i file
3. Mettili nella root del progetto
4. In `index.html`, aggiungi dopo `<head>`:

```html
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
```

### 9. Aggiungere Meta Tag Open Graph con Immagine

**File: `index.html` - Linea ~13**

```html
<meta property="og:image" content="https://voliamoinalto.com/images/og-image.jpg">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
```

Crea un'immagine 1200x630px per social sharing.

### 10. Personalizzare Progetti Services

Modifica titoli e descrizioni dei progetti per riflettere il tuo lavoro reale:

**File: `index.html` - Linea ~490-590**

Ogni progetto ha:
```html
<h4 class="text-xl font-bold mb-2" data-it="Titolo ITA" data-en="Title ENG">
<p class="text-sm" data-it="Descrizione ITA" data-en="Description ENG">
```

---

## 📋 Checklist Rapida

Copia questa lista e spunta man mano:

```
CRITICI:
[ ] Email aggiornata
[ ] Telefono aggiornato
[ ] Social link reali
[ ] P.IVA corretta

IMPORTANTI:
[ ] Foto services aggiunte
[ ] Foto profilo "Chi sono"
[ ] Statistiche personalizzate
[ ] Form contatti configurato

OPZIONALI:
[ ] Google Analytics
[ ] Favicon
[ ] Open Graph image
[ ] Descrizioni progetti personalizzate
```

---

## 🔍 Come Trovare le Cose nel Codice

### Visual Studio Code (Consigliato)
1. Apri la cartella con VS Code
2. `Ctrl+Shift+F` per cercare in tutti i file
3. Cerca: `info@voliamoinalto.com`
4. Sostituisci tutto in un click

### Notepad++ / Altri Editor
1. Apri `index.html`
2. `Ctrl+H` per trova e sostituisci
3. Cerca e sostituisci uno per uno

---

## 💾 Backup Prima delle Modifiche

Prima di modificare, fai una copia:

1. **Windows**: Click destro sulla cartella → Copia → Incolla
2. Rinomina: `voliamoinalto - BACKUP ORIGINALE`
3. Modifica la versione originale

Così se sbagli, hai il backup! 😊

---

## ✅ Test Finale

Dopo aver fatto le modifiche:

1. **Apri `index.html` nel browser**
2. **Controlla:**
   - [ ] Email e telefono corretti
   - [ ] Link social funzionanti
   - [ ] Immagini visibili
   - [ ] Form si invia
   - [ ] Menu mobile funziona
   - [ ] Cambio lingua funziona

3. **Testa su mobile:**
   - Chrome DevTools → Toggle device toolbar (Ctrl+Shift+M)
   - Prova iPhone e Android

---

## 🚀 Quando Sei Pronto

1. ✅ Tutto nella checklist completato
2. ✅ Testato in locale
3. ✅ Backup fatto

**Vai su [app.netlify.com/drop](https://app.netlify.com/drop)**

Trascina la cartella e vai online! 🎉

---

## 📞 Hai Bisogno di Aiuto?

**Problemi con le modifiche?**
- Usa il backup per tornare indietro
- Consulta README.md per info dettagliate
- Cerca online: "come modificare HTML"

**Problemi con il deploy?**
- Vedi DEPLOYMENT.md
- Supporto Netlify: https://answers.netlify.com/

---

_Buon lavoro! Tra poco il tuo sito sarà online! 🚁✨_

