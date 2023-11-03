import react, { useState } from 'react';
function GreetUser() {
    const [name, setName] = useState();
    const handleInputChange=(event)=>{
const {name,value}=event.target.value;
    
    }
    return (
        <div>
            <input type="text" value={name} onChange={handleInputChange} placeholder='Enter your name' />
            <button type='submit' onClick={handleSubmit} >SUBMIT
            </button   >
        </div>
    );
}
export default GreetUser;