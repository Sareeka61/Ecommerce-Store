import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from 'react-hot-toast';
import {
    Form,
    Row,
    Col,
    Image,
    ListGroup,
    Card,
    Button,
    ListGroupItem 
} from 'react-bootstrap';
import Rating from "../components/Rating";

const ProductScreen = () => {
    const { id: productId } = useParams();

    const [ val, setVal ] = useState(0); 

    const serverUrl = `http://127.0.0.1:8000/api/product/product/${productId}/`;
    const add_to_cart_URL =`http://127.0.0.1:8000/api/cart/cart/`; 
    let origin = 'http://127.0.0.1:8000';
    const [product, setProduct] = useState({});
    const [ description, setDescription ] = useState('Turn heads with luscious, jet-black tresses using our black hair color shampoo, your go-to for salon-quality results at home.');

    useEffect(() => {
      axios
        .get(serverUrl) 
        .then((res) => {
          setProduct(() => {
            return res.data;
          });
        }) 
        .catch((err) => {
          console.log(err);
        }); 
    }, [serverUrl]);
    const navigate = useNavigate();

    const addToCartHandler = async () => {
        const token = localStorage.getItem('jwt');
        
        const headers = {
            'Authorization' : `Bearer ${token}`
        }

        const body = {
            p_id : productId,
            quantity: val
        }

        if(token && (body.quantity < 1 )){
            toast.error("Min 1 qty required");
        }
        if ( token &&  (body.quantity >= 1 )) {
                axios
                    .post(add_to_cart_URL, 
                        body
                    , {headers})
                    .then((res) => {
                        toast.success("Product added to cart successfully")
                        navigate('/cart')
                    })
                    .catch((err) => {
                        toast.error(err.response.data.error);
                    })
        }
        if (!token){
            toast.error("Redirected to Login!");
            navigate('/login');
        }
    }

    const updateQuantity = (e) => {
        setVal( () => {
            return e.target.value   
        })    
    }

    const displayDescription = (id) => {
        if (id === 1) {
            setDescription('awesome product')
        }
        if(id === 2) {
            setDescription('new product')
        }
        if (id === 3) {
            setDescription('Experience the thrill of flight with our helicopter remote toy, designed for kids of all ages to soar through the skies with ease and excitement!')
        }if(id === 4) {
            setDescription('Elevate your hair care routine with our revitalizing shampoo, formulated to cleanse, nourish, and leave your locks looking and feeling their best')
        }
        if (id === 5) {
            setDescription("Unleash the excitement with our racing car for kids – the ultimate adrenaline-packed adventure for young speed enthusiasts!")
        }if(id === 6) {
            setDescription('Transform your look effortlessly with our black hair color shampoo, delivering vibrant and long-lasting results in just one wash')
        }
        if (id === 7) {
            setDescription("Step into a world of deep, rich black hues with our color-enhancing shampoo – your path to hair excellence")
        }if(id === 8) {
            setDescription('Turn heads with luscious, jet-black tresses using our black hair color shampoo, your go-to for salon-quality results at home.')
        }
        if (id === 9) {
            setDescription("Fuel your child's imagination and let them race into adventure with our thrilling racing car for kids – where dreams become reality")
        }
        else{ 
            setDescription('newest in the market')
        }
    }


  return (
    <>
            <Link className='btn btn-light my-3' to='/'>
                Go Back
            </Link>
                <Row>
                <Col md={3}>
                    
                    <Image fluid
                        src={(Object.keys(product).length > 0) ? `${origin}/${product.image_url[0].image_url}`:``}
                    />
                </Col>
                <Col md={4}>
                    <ListGroup variant="flush">
                        <ListGroupItem>
                            <h3>{product.name}</h3>
                        </ListGroupItem>
                        <ListGroupItem>
                            <Rating value={product.rating} test={`${product.numReviews} reviews`} />
                        </ListGroupItem>
                        <ListGroup.Item as='h5'>Price: Rs. {product.price}</ListGroup.Item>
                        <ListGroup.Item>Category: {product.category}</ListGroup.Item>
                        <ListGroup.Item >Description: {description} </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md={3}>
                    <Card>
                        <ListGroup variant="flush">
                            <ListGroup.Item>
                                <Row>
                                    <Col>Price:</Col>
                                    <Col>
                                        <strong>Rs. {product.price}</strong>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                            <Row>
                                    <Col>Status:</Col>
                                    <Col>
                                        <strong>{product.stock > 0 ? `In Stock - [${product.stock}]` : 'Out Of Stock'}</strong>
                                    </Col>
                                </Row>
                            </ListGroup.Item>

                                <ListGroup.Item>
                                    <Row>
                                        <Col>Qty</Col>
                                        <Col>
                                            <Form.Control
                                                value={ val }
                                                as='input'
                                                placeholder={product.stock}
                                                onChange={(e) => updateQuantity(e)}
                                            >      
                                            </Form.Control>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>

                            <ListGroup.Item>
                                <Button
                                    className="btn-block"
                                    type="button"
                                    disabled={product.stock === 0}
                                    onClick={addToCartHandler}
                                >
                                    Add To Cart 
                                </Button>    
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </>
  )
}

export default ProductScreen