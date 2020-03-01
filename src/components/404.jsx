import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/css/style.css';

function Page404() {
    return(
        <div id="notfound">
            <div className="notfound">
                <div className="notfound-404">
                    <h1>Oops!</h1>
                    <h2>404 - The Page can't be found</h2>
                </div>
                
                <Link to = { "/" } > Go TO Homepage </Link>
            </div>
	    </div>

        // This templates was made by Colorlib (https://colorlib.com) 
    );
}

export default Page404;