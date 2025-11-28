import { TrendingUp, DollarSign, Trophy } from "lucide-react";

export function DashboardPanel() {
  const stats = [
    {
      icon: TrendingUp,
      label: "Total Traders",
      value: "52",
      color: "#00F0FF"
    },
    {
      icon: DollarSign,
      label: "Total Volume",
      value: "$120,450,000",
      color: "#F0B90B"
    },
    {
      icon: Trophy,
      label: "Top ROI (24h)",
      value: "+312.5%",
      color: "#0ECB81"
    }
  ];

  return (
    <section className="px-4 py-12 -mt-24 relative z-20">
      <div className="max-w-7xl mx-auto">
        {/* Glassmorphism card */}
        <div 
          className="rounded-2xl border border-white/10 p-8 backdrop-blur-xl"
          style={{
            background: 'rgba(11, 14, 17, 0.6)',
            boxShadow: '0 8px 32px 0 rgba(0, 240, 255, 0.1)'
          }}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl">Dashboard Overview</h2>
            <span className="text-sm text-gray-400 px-3 py-1 rounded-full border border-gray-600">
              Guest View
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {stats.map((stat, index) => (
              <div 
                key={index}
                className="p-6 rounded-xl border border-white/5 bg-white/5 hover:bg-white/10 transition-all"
              >
                <div className="flex items-center gap-4">
                  <div 
                    className="p-3 rounded-lg"
                    style={{ backgroundColor: `${stat.color}20` }}
                  >
                    <stat.icon size={24} style={{ color: stat.color }} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">{stat.label}</p>
                    <p 
                      className="text-2xl font-mono tabular-nums mt-1"
                      style={{ color: stat.color }}
                    >
                      {stat.value}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
