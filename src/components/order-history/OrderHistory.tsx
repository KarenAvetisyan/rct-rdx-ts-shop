import {connect} from "react-redux";
import './orderHistory.css';
import { clearHistory } from "../../actions/RootAction"

interface Props {
    carts: any;
    dispatch: any;
}

const OrderHistory: React.FC<Props> = ({carts, dispatch}) => {

    const cartHistory = carts.cartHistoryState;

    const handleClearCarts = (cartHistory: any) => {
        dispatch(clearHistory(cartHistory))
    }

    return (
        <section className="sc-order-history">
            <h2>История заказов</h2>
            {cartHistory && <button onClick={() => handleClearCarts(cartHistory)}>Очистить истприю</button>}
            <div className="order-container">
                {
                    cartHistory.map((h:any, id:number) => {
                        return (
                            <div className="single-history" key={id}>
                                <div className="h-head">
                                    <div className="img-box">
                                        <img  src={h.imgUrl} alt="" />
                                    </div>
                                    <div className="h-title">
                                        <h2>{h.title}</h2>
                                        <div className="sub-info">
                                            <h4>{h.myDate}</h4>
                                            <span>Подробнее</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="h-info">
                                    <div className="h-status">
                                        <span>Статус заказа</span><br/>
                                        <span>Оплачен/Завершён</span>
                                    </div>
                                    <div className="h-number">
                                        <span>Номер заказа</span><br/>
                                        <a href="#"><span>#{h.order_number}</span></a>
                                    </div>
                                </div>
                                <div className="h-product-info">
                                    <div className="h-pr-info">
                                        <span>Кол-во товаров</span><br/>
                                        <span>{h.qty} шт.</span>
                                    </div>
                                    <div className="h-pr-info">
                                        <span>Стоимость заказа</span><br/>
                                        <span>{h.qty * h.price} ₽</span>
                                    </div>
                                    <div className="h-pr-info">
                                        <span>Адрес доставки</span><br/>
                                        <span>{h.myAddress}</span>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </section>
    )
}

const mapStateToProps = (state: {cartState: any, cartHistoryState:any}) => ({
    carts: state
})

export default connect(mapStateToProps)(OrderHistory);