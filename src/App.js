import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Assets/Css/style.css";
import { BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider } from "./hooks/useThemeContext";
import { ToastContainer } from "react-toastify";
import { DProvider } from "./Context/DContext";
import AppRouter from "./AppRouter";

function App() {
  // Context Variables

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
