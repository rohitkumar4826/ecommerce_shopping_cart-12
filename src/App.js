import "./App.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Shop } from "./pages/shop/shop";
import { Contact } from "./pages/contact";
import { Cart } from "./pages/cart/cart";
import { ShopContextProvider } from "./context/shop-context";
import { Login } from "./pages/login";
import { SignUp } from "./pages/signup";
import {Admin} from "./pages/admin";
import {Userview} from "./pages/userview";
function App() {

  return (
    <div className="App">
      <ShopContextProvider>
        <Router>
          {/* <Navbar /> */}
          <Routes>
            <Route path="/shop" element={<Shop />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/login" element={<Login/>}/>
            <Route path="/admin" element={<Admin/>}/>
            <Route path="/userview" element={<Userview/>}/>
            <Route path="/" element={<SignUp/>}/>
          </Routes>
        </Router>
      </ShopContextProvider>
    </div>
  );
}

export default App;
