import React from "react"
import ReactDOM from "react-dom/client"
import { ChakraProvider, defaultSystem } from "@chakra-ui/react"
import App from "./App"
import { BrowserRouter } from "react-router-dom"

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <ChakraProvider value={defaultSystem}>
        <App />
      </ChakraProvider>
    </BrowserRouter>
  </React.StrictMode>
)