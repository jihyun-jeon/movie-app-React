import React from "react";
import ReactDOM from "react-dom";
import MovieApp from "./1.movieApp";
import { ThemeProvider } from "styled-components";
import { theme } from "./theme";

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <MovieApp />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
