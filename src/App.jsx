import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import {
  Landing,
  Error,
  Register,
  Dashboard,
  ProtectedRoute,
  Stats
} from "../src/pages/Index";
import { SharedLayout, Profile, AddJobs, AllJobs } from "./dashboard";

function App() {
  const [count, setCount] = useState(0);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <SharedLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Stats />} />
          <Route path="all-jobs" element={<AllJobs/>} />
          <Route path="add-job" element={<AddJobs />} />
          <Route path="profile" element={<Profile />} />
        </Route>
        <Route path="landing" element={<Landing />} />
        <Route path="register" element={<Register />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
