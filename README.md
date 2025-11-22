# 🚁 Voliamo in Alto - Sito Web Professionale

Sito web moderno e responsive per servizi di riprese aeree con droni e video a Milano.

## ✨ Caratteristiche

- **Design Moderno e Responsive** - Perfetto su desktop, tablet e mobile
- **Sistema Bilingue** - Italiano/Inglese con cambio lingua istantaneo
- **Animazioni Fluide** - Utilizzo di AOS.js per animazioni on-scroll
- **SEO Ottimizzato** - Meta tag completi e struttura semantica
- **Performance Elevate** - CSS Tailwind e codice ottimizzato
- **Form Contatti** - Form funzionante con validazione
- **Accessibilità** - Conforme agli standard WCAG

## 🎨 Sezioni del Sito

1. **Home** - Hero section con call-to-action e statistiche
2. **Servizi Droni** - Edilizia, Real Estate, Matrimoni, Content Creators, Cinema
3. **Servizi Video** - Videografia, fotografia, editing, regia
4. **Services** - Galleria servizi con effetti hover
5. **Chi Sono** - Presentazione di Sebastiano Orfeo
6. **Contatti** - Form contatti e informazioni di contatto

## 📁 Struttura del Progetto

```
voliamoinalto/
├── index.html          # Pagina principale
├── css/
│   └── styles.css      # Stili personalizzati
├── js/
│   └── main.js         # JavaScript per interattività e lingua
└── README.md           # Questo file
```

## 🚀 Come Usare

### Opzione 1: Apertura Locale
1. Apri il file `index.html` nel browser
2. Il sito funzionerà completamente in locale

### Opzione 2: Hosting Gratuito

