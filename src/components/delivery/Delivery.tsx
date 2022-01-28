import { connect } from "react-redux";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { clearCarts, addToHistory } from "../../actions/RootAction";

interface Props {
    carts: any;
    dispatch: any;
}

const Delivery: React.FC<Props> = ({carts, dispatch}) => {
    const allCarts = carts.cartState;
    const [deliveryPrice, setDeliveryPrice] = useState<any>();
    const history = useHistory();
    const [ myAddress, setMyAddress ] = useState<string>('');
    const costDelivery = 200;
    const [ myDate, setMyDate ] = useState<any>('');

    const moveToHistory = 
        allCarts.map((cart: { id:number, imgUrl:any, title:string, qty:number, price: number, added: boolean, order_number:number}) => {
            if(cart.added === true) {
                return cart;
            }
        })

    useEffect(() => {
        // total price 
        let price = 0;
        allCarts.map((cart: { qty: number; price: number; added:boolean }) => {
           if(cart.added === true) {
            return  price +=  cart.qty * cart.price
           }
        })
        setDeliveryPrice(price);
    }, [carts.cartState])

    const makeOrder = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        history.push("/order-history");
        dispatch(addToHistory(moveToHistory, myDate, myAddress))
        dispatch(clearCarts(carts.cartState))
    }

    setTimeout(()=> {
        allCarts.length === 0 && history.push('/')
    },1000)

    return (
        <section className="sc-delivery">
            <h2>{allCarts.length === 0 ? "Нечего доставлять"
             : "Доставка"}</h2>
           <div className="form-container">
                <form onSubmit={(e) => makeOrder(e)}>
                    <label>
                        <h3>Когда доставить?</h3>
                        <input type="date" value={myDate} onChange={(e) => setMyDate(e.target.value)}  required/>
                        <input type="time" required />
                    </label>

                    <label>
                        <h3>Куда доставить?</h3>
                        <input type="text" value={myAddress} onChange={(e) => setMyAddress(e.target.value)} placeholder="Выберите адрес доставки"  required />
                    </label>

                    <label>
                        <h3>Имя</h3>
                        <input type="text" required />
                    </label>

                    <label>
                        <h3>Телефон</h3>
                        <input type="tel" required/>
                    </label>


                    <div className="form-box">
                        {
                            allCarts.map((cart:any) => {
                               if(cart.added === true) {
                                return (
                                    <React.Fragment key={cart.id}>
                                        <input type="hidden" data-name={"Товар"} value={[
                                        "id-Товара" + " _ " + cart.id, 
                                        'Название:' + ' _ ' + cart.title,
                                        'Кол-во:' +  " _ " + cart.qty + " шт.",
                                        'Номер заказа:' + cart.order_number 
                                        ]} />
                                    </React.Fragment>
                                )
                               }
                            })
                        }
                    </div>
                    {allCarts.length !== 0 && <div className="apply-box">
                        <div className="apply-settings">
                           <ul>
                               <li><span>Стоимость товаров:</span> <span>{deliveryPrice}₽</span></li>
                               <li><span>Стоимость доставки:</span> <span>{costDelivery}₽</span></li>
                               <li><span>Итого:</span> <span>{deliveryPrice + costDelivery}₽</span></li>
                           </ul>
                        </div>
                        <input type="submit" value="Сделать заказ" />
                    </div>}
                </form>
           </div>
        </section>
    )
}

const mapStateToProps = (state: { cartState: any; }) => ({
    carts: state,
})

export default connect(mapStateToProps)(Delivery);