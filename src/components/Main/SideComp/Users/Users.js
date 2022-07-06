import { useState } from "react";
import { Button, Container } from "react-bootstrap";
import DATA from "../../../../data/data";

function NewUserComp({cancle}) {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const addUser = () => {
        if(name.length > 0 && email.length > 0){
            const NewUser = {
                id: DATA.users.length + 1,
                name: name,
                email: email,
                address: {
                    city: '',
                    street: '',
                    zipcode: ''
                }
            }
            DATA.users = [...DATA.users, NewUser]
        }
    }
    return ( <div className='my-3 wrapper'>
    <Container>
        <div className='myGrid'>
            <span className=''>name:</span> 
            <input className='' type="text" onChange={(e)=>{
                setName(e.target.value)
            }}/>
        </div>
        <div className='myGrid'>
            <span className=''>email:</span> 
            <input className='' type="email" onChange={(e)=>{
                setEmail(e.target.value)
            }}/>
        </div>
    </Container>
    <div className='my-3' style={{display: 'flex', justifyContent:'flex-end'}}>
    <Button className='mx-2' variant='warning' onClick={()=>{
        cancle()
    }}>Cancle</Button>
    <Button variant='warning' onClick={()=>{
        addUser()
        cancle()
    }}>Add</Button>
    </div>
    
</div> );
}

export default NewUserComp;