import {useEffect, useState} from 'react'
import {v4} from 'uuid';
import axios from 'axios';
import ProductCard from "./components/ProductCard";
import Header from "./components/Header";
import Product from "./types/Product";
import Order from "./types/Order";
import config from "./config.json";
import Skeleton from '@mui/material/Skeleton';
import './App.css'
import {ListItem, List, Stack} from "@mui/material";
import Payments from './components/Payments';
import BasketType from './types/Basket';


function App() {
    const basketId = 8; //Should be extracted from the logging session but for purpose of this app It is hardcoded
    const [basketOpen, setBasketOpen] = useState(false);
    const [basket, setBasket] = useState<BasketType>({
        Id: basketId.toString(),
        Status: "Open",
        Orders: []
    });
    const [products, setProducts] = useState<Array<Product>>([]);

    const handleClickOpenBasket = () => {
        setBasketOpen(true);
    };

    const handleCloseBasket = () => {
        setBasketOpen(false);
    };


    const addProductToBasket = (product: Product) => {
        if (basket?.Orders == undefined){
            basket.Orders = []
        }
        let item = basket?.Orders.find(order => order.ProductId == product.ID);
        if (item == undefined) {
            item = {
                Id: v4(),
                ProductId: product.ID,
                Quantity: 1
            };
            setBasket((prevBasket : BasketType) => {
                return {
                    ...prevBasket,
                    Orders: [
                        ...prevBasket.Orders,
                        item
                    ]
                } as BasketType
            })

        } else {
            item.Quantity = Number(item.Quantity) + 1;
            setBasket((prevBasket) => {
                return {
                    ...prevBasket,
                    Orders: prevBasket.Orders.map(order => {
                        if(order.ProductId == item?.ProductId) return item;
                        return order;
                    })
                } as BasketType
            })
        }

        console.log(basket);
    };

    const removeProductFromBasket = (product: Product) => {
        if (basket?.Orders == undefined){
            basket.Orders = []
        }
        let item = basket?.Orders?.find(order => order.ProductId == product.ID)
        if (item != undefined) {
            item.Quantity = Number(item.Quantity) - 1;
            if (item.Quantity === 0) {
                setBasket(prevBasket => {
                    return {
                        ...prevBasket,
                        Orders: prevBasket.Orders.filter(order => order.Id != item?.Id)
                    } as BasketType
                });
                return;
            }
            setBasket(prevBasket => {
                return {
                    ...prevBasket,
                    Orders: prevBasket.Orders.map(order => {
                        if(order.ProductId == item?.Id) return item;
                        return order;
                    })
                } as BasketType
            });
        }
        console.log(basket);
    }

    useEffect(() => {
        axios({
            method: 'get',
            url: `${config.serverURL}/products`
        }).then((response) => {
            //console.log(response);
            setProducts((prevProducts) => {
                return [
                    ...response.data.Products
                ]
            });
        });
    }, [basketOpen]);

    useEffect(() => {
        axios({
            method: 'get',
            url: `${config.serverURL}/baskets/${basketId}`
        }).then(async (response) => {
            console.log(response);
            if(response.data.Basket == undefined) {
                const postResp = await axios.post(`${config.serverURL}/baskets`, {
                    Id: basketId
                })
                setBasket(postResp.data.Basket);
                return;
            }
            setBasket(response.data.Basket);
        });
    }, []);


    return (
        <div className="App">
            <Header openBasket={handleClickOpenBasket}/>
            <Payments basketItems={basket.Orders.map(order => {
                return {
                    ...products.find(product => product.ID == order.ProductId),
                    Quantity: order.Quantity
                }
            })}
                basketOpen={basketOpen}
                closeBasket={handleCloseBasket}/>
            <List direction="row" component={Stack}>
                {
                    products.map((product) =>
                        <ListItem>
                            <ProductCard product={product}
                                addProductToBasket={addProductToBasket}
                                removeProductFromBasket={removeProductFromBasket}
                            />
                        </ListItem>
                    )
                }
            </List>
        </div>
    )
}

export default App
