import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Assets/Css/style.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./hooks/useThemeContext";
import { useContext, useEffect } from "react";
import { DContext } from "./Context/DContext";
import { ToastContainer } from "react-toastify";
import { DProvider } from "./Context/DContext";
import AppRouter from "./AppRouter";


function App() {
  // Context Variables
  const { user, userToken } = useContext(DContext);

  return (
    <>
      <ThemeProvider>
        <Router>
          <DProvider>
          </DProvider>
          <AppRouter />
        </Router>
      </ThemeProvider>
      <ToastContainer />
    </>
  );
}

export default App;
