import { useState, FormEvent } from "react";
import AdminSidebar from "../../Components/AdminSidebar";

const allLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
const allNumbers = "1234567890";
const allSymbols = "!@#$%^&*()_+";

const Cuppon = () => {
  const [size, setSize] = useState<number>(8);
  const [prefix, setPrefix] = useState<string>("");
  const [includeNumbers, setIncludeNumbers] = useState<boolean>(false);
  const [includeCharacters, setIncludeCharacters] = useState<boolean>(false);
  const [includeSymbols, setIncludeSymbols] = useState<boolean>(false);
  const [isCopied, setIsCopied] = useState<boolean>(false);

  const [coupon, setCoupon] = useState<string>("");

  async function copyText(coupon: string) {
    await window.navigator.clipboard.writeText(coupon);
    setIsCopied(true);
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!includeNumbers && !includeCharacters && !includeSymbols) {
      return alert("Please select at least one");
    }
    let result: string = prefix || "";
    const loopLength: number = size - result.length;

    for (let i = 0; i < loopLength; i++) {
      let entireString = "";
      if (includeNumbers) entireString += allNumbers;
      if (includeCharacters) entireString += allLetters;
      if (includeSymbols) entireString += allSymbols;

      // You can use ~~ Bitwise operater otherwise you can use Math.floor() Both convert
      const randomNumber = Math.floor(Math.random() * entireString.length);
      setIsCopied(false);
      result += entireString[randomNumber];
      setCoupon(result);
    }
  };

  return (
    <div className="adminContainer">
      <AdminSidebar />
      <main className="app-container">
        <h1>Cuppon</h1>
        <section>
          <form className="coupon-form" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Text to include"
              value={prefix}
              onChange={(e) => setPrefix(e.target.value)}
              maxLength={size}
            />
            <input
              type="number"
              placeholder="Coupon Length"
              value={size}
              onChange={(e) => setSize(Number(e.target.value))}
              min={8}
              max={25}
            />
            <fieldset>
              <legend>Include</legend>
              <input
                id="number"
                type="checkbox"
                checked={includeNumbers}
                onChange={() => setIncludeNumbers((prev) => !prev)}
              />
              <label htmlFor="number">Numbers</label>

              <input
                id="character"
                type="checkbox"
                checked={includeCharacters}
                onChange={() => setIncludeCharacters((prev) => !prev)}
              />
              <label htmlFor="character">Characters</label>

              <input
                id="symbol"
                type="checkbox"
                checked={includeSymbols}
                onChange={() => setIncludeSymbols((prev) => !prev)}
              />
              <label htmlFor="symbol">Symbols</label>
            </fieldset>
            <button type="submit">Generate</button>
          </form>
          {coupon && (
            <code>
              {coupon}{" "}
              <span onClick={() => copyText(coupon)}>
                {isCopied ? "Copied" : "Copy"}
              </span>{" "}
            </code>
          )}
        </section>
      </main>
    </div>
  );
};

export default Cuppon;
