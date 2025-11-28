import { LineChart, Line, ResponsiveContainer } from "recharts";

export function RacingChart() {
  // Generate racing data - multiple strategies diverging from 0
  const generateRacingData = () => {
    const data = [];
    for (let i = 0; i < 100; i++) {
      data.push({
        x: i,
        line1: Math.pow(i, 1.1) + Math.random() * 50,
        line2: Math.pow(i, 1.05) + Math.random() * 30,
        line3: Math.pow(i, 0.95) + Math.random() * 20,
        line4: Math.pow(i, 0.9) + Math.random() * 15,
        line5: Math.pow(i, 0.85) - Math.random() * 10,
      });
    }
    return data;
  };

  const data = generateRacingData();

  return (
    <div className="w-full overflow-hidden" style={{ width: '100%', height: '100%', minHeight: '600px' }}>
      <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
        <LineChart data={data}>
          <Line type="monotone" dataKey="line1" stroke="#00F0FF" strokeWidth={2} dot={false} />
          <Line type="monotone" dataKey="line2" stroke="#F0B90B" strokeWidth={2} dot={false} />
          <Line type="monotone" dataKey="line3" stroke="#0ECB81" strokeWidth={2} dot={false} />
          <Line type="monotone" dataKey="line4" stroke="#A855F7" strokeWidth={2} dot={false} />
          <Line type="monotone" dataKey="line5" stroke="#F6465D" strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}