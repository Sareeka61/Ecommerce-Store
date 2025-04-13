import axios from "axios";
import { useState } from "react";
import { Button,Card } from "react-bootstrap";

const GameScreen = () => {

    const [ val, setVal ] = useState('');
    const [bet, setBet] = useState('');
 
    const handleClick = (e) => {
        setVal(e.target.value);
    }

    const handleSpin = () => {
        let URL = `http://127.0.0.1:8000/api/game/slotmachine?bet=${val}`;
        
    const token = localStorage.getItem('jwt');

    const headers = {
        'Authorization' : `Bearer ${token}`
    }

    axios
        .get(URL, {headers})
        .then((res) => {
            setBet(() => {
                return res.data;
            })
        })
        .catch((err) => {
            console.log(err)
        })
    }
return(
    <>

    <Card style={{ width: '24rem', marginLeft: '600px', marginTop: '10px' }}>
      <Card.Img variant="top" src="https://img.freepik.com/premium-photo/luck-success-casino-when-playing-casino-slot-machine_124507-54652.jpg" />
      
      <Card.Body>
        <Card.Title>GameSlot</Card.Title>
        <Card.Text>
          Choose your BET and click SPIN to see if you qualify for discount
        </Card.Text>
            

        {
            (bet.reward_won > 0) ? <div>
                <h3>
                    Rewards won:  {bet.reward_won} 
                </h3>

                <h3>
                    New reward point: {bet.new_reward_point}
                </h3>
            </div> :
            <div>
                <h3>
                    Try Again 
                </h3>
            </div>
        } 
        
            <div>
                <Button value='10' className="mt-5 ms-5 me-3" onClick={(e) => handleClick(e)}>10</Button>
                <Button value='50' className="mt-5  me-3" onClick={(e) => handleClick(e)}>50</Button>
                <Button value='100' className="mt-5  me-3" onClick={(e) => handleClick(e)}>100</Button>
            </div>

            <div className="ms-5 mt-3">
                <h2 className="ms-5">BET {val}</h2>
            </div>
            <div className="ms-5">
                <button type="button" class="btn btn-success mt-3 ms-5 text-white" onClick={(e) => handleSpin(e)}>SPIN</button>
            </div>
      </Card.Body>
    </Card>
    </>    
)
}

export default GameScreen;