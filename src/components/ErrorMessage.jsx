function ErrorMessage({ title, message }) {
  return (
    <div className="error-message">
      <h2>{title}</h2>
      <p>{message}</p>
    </div>
  );
}

export default ErrorMessage;
