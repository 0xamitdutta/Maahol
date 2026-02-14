export default function Vibeometer({ ratings }: { ratings: { label: string; value: number }[] }) {
  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
      <h3 className="text-lg font-bold mb-4 font-serif">The Vibeometer</h3>
      <div className="space-y-4">
        {ratings.map((stat) => (
          <div key={stat.label}>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-600 font-medium">{stat.label}</span>
              <span className="text-gray-900 font-bold">{stat.value}/10</span>
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-primary rounded-full transition-all duration-1000"
                style={{ width: `${(stat.value / 10) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
