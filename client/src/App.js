import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./component/layout/Navbar";
import Footer from "./component/layout/Footer";

import Home from "./Pages/Home/Home";
import Rooms from "./Pages/Rooms/Rooms";
import Room from "./Pages/Room/Room";
import Booking from "./Pages/Booking/Booking";

// ✅ thêm mới:
import Dining from "./Pages/Dining/Dining";
import Spa from "./Pages/Spa/Spa";
import Contact from "./Pages/Contact/Contact";
import About from "./Pages/About/About";
import Success from "./Pages/Success/Success";
import Profile from "./Pages/Profile/Profile";

function App() {
  return (
    <Router>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/rooms" element={<Rooms />} />
        <Route path="/rooms/:id" element={<Room />} />
        <Route path="/bookings/:id" element={<Booking />} />

        
        <Route path="/dining" element={<Dining />} />
        <Route path="/spa" element={<Spa />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/success" element={<Success />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;
