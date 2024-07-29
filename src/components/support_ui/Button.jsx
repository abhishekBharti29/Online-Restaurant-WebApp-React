export default function Button({ children, cssClasses, textOnly, ...props }) {
  const cssClassesToApply = textOnly
    ? `text-button ${cssClasses}`
    : `button ${cssClasses}`;
  return (
    <button className={cssClassesToApply} {...props}>
      {children}
    </button>
  );
}
