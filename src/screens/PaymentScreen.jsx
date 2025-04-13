import { useState } from 'react';
import { Form, Button, Col, FormGroup } from 'react-bootstrap';
import FormContainer from '../components/FormContainer';
import CheckoutSteps from '../components/CheckoutSteps';
import axios from 'axios';
import toast from 'react-hot-toast';

export const PaymentScreen = () => {

    const [coupon,setCoupon] = useState("");

    const return_url = `http://127.0.0.1:3000/placeorder`;

    const handleCouponChange = (e)=>{
        setCoupon(()=>{
            return e.target.value
        })
    }

    const url = 'http://127.0.0.1:8000/api/payment/payment/';

    const token = localStorage.getItem('jwt');

    const headers = {
        'Authorization' : `Bearer ${token}`
    }

    const body = {
        coupon,
        return_url
    }

    let payment_url = '';

    const submitHandler = (e) => {
        e.preventDefault();

        axios
            .post(url, 
                body, 
                {headers}
            )
            .then((res) => {
                console.log("payment url" + res.data.payment_url);
                payment_url = res.data.payment_url
            })
            .catch((err) => {
                toast.error(err.response.data.detail);
            })

        if ( payment_url ){
            window.location.replace(payment_url);
        }    
    };

    return (
        <FormContainer>
            
            <CheckoutSteps step1 step2 step3 />
            <h1>Payment Method</h1>
            <Form onSubmit={ submitHandler }>
                <Form.Group>
                    <Form.Label as='legend'>Select Method</Form.Label>
                    <Col className='ms-3'>
                        <Form.Check
                            type='radio'
                            className='my-2'
                            label='Khalti'
                            id='khalti'
                            name='paymentMethod'
                            value='khalti'   
                        ></Form.Check>    
                    </Col>

                    <Col className='ms-3'>
                        <Form.Check
                            type='radio'
                            className='my-2'
                            label='PayPal'
                            id='paypal'
                            name='paymentMethod'
                            value='paypal'  
                        ></Form.Check>
                          
                    </Col>

                    <Col className='ms-3'>
                        <Form.Check
                            type='radio'
                            className='my-2'
                            label='E-Sewa'
                            id='esewa'
                            name='paymentMethod'
                            value='e-sewa'
                        ></Form.Check>    
                    </Col>
                </Form.Group>

                <FormGroup className='mt-4'>
                    <Form.Label as='legend'>Coupon Code</Form.Label>
                    <Form.Control 
                        type="text"
                        placeholder="COUPON" 
                        className='w-50 mb-3'
                        onChange={(e)=>{handleCouponChange(e)}}   
                    />
                </FormGroup>
                
                <Button type='submit' variant='primary'>
                    Continue
                </Button>
            </Form>
        </FormContainer>
    )
}

export default PaymentScreen;