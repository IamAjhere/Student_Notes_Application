import "./App.css";

import "bootstrap/dist/css/bootstrap.css";

import Login from "./components/login";

import Missing from "./components/missing";
import Home from "./components/home";
import Unauthorized from "./components/unauthorized";

import Infoupdate from "./components/Students/infoupdate";

import Notespage from "./components/Students/notespage";
import Notelist from "./components/Students/notelist";
import Noteedit from "./components/Students/noteedit";
import Notecreate from "./components/Students/notecreate";

import Adminpage from "./components/Admin/adminpage";
import Register from "./components/register";
import Userslist from "./components/userslist";

import RequireAuth from "./components/RequireAuth";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Routes>
        {/* Protected routes */}
        <Route element={<RequireAuth allowedRoles={["Admin"]} />}>
          <Route path="adminpage" element={<Adminpage />}>
            <Route path="register" element={<Register />} />
            <Route path="users" element={<Userslist />} />
          </Route>
        </Route>
        <Route element={<RequireAuth allowedRoles={["NewStudent"]} />}>
          <Route path="/infoupdate" element={<Infoupdate />} />
        </Route>
        <Route element={<RequireAuth allowedRoles={["Student"]} />}>
          <Route path="notes" element={<Notespage />}>
            <Route path="list" element={<Notelist />} />
            <Route path="create-notes" element={<Notecreate />} />
            <Route path="edit-notes/:id" element={<Noteedit />} />
          </Route>
        </Route>
        {/* Not Protected routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
        {/* Catch ALL */}
        <Route path="*" element={<Missing />} />
      </Routes>
    </div>
  );
}

export default App;
