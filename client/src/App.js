import "./styles/app.styles.scss";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Rooms from "./Pages/Rooms/Rooms";
import Room from "./Pages/Room/Room";
import Header from "./component/Header/Header";
import Booking from "./Pages/Booking/Booking";
import Success from "./Pages/Success/Success";
import Dining from "./Pages/Dining/Dining";
import Spa from "./Pages/Spa/Spa";
import About from "./Pages/About/About";
import Footer from "./component/Footer/Footer";
import Chatbot from "./component/Chatbot/Chatbot";
import RoyalSignature from "./Pages/DiningDetail/RoyalSignature";
import SkylineBar from "./Pages/DiningDetail/SkylineBar";
import GardenTerrace from "./Pages/DiningDetail/GardenTerrace";
import ServiceBooking from "./Pages/ServiceBooking/ServiceBooking";

import ChuyenSau from "./Pages/SpaDetail/ChuyenSau";
import HuongThom from "./Pages/SpaDetail/HuongThom";
import DaNong from "./Pages/SpaDetail/DaNong";


const App = () => {
  return (
    <div>
      <Router>
        <Header />
        <Chatbot />  
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/rooms" element={<Rooms />} />
          <Route path="/room/:id" element={<Room />} />   {/* FIXED */}
          <Route path="/bookings/:id" element={<Booking />} />
          <Route path="/success" element={<Success />} />
          <Route path="/dining" element={<Dining />} />
          <Route path="/spa" element={<Spa />} />
          <Route path="/about" element={<About />} />
          <Route path="/service-booking" element={<ServiceBooking />} />

          {/* Dining Detail */}
          <Route path="/dining/royal-signature" element={<RoyalSignature />} />
          <Route path="/dining/skyline-bar" element={<SkylineBar />} />
          <Route path="/dining/garden-terrace" element={<GardenTerrace />} />

          {/* Spa Detail */}
          <Route path="/spa/chuyen-sau" element={<ChuyenSau />} />
          <Route path="/spa/huong-thom" element={<HuongThom />} />
          <Route path="/spa/da-nong" element={<DaNong />} />

        </Routes>

        <Footer />
      </Router>
    </div>
  );
};

export default App;
