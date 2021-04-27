import React, { useState, useEffect } from 'react';
import fetch from "isomorphic-fetch";
import axios from "axios";
import { Link } from 'react-router-dom';
import { useStateWithCallbackLazy } from 'use-state-with-callback';

function ItemDetails(props) {

    const [ specificItem, setSpecificItem ] = useState([]);
    const [ specificItemImage, setSpecificItemImage ] = useState('')
    const [ cartItems, setCartItems ] = useStateWithCallbackLazy([])
    const [ buttonDisable, setButtonDisable ] = useState(false);
    const [ addCart, setAddCart ] = useState('ADD TO CART');

    useEffect( () => {
        loadItemData();
        getCartItems();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    const loadItemData = async() => {
        const response = await fetch(`http://localhost:1337/products/${props.match.params.postid}`);
        const item = await response.json();
        setSpecificItem(item);
        console.log(item);
        setSpecificItemImage(item.image.url);
        console.log(item);
    }

    const submit = () => {

        setButtonDisable(true);
        setAddCart('ADDED TO CART');

        const payload = {
            _id: `${props.match.params.postid}`,
            title: `${specificItem.title}`,
            price: specificItem.price,
            qty: 1,
            url: `http://localhost:1337${specificItemImage}`,
        }

        axios({
            url: 'http://localhost:8080/api/save',
            method: 'POST',
            data: payload
        })
        .then(() => {
            console.log("Data has been send to server")
        })
        .catch(() => {
            console.log("Data has not sent")
        })
    }

    const getCartItems = async() => {
        axios.get('http://localhost:8080/api')
            .then((response) => {
                const data = response.data;
                setCartItems(data,(currentValue)=>{
                    let arr = currentValue.filter(cartItem=> cartItem._id === props.match.params.postid);
                    console.log(arr.length)
                    if(arr.length>0){
                        setButtonDisable(true)
                        setAddCart('ADDED TO CART')
                    }
                });

            })
            .catch(() => {
                console.log('Error in retreiving');
            })
    }

    console.log(cartItems)
    return (
        <div className="item-detail-container">
            <img src={`http://localhost:1337${specificItemImage}`} alt=""/>
            <div className="item-textdetail-container">
                <h3>{specificItem.title}</h3>
                <p>{specificItem.description}</p>
                <h5><span className="price">Price : </span>${specificItem.price}<span className="originalPrice">${specificItem.originalPrice}</span></h5>
                <h6>Available Offers</h6>
                <ul>
                    <li>Bank Offer $6 Instant Discount on HDFC Bank Credit Card and Debit Card (EMI)</li>
                    <li>Bank Offer $6 Instant Discount on HDFC Debit Card (EMI)</li>
                    <li>Bank Offer $6 Instant Discount on HDFC Bank Credit Card  (EMI)</li>
                </ul>
                <div className="buy-add-button">
                    <Link to="/cart/"><button type="button" onClick={() => submit()}>BUY NOW</button></Link>
                    <button onClick={submit} disabled={buttonDisable}>{addCart}</button>
                </div>
            </div>
        </div>
    )
}

export default ItemDetails
