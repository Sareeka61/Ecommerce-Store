import axios from 'axios';
import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import {  useSearchParams  } from 'react-router-dom';
import toast from 'react-hot-toast';

const PlaceOrderScreen = () => {

    const [data, setData] = useState()
    const [ paymentStatus, setPaymentStatus ] = useState(null)
    const [searchParams] = useSearchParams();

    const token = localStorage.getItem('jwt');

    const headers = {
        'Authorization' : `Bearer ${token}`
    }

    useEffect(()=>{
        const params = {}
        for(const [key,value] of searchParams){
            params[key] = value
        }
        setData(params)
   },[searchParams])

   let success_screen = 'https://a.khalti.com/go/?t=kpg&pidx=uDNqXPxv7GyN6mVi8GMTnP'

   function verifyPurchase(){
        let url = `http://127.0.0.1:8000/api/payment/validate/?pidx=${data.pidx}&txnId=${data.txnId}&amount=${data.amount}&mobile=${data.mobile}&purchase_order_id=${data.purchase_order_id}&purchase_order_name=${data.purchase_order_name}&transaction_id=${data.transaction_id}`;
        
        console.log("payment verification URL" + url);
        axios
            .get(url,{headers})
            .then((res) => {
                console.log(res.data);
                setPaymentStatus(() => {
                    return res.data.status;
                })
            })
            .catch((err) => {
                console.log(err)
            })

            if(paymentStatus === 'Completed') {
                window.location.replace(success_screen);
            } else {
                toast.error('Payment is pending! Check Back Later')
            }
   }

  return (
    <>
       <Button
           onClick={()=>{verifyPurchase()}}
        >
            Check Payment Status
        </Button>
    </>  
  )
}

export default PlaceOrderScreen