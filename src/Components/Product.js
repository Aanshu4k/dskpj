import React, { useState } from 'react';

const Product=({name,price,description})=> {
    const[count,setCount]=useState(0);
    const handleCount=()=>
    {
        setCount(count+1);
    }
    return (
        <div style={{display:'flex'}}>
            <div style={{ border: '2px solid cyan', width: '50%' }}>
                Name: {name}<br />
                Price: Rs.{price}<br />
                Description: {description}<br />
                <button onClick={handleCount}>Add to Cart</button><div style={{alignContent:'right'}}>{count}</div><br/>
            </div>
        </div>
    );
}
export default Product;