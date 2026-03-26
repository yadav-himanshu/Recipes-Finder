

const NutritionStats = ({ nutrients }) => {
    if (!nutrients) return null;

    const { PROCNT, CHOCDF, FAT } = nutrients;
    const protein = Math.round(PROCNT?.quantity || 0);
    const carbs = Math.round(CHOCDF?.quantity || 0);
    const fat = Math.round(FAT?.quantity || 0);

    const total = protein + carbs + fat || 1;
    const pPct = Math.round((protein / total) * 100);
    const cPct = Math.round((carbs / total) * 100);
    const fPct = Math.round((fat / total) * 100);

    const stats = [
        { label: "Protein", value: protein, unit: "g", color: "bg-blue-500", pct: pPct, bg: "bg-blue-50" },
        { label: "Carbs", value: carbs, unit: "g", color: "bg-amber-500", pct: cPct, bg: "bg-amber-50" },
        { label: "Fat", value: fat, unit: "g", color: "bg-rose-500", pct: fPct, bg: "bg-rose-50" }
    ];

    return (
        <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm space-y-8">
            <div className="flex items-center justify-between">
                <h3 className="text-xl font-black text-slate-800 tracking-tight">Nutrition Snapshot</h3>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest border border-slate-100 px-3 py-1 rounded-full">Per Serving</span>
            </div>

            <div className="grid grid-cols-3 gap-4">
                {stats.map((stat, i) => (
                    <div key={i} className={`${stat.bg} p-5 rounded-2xl flex flex-col items-center text-center group hover:scale-105 transition-transform`}>
                        <span className="text-2xl font-black text-slate-800">{stat.value}{stat.unit}</span>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-1">{stat.label}</span>
                    </div>
                ))}
            </div>

            <div className="space-y-4">
                <div className="flex h-3 w-full rounded-full overflow-hidden bg-slate-100 ring-4 ring-slate-50/50">
                    {stats.map((stat, i) => (
                        <div
                            key={i}
                            style={{ width: `${stat.pct}%` }}
                            className={`${stat.color} h-full transition-all duration-1000`}
                            title={`${stat.label}: ${stat.pct}%`}
                        />
                    ))}
                </div>
                <div className="flex justify-between text-[11px] font-bold text-slate-400 uppercase tracking-widest px-1">
                    <span className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-blue-500" /> {pPct}% Protein</span>
                    <span className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-amber-500" /> {cPct}% Carbs</span>
                    <span className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-rose-500" /> {fPct}% Fat</span>
                </div>
            </div>
        </div>
    );
};

export default NutritionStats;
