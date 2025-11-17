import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Roboto', sans-serif;

    /* 🔥 Fondo animado aplicado a TODA LA WEB */
    background: linear-gradient(135deg, #000428, #004e92, #001b44, #003060);
    background-size: 400% 400%;
    animation: moverFondo 12s ease infinite;
    color: #fff;
    min-height: 100vh;
  }

  @keyframes moverFondo {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
`;


export default GlobalStyle;
