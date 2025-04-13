import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
    Row, 
    Col,
    ListGroup,
    Image,
    Form,
    Button,
    Card,
} from 'react-bootstrap';
import axios from 'axios';
import { FaTrash } from 'react-icons/fa';
import Message from '../components/Message';
import toast from 'react-hot-toast';

const CartScreen = () => {

    const [ cartItems, setCartItems ] = useState([]);
    const [ itemNames, setItemNames ] = useState([]);
    const [ itemPrices, setItemPrices ] = useState([]);
    const [ itemImages, setItemImages ] = useState([]);

    let origin = 'http://127.0.0.1:8000'

    const get_user_cart_URL = `http://127.0.0.1:8000/api/cart/cart/`;
    const get_product_by_id = `http://127.0.0.1:8000/api/product/product`;

    const token = localStorage.getItem('jwt');

    const headers = {
        'Authorization' : `Bearer ${token}`
    }

    const navigate = useNavigate();

    

    useEffect(() => {
       
        getCartItems();
        async function fetchProductNamesAndPrices(){
            const itemNames = [];
            const itemPrices = [];
            const itemImages = [];
            for (const itemId of cartItems) {
                try {
                    const response = await axios
                        .get(`${get_product_by_id}/${itemId.p_id}`, {headers})
                    const itemName = response.data.name   
                    const itemPrice = response.data.price
                    const itemImage = response.data.image_url 
                    itemNames.push(itemName)  
                    itemPrices.push(itemPrice)
                    itemImages.push(itemImage)  
                } catch (error) {
                    console.log('Error fetching product name!')
                }
            }
            setItemNames(itemNames)
            setItemPrices(itemPrices)
            setItemImages(itemImages)
        }
        fetchProductNamesAndPrices()
    }, [cartItems]);



    const getCartItems = () => {
        axios
          .get(get_user_cart_URL, { headers }) 
          .then((res) => {
            setCartItems(() => {
              return res.data.results;
            });
          }) 
          .catch((err) => {
            console.log(err);
          });
    }



    const checkoutHandler = () => {
        if (token) {
            navigate('/shipping');
        } 
        if (!token) {
            navigate('/login');
        }
    }

    const handleDelete = (cartId) => {
        
        const url = `http://127.0.0.1:8000/api/cart/cart/${cartId}`;

        axios
            .delete(url, { headers })
            .then((response) => {
                console.log("Before Deletion: cartItems" + JSON.stringify(cartItems))
                if(response.status === 204){
                    getCartItems()
                    window.location.reload(true);   //hot-fix error
                    toast.success("Product removed from cart successfully!")
                }
            })
            .catch((error) => {
                toast.error("Error removing the prouct from cart!")
            });
    };



    function calculateTotalPrice() {
        if (itemPrices && cartItems) {
            let total = 0;
            for (let i = 0; i < itemPrices.length; i++) {
                if (cartItems[i].quantity) {
                    total = total + (itemPrices[i] * cartItems[i].quantity)
    
                }
            }    
            return total;
        }
        else{
            return 0;
        }    
    }    



    return (
        <>  
        <Row>   
            <Col md={7}>
                <Link className='btn btn-light my-3' to='/'>
                    Go Back
                </Link>
                <h2 className="mx-2" style={{marginBottom: '20px' }}>Shopping Cart</h2>
                
                { cartItems.length === 0 ? (
                    <Message>
                        Your cart is empty 
                    </Message> 
                ) : (
                    <ListGroup variant='flush'>
                        <Row>
                            <Col md={2} className=''>
                                <b>Image</b>
                            </Col>

                            <Col md={3}>
                                <b>Product Name</b>
                            </Col>

                            <Col md={2}>
                                <b>Price</b>
                            </Col>          

                            <Col md={2}>
                                <b> Quantity</b>
                            </Col>
                            <Col md={2}>
                                <b>Total</b>
                            </Col>
                        </Row>
                        { cartItems.map((item, idx) => (
                            <ListGroup.Item key={item.p_id}>
                                <Row>
                                    <Col md={2}>
                                        <Image fluid height='20%' width='50%' src={(itemImages.length > 0)? `${origin}/${itemImages[idx][0].image_url}`: ``} alt={itemNames[idx]}  />
                                    </Col>
                                                                                                          
                                    <Col md={3}>
                                        <Link to={`/product/${item.p_id}`}>{itemNames[idx]}</Link>
                                    </Col>

                                    <Col md={2}>
                                        Rs. {itemPrices[idx]}
                                    </Col>

                                    <Col md={2}>
                                        <Form.Control
                                            type="text"
                                            placeholder={item.quantity}
                                            readOnly
                                        />
                                    </Col>
                                    <Col md={2}>
                                        Rs. { item.quantity * itemPrices[idx]}
                                    </Col>
                                    <Col md={1}>
                                        <Button type='button' variant='light' onClick={() => handleDelete( item.id )}>
                                            <FaTrash color='red'/>
                                        </Button>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>    
                    )
                }
            </Col>    
            
            <Col md={1}></Col>
            
            <Col md={4}>
                <Card style={{ width: "24rem", margin: "20px", top: "40px" }} className='my-3 p-3 rounded'>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>
                                Subtotal 
                                ({cartItems.reduce((acc, item) => acc + item.quantity, 0)}) items
                            </h2>

                            {/* ${ cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0).toFixed(2)} */}
                        </ListGroup.Item>

                        <ListGroup.Item >
                            <h3>
                                Rs. {calculateTotalPrice()}
                            </h3>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Button 
                                type='button'
                                className='btn-block'
                                disabled={ cartItems.length === 0}
                                onClick={ checkoutHandler }
                            >
                                Proceed to Checkout
                            </Button>
                        </ListGroup.Item>
                    </ListGroup>
                </Card>
            </Col>
        </Row>
        </>
    )
}
export default CartScreen
