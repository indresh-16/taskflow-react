export default function Header() {
  return (
    <div className="text-center mb-8">
      <div className="inline-flex items-center justify-center gap-2 mb-3">
        <span className="text-3xl">✅</span>
        <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          TaskFlow
        </h1>
      </div>
      <p className="text-lg text-slate-600 dark:text-slate-300 font-medium">
        Manage your daily tasks easily
      </p>
    </div>
  );
}