
const [name, setName] = useState("");
const [isFocused, setIsFocused] = useState(false);

export const Saludo = () => {
  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  return (
    <div className="container">
      <input
        type="text"
        value={name}
        onChange={handleNameChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholder="Your Name"
      />
      <div className={`greeting ${isFocused ? "focused" : ""}`}>
        {isFocused ? "Hello World" : `Hello ${name || "Guest"}`}
      </div>
    </div>
  );
};
