import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(cors());

app.get("/api/yahoo", async (req, res) => {
  const symbol = req.query.symbol;

  if (!symbol) {
    return res.status(400).json({ error: "Missing ?symbol=" });
  }

  try {
    const url = `https://query1.finance.yahoo.com/v8/finance/chart/${symbol}?range=1d&interval=5m`;

    const r = await fetch(url);
    const data = await r.json();

    const result = data.chart?.result?.[0];
    if (!result) {
      return res.status(500).json({ error: "No Yahoo data" });
    }

    const last = result.meta.regularMarketPrice;
    const prev = result.meta.chartPreviousClose;

    const closes = result.indicators.quote[0].close.filter((x) => x != null);

    return res.json({
      price: last,
      previousClose: prev,
      changePct: ((last - prev) / prev) * 100,
      spark: closes.slice(-20),
    });
  } catch (e) {
    console.error("Yahoo API error:", e);
    res.status(500).json({ error: "Yahoo API failed" });
  }
});

const PORT = 5000;
app.listen(PORT, () =>
  console.log("Yahoo backend running on http://localhost:" + PORT)
);
