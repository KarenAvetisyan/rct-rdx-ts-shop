import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { removeCart, increaseQty, decreaseQty, clearCarts } from "../../actions/RootAction";
import { Link } from "react-router-dom";
import './cart.css';
import del_icon from "../../images/delete.svg";
import bag_staff from "../../images/bag-staff.svg";

interface Props {
    carts: any,
    dispatch: any;
}

const Cart: React.FC<Props> = ({carts, dispatch}) => {

    const allCarts = carts.cartState;
    const [ totalPrice, setTotalPrice ] = useState<number>();

    useEffect(() => {
        // total price 
        let price = 0;
        allCarts.map((cart: { qty: number; price: number; }) => {
        return price += cart.qty * cart.price;
        })
        setTotalPrice(price);
    }, [carts.cartState])
    
    // render all carts 
    const renderAllCarts = () => {
            return (
                allCarts.length === 0 ? <h2>Корзина Пуста</h2> : 
                allCarts.map((cart: any, id: number) => ( 
                    <React.Fragment key={id}>
                      <div className="single-cart">
                            <div className="img-box">
                                <img src={cart.imgUrl} alt="" />
                            </div>
                            <div className="single-cart-title">
                                <h4>{cart.title}</h4>
                            </div>
                            <div className="count-carts">
                                {
                                    cart.qty === 1
                                    ?<button style={cart.qty === 1 ? {pointerEvents: "none"} : {pointerEvents: "all"}}>-</button>
                                    :<button style={cart.qty === 1 ? {pointerEvents: "none"} : {pointerEvents: "all"}} onClick={() => {handleDecreaseQty(cart.id, 1, cart.price)}}>-</button>
                                }
                                <span>{cart.qty}</span>
                                <button onClick={() => {handleIncreaseQty(cart.id, 1, cart.price)}}>+</button>
                            </div>
                            <div className="price-info">
                                <p className="price">{cart.qty * cart.price + ' '}₽</p>
                                <p className="old-price"><del>{cart.old_price + ' '}₽</del></p>
                            </div>
                            <button className="remove-cart" onClick={() => {handleRemoveCart(cart.id)}}><img src={del_icon} /></button>
                      </div>
                    </React.Fragment>
                ))
            ) 
    }

    // increase qty 
    const handleIncreaseQty = (id: Number, qty: Number, price: Number) => {
        dispatch(increaseQty(id, qty, price))
        return;
    }

    // decrease qty 
    const handleDecreaseQty = (id: Number, qty: Number, price: Number) => {
        dispatch(decreaseQty(id, qty, price))
        return;
    }

    // remove cart 
    const handleRemoveCart = (id: Number) => {
        dispatch(removeCart(id));
        return; 
    }

    // clear carts 
    const handleClearCarts = (allCarts: any) => {
        dispatch(clearCarts(allCarts))
    }

    return (
        <div className='sc-added-carts'>
            {allCarts.length !== 0 && 
                <div className='cart-header'>
                    <h2>Корзина</h2>
                    <button onClick={() => handleClearCarts(allCarts)}>Очистить корзину</button>
                </div>
            }

            <div className="carts-content">
                <div className="cart-head-property">
                    <div className="cart-title">
                        <h3>Товары</h3>
                    </div>
                    <div  className="cart-all-cost" >
                        <h4>Стоимость корзины: </h4>
                        <span className="total-price">{ totalPrice === 0 ? '' : totalPrice + ' ₽' }</span>
                    </div>
                    {
                    totalPrice !== 0 &&
                    <div className='deliver-apply-btn'>
                        <Link to={"/delivery"}>Оформить</Link>
                    </div>
                    }
                    <div className="img-box">
                        <img src={bag_staff} alt="" />
                    </div>
                </div>
                <div className="single-cart-container">
                    {renderAllCarts()}
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state: { cartState: any; }) => ({
    carts: state,
    
})
export default connect(mapStateToProps)(Cart);
