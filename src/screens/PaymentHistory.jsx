import { useEffect, useState } from 'react';
import axios from 'axios';
import { Table} from 'react-bootstrap';
import { FaFileDownload } from 'react-icons/fa';
import fileDownload from 'js-file-download';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

const PaymentHistory = () => {

    const [ payment, setPayment ] = useState([]);

    const token = localStorage.getItem('jwt');
    
    const headers = {
        'Authorization' : `Bearer ${token}`
    }
    
    const payment_URL = 'http://127.0.0.1:8000/api/payment/payment/';

          useEffect(() => {
            axios   
            .get(payment_URL, {headers})
            .then((res) => {
                setPayment(res.data.results);
            })
            .catch((err) => {
                console.log(err);
            })
          }, [payment_URL])  
   
        const handleDownload = (e, id) => {
          e.preventDefault();
          let download_URL = `http://127.0.0.1:8000/api/payment/download/?id=${id}`
          
            axios({
              url: download_URL,
              method: 'GET',
              responseType: 'blob',
              headers: headers
            })
            .then((res) => {
              fileDownload(res.data, 'invoice.pdf');
              toast.success('Invoice Downloaded!');
            })
            .catch((err) => {
              toast.error('FIle Download Error');
            })
        }

    return(
      <>
        <Link className='btn btn-light my-3' to='/'>
                    Go Back
        </Link>
          <h1>Payment History</h1>
          <div className="m-5">

        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>Payment Id</th>
              <th> Quantity</th>
              <th> Status</th>
              <th> Transaction Id </th>
              <th> Date-Time </th>
              <th> Amount </th>
              <th> Download </th>
              
            </tr>
          </thead>
          <tbody>
            {payment && payment.map((p, id) => (
              <>
                <tr key={p.id}>
                  <td >{p.id}</td>
                  <td >{p.quantity}</td>
                  <td >{p.status}</td>
                  <td >{p.transaction_id}</td>
                  <td >{p.date_time}</td>
                  <td >{p.amount}</td>
                  <td onClick={(e) => handleDownload(e, p.id)}> <FaFileDownload /> </td>
                </tr>
              </>
            ))}
          </tbody>
        </Table>
      </div>    
    </>
  )
}

export default PaymentHistory;