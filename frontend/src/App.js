import Appbar from "./Components/Appbar";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from "./container/Login/Login";
import Footer from "./Components/Footer";
import Register from "./container/Resgister/Register";
import Profile from "./container/Profile/Profile";

function App() {
  return (
    <Router>
      <Appbar />
      <main style={{ paddingBottom: "15rem" }}>
        <Route path="/" component={Login} exact />
        <Route path="/register" component={Register} exact />
        <Route path="/profile" component={Profile} exact />
      </main>
      <Footer />
    </Router>
  );
}

export default App;
