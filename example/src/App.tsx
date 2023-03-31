import { useState } from "react";

import ReactCreditCards, { Focused } from "../..";
import "./App.css";
import "../../dist/es/styles-compiled.css";

// https://stripe.com/docs/testing
const CardNumbers = [
  "",
  "4242424242424242",
  "5200828282828210",
  6011000990139424,
  3566002020360505,
  "36227206271667",
  "371449635398431",
  5105105105105100,
  2223003122003222,
];
const CardNames = ["", "John Doe"];
const CardFocusStates: Focused[] = ["", "number", "name", "cvc", "expiry"];
const CardExpiryOptions = ["", "12/2025", "12/25", "12/5", "12/05", "12/2056"];
const CardCvcOptions = ["", "123", "1234"];

function App() {
  const [number, setNumber] = useState<string | number>("");
  const [name, setName] = useState<string>("");
  const [focused, setFocused] = useState<Focused>("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");

  return (
    <div className="App">
      <h1>React-Credit-Cards-2 Testing</h1>
      <ReactCreditCards
        cvc={cvc}
        name={name}
        number={number}
        expiry={expiry}
        focused={focused}
      />

      <div style={{ display: "flex", width: "100%", gap: "1rem" }}>
        <div>
          <p>Set a card number</p>
          <div style={{ display: "flex", flexDirection: "column" }}>
            {CardNumbers.map((cardNumber) => (
              <button
                key={cardNumber}
                onClick={() => {
                  setNumber(cardNumber);
                  if (cardNumber === "") {
                    setFocused("");
                  } else {
                    setFocused("number");
                  }
                }}
                style={{
                  fontWeight: number === cardNumber ? "bold" : undefined,
                }}
              >
                {cardNumber === "" ? "Empty" : cardNumber}
              </button>
            ))}
          </div>
        </div>
        <div>
          <p>Set a name</p>
          <div style={{ display: "flex", flexDirection: "column" }}>
            {CardNames.map((cardName) => (
              <button
                key={cardName}
                onClick={() => {
                  setName(cardName);
                  if (cardName === "") {
                    setFocused("");
                  } else {
                    setFocused("name");
                  }
                }}
                style={{
                  fontWeight: name === cardName ? "bold" : undefined,
                }}
              >
                {cardName === "" ? "Empty" : cardName}
              </button>
            ))}
          </div>
        </div>
        <div>
          <p>Set a expiry</p>
          <div style={{ display: "flex", flexDirection: "column" }}>
            {CardExpiryOptions.map((cardExpiry) => (
              <button
                key={cardExpiry}
                onClick={() => {
                  setExpiry(cardExpiry);
                  if (cardExpiry === "") {
                    setFocused("");
                  } else {
                    setFocused("expiry");
                  }
                }}
                style={{
                  fontWeight: expiry === cardExpiry ? "bold" : undefined,
                }}
              >
                {cardExpiry === "" ? "Empty" : cardExpiry}
              </button>
            ))}
          </div>
        </div>
        <div>
          <p>Set a Cvc</p>
          <div style={{ display: "flex", flexDirection: "column" }}>
            {CardCvcOptions.map((cardCvc) => (
              <button
                key={cardCvc}
                onClick={() => {
                  setCvc(cardCvc);
                  if (cardCvc === "") {
                    setFocused("");
                  } else {
                    setFocused("cvc");
                  }
                }}
                style={{
                  fontWeight: cvc === cardCvc ? "bold" : undefined,
                }}
              >
                {cardCvc === "" ? "Empty" : cardCvc}
              </button>
            ))}
          </div>
        </div>
        <div>
          <p>Set a focus state</p>
          <div style={{ display: "flex", flexDirection: "column" }}>
            {CardFocusStates.map((cardFocus) => (
              <button
                key={cardFocus}
                onClick={() => setFocused(cardFocus)}
                style={{
                  fontWeight: focused === cardFocus ? "bold" : undefined,
                }}
              >
                {cardFocus === "" ? "Empty" : cardFocus}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
