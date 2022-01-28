import './App.css';
import Header from "./components/header/Header"
import { Route, Switch} from "react-router-dom"
import Categories from './components/categories/Categories';
import Cart from './components/cart/Cart';
import { useState, useEffect } from "react";
import Delivery from './components/delivery/Delivery';
import OrderHistory from './components/order-history/OrderHistory';
import Sidebar from "./components/sidebar/Sidebar"
import Footer from "./components/footer/Footer"

function App() {
  const [ inputValue, setInputValue ] = useState('');

  return (
    <>
          <div className="App">
            <div className="content-left">
                <Header inputValue={inputValue} setInputValue={setInputValue} />
                <Switch>
                  <Route exact path="/"><Categories inputValue={inputValue} setInputValue={setInputValue}  /></Route>
                  <Route path="/cart" ><Cart/></Route>
                  <Route path="/delivery" ><Delivery/></Route>
                  <Route path="/order-history" ><OrderHistory/></Route>
                </Switch>
            </div>
            <div className="content-right">
                <Sidebar />
            </div>
            
        </div>
        <Footer />
    </>
  );
}

export default App;
