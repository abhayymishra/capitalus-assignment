require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { SmartAPI } = require("smartapi-javascript");
const { authenticator } = require("otplib");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.get("/api/fetch-stock-data", async (req, res) => {
  try {
    const smart_api = new SmartAPI({
      api_key: process.env.SMARTAPI_KEY,
    });

    // FIXED: Use the correct environment variable name for TOTP
    const totp = authenticator.generate(process.env.TOTP);

    const session = await smart_api.generateSession(
      process.env.CLIENT_CODE,
      process.env.PASSWORD,
      totp
    );

    if (!session?.data?.access_token) {
      throw new Error("Access token not found in session response");
    }

    smart_api.setSessionToken({
      accessToken: session.data.access_token,
    });

    const instruments = [
      { exchange: "NSE", symboltoken: "3045", symbol: "RELIANCE" },
      { exchange: "NSE", symboltoken: "2885", symbol: "TCS" },
      { exchange: "NSE", symboltoken: "1594", symbol: "INFY" },
    ];

    const quotes = [];

    for (const instrument of instruments) {
      try {
        const data = await smart_api.getQuote({
          exchange: instrument.exchange,
          symboltoken: instrument.symboltoken,
        });
        quotes.push({
          symbol: instrument.symbol,
          data: data.data,
        });
      } catch (err) {
        console.error(`Error fetching ${instrument.symbol}:`, err.message);
        quotes.push({
          symbol: instrument.symbol,
          error: err.message,
        });
      }
    }

    res.json({ success: true, quotes });
  } catch (error) {
    console.error("SmartAPI error:", error);
    res.status(500).json({
      success: false,
      error: error.message || "Failed to fetch stock data",
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});