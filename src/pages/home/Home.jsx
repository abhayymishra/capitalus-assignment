import React, { useState, useRef, useEffect } from "react";

const Home = () => {
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
              <tr className="bg-white shadow-sm rounded">
                <td className="px-4 py-2">—</td>
                <td className="px-4 py-2">—</td>
                <td className="px-4 py-2 text-right">—</td>
                <td className="px-4 py-2 text-center">—</td>
                <td className="px-4 py-2 text-right">—</td>
                <td className="px-4 py-2 text-right">—</td>
                <td className="px-4 py-2 text-right">—</td>
                <td className="px-4 py-2 text-right">—</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default Home;
