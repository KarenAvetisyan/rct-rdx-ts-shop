
import "./sidebar.css"
import bag from "../../images/bag.svg"
import choc from "../../images/chocolade.jpg"
import nature from "../../images/nature.jpg"
import { useHistory, withRouter } from "react-router-dom"

const Sidebar= () => {

    const history = useHistory();
    
    return (
        <section className="sc-sidebar">
            <div className="rek-box">
                <div className="img-box">
                    <img src={bag} alt="" />
                </div>
                <h4>Получай товары <span>БЕСПЛАТНО!</span></h4>
                <a href="#">Узнать подробнее</a>
            </div>

            {
                !(history.location.pathname == '/delivery' ||
                  history.location.pathname == '/order-history') 
            && <>
                    <div className="custom-rek-box" style={{backgroundImage: `url(${choc})`}}>
                    <a href="#">Новая<br/> коллекция</a>
                    </div>

                    <div className="custom-rek-box" style={{backgroundImage: `url(${nature})`}}>
                        <a href="#">Новая<br/> коллекция</a>
                    </div>

                    <div className="custom-rek-box" style={{backgroundImage: `url(${choc})`}}>
                        <a href="#">Новая<br/> коллекция</a>
                    </div>
                </>
            }

        </section>
    )
}

export default withRouter(Sidebar);