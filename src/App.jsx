import { Route, Routes } from "react-router-dom";
import Layout from "./Layout";
import {
  Finish,
  History,
  Home,
  NotFound,
  QuizLayout,
  ViewHistoryId,
} from "./pages";
import { QuizProvider } from "./context/QuizContext";
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <QuizProvider>
      <Routes>
        <Route element={<Layout />} path="/">
          <Route index element={<Home />} />
          <Route path="/finish" element={<Finish />} />
          <Route path="/history" element={<History />} />
          <Route path="/history/:id" element={<ViewHistoryId />} />
        </Route>

        <Route element={<QuizLayout />} path="/quiz" />

        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster />
    </QuizProvider>
  );
};

export default App;
