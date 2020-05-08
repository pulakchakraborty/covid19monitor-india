import React from 'react';


import '../styles/Header.scss';

const Header = () => {
    return(
        <div className="header">
            <div className="header-headline">
                <h4>Coronavirus Monitor | India</h4>
            </div>
            <div className="header-social">
                    <h4>
                        <a href="https://github.com/pulakchakraborty/c19-india-map"
                            target="_blank"
                            rel="noopener noreferrer"
                            title="Github"
                            className="header-link">Github</a>
                    </h4>
                </div>
        </div>
    );
}

export default Header;
