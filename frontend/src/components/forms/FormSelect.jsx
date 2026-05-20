export default function FormSelect({ label, error, options = [], className = '', ...props }) {
  return (
    <label className="block">
      {label ? <span className="label-field">{label}</span> : null}
      <select {...props} className={`input-field ${className}`}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error ? <p className="mt-2 text-sm text-red-600">{error}</p> : null}
    </label>
  );
}
