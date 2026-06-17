const express = require("express");
const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

// Health check
app.get("/", (req, res) => {
    res.json({ status: "ok", message: "Webhook funcionando en Fly.io" });
});

// Webhook endpoint para MercadoPago
app.post("/webhook", (req, res) => {
    // Responder 200 inmediato (MP lo exige)
    res.sendStatus(200);

    const body = req.body;
    const paymentId = body?.data?.id || "sin-id";
    console.log(`[WEBHOOK] Pago recibido: ${paymentId}`);
    console.log(`[WEBHOOK] Body completo:`, JSON.stringify(body, null, 2));
});

// Listener
app.listen(PORT, () => {
    console.log(`[SISTEMA] Servidor escuchando en puerto ${PORT}`);
});
