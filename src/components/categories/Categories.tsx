import './categories.css';
import { useState, useEffect } from "react";
import { connect } from 'react-redux';
import { addCart, removeCart } from '../../actions/RootAction';
import axios from 'axios';

interface Props {
    carts: any;
    inputValue: string;
    setInputValue: React.Dispatch<React.SetStateAction<string>>;
    dispatch: any;
}   

const Cats: React.FC<Props> = ({ inputValue, setInputValue, dispatch, carts }) => {

    const [ activeClass, setActiveClass ] = useState<String>();
    const [ openSets, setOpenSets ] = useState(true);
    const [ pending, setPending ] = useState(false);
    const [ cats, setCats ] = useState<any[]>([])
    const [ products, setProducts ] = useState<any[]>(cats);

    const renderCartId = carts ? carts.cartState.map((obj: any) => {
        return  obj.id;
      }): [];

    const [addedToCart, setAddedToCart] = useState<any>(renderCartId); 

  

    useEffect(() => {
        setAddedToCart(renderCartId)
    }, [carts.cartState]);

    // toggle categories 
    const toggleCats = () => {
        setOpenSets(!openSets)
    }

    // get data 
    const getData = async () => {
        setPending(true)
        try {
            const res = await axios("https://my-json-server.typicode.com/KarenAvetisyan/my-json/products");
            const data = await res.data;
            setPending(false)
            setCats(data)
            setProducts(data)
        }catch{
            console.log("Error")
        }
      
    }
    
    // use effect 
    useEffect(() => {
        getData();
     }, [])

    // filter tags 
    const handleFilter = (name: string) => {
        setActiveClass(name)
        let updatedItems = cats.filter((elem) => {
            return elem.category.includes(name)
        })
        setInputValue("");
        setProducts(updatedItems);
    }

    // render pending 
    const renderPending = ():false | JSX.Element => {
        return (
           pending && 
            <div className='pending' style={{width: '100%'}}>
                <h2>Згрузка товаров...</h2>
            </div>
        )
    }

    // render tags 
    const renderTags = (): false | JSX.Element => {
        return (
        openSets 
            ? <div>
                <button className={activeClass === 'Игрушка' ? 'active-btn' : 'btn' } style={{border: "solid 1px #2967FF", background: '#2967FF'}} onClick={(e) => {handleFilter('Игрушка');}}>Игрушка</button>
                <button className={activeClass === 'Мартышка' ? 'active-btn' : 'btn' } style={{border: "solid 1px #58CF18", background: '#58CF18'}} onClick={(e) => {handleFilter('Мартышка');}}>Мартышка</button>
                <button className={activeClass === 'Мишка' ? 'active-btn' : 'btn' } style={{border: "solid 1px #FFA601", background: '#FFA601'}} onClick={(e) => {handleFilter('Мишка');}}>Мишка</button>
                <button className={activeClass === 'Подарок' ? 'active-btn' : 'btn' } style={{border: "solid 1px #FF7CB4", background: '#FF7CB4'}} onClick={(e) => {handleFilter('Подарок');}}>Подарок</button>
                <button className={activeClass === 'Подарок коллегам' ? 'active-btn' : 'btn' } style={{border: "solid 1px #FFA601", background: '#FFA601'}} onClick={(e) => {handleFilter('Подарок коллегам');}}>Подарок коллегам</button>
                <button className={activeClass === 'День Рождения Гриши' ? 'active-btn' : 'btn' } style={{border: "solid 1px #FF7CB4", background: '#FF7CB4', color: "#fff"}} onClick={(e) => {handleFilter('День Рождения Гриши');}}>День Рождения Гриши</button>
                </div>
            : false 
        )
    }
    // render products 
    const renderProducts = () => {
           return (
            products.map((product, id) => (
                    <div className="product-box" key={id}>
                        <div className="img-box">
                            <img src={product.imgUrl} alt="" />
                            <div className="inner-tags">
                            {product.category.map((i:any, index: number) => {
                               if(i === "Игрушка"){
                                    return (
                                        <span style={{background: '#2967FF'}} key={index}>{i}</span>
                                    )
                                }
                                else if(i === "Мартышка"){
                                    return (
                                        <span style={{background: '#58CF18'}} key={index}>{i}</span>
                                    )
                                }
                                else if(i === "Мишка" || i === "Подарок коллегам"){
                                    return (
                                        <span style={{background: '#FFA601'}} key={index}>{i}</span>
                                    )
                                }
                                else if(i === "Подарок"){
                                    return (
                                        <span style={{background: '#FF7CB4'}} key={index}>{i}</span>
                                    )
                                }
                                else if(i === "День Рождения Гриши"){
                                    return (
                                        <span style={{background: '#fff', border: 'solid 1px pink', color: "#000"}} key={index}>{i}</span>
                                    )
                                }
                            })}
                            </div>
                        </div>
                        <h4>{product.title}</h4>
                        <p className="price">от {product.price }</p>
                        <p className="old-price"><span>{product.old_price + ' ₽'}</span> {product.discount}%</p>
                        <div className="buttons">
                            <button style={addedToCart.includes(product.id) ? {pointerEvents: 'none', background: '#30c530', borderColor: '#30c530', color: '#fff'} : {pointerEvents: 'all'}}
                                onClick={() => {
                                    handleAddCart(product.title, product.price, product.old_price, product.imgUrl, product.id, product.order_number);
                                }}>
                                { addedToCart.includes(product.id)  ? 'Добавлено': 'Добавить в корзину' } 
                            </button>
                            {
                                addedToCart.includes(product.id)  &&
                                <button style={addedToCart.includes(product.id) ? { background: 'red', borderColor: '#30c530', color: '#fff'} : {pointerEvents: 'all'}}
                                    onClick={() => {
                                        handleRemoveCart(product.id) 
                                    }}>
                                Удалить
                            </button>
                            }
                        </div>
                    </div>
            ))
           ) 
    }

    // render products for search input 
    const renderProductsFromSearch = () => {
        return (
           cats.filter((product) => {
                if(inputValue == ''){
                    return product;
                } 
                
                else if (
                    product.category.some((v: string) => v.toLowerCase().includes(inputValue.toLowerCase())) 
                    || product.title.toLowerCase().includes(inputValue.toLowerCase()))  {
                        return product;
                }
               
                
            }).map((product, id) => (
                <div className="product-box" key={id}>
                    <div className="img-box">
                        <img src={product.imgUrl} alt="" />
                        <div className="inner-tags">
                        {product.category.map((i:any, index: number) => {
                                if(i === "Игрушка"){
                                return (
                                    <span style={{background: '#2967FF'}} key={index}>{i}</span>
                                )
                            }
                            else if(i === "Мартышка"){
                                return (
                                    <span style={{background: '#58CF18'}} key={index}>{i}</span>
                                )
                            }
                            else if(i === "Мишка" || i === "Подарок коллегам"){
                                return (
                                    <span style={{background: '#FFA601'}} key={index}>{i}</span>
                                )
                            }
                            else if(i === "Подарок"){
                                return (
                                    <span style={{background: '#FF7CB4'}} key={index}>{i}</span>
                                )
                            }
                            else if(i === "День Рождения Гриши"){
                                return (
                                    <span style={{background: '#fff', border: 'solid 1px pink', color: "#000"}} key={index}>{i}</span>
                                )
                            }
                        })}
                        </div>
                    </div>
                    <h4>{product.title}</h4>
                    <p className="price"> от { product.price }</p>
                    <p className="old-price"><span>{product.old_price + '₽'}</span> {product.discount}%</p>
                    <div className="buttons">
                            <button style={addedToCart.includes(product.id) ? {pointerEvents: 'none', background: '#30c530', borderColor: '#30c530', color: '#fff'} : {pointerEvents: 'all'}}
                                onClick={() => {
                                    handleAddCart(product.title, product.price, product.old_price, product.imgUrl, product.id, product.order_number);
                                }}>
                                { addedToCart.includes(product.id)  ? 'Добавлено': 'Добавить в корзину' } 
                            </button>
                            {
                                addedToCart.includes(product.id)  &&
                                <button style={addedToCart.includes(product.id) ? { background: 'red', borderColor: '#30c530', color: '#fff'} : {pointerEvents: 'all'}}
                                    onClick={() => {
                                        handleRemoveCart(product.id) 
                                    }}>
                                Удалить
                            </button>
                            }
                    </div>
                </div>
            )) 
        )
       
    }

    // add cart 
    const handleAddCart = (title: String, price: Number, old_price: Number, imgUrl: String, id: Number, order_number: Number) => {
        dispatch(addCart(title, price, old_price, imgUrl, id, order_number));
        return; 
    }
    
    // remove cart 
    const handleRemoveCart = (id: Number) => {
        dispatch(removeCart(id));
        return; 
    }

    return (
        <section className='sc-cats'>
            <div className="tag-container">
                <h2>Категории товаров</h2>
                <button className="settings" onClick={toggleCats}>Настройки</button>
            </div>
            <ul className="tags">
                {renderTags()}
            </ul>
            
            <div className="products">
                {renderPending()}
                {inputValue == "" ? renderProducts() : renderProductsFromSearch()  }
            </div> 
            
        </section>
    )
}

const mapStateToProps = (state: { cartState: any; }) => ({
    carts: state,
})

export default connect(mapStateToProps)(Cats);
function filteredItems(filteredItems: any, arg1: { from: { opacity: number; marginTop: number; }; enter: { opacity: number; maxHeight: number; marginTop: number; }; leave: { opacity: number; maxHeight: number; marginTop: number; }; }) {
    throw new Error('Function not implemented.');
}

