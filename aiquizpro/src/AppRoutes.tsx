import { Route, Routes } from "react-router";
import Landing from "./pages/Landing";
import TakeQuiz from "./pages/TakeQuiz";
import CreateQuiz from "./pages/CreateQuiz";
import LayoutShell from "./pages/Shell";
import QuizDetails from "./pages/QuizDetails";

function AppRoutes() {
  return (
    <Routes>
      <Route element={<LayoutShell />}>
        <Route path="/" element={<Landing />} />
        <Route path="/create" element={<CreateQuiz />} />
        <Route path="/quizDetails">
          <Route path=":quizId" element={<QuizDetails />} />
        </Route>
        <Route path="/quiz">
          <Route path=":quizId" element={<TakeQuiz />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default AppRoutes;
