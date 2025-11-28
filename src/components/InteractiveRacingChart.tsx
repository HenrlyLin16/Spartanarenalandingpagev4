import { LineChart, Line, ResponsiveContainer, Tooltip } from "recharts";
import { useState } from "react";

export function InteractiveRacingChart() {
  const [highlightedLine, setHighlightedLine] = useState<string | null>(null);

  // Generate racing data for Top 5 bots
  const generateRacingData = () => {
    const data = [];
    for (let i = 0; i < 100; i++) {
      data.push({
        x: i,
        Ares: Math.pow(i, 1.15) + Math.random() * 60,
        Leonidas: Math.pow(i, 1.08) + Math.random() * 45,
        Atlas: Math.pow(i, 1.0) + Math.random() * 30,
        SpartanX: Math.pow(i, 0.95) + Math.random() * 25,
        Achilles: Math.pow(i, 1.12) + Math.random() * 50,
      });
    }
    return data;
  };

  const data = generateRacingData();

  const lines = [
    { key: "Ares", color: "#F59E0B", name: "Ares Bot" },
    { key: "Leonidas", color: "#00F0FF", name: "Leonidas Bot" },
    { key: "Atlas", color: "#0ECB81", name: "Atlas Bot" },
    { key: "SpartanX", color: "#A855F7", name: "SPARTANSX Bot" },
    { key: "Achilles", color: "#DC2626", name: "Achilles Bot" },
  ];

  return (
    <div 
      className="w-full overflow-hidden"
      style={{ width: '100%', height: '100%', minHeight: '600px' }}
      onMouseLeave={() => setHighlightedLine(null)}
    >
      <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
        <LineChart data={data}>
          <Tooltip
            content={({ payload }) => {
              if (!payload || payload.length === 0) return null;
              const bot = lines.find(l => l.key === highlightedLine);
              if (!bot) return null;
              return (
                <div className="bg-black/80 border border-[#F59E0B] rounded px-3 py-2">
                  <p className="text-sm" style={{ color: bot.color }}>{bot.name}</p>
                </div>
              );
            }}
          />
          {lines.map((line) => (
            <Line
              key={line.key}
              type="monotone"
              dataKey={line.key}
              stroke={line.color}
              strokeWidth={highlightedLine === line.key ? 4 : 2}
              opacity={highlightedLine === null || highlightedLine === line.key ? 1 : 0.3}
              dot={false}
              onMouseEnter={() => setHighlightedLine(line.key)}
              style={{ cursor: 'pointer' }}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
