const express = require("express");
const app = express();
const port = 3000;

app.get("/api/envios", (req, res) => {
  if (!req.query.country) {
    return res.status(400).json({ message: "Country is required" });
  }
  if (!req.query.weight) {
    return res.status(400).json({ message: "Weight is required" });
  }

  const country = req.query.country.toLowerCase();
  const weight = Number(req.query.weight);

  if (isNaN(weight) || weight <= 0) {
    return res.status(400).json({ message: "Weight must be a valid number" });
  }

  let fee;

  switch (country) {
    case "elsalvador":
      fee = 1.5;
      break;
    case "guatemala":
      fee = 2.0;
      break;
    case "honduras":
      fee = 2.25;
      break;
    case "nicaragua":
      fee = 2.5;
      break;
    case "costarica":
      fee = 3.0;
      break;
    case "panama":
      fee = 3.5;
      break;
    default:
      return res.status(400).json({ message: "Not a valid country" });
      break;
  }

  function totalCalculator(w, f) {
    let baseamount;
    let discount = 0;
    let surcharge = 0;
    let total = 0;
    baseamount = w * f;

    if (w > 20) {
      discount = 0.1;
      total = baseamount * (1 - discount);
    } else if (w < 1) {
      surcharge = 5.0;
      total = baseamount + surcharge;
    } else total = baseamount;
    return {
      baseamount,
      discount,
      surcharge,
      total,
    };
  }

  let result = totalCalculator(weight, fee);

  res.json({
    pais: country,
    peso: weight,
    tarifaPorKg: fee,
    costoBase: result.baseamount,
    descuento: result.discount,
    recargo: result.surcharge,
    total: result.total,
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
