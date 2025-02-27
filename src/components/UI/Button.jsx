function Button({ children, textOnly, className, ...props }) {
  const cssClasses = textOnly
    ? `text-button ${className}`
    : `button ${className}`;

  //   let cssClasses = textOnly ? "text-only" : "button";
  //   cssClasses += " " + className;

  return (
    <button className={cssClasses} {...props}>
      {children}
    </button>
  );
}

export default Button;
