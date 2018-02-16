import React from 'react';

const Header = ({ showMenu, showReload, goToMainMenu, reloadApplication, uuid, onChangeLang, lang }) => {
    return (
        <div className="AppHeader">
            <h1>WMSCrypto</h1>
            <div className="HeaderMenu">
                <button type="button"
                        className="btn btn-secondary"
                        onClick={onChangeLang}>
                    {lang === 'en' ? 'RUS' : 'ENG'}
                </button>
                {showReload && !uuid
                    ?   <button type="button"
                                className="btn btn-danger"
                                onClick={reloadApplication}>
                            Restart
                        </button>
                    : null}
                {showMenu && !uuid
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