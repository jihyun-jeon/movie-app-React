import React from "react";
import ReactDOM from "react-dom";
import MovieApp from "./4.movieApp";
import { ThemeProvider } from "styled-components";
import { theme } from "./2.theme";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <MovieApp />
      </ThemeProvider>
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
