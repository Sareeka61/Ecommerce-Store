import { useEffect, useState } from 'react';
import axios from "axios";
import { Form, Button, FormGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import FormContainer from '../components/FormContainer';
import { CheckoutSteps } from "../components/CheckoutSteps";
import { toast } from 'react-hot-toast'; 

export const ShippingScreen = () => {
    
    const [ address, setAddress ] = useState([]);
    const [ city, setCity ] = useState([]);
    const [ area, setArea ] = useState([]);
    const [data,setData] = useState({
        provience:'',
        city:'',
        area:''
    });

    const address_URL = 'http://127.0.0.1:8000/api/address/address';
    const post_address_URL = 'http://127.0.0.1:8000/api/address/delivery-address/';

    const navigate = useNavigate();

    const token = localStorage.getItem('jwt');

    const headers = {
        'Authorization' : `Bearer ${token}`
    }

    useEffect(() => {
        getAddress();
    }, [address_URL])

    const getAddress = () => {
        
        axios 
            .get(address_URL, 
                {headers})
            .then((res) => {
                setAddress(() => {
                    return res.data;
                })
            })   
            .catch((err) => {
                console.log(err);
            });  
    }

    const getCity = (e) => {
        let url = `${address_URL}?parent=${e.target.value}`;

        axios
            .get(url, {headers})
            .then((res) => {
                setCity(() => {
                    return res.data
                })
                setData(()=>{
                    return {
                        ...data,
                        provience: e.target.value
                    }
                })
            })

            .catch((err) => {
                console.log(err.data)
            })
        
    }

    const getArea = (e) => {
        let url = `${address_URL}?parent=${e.target.value}`;

        axios
            .get(url, {headers})
            .then((res) => {
                setArea(() => {
                    return res.data
                })
                setData(()=>{
                    return {
                        ...data,
                        city: e.target.value
                    }
                })
            })
            
            .catch((err) => {
                console.log(err.data)
            })
    }

    const handleChangeArea = (e)=>{
        setData(()=>{
            return {
                ...data,
                area: e.target.value
            }
        })

    }
    const submitHandler = (e) => {
        e.preventDefault();

        axios
            .post(post_address_URL, data, {headers})
            .then((res) => {
                if (res.status === 201) {
                    toast.success("Delivery address added!")
                    navigate('/payment');
                }
            }
            )
            .catch(()=>{
                toast.error("Add Delivery address failed!")
            })    
    };

    return (
        <>  
        <FormContainer >
            <CheckoutSteps step1 step2 />
            <h1>Shipping</h1>
                <Form  >
                    <FormGroup>
                        <label>Province:</label>

                        <select 
                                defaultValue={'title'} 
                                className="form-select" 
                                aria-label="Default select example"
                                onChange={(e)=>{getCity(e)}}
                                >
                            <option value='title'>--Select--</option>
                            {
                                address.map((addr) => {
                                    return (
                                        <option value={addr.id} key={addr.id}>{addr.name}</option>
                                    )
                                })
                            }
                        </select>
                    </FormGroup> 

                    {city && <FormGroup>
                        <label>City:</label>

                        <select 
                                defaultValue={'title'} 
                                className="form-select" 
                                aria-label="Default select example"
                                onChange={(e)=>{getArea(e)}}
                                >
                            <option value='title'>--Select--</option>
                            {
                                city.map((cit) => {
                                    return (
                                        <option value={cit.id} key={cit.id}>{cit.name}</option>
                                    )
                                })
                            }
                        </select>
                    </FormGroup>}

                    {area && <FormGroup>
                        <label>Area:</label>

                        <select 
                                defaultValue={'title'} 
                                className="form-select" 
                                aria-label="Default select example"
                                onChange={(e)=>{handleChangeArea(e)}}
                                >
                            <option value='title' >--Select--</option>
                            {
                                area.map((are) => {
                                    return (
                                        <option value={are.id} key={are.id}>{are.name}</option>
                                    )
                                })
                            }
                        </select>
                    </FormGroup>}
                    
                    <Button
                        type="submit"
                        variant="primary"
                        className="my-2"
                        onClick={(e) => submitHandler(e)}
                    >
                        Continue
                    </Button>
                </Form>  
        </FormContainer>
    </>
    )
}

export default ShippingScreen;