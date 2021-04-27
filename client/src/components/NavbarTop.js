import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';



function NavbarTop() {

    return (
        <nav>
            <div className="navbar-container">
                <div className="nav-logo">
                    <Link className="link-no-underline" to="/">
                    <h5><span>Play</span>Headphones</h5>
                    </Link>
                </div>
                <div className="login-cart-container">
                    <div>Login</div>
                    <div className="cart">
                        <Link to="/cart/" className="link-no-underline">
                        <FontAwesomeIcon icon={faShoppingCart} color="black"/>
                        </Link>
                        <Link to="/cart/" className="link-no-underline">
                        <div>Cart</div>
                        </Link>
                    </div>
                </div>
            </div>  
        </nav>    
    )
}

export default NavbarTop

