import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  * {
    padding: 0;
    marging: 0;
    border: none;
  }
  body {
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    transition: .4s;
  }

  textarea,
  button {
    outline: 0px !important;
    -webkit-appearance: none;
    box-shadow: none !important;
  }
`;