#### Netlify (Consigliato)
1. Crea un account su [Netlify](https://www.netlify.com/)
2. Trascina la cartella del progetto nel dashboard
3. Il sito sarà online in pochi secondi!
4. Collega il tuo dominio personalizzato

#### Vercel
1. Crea un account su [Vercel](https://vercel.com/)
2. Installa Vercel CLI: `npm i -g vercel`
3. Nella cartella del progetto: `vercel`
4. Segui le istruzioni

#### GitHub Pages
1. Crea un repository su GitHub
2. Carica i file del progetto
3. Vai in Settings > Pages
4. Seleziona il branch main e salva
5. Il sito sarà disponibile su `username.github.io/nome-repo`

### Opzione 3: Hosting Professionale
- **Aruba**, **SiteGround**, **HostGator** o qualsiasi hosting con supporto HTML/CSS/JS
- Carica i file via FTP nella directory `public_html`

## 🔧 Personalizzazione

### Modificare i Contenuti

#### Testi
I testi sono bilingue. Ogni elemento ha attributi `data-it` e `data-en`:

```html
<h1 data-it="Testo italiano" data-en="English text">Testo italiano</h1>
```

#### Immagini
Per aggiungere immagini reali:
1. Crea una cartella `images/`
2. Ottimizza le immagini (usa [TinyPNG](https://tinypng.com/))
3. Sostituisci i placeholder nel codice HTML

#### Colori
I colori principali sono definiti con Tailwind CSS:
- Blu primario: `blue-600` (#2563eb)
- Per cambiare, cerca e sostituisci i colori nel file `index.html`

#### Form Contatti
Il form attualmente mostra un messaggio di successo simulato. Per renderlo funzionale:

**Opzione A - Formspree (Gratuito)**
```html
<form action="https://formspree.io/f/TUO_ID" method="POST">
```

**Opzione B - EmailJS**
```javascript
// Vedi documentazione: https://www.emailjs.com/
```

**Opzione C - Backend Personalizzato**
- Modifica la sezione del form handler in `js/main.js`
- Implementa un endpoint API

### Social Media
Aggiorna i link social nel footer:

```html
<a href="https://instagram.com/tuoaccount">
    <i class="fab fa-instagram"></i>
</a>
```

### Informazioni di Contatto
Modifica email, telefono e indirizzo nel file `index.html`:
- Cerca `info@voliamoinalto.com` e sostituisci
- Cerca `+39 380 123 4567` e sostituisci

## 📱 Sistema Bilingue

Il sito cambia lingua automaticamente:
- Click sul pulsante lingua nell'header
- La preferenza viene salvata nel browser
- Tutti i testi cambiano istantaneamente

Per aggiungere più lingue, modifica `js/main.js` e aggiungi attributi `data-fr`, `data-es`, etc.

## 🎯 SEO e Performance

### Meta Tag
Già inclusi:
- Title e Description bilingue
- Open Graph per social sharing
- Meta keywords

### Performance
- CSS Tailwind caricato da CDN
- JavaScript minimalista
- Immagini lazy-loading ready
- Animazioni ottimizzate

### Per Migliorare Ulteriormente
1. Usa immagini WebP con fallback
2. Implementa Service Worker per PWA
3. Aggiungi Google Analytics o Matomo
4. Implementa Schema.org markup

## 🌐 Domini e DNS

### Collegare il Dominio voliamoinalto.com

**Se il dominio è registrato con Squarespace:**
1. Esporta/trasferisci il dominio a un provider come Namecheap o GoDaddy
2. Aggiorna i DNS records:
   - Tipo A: punta all'IP del nuovo hosting
   - CNAME www: punta al dominio principale

**Su Netlify/Vercel:**
1. Aggiungi il dominio nel dashboard
2. Aggiorna i nameservers del dominio
3. Il certificato SSL sarà automatico

## 📊 Analytics

Per tracciare le visite, aggiungi Google Analytics:

```html
<!-- Aggiungi prima del </head> -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

## 🛠️ Tecnologie Utilizzate

- **HTML5** - Struttura semantica
- **Tailwind CSS** - Framework CSS utility-first
- **JavaScript Vanilla** - Nessuna dipendenza pesante
- **AOS.js** - Animazioni on-scroll
- **Font Awesome** - Icone professionali
- **Google Fonts (Poppins)** - Typography moderna

## 📝 Checklist Pre-Lancio

- [ ] Sostituire i placeholder con immagini/video reali
- [ ] Aggiornare informazioni di contatto (email, telefono)
- [ ] Configurare il form contatti con backend
- [ ] Aggiungere link social reali
- [ ] Testare su tutti i dispositivi (mobile, tablet, desktop)
- [ ] Testare su tutti i browser (Chrome, Firefox, Safari, Edge)
- [ ] Verificare tutti i link
- [ ] Aggiungere Google Analytics
- [ ] Verificare meta tag SEO
- [ ] Comprimere e ottimizzare immagini
- [ ] Testare tempi di caricamento
- [ ] Configurare SSL/HTTPS
- [ ] Aggiungere favicon
- [ ] Creare sitemap.xml
- [ ] Registrare su Google Search Console

## 🐛 Risoluzione Problemi

### Il form non invia email
- Configura un servizio come Formspree o EmailJS
- Oppure implementa un backend con PHP/Node.js

### Le animazioni non funzionano
- Verifica che AOS.js sia caricato correttamente
- Controlla la console browser per errori

### Il cambio lingua non funziona
- Verifica che `js/main.js` sia caricato
- Controlla che tutti gli elementi abbiano `data-it` e `data-en`

### Problemi di visualizzazione mobile
- Verifica il viewport meta tag nell'`<head>`
- Testa con Chrome DevTools responsive mode

## 💡 Suggerimenti

1. **Aggiungi Video Reali** - Carica video su YouTube/Vimeo e incorporali
2. **Blog Section** - Considera di aggiungere un blog per SEO
3. **Testimonials** - Aggiungi recensioni clienti
4. **FAQ Section** - Domande frequenti
5. **Live Chat** - Integra Tawk.to o Intercom
6. **Booking System** - Calendly per prenotazioni

## 📧 Supporto

Per modifiche o assistenza:
- Email: info@voliamoinalto.com
- Telefono: +39 380 123 4567

## 📄 Licenza

Copyright © 2024 Voliamo in Alto. Tutti i diritti riservati.

---

**Creato con ❤️ per Sebastiano Orfeo - Pilota Droni Certificato ENAC**

