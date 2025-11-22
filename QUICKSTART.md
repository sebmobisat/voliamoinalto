# ⚡ Quick Start - Voliamo in Alto

Metti online il tuo sito in **5 minuti**! 🚀

## 🎯 Metodo Più Veloce (Netlify - Drag & Drop)

### Passo 1: Prepara
- Apri questa cartella sul tuo computer
- Verifica di avere tutti i file (index.html, css/, js/, etc.)

### Passo 2: Netlify
1. Vai su **[app.netlify.com/drop](https://app.netlify.com/drop)**
2. **Trascina** questa intera cartella nell'area
3. Aspetta 30 secondi...
4. **FATTO!** 🎉 Il tuo sito è online!

### Passo 3: Personalizza URL
1. Click su "Site settings"
2. "Change site name" → `voliamoinalto`
3. Il tuo sito sarà su: `voliamoinalto.netlify.app`

### Passo 4: Aggiungi il Tuo Dominio
1. "Domain settings" → "Add custom domain"
2. Inserisci: `voliamoinalto.com`
3. Segui le istruzioni DNS

---

## 📝 Prima di Andare Online

### ✅ Checklist Veloce

**DEVI FARE:**
- [ ] Sostituire `info@voliamoinalto.com` con la tua email vera
- [ ] Sostituire `+39 380 123 4567` con il tuo numero reale
- [ ] Aggiungere link social reali (Instagram, Facebook, etc.)

**DOVRESTI FARE:**
- [ ] Aggiungere immagini/video reali del tuo lavoro
- [ ] Personalizzare i progetti nel portfolio
- [ ] Aggiornare le statistiche (progetti completati, anni esperienza)

**PUOI FARE DOPO:**
- [ ] Configurare Google Analytics
- [ ] Aggiungere blog
- [ ] Implementare booking system

---

## 🔧 Modifica Veloce

### Cambiare Testi
Apri `index.html` e cerca:

```html
<!-- Esempio: Cambiare email -->
<a href="mailto:info@voliamoinalto.com">
```

Sostituisci con la tua email.

### Cambiare Immagini
1. Crea cartella `images/`
2. Aggiungi le tue foto
3. Nel codice, sostituisci i placeholder:

```html
<!-- Prima (placeholder gradiente) -->
<div class="bg-gradient-to-br from-blue-400 to-purple-600">

<!-- Dopo (tua immagine) -->
<img src="images/tua-foto.jpg" alt="Descrizione">
```

### Aggiungere Video
Se hai video su YouTube/Vimeo:

```html
<!-- YouTube -->
<iframe width="560" height="315" 
    src="https://www.youtube.com/embed/VIDEO_ID" 
    frameborder="0" allowfullscreen>
</iframe>

<!-- Vimeo -->
<iframe src="https://player.vimeo.com/video/VIDEO_ID" 
    width="640" height="360" frameborder="0" allowfullscreen>
</iframe>
```

---

## 📧 Form Contatti - 3 Opzioni

### Opzione 1: Netlify Forms (FACILE)
Se usi Netlify, il form è GIÀ configurato! Le email arriveranno nel dashboard Netlify.

### Opzione 2: Formspree (3 minuti)
1. Vai su [formspree.io](https://formspree.io/)
2. Registrati gratuitamente
3. Crea un nuovo form
4. Copia il link
5. In `index.html`, cambia:
   ```html
   <form action="IL_TUO_LINK_FORMSPREE" method="POST">
   ```

### Opzione 3: EmailJS (5 minuti)
Vedi guida completa in README.md

---

## 🌐 DNS - Setup Dominio

Hai già `voliamoinalto.com`? Configuralo:

### Se il dominio è su GoDaddy/Namecheap/Aruba:

1. **Accedi al pannello domini**
2. **Trova sezione DNS/Nameservers**
3. **Cambia nameservers** con quelli di Netlify:
   ```
   dns1.p08.nsone.net
   dns2.p08.nsone.net
   dns3.p08.nsone.net
   dns4.p08.nsone.net
   ```
   (Netlify ti darà i nameservers esatti quando aggiungi il dominio)

4. **Aspetta** 2-24 ore per la propagazione

### Alternativa: Record A
Se non vuoi cambiare nameservers:
- Record A → `@` → `75.2.60.5`
- CNAME → `www` → `voliamoinalto.netlify.app`

---

## 🎨 Personalizzazione Colori

Il sito usa blu come colore principale. Per cambiarlo:

**Cerca e sostituisci** in `index.html`:
- `blue-600` → `purple-600` (per viola)
- `blue-600` → `green-600` (per verde)
- `blue-600` → `red-600` (per rosso)

[Colori Tailwind disponibili](https://tailwindcss.com/docs/customizing-colors)

---

## 📱 Test Prima del Lancio

### 1. Test Locale
Apri `index.html` nel browser e verifica:
- ✅ Tutti i link funzionano
- ✅ Menu mobile si apre/chiude
- ✅ Cambio lingua funziona
- ✅ Form si invia

### 2. Test Online (dopo deploy)
- ✅ Desktop: Chrome, Firefox, Edge, Safari
- ✅ Mobile: iPhone, Android
- ✅ Tablet: iPad
- ✅ SSL attivo (lucchetto verde)

### 3. Performance
- [PageSpeed Insights](https://pagespeed.web.dev/)
- [GTmetrix](https://gtmetrix.com/)

---

## 🆘 Problemi Comuni

### "Il sito non si vede"
- Aspetta 10 minuti dopo deploy
- Prova in navigazione incognito
- Svuota cache (Ctrl+Shift+R)

### "Form non invia"
- Verifica connessione internet
- Controlla console browser (F12)
- Usa Formspree se Netlify non funziona

### "Il menu mobile non si apre"
- Verifica che `js/main.js` sia caricato
- Controlla console per errori JavaScript

---

## 📞 Risorse Utili

- **Documentazione completa**: Vedi `README.md`
- **Deploy dettagliato**: Vedi `DEPLOYMENT.md`
- **Supporto Netlify**: https://answers.netlify.com/
- **Forum Tailwind**: https://github.com/tailwindlabs/tailwindcss/discussions

---

## 🎉 Vai Live!

Tutto pronto? 

1. ✅ Email e telefono aggiornati
2. ✅ Social link configurati
3. ✅ Deploy su Netlify
4. ✅ Dominio collegato
5. ✅ Form testato

**Condividi il tuo nuovo sito:**
- 📱 Instagram Story
- 📘 Post Facebook
- 💼 LinkedIn
- 📧 Email ai clienti

---

**Buon volo! 🚁✨**

_Hai domande? Contatta il team di sviluppo o consulta README.md per info dettagliate._



