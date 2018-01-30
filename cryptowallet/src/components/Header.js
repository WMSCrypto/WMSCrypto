import React from 'react';

const Header = ({ showMenu, showReload, goToMainMenu, reloadApplication }) => {
    return (
        <div className="AppHeader">
            <h1>CryptoWallet</h1>
            <div className="HeaderMenu">
                {showReload
                    ?   <button type="button"
                                className="btn btn-danger"
                                onClick={reloadApplication}>
                            Restart
                        </button>
                    : null}
                {showMenu
                    ?   <button type="button"
                                className="btn btn-outline-secondary"
                                onClick={goToMainMenu}>
                            Menu
                        </button>
                    : null}
            </div>
        </div>

    )
};

export default Header;