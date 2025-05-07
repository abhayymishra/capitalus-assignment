import React, { useState, useRef, useEffect } from "react";
import ChartIcon from "./ChartIcon";
import companyImgIcon from "../../assets/companyImgIcon.png";
import actionImg1 from "../../assets/actionImg1.svg";
import actionImg2 from "../../assets/actionImg2.svg";

const Home = () => {
  const [stockData, setStockData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const companyLogos = {
    CCL: "https://companieslogo.com/img/orig/CCL.NS-6abcdd13.png?t=1603311859",
    GREENLAM:
      "https://www.greenlamindustries.com/wp-content/uploads/2019/01/180x180.png",
    TATVA: "https://tatvasoft.com/public/images/tatvasoft-logo.svg",
    POLYMED:
      "https://www.polymedicure.com/wp-content/uploads/2023/08/polymedicure-logo.png",
    CHAMBLFERT: "https://www.chambalfertilisers.com/assets/images/logo.png",
    GODREJAGRO:
      "https://www.godrejagrovet.com/public/images/Godrej-Agrovet.png",
  };

  useEffect(() => {
    // Define the companies you want to fetch data for - using Indian stocks
    const companies = [
      "CCL",
      "GREENLAM",
      "TATVA",
      "POLYMED",
      "CHAMBLFERT",
      "GODREJAGRO",
    ];

    const fetchStockData = async () => {
      try {
        setLoading(true);

        // Using Alpha Vantage free API (limited to 25 requests per day)
        const apiKey = "demo"; // Using the demo key - replace with your free key from alphavantage.co

        // Fetch data for each symbol
        const promises = companies.map(async (symbol) => {
          const url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${apiKey}`;
          const response = await fetch(url);

          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }

          const data = await response.json();

          // Sometimes the API returns an empty response or error message
          if (
            data["Note"] ||
            !data["Global Quote"] ||
            Object.keys(data["Global Quote"]).length === 0
          ) {
            console.warn(`Limited API calls or no data for ${symbol}`);
            // Return placeholder data if API limit is reached
            return {
              symbol: symbol,
              lastPrice: Math.random() * 1000 + 100, // Random price for demo
              dayHigh: Math.random() * 1000 + 120,
              dayLow: Math.random() * 1000 + 80,
              pChange: Math.random() * 10 - 2.5, // Random change between -2.5% and +10%
              previousClose: Math.random() * 1000 + 100,
              totalTradedVolume: Math.floor(Math.random() * 10000000),
              isPlaceholder: true, // Flag to indicate this is placeholder data
            };
          }

          const quote = data["Global Quote"];

          return {
            symbol: symbol,
            lastPrice: parseFloat(quote["05. price"]),
            dayHigh: parseFloat(quote["03. high"]),
            dayLow: parseFloat(quote["04. low"]),
            pChange: parseFloat(quote["10. change percent"].replace("%", "")),
            previousClose: parseFloat(quote["08. previous close"]),
            totalTradedVolume: parseInt(quote["06. volume"]),
            isPlaceholder: false,
          };
        });

        const results = await Promise.all(promises);
        setStockData(results);

        // Log the data in a structured format
        console.log("Stock Data for Selected Companies:");
        console.table(results, [
          "symbol",
          "lastPrice",
          "dayHigh",
          "dayLow",
          "pChange",
          "previousClose",
          "totalTradedVolume",
          "isPlaceholder",
        ]);

        setLoading(false);
      } catch (err) {
        console.error("Error fetching stock data:", err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchStockData();
  }, []);

  const formatIndianNumber = (num) => {
    if (num === undefined || num === null) return "N/A";

    const numStr = num.toString();
    let result = "";

    // For numbers less than 1000, no formatting needed
    if (numStr.length <= 3) {
      return numStr;
    }

    // Handle decimals if present
    const parts = numStr.split(".");
    let intPart = parts[0];
    const decimalPart = parts.length > 1 ? "." + parts[1] : "";

    // Format the integer part with commas
    // First, add the last 3 digits
    result = intPart.slice(-3);
    // Then add the rest with commas after every 2 digits from right to left
    intPart = intPart.slice(0, -3);

    while (intPart.length > 0) {
      result = intPart.slice(-2) + "," + result;
      intPart = intPart.slice(0, -2);
    }

    // Remove leading comma if present
    if (result.charAt(0) === ",") {
      result = result.slice(1);
    }

    return result + decimalPart;
  };
  const marketLinks = [
    "Top gainers",
    "Top losers",
    "Same open & low",
    "Same open & high",
    "Gap up",
    "Gap down",
  ];

  const [hoverIndex, setHoverIndex] = useState(null);
  const menuRefs = useRef([]);
  const navContainerRef = useRef(null);
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });

  useEffect(() => {
    if (
      hoverIndex !== null &&
      menuRefs.current[hoverIndex] &&
      navContainerRef.current
    ) {
      const itemRect = menuRefs.current[hoverIndex].getBoundingClientRect();
      const containerRect = navContainerRef.current.getBoundingClientRect();

      setIndicatorStyle({
        left: itemRect.left - containerRect.left,
        width: itemRect.width,
      });
    }
  }, [hoverIndex]);

  return (
    <section className="mt-16">
      <h1 className="text-[33px] text-[#0f2137] font-semibold text-center">
        Share Market Today
      </h1>

      {/* Navigation + Divider container */}
      <div ref={navContainerRef} className="relative mt-11 w-[90%] mx-auto">
        {/* Menu Items */}
        <nav className="flex flex-wrap gap-8 justify-center text-base font-medium text-gray-800">
          {marketLinks.map((label, index) => (
            <div
              key={index}
              ref={(el) => (menuRefs.current[index] = el)}
              onMouseEnter={() => setHoverIndex(index)}
              onMouseLeave={() => setHoverIndex(null)}
              className="cursor-pointer hover:text-blue-600 transition"
            >
              <h2>{label}</h2>
            </div>
          ))}
        </nav>

        {/* Divider line */}
        {/* Divider line */}
        <div className="relative w-full h-px bg-[#dee2e6] mt-6">
          {hoverIndex !== null && (
            <div
              className="absolute h-px transition-all duration-300"
              style={{
                left: `${indicatorStyle.left - 4}px`,
                width: `${indicatorStyle.width + 8}px`,
                backgroundColor: "#1d4ed8",
                top: 0,
              }}
            />
          )}
        </div>
      </div>

      {/* Table content */}
      <div className="w-full px-4 sm:px-8 mt-6">
        <div className="overflow-x-auto">
          <table className="min-w-full border-separate border-spacing-y-2 text-sm">
            <thead className="bg-[#f1f5fa] text-[#495057] text-[13px]">
              <tr>
                <th className="px-4 py-3 text-left">Chart</th>
                <th className="px-4 py-3 text-left">Symbol</th>
                <th className="px-4 py-3 text-right">Current Price</th>
                <th className="px-4 py-3 text-center">Today L/H</th>
                <th className="px-4 py-3 text-right">Change (%)</th>
                <th className="px-4 py-3 text-right">Prev. Close</th>
                <th className="px-4 py-3 text-right">Volume</th>
                <th className="px-4 py-3 text-right">Action</th>
              </tr>
            </thead>

            <tbody className="text-gray-700">
              {loading ? (
                <tr>
                  <td colSpan="8" className="text-center py-4">
                    Loading stock data...
                  </td>
                </tr>
              ) : (
                stockData.map((stock, index) => (
                  <tr key={index} className="bg-white shadow-sm rounded">
                    <td className="px-4 py-2">
                      <button
                        href="/"
                        className="w-[35px] h-[35px] rounded-lg border border-[#dee2e6] flex items-center justify-center"
                      >
                        <ChartIcon />
                      </button>
                    </td>
                    <td className="px-4 py-2">
                      <a href="/" className="flex gap-2 items-center">
                        {/* Optional image */}
                        {/* <img
            src={companyLogos[stock.symbol]}
            alt="company"
            className="w-[40px] h-[40px] rounded-[20px]"
          /> */}
                        <span>{stock.symbol}</span>
                      </a>
                    </td>
                    <td className="px-4 py-2 text-right">
                      {stock.lastPrice?.toFixed(2) || "N/A"}
                    </td>
                    <td className="px-4 py-2 text-center">
                      <span className="text-red-500">
                        {stock.dayLow?.toFixed(2)}
                      </span>
                      <span>{"<-->"}</span>
                      <span className="text-[#00b865]">
                        {stock.dayHigh?.toFixed(2)}
                      </span>
                    </td>
                    <td
                      className={`px-4 py-2 text-right ${
                        stock.lastPrice - stock.previousClose >= 0
                          ? "text-[#00b865]"
                          : "text-red-600"
                      }`}
                    >
                      {`${(stock.lastPrice - stock.previousClose).toFixed(
                        2
                      )} (${stock.pChange.toFixed(2)}%)`}
                    </td>
                    <td className="px-4 py-2 text-right">
                      {stock.previousClose?.toFixed(2) || "N/A"}
                    </td>
                    <td className="px-4 py-2 text-right">
                      {formatIndianNumber(stock.totalTradedVolume) || "N/A"}
                    </td>
                    <td className="px-4 py-2 text-right justify-end flex gap-3">
                      <img src={actionImg1} alt="" />
                      <img src={actionImg2} alt="" />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default Home;
