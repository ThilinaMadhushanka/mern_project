import { Box, Toaster, ToastRoot, ToastTitle, ToastDescription, ToastIndicator, ToastCloseTrigger } from "@chakra-ui/react";
import { appToaster } from "./toaster";
import HomePage from "./assets/HomePage";
import CreatePage from "./assets/CreatePage";
import Navbar from "./components/ui/Navbar";
import { Routes, Route } from "react-router-dom";


function App() {
  return (
    <Box minH={"100vh"}>
      <Toaster toaster={appToaster} placement="top-end">
        {(toast) => (
          <ToastRoot key={toast.id} {...toast}>
            <ToastIndicator />
            <Box>
              {toast.title && <ToastTitle>{toast.title}</ToastTitle>}
              {toast.description && <ToastDescription>{toast.description}</ToastDescription>}
            </Box>
            <ToastCloseTrigger />
          </ToastRoot>
        )}
      </Toaster>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreatePage />} />
      </Routes>
    </Box>
  )
}

export default App
