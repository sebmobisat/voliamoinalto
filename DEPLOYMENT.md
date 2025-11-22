# 🚀 Guida Rapida al Deployment

Questa guida ti aiuterà a pubblicare il sito **Voliamo in Alto** online in pochi minuti.

## 📋 Prerequisiti

Prima di iniziare, assicurati di avere:
- ✅ Tutti i file del progetto pronti
- ✅ Immagini e video ottimizzati (se li hai)
- ✅ Un account email per le registrazioni
- ✅ Il dominio voliamoinalto.com disponibile

---

## 🎯 Metodo 1: Netlify (CONSIGLIATO - GRATUITO)

### Vantaggi
- ✅ Hosting gratuito illimitato
- ✅ SSL/HTTPS automatico
- ✅ Deploy in 30 secondi
- ✅ CDN globale
- ✅ Form integrati (perfetto per il form contatti!)

### Passi

#### A. Deploy tramite Drag & Drop (PIÙ SEMPLICE)

1. **Vai su [Netlify.com](https://www.netlify.com/)**
   - Click su "Sign Up" (usa email, GitHub o altro)

2. **Nel Dashboard**
   - Click su "Add new site" → "Deploy manually"
   - Trascina l'intera cartella `voliamoinalto` nell'area di drop
   - Aspetta 30 secondi... FATTO! 🎉

3. **Personalizza**
   - Click su "Site settings" → "Change site name"
   - Imposta: `voliamoinalto` (diventerà `voliamoinalto.netlify.app`)

4. **Collega il Dominio**
   - Click su "Domain settings" → "Add custom domain"
   - Inserisci: `voliamoinalto.com`
   - Segui le istruzioni per aggiornare i DNS

#### B. Deploy tramite Git (PROFESSIONALE)

1. **Inizializza Git** (PowerShell nella cartella del progetto)
   ```powershell
   git init
   git add .
   git commit -m "Initial commit"
   ```

2. **Crea Repository su GitHub**
   - Vai su [GitHub.com](https://github.com/new)
   - Nome: `voliamoinalto`
   - Crea il repository

3. **Push del Codice**
   ```powershell
   git remote add origin https://github.com/TUO_USERNAME/voliamoinalto.git
   git branch -M main
   git push -u origin main
   ```

4. **Collega Netlify**
   - Su Netlify: "Add new site" → "Import from Git"
   - Seleziona il repository GitHub
   - Deploy automatico! ✨

### Configurare il Form Contatti su Netlify

1. **Modifica il form in `index.html`**
   Aggiungi `netlify` all'attributo del form:
   ```html
   <form id="contactForm" name="contact" method="POST" data-netlify="true">
   ```

2. **Aggiorna JavaScript**
   Rimuovi/commenta la simulazione in `js/main.js` e lascia che Netlify gestisca il form

3. **Ricevi Email**
   - Dashboard Netlify → "Forms"
   - Configura notifiche email

---

## 🔷 Metodo 2: Vercel (ALTERNATIVA GRATUITA)

### Vantaggi
- ✅ Gratuito per progetti personali
- ✅ Deploy velocissimo
- ✅ SSL automatico
- ✅ Ottimo per sviluppatori

### Passi

1. **Installa Vercel CLI**
   ```powershell
   npm install -g vercel
   ```

2. **Deploy**
   ```powershell
   cd voliamoinalto
   vercel
   ```

3. **Segui il wizard**
   - Login/registrazione
   - Conferma le impostazioni
   - Deploy completato!

4. **Collega Dominio**
   ```powershell
   vercel domains add voliamoinalto.com
   ```
   Segui le istruzioni per DNS

---

## 🌐 Metodo 3: GitHub Pages (GRATUITO)

### Vantaggi
- ✅ Completamente gratuito
- ✅ Integrato con Git
- ✅ Nessuna configurazione complessa

### Passi

1. **Crea Repository GitHub**
   - Nome: `voliamoinalto`
   - Pubblico

2. **Push del Codice**
   ```powershell
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/TUO_USERNAME/voliamoinalto.git
   git branch -M main
   git push -u origin main
   ```

3. **Attiva GitHub Pages**
   - Settings → Pages
   - Source: "Deploy from a branch"
   - Branch: `main` → folder: `/ (root)`
   - Save

4. **Sito Online**
   - URL: `https://TUO_USERNAME.github.io/voliamoinalto/`

5. **Dominio Personalizzato**
   - Aggiungi file `CNAME` nella root:
     ```
     voliamoinalto.com
     ```
   - Configura DNS del dominio

---

## 💼 Metodo 4: Hosting Tradizionale (A PAGAMENTO)

Se hai già un hosting (Aruba, SiteGround, etc.):

1. **Accedi via FTP**
   - Host: fornito dal provider
   - Username e password: dal pannello controllo

2. **Carica File**
   - Connettiti con FileZilla o simili
   - Carica tutti i file in `public_html/` o `www/`

3. **Verifica**
   - Vai su `voliamoinalto.com`
   - Controlla che tutto funzioni

---

## 🔧 Configurazione DNS per Dominio Personalizzato

### Se usi Netlify/Vercel

**Opzione A: Nameservers (Consigliato)**
1. Nel tuo registrar domini (GoDaddy, Namecheap, etc.)
2. Cambia i nameservers con quelli forniti da Netlify/Vercel
3. Esempio Netlify:
   ```
   dns1.p08.nsone.net
   dns2.p08.nsone.net
   dns3.p08.nsone.net
   dns4.p08.nsone.net
   ```

**Opzione B: Record A**
1. Aggiungi record A:
   - Netlify: `75.2.60.5`
   - Vercel: Vedi dashboard
2. Aggiungi record CNAME:
   ```
   www → voliamoinalto.netlify.app
   ```

---

## ✅ Checklist Post-Deploy

Dopo il deploy, verifica:

- [ ] Sito accessibile da desktop e mobile
- [ ] Cambio lingua funziona
- [ ] Form contatti funziona (prova invio)
- [ ] Tutte le sezioni visibili
- [ ] Link social attivi
- [ ] SSL/HTTPS attivo (lucchetto verde)
- [ ] Meta tag SEO corretti
- [ ] Google Search Console configurato
- [ ] Google Analytics attivo (se implementato)
- [ ] robots.txt accessibile
- [ ] sitemap.xml accessibile

---

## 📊 Dopo il Deploy: SEO e Marketing

### 1. Google Search Console
```
1. Vai su https://search.google.com/search-console
2. Aggiungi proprietà: voliamoinalto.com
3. Verifica proprietà (DNS o file HTML)
4. Invia sitemap: https://voliamoinalto.com/sitemap.xml
```

### 2. Google My Business
- Crea profilo business per Milano
- Aggiungi servizi, foto, orari
- Richiedi recensioni clienti

### 3. Social Media
- Aggiorna bio con link al nuovo sito
- Post di lancio su Instagram/Facebook
- Stories con preview del sito

### 4. Analytics
Aggiungi Google Analytics (vedi README.md)

---

## 🐛 Problemi Comuni

### Sito non si vede dopo deploy
- Aspetta 5-10 minuti per propagazione DNS
- Svuota cache browser (Ctrl+Shift+R)
- Prova navigazione in incognito

### Form non funziona
- Su Netlify: aggiungi attributo `data-netlify="true"`
- Su altri hosting: serve backend PHP/Node.js o servizio tipo Formspree

### Certificato SSL non attivo
- Netlify/Vercel: automatico dopo poche ore
- Hosting tradizionale: attiva Let's Encrypt nel pannello

### Dominio non raggiungibile
- Verifica DNS con: https://dnschecker.org/
- Propagazione DNS può richiedere 24-48 ore

---

## 💡 Suggerimenti Pro

1. **Backup Regolari**
   - Usa Git per versionamento
   - Scarica backup da Netlify/Vercel

2. **Monitoraggio Performance**
   - Google PageSpeed Insights
   - GTmetrix
   - Lighthouse (Chrome DevTools)

3. **Form Contatti Email**
   - Netlify Forms (gratuito, 100 invii/mese)
   - Formspree (gratuito, 50 invii/mese)
   - EmailJS (gratuito, 200 invii/mese)

4. **CDN Immagini**
   - Cloudinary (gratuito con limiti)
   - ImageKit (gratuito 20GB)

---

## 📞 Supporto

Hai problemi con il deploy?

- **Netlify**: https://docs.netlify.com/
- **Vercel**: https://vercel.com/docs
- **GitHub Pages**: https://pages.github.com/

---

**🎉 Congratulazioni per il tuo nuovo sito online!**

_Guida creata per Sebastiano Orfeo - Voliamo in Alto_



