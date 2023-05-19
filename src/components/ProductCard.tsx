import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Product from "../types/Product";
import { useState } from 'react';

type ProductCardProps = {
    product: Product,
    addProductToBasket: Function,
    removeProductFromBasket: Function
}

const ProductCard: React.FC<ProductCardProps> = (props : ProductCardProps) => {
    const [product, setProduct] = useState(props.product);

    const removeFromBasket = () => {
        if(product.Quantity < props.product.Quantity){
            setProduct(prevState => ({
                ...prevState,
                Quantity: Number(prevState.Quantity) + 1
            }))
            props.removeProductFromBasket(props.product);
        }
    };

    const addToBasket = () => {
        if(product.Quantity > 0){
            setProduct(prevState => ({
                ...prevState,
                Quantity: Number(prevState.Quantity) - 1
            }))
            props.addProductToBasket(props.product);
        }
    };

    return (
            <Card sx={{ width: 245 }}>
                <CardMedia
                    sx={{ height: 140 }}
                    image={product.ImageURL}
                    title="product"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {product.Name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Category: {product.Category}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Price: {product.Price.toString()} $
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Amount in stock: {product.Quantity.toString()}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small" color="primary" onClick={addToBasket}>Add to cart</Button>
                </CardActions>
                <CardActions>
                    <Button size="small" color="secondary" onClick={removeFromBasket}>Remove from cart</Button>
                </CardActions>
            </Card>
    )
}
export default ProductCard