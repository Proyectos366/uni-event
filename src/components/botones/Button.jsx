const variantes = {
  primary: "bg-unievents-teal text-white hover:bg-unievents-dark",
  back: "bg-white text-unievents-teal border border-unievents-teal hover:bg-teal-50",
};

export default function Button({
  children,
  className = "",
  type = "button",
  variant = "primary",
  disabled,
  onClick,
  nombre,
  title,
}) {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      title={title}
      className={`px-6 py-2 rounded-full font-bold cursor-pointer transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${variantes[variant]} ${className}`}
    >
      {children}
      {nombre}
    </button>
  );
}
