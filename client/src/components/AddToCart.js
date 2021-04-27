import React, { useState } from 'react'

function AddToCart({buttonDisable, submit}) {
    const [ addCart, setAddCart] = useState('ADD TO CART');
    // const [ cartDisplayCount, setCartDisplayCount ] = useState(0)

    const clickHandler = () => {
        setAddCart('ADDED TO CART')
        submit();
        // setCartDisplayCount((prevState) => prevState + 1)
    }

    return (
            <button onClick={clickHandler} disabled={buttonDisable}>{addCart}</button>
    )
}

export default AddToCart
