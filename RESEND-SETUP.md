# 📧 Setup Resend per Form Contatti - Voliamo in Alto

## ✅ Configurazione Completata

Hai già configurato le variabili d'ambiente su Railway:

```env
RESEND_API_KEY="re_UaWXx51k_BxT1Byouj4nMBfz8UotY7Twr"
RESEND_FROM_EMAIL="hello@voliamoinalto.com"
RESEND_FROM_NAME="Seb Orfeo - Voliamo in alto"
```

---

## 🎯 Come Funziona

### 1. Architettura
```
Cliente (Browser)
    ↓
Form HTML (index.html)
    ↓
JavaScript (main.js) - fetch('/api/contact')
    ↓
Node.js Server (server.js)
    ↓
Resend API
    ↓
Email inviata a hello@voliamoinalto.com
```

### 2. Flusso Email
1. Cliente compila il form su voliamoinalto.com
2. JavaScript invia POST a `/api/contact`
3. Server Node.js riceve i dati
4. Server usa Resend per inviare email
5. Tu ricevi l'email con i dettagli del contatto
6. Puoi rispondere direttamente (reply-to è l'email del cliente)

---

## 🚀 Test in Locale

### Step 1: Installa Dipendenze
```bash
npm install
```

### Step 2: Crea File `.env`
Crea un file `.env` nella root del progetto:

```env
PORT=5000
RESEND_API_KEY=re_UaWXx51k_BxT1Byouj4nMBfz8UotY7Twr
RESEND_FROM_EMAIL=hello@voliamoinalto.com
RESEND_FROM_NAME=Seb Orfeo - Voliamo in alto
```

### Step 3: Avvia Server
```bash
npm start
```

Il server sarà disponibile su: http://localhost:5000

### Step 4: Testa il Form
1. Vai su http://localhost:5000
2. Scorri fino alla sezione "Contatti"
3. Compila il form
4. Clicca "Invia Messaggio"
5. Controlla la tua email (hello@voliamoinalto.com)

---

## ☁️ Deploy su Railway

### Variabili d'Ambiente (già configurate ✅)

Nel dashboard Railway, sezione **Variables**, hai già:
- `RESEND_API_KEY`
- `RESEND_FROM_EMAIL`
- `RESEND_FROM_NAME`

Railway imposta automaticamente anche `PORT`.

### Deploy Automatico
1. Fai `git push` su GitHub
2. Railway rileva automaticamente le modifiche
3. Installa le dipendenze (`express`, `resend`)
4. Avvia il server con `node server.js`
5. Il form è pronto per funzionare! 🎉

---

## 📧 Formato Email Ricevuta

Quando qualcuno invia il form, riceverai un'email con questo formato:

**Subject**: `Nuovo contatto da [Nome Cliente] - Voliamo in Alto`

**Body**:
```
🚁 Nuovo Contatto - Voliamo in Alto

👤 Nome: Mario Rossi
📧 Email: mario.rossi@example.com
🎥 Tipo di Servizio: Matrimonio
💬 Messaggio:
Buongiorno, sono interessato ai vostri servizi
di riprese aeree per il mio matrimonio...

---
Ricevuto da voliamoinalto.com
Rispondi direttamente a questa email per contattare il cliente
```

L'email usa un design HTML professionale con il tuo brand 🎨

---

## 🔧 Personalizzazioni Template Email

### Modificare il Template
Il template email si trova in `server.js` alla riga ~40.

Puoi personalizzare:
- **Colori**: Cambia `#2563eb` con il tuo colore brand
- **Logo**: Aggiungi `<img>` nell'header
- **Footer**: Aggiungi link social, firma, ecc.

### Esempio: Aggiungere Logo
```html
<div class="header">
    <img src="https://voliamoinalto.com/images/logo-header.png" alt="Logo" style="max-height: 60px; margin-bottom: 10px;">
    <h1>🚁 Nuovo Contatto - Voliamo in Alto</h1>
</div>
```

---

## 📊 Monitoraggio Email

### Dashboard Resend
1. Vai su https://resend.com/dashboard
2. Login con il tuo account
3. Vedrai tutte le email inviate:
   - ✅ Delivered
   - 📧 Opened (se tracking attivo)
   - 🔄 Bounce/Failed

### Logs su Railway
Nel dashboard Railway > **Logs** vedrai:
```
📧 Email inviata con successo: { id: 'abc123' }
```

---

## 🐛 Troubleshooting

### Problema: Email non arriva
**Cause possibili**:
1. **API Key invalida**
   - Verifica su Resend dashboard
   - Rigenera se necessario
   
2. **Dominio non verificato**
   - Su Resend, verifica il dominio `voliamoinalto.com`
   - Aggiungi record DNS richiesti
   
3. **Spam folder**
   - Controlla la cartella spam
   - Aggiungi hello@voliamoinalto.com ai contatti

### Problema: Errore 500 sul form
**Soluzione**:
```bash
# Controlla logs Railway
railway logs

# Se vedi errore Resend:
# - Verifica variabili d'ambiente
# - Controlla che le dipendenze siano installate
```

### Problema: Form non invia (errore fetch)
**Soluzione**:
- Apri Console browser (F12)
- Controlla errori JavaScript
- Verifica che `/api/contact` risponda (Network tab)

---

## 🔐 Sicurezza

### Rate Limiting (Consigliato)
Per evitare spam, aggiungi rate limiting:

```bash
npm install express-rate-limit
```

In `server.js`:
```javascript
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minuti
    max: 5, // Max 5 richieste per IP
    message: 'Troppe richieste, riprova tra 15 minuti'
});

app.use('/api/contact', limiter);
```

### Validazione Email
Il server già valida:
- ✅ Nome obbligatorio
- ✅ Email obbligatoria
- ✅ Messaggio obbligatorio

### Anti-Spam (Futuro)
Considera di aggiungere:
- reCAPTCHA v3 (invisibile)
- Honeypot field (campo nascosto)

---

## 📈 Statistiche

### Resend Free Tier
- **100 email/giorno** gratis
- **3,000 email/mese** gratis
- Perfetto per il tuo sito! 🎉

### Upgrade (se necessario)
Se ricevi più di 100 form/giorno:
- **$20/mese**: 50,000 email
- **$80/mese**: 100,000 email

---

## 🎨 Prossime Migliorie

1. **Auto-risposta**: Invia email di conferma al cliente
   ```javascript
   // In server.js, dopo invio email principale
   await resend.emails.send({
       from: 'hello@voliamoinalto.com',
       to: email, // Email cliente
       subject: 'Grazie per il tuo contatto - Voliamo in Alto',
       html: '...' // Template di ringraziamento
   });
   ```

2. **Notifiche WhatsApp**: Integra con Twilio/WhatsApp Business

3. **CRM Integration**: Invia dati a Google Sheets, Notion, Airtable

4. **Analytics**: Traccia conversioni con Google Analytics

---

## ✅ Checklist Pre-Lancio

- [x] Variabili d'ambiente configurate su Railway
- [x] Server Node.js con Express
- [x] API `/api/contact` funzionante
- [x] Form HTML aggiornato
- [x] JavaScript fetch configurato
- [ ] Test invio form in locale
- [ ] Test invio form su Railway
- [ ] Verifica ricezione email
- [ ] Test risposta (reply-to)
- [ ] Dominio Resend verificato (se custom domain)

---

## 📞 Supporto

### Resend
- Dashboard: https://resend.com/dashboard
- Docs: https://resend.com/docs
- Email: support@resend.com

### Railway
- Dashboard: https://railway.app/dashboard
- Logs: Railway Dashboard > Project > Logs
- Docs: https://docs.railway.app/

---

**Status**: ✅ **CONFIGURAZIONE COMPLETATA!**

Fai commit, push su GitHub e Railway farà il deploy automaticamente.

Il form contatti è pronto per funzionare! 🚀📧

---

_Creato per: Sebastiano Orfeo - Voliamo in Alto_  
_Data: 22 novembre 2024_

