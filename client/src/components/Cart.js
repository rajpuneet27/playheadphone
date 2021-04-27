import axios from 'axios';
import React, {useEffect, useState} from 'react';


function Cart() {

    const [ cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState('')

    useEffect(()=> {
        setTimeout(() => {
            getCartItems();
        }, 100);   
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    useEffect(() => {
        setTimeout(() => {
            findingTotalPrice();
        }, 100);  
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[cartItems])
    
    const getCartItems = async() => {
        axios.get('http://localhost:8080/api/')
            .then((response) => {
                const data = response.data;
                setCartItems(data);
            })
            .catch(() => {
                alert('Error in retreiving');
            })
    }

    const handleDelete = (id)=>{
        axios.post(`http://localhost:8080/api/delete/${id}`)
        .then((res)=>{
            const data = res.data;
            setCartItems(data);
        })
        .catch((err)=>{
            console.log(err);
        })
    }


    const handleIncreaseUpdate = (id, qty) => {

        qty = qty + 1;

        const payload = {
            _id: `${id}`,
            qty: qty
        }

        axios({
            url: `http://localhost:8080/api/update/${id}`,
            method: 'POST',
            data: payload
        })
        .then((response) => {
            const updatedData = response.data;
            console.log("Data has been send to server")
            setCartItems(updatedData)
        })
        .catch(() => {
            console.log("Data has not sent")
        })
    }


    const handleDecreaseUpdate = (id, qty) => {
        if(qty > 1){
            qty = qty - 1;

            const payload = {
                _id: `${id}`,
                qty: qty
            }

            axios({
                url: `http://localhost:8080/api/update/${id}`,
                method: 'POST',
                data: payload
            })
            .then((response) => {
                const updatedData = response.data;
                console.log("Data has been send to server")
                setCartItems(updatedData)
            })
            .catch(() => {
                console.log("Data has not sent")
            })
        }
        else
        handleDelete(id);
    }

    const alertOrderPlaced = () => {
        alert("Order is Placed")
    }
    
    const findingTotalPrice = () => {
            let price = 0;
                cartItems.map((cartItem) => {
                return price = price + cartItem.price*cartItem.qty
            })
            price = price.toFixed(2);
            setTotalPrice(price);
            console.log((price))
    }



    console.log(cartItems)
    return (
    <div className="main-cart"> 
        <div className="cart-main-conatiner" >
            {cartItems.map((cartItem) => (
            <div className="cart-column-conatiner" key={cartItem._id}>
                <div className="cart-container">
                    <img src={cartItem.url} alt="" />                
                    <div className="cart-detail-container">
                        <h4>{cartItem.title}</h4>
                        <h6>${cartItem.price}</h6>
                        <span>{cartItem.qty} items price : ${(cartItem.price*cartItem.qty).toFixed(2)}</span>
                    </div>                    
                </div>
                <div className="qty-remove-container">
                    <div className="qty-container">
                        <div style={{cursor:'pointer'}} className="qty-button-container" onClick={() => {handleDecreaseUpdate(cartItem._id, cartItem.qty)}} >-</div>
                        <div className="qty-output-container">{cartItem.qty}</div>
                        <div style={{cursor:'pointer'}} className="qty-button-container" onClick={() => {handleIncreaseUpdate(cartItem._id, cartItem.qty)}} >+</div>
                    </div>
                    <div style={{cursor:'pointer'}} onClick={()=>{handleDelete(cartItem._id)}} className="remove-item">Remove</div>
                </div>
                <div className="item-break-line"></div>
            </div>
            ))} 
            <div className="placeorder-container">
                <div className="delivery">Total Cart Price : ${totalPrice}</div> 
                <button className="placeorder" onClick={() => alertOrderPlaced()} >Place Order</button>
            </div>
        </div>
    </div>
    )
}

export default Cart
