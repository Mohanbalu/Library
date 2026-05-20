export default function FormInput({ label, error, className = '', icon, ...props }) {
  return (
    <label className="block">
      {label ? <span className="label-field">{label}</span> : null}
      <div className="relative">
        {icon ? <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">{icon}</span> : null}
        <input {...props} className={`input-field ${icon ? 'pl-11' : ''} ${className}`} />
      </div>
      {error ? <p className="mt-2 text-sm text-red-600">{error}</p> : null}
    </label>
  );
}
