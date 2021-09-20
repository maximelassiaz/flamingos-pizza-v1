import { Link } from 'react-router-dom'
import { Icon } from '@iconify/react'
import flamingoIcon from '@iconify/icons-openmoji/flamingo'
import hamburgerMenu from '@iconify/icons-cil/hamburger-menu'
import closeMenu from '@iconify/icons-clarity/close-line'

const Header = ({ isMenuOpen, handleClickMenu }) => {
    return (
        <header>
            <nav id="#navbar" className="navbar">
                <div className="navbar__brand">
                    <Icon 
                        className="navbar__brand-icon"
                        icon={flamingoIcon}
                        hFlip={true}
                    />
                    <div className="navbar__brand-title brand-title--first-letter">Flamingo's</div>
                    <div className="navbar__brand-title brand-title--first-letter">Pizza</div>
                </div>
                <Icon
                    className="navbar__hamburger-icon"
                    icon={isMenuOpen ? closeMenu : hamburgerMenu}
                    onClick={handleClickMenu}
                />
                {isMenuOpen && <ul className="navbar__links">
                    <li>
                        <Link 
                            className="navbar__link"
                            to="/"
                            onClick={handleClickMenu}
                        >
                            Accueil
                        </Link>
                    </li>
                    <li>
                        <Link 
                            className="navbar__link"
                            to="/pizza"
                            onClick={handleClickMenu}
                        >
                            Nos Pizzas
                        </Link>
                    </li>
                    <li>
                        <Link 
                            className="navbar__link"
                            to="/login"
                            onClick={handleClickMenu}
                        >
                            Se connecter
                        </Link>
                    </li>
                </ul>}
            </nav>
        </header>
    )
}

export default Header
