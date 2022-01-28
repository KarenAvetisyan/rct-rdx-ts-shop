import logo from "../../images/react-icon.svg";
import cart_icon from "../../images/cart-icon.svg";
import profile_img from "../../images/profile-img.png";
import './header.css';
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";

interface Props {
    inputValue: string;
    setInputValue: React.Dispatch<React.SetStateAction<string>>;
    carts: any;
}
const Header: React.FC<Props> = ({inputValue, setInputValue, carts }) => {

    const [searchTerm, setSearchTerm] = useState(inputValue);
    const history = useHistory();

    const totalCartsCount = carts ? carts.cartState.length : 0;
    const [totalItems, setTotalItems] = useState<any>(carts ? carts.cartState.length : 0);

    // submit
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setInputValue(searchTerm);
        history.push('/');
    }

     useEffect(() => {
        setTotalItems(totalCartsCount);
    }, [carts.cartState]);
    
    return ( 
        <header>
            <div className="logo">
                <Link to="/"><img src={logo} alt="" /></Link>
            </div>
            <div className="location">
                <Link to={'/order-history'}>Страница истории</Link>
            </div>
            <div className="searchbar">
                <form onSubmit={handleSubmit}>
                    <input value={searchTerm} onChange={e => {setSearchTerm(e.target.value)}} type="text" placeholder="Поиск бренда, товара, категории..." />
                    <input type="submit" />
                </form>
            </div>
            <div className="cart">
                <Link to="/cart">
                    <img src={cart_icon} alt="" />
                    <span>{totalItems}</span>
                </Link>
            </div>
            <div className="profile">
                <img src={profile_img} alt="" />
            </div>
        </header>
     );
}

const mapStateToProps = (state: { cartState: any; }) => ({
    carts: state,
})
 
export default connect(mapStateToProps)(Header);


