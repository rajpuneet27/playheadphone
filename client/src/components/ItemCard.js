import React, { useState, useEffect } from 'react';
import fetch from "isomorphic-fetch";
import { Link } from 'react-router-dom';

function ItemCard() {

    const [ items, setItems ] = useState([]);

    useEffect( () => {
        loadData();
        
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])


    const loadData = async() => {
        const response = await fetch("http://localhost:1337/products");
        const data = await response.json();
        setItems(data)
        console.log(data)
    }


    return (
        <div className="item-mainContainer">
            {
                items.map((item)=> (
                    <div className="item-container" key={item.id}>
                        <Link className="link-no-underline" to={`/item/${item.id}`}>
                        <img src={`http://localhost:1337${item.image.url}`} alt=""/>
                        <h4>{item.title}</h4>
                        </Link>
                        <h6>${ item.price }<span>${ item.originalPrice }</span></h6>
                        <Link to={`/item/${item.id}`}>
                        <button>VIEW DETAIL</button>
                        </Link>
                    </div>
                ))
            }
        </div>
    )
}

export default ItemCard;
