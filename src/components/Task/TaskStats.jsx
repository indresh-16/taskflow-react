export default function TaskStats({ total, completed, remaining }) {
  return (
    <div className="mt-6 p-4 rounded-2xl bg-white dark:bg-slate-800/95 border border-slate-200 dark:border-slate-700 shadow-sm">
      <div className="grid grid-cols-3 gap-3 text-center">
        <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-700/60 border border-slate-200/80 dark:border-slate-600 transition-colors">
          <div className="text-xl mb-1">📋</div>
          <div className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-200">
            Total
          </div>
          <div className="text-2xl font-black text-slate-900 dark:text-white mt-1">
            {total}
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-700/60 transition-colors">
          <div className="text-xl mb-1">✅</div>
          <div className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-300">
            Completed
          </div>
          <div className="text-2xl font-black text-emerald-800 dark:text-emerald-300 mt-1">
            {completed}
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-amber-50 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-700/60 transition-colors">
          <div className="text-xl mb-1">⌛</div>
          <div className="text-xs font-bold uppercase tracking-wider text-amber-700 dark:text-amber-300">
            Remaining
          </div>
          <div className="text-2xl font-black text-amber-800 dark:text-amber-300 mt-1">
            {remaining}
          </div>
        </div>
      </div>
    </div>
  );
}