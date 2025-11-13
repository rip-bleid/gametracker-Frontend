import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    background: linear-gradient(135deg, #0b0c10 0%, #1f2833 100%);
    color: #c5c6c7;
    font-family: 'Orbitron', sans-serif;
    min-height: 100vh;
  }

  h1, h2, h3 {
    color: #66fcf1;
    text-shadow: 0 0 10px #45a29e;
  }

  input, button {
    font-family: 'Orbitron', sans-serif;
  }

  button {
    background: #45a29e;
    border: none;
    padding: 10px 20px;
    color: #0b0c10;
    border-radius: 10px;
    font-weight: bold;
    cursor: pointer;
    transition: 0.3s;
  }

  button:hover {
    background: #66fcf1;
    transform: scale(1.05);
  }
`;

export default GlobalStyle;
