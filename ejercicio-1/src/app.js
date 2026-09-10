const express = require('express');
const app = express();
const port = 3100;

app.get('/api/calcular/:monto', (req, res) => {
    try {
        const monto = Number(req.params.monto);

        if (isNaN(monto) || monto <= 0) {
            throw new Error();
        }

        const renta = monto * 0.10;
        const iva = monto * 0.13;

        const resObj = {
            monto: monto,
            iva: iva,
            renta: renta
        };

        res.json(resObj);
    } catch (error) {
        res.status(400).json({ error: 'El salario debe ser un número mayor a cero' });
    }
});

app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});
