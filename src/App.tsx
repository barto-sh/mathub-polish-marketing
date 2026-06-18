import { BrowserRouter, Route, Routes } from "react-router-dom";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";

const PROJECT_PAGES_BASENAME = "/mathub-polish-marketing";

const getBasename = () => {
  if (
    window.location.pathname === PROJECT_PAGES_BASENAME ||
    window.location.pathname.startsWith(`${PROJECT_PAGES_BASENAME}/`)
  ) {
    return PROJECT_PAGES_BASENAME;
  }

  return undefined;
};

const App = () => (
  <BrowserRouter
    basename={getBasename()}
    future={{ v7_relativeSplatPath: true, v7_startTransition: true }}
  >
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
);

export default App;
