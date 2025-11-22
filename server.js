// Server Node.js per gestire il form contatti con Resend
const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('.'));

// CORS per permettere richieste da qualsiasi origine
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

// API endpoint per il form contatti
app.post('/api/contact', async (req, res) => {
    try {
        const { name, email, service, message } = req.body;

        // Validazione base
        if (!name || !email || !message) {
            return res.status(400).json({
                success: false,
                message: 'Nome, email e messaggio sono obbligatori'
            });
        }

        // Invia email con Resend
        const Resend = require('resend').Resend;
        const resend = new Resend(process.env.RESEND_API_KEY);

        const emailData = {
            from: `${process.env.RESEND_FROM_NAME} <${process.env.RESEND_FROM_EMAIL}>`,
            to: process.env.RESEND_FROM_EMAIL, // Email destinatario
            replyTo: email, // Email del cliente per rispondere facilmente
            subject: `Nuovo contatto da ${name} - Voliamo in Alto`,
            html: `
                <!DOCTYPE html>
                <html>
                <head>
                    <meta charset="UTF-8">
                    <style>
                        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                        .header { background: linear-gradient(135deg, #2563eb 0%, #7c3aed 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
                        .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
                        .field { margin-bottom: 20px; }
                        .field-label { font-weight: bold; color: #2563eb; margin-bottom: 5px; }
                        .field-value { background: white; padding: 15px; border-radius: 5px; border-left: 4px solid #2563eb; }
                        .footer { text-align: center; padding: 20px; color: #6b7280; font-size: 14px; }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <div class="header">
                            <h1>🚁 Nuovo Contatto - Voliamo in Alto</h1>
                        </div>
                        <div class="content">
                            <div class="field">
                                <div class="field-label">👤 Nome:</div>
                                <div class="field-value">${name}</div>
                            </div>
                            
                            <div class="field">
                                <div class="field-label">📧 Email:</div>
                                <div class="field-value"><a href="mailto:${email}">${email}</a></div>
                            </div>
                            
                            ${service ? `
                            <div class="field">
                                <div class="field-label">🎥 Tipo di Servizio:</div>
                                <div class="field-value">${service}</div>
                            </div>
                            ` : ''}
                            
                            <div class="field">
                                <div class="field-label">💬 Messaggio:</div>
                                <div class="field-value">${message.replace(/\n/g, '<br>')}</div>
                            </div>
                        </div>
                        <div class="footer">
                            <p>Ricevuto da voliamoinalto.com</p>
                            <p>Rispondi direttamente a questa email per contattare il cliente</p>
                        </div>
                    </div>
                </body>
                </html>
            `
        };

        const data = await resend.emails.send(emailData);

        console.log('Email inviata con successo:', data);

        res.json({
            success: true,
            message: 'Email inviata con successo!',
            id: data.id
        });

    } catch (error) {
        console.error('Errore invio email:', error);
        res.status(500).json({
            success: false,
            message: 'Errore durante l\'invio dell\'email',
            error: error.message
        });
    }
});

// Serve index.html per tutte le altre route
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Avvio server
app.listen(PORT, () => {
    console.log(`🚀 Server in ascolto sulla porta ${PORT}`);
    console.log(`🌐 Sito disponibile su http://localhost:${PORT}`);
    console.log(`📧 Resend API configurata: ${process.env.RESEND_API_KEY ? '✅' : '❌'}`);
});

