# 🚂 Guida Deploy su Railway - Voliamo in Alto

## 📋 Prerequisiti

- [x] Account GitHub (hai già il repository)
- [ ] Account Railway (registrati su [railway.app](https://railway.app))
- [x] Codice pushato su GitHub ✅

---

## 🚀 Metodo 1: Deploy da GitHub (Consigliato)

### Step 1: Crea Account Railway
1. Vai su **https://railway.app**
2. Clicca su **"Start a New Project"**
3. Accedi con il tuo account GitHub
4. Autorizza Railway ad accedere ai tuoi repository

### Step 2: Crea Nuovo Progetto
1. Nel dashboard Railway, clicca **"+ New Project"**
2. Seleziona **"Deploy from GitHub repo"**
3. Cerca e seleziona il repository **`sebmobisat/voliamoinalto`**
4. Clicca su **"Deploy Now"**

### Step 3: Configurazione Automatica
Railway rileverà automaticamente che si tratta di un sito statico.

**⚠️ IMPORTANTE**: Railway cercherà un server, ma il tuo è un sito statico HTML. Dobbiamo configurarlo correttamente.

### Step 4: Aggiungi Configurazione Nginx

Railway ha bisogno di un server per servire i file statici. Creiamo la configurazione:

#### Opzione A: Usa il file già pronto (dopo questo documento)

Nei prossimi passi creerò automaticamente i file necessari.

#### Opzione B: Configurazione Manuale

Nel dashboard Railway:
1. Vai su **Settings** del tuo progetto
2. Alla voce **"Start Command"** inserisci:
   ```
   npx serve -l $PORT
   ```
3. Alla voce **"Build Command"** lascia vuoto (non c'è niente da buildare)
4. Clicca **"Save"**

### Step 5: Configurazione Dominio
1. Nel dashboard del progetto, vai su **Settings**
2. Clicca su **"Generate Domain"**
3. Railway genererà un dominio tipo: `voliamoinalto-production.up.railway.app`
4. Il sito sarà accessibile immediatamente!

### Step 6: Dominio Personalizzato (Opzionale)
1. Nel dashboard, vai su **Settings** > **Domains**
2. Clicca su **"Custom Domain"**
3. Inserisci il tuo dominio: `voliamoinalto.com`
4. Railway ti fornirà un record DNS da configurare:
   - Tipo: `CNAME`
   - Nome: `@` (o `www`)
   - Valore: Il dominio Railway fornito
5. Vai nel pannello del tuo provider di dominio (es. GoDaddy, Namecheap, Cloudflare)
6. Aggiungi il record CNAME
7. Attendi la propagazione DNS (5-30 minuti)

---

## 🔧 Metodo 2: Deploy da CLI (Avanzato)

### Step 1: Installa Railway CLI
```bash
npm install -g @railway/cli
```

### Step 2: Login
```bash
railway login
```

### Step 3: Inizializza Progetto
```bash
railway init
```

### Step 4: Link al Repository
```bash
railway link
```

### Step 5: Deploy
```bash
railway up
```

---

## 📦 Configurazione Ottimale per Railway

Railway funziona meglio con un `package.json` che specifica come servire i file.

### File: `package.json` (già presente nel progetto)
```json
{
  "name": "voliamoinalto",
  "version": "1.0.0",
  "description": "Sito web professionale per servizi di riprese aeree con droni",
  "scripts": {
    "start": "npx serve -l $PORT",
    "dev": "npx serve -l 5000"
  },
  "keywords": ["droni", "riprese aeree", "Milano"],
  "author": "Sebastiano Orfeo",
  "license": "MIT"
}
```

### File: `railway.json` (opzionale ma consigliato)
```json
{
  "$schema": "https://railway.app/railway.schema.json",
  "build": {
    "builder": "NIXPACKS"
  },
  "deploy": {
    "startCommand": "npx serve -l $PORT",
    "restartPolicyType": "ON_FAILURE",
    "restartPolicyMaxRetries": 10
  }
}
```

---

## 🌐 Variabili d'Ambiente (se necessarie)

Railway gestisce automaticamente la variabile `$PORT`.

Se in futuro dovessi aggiungere funzionalità lato server, puoi configurare variabili d'ambiente:

1. Nel dashboard Railway > **Variables**
2. Clicca **"+ New Variable"**
3. Aggiungi le tue variabili (es. API keys)

---

## 📊 Monitoraggio e Logs

### Visualizza Logs in Real-Time
1. Nel dashboard Railway, vai su **Deployments**
2. Clicca sull'ultimo deployment
3. Vedrai i logs in tempo reale

### Metriche
Railway fornisce automaticamente:
- **CPU Usage**
- **Memory Usage**
- **Network Traffic**
- **Build Time**
- **Deploy Time**

---

## 💰 Pricing Railway

### Free Tier
- **$5 di credito gratis al mese**
- Perfetto per siti statici come il tuo
- Include:
  - 500 ore di runtime
  - Deploy illimitati
  - SSL automatico
  - Dominio personalizzato

### Pro Plan ($20/mese se necessario)
- $20 di credito al mese
- Priority builds
- Più risorse

**Per il tuo sito statico, il piano FREE è più che sufficiente!** 🎉

---

## 🔄 Auto-Deploy da GitHub

Railway supporta il deploy automatico:

1. Ogni volta che fai `git push` su GitHub
2. Railway rileva automaticamente il cambiamento
3. Fa il rebuild e deploy automatico
4. Il sito viene aggiornato in 1-2 minuti

**Non devi fare nulla!** È tutto automatico. ✨

---

## 🐛 Troubleshooting

### Problema: "No start command found"
**Soluzione**: Aggiungi script `start` nel `package.json`:
```json
"scripts": {
  "start": "npx serve -l $PORT"
}
```

### Problema: "Port already in use"
**Soluzione**: Railway gestisce automaticamente la porta con `$PORT`. Assicurati di usare:
```bash
npx serve -l $PORT
```
invece di una porta fissa.

### Problema: "Build failed"
**Soluzione**: Railway potrebbe cercare di buildare il progetto. Vai in Settings e:
- **Build Command**: Lascia vuoto o metti `echo "No build needed"`
- **Start Command**: `npx serve -l $PORT`

### Problema: "Files not found"
**Soluzione**: Verifica che `index.html` sia nella root del progetto (non in una sottocartella).

---

## ✅ Checklist Deploy

- [ ] Account Railway creato
- [ ] Repository GitHub collegato
- [ ] Progetto Railway creato
- [ ] Start command configurato (`npx serve -l $PORT`)
- [ ] Deploy completato (status: ✅ Success)
- [ ] Dominio Railway generato e funzionante
- [ ] (Opzionale) Dominio personalizzato configurato
- [ ] SSL/HTTPS attivo (automatico su Railway)
- [ ] Test sito su vari dispositivi
- [ ] Verifica email form di contatto
- [ ] Controlla Google Search Console

---

## 🎯 Vantaggi di Railway

✅ **Deploy automatico** da GitHub  
✅ **SSL/HTTPS gratis** incluso  
✅ **Rollback facile** ad ogni deployment  
✅ **Logs in real-time**  
✅ **Scaling automatico**  
✅ **Zero configurazione** per siti statici  
✅ **Preview deployments** per PR  
✅ **Custom domains** inclusi  

---

## 🔗 Link Utili

- **Railway Dashboard**: https://railway.app/dashboard
- **Railway Docs**: https://docs.railway.app/
- **Railway Status**: https://status.railway.app/
- **Railway Discord**: https://discord.gg/railway (per supporto)

---

## 📞 Supporto

Se hai problemi:
1. Controlla i **logs** nel dashboard Railway
2. Verifica che il `package.json` abbia lo script `start`
3. Controlla la documentazione: https://docs.railway.app/
4. Chiedi aiuto su Discord Railway

---

**Tempo stimato per il primo deploy**: 5-10 minuti ⏱️

**Costo mensile**: $0 (con piano Free) 💰

**Pronto?** Vai su https://railway.app e inizia! 🚀

---

_Creato per: Sebastiano Orfeo - Voliamo in Alto_  
_Data: 22 novembre 2024_

