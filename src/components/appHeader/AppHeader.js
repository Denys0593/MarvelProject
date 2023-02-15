import { Link, NavLink } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import { useState } from 'react';
import './appHeader.scss';

const AppHeader = () => {

    const [go, setgo] = useState(false);
    const [but, setBut] = useState(true);

    const duration = 3000;

    return (
        <>
            <CSSTransition
                classNames="zalupa"
                in={go}
                timeout={duration}
                unmountOnExit
                onEnter={() => setBut(false)}
                onExited={() => setBut(true)}
                >
                <header className="app__header">
                    <h1 className="app__title">
                        <Link to="/">
                            <span>Marvel</span> information portal
                        </Link>
                    </h1>
                    <nav className="app__menu">
                        <ul>
                            <li><NavLink end style={({isActive}) => ({color: isActive ? '#9F0013' : 'inherit'})} to="/">Characters</NavLink></li>
                            /
                            <li><NavLink style={({isActive}) => ({color: isActive ? '#9F0013' : 'inherit'})} to="/comics">Comics</NavLink></li>
                        </ul>
                    </nav>
                    <div onClick={() => setgo(false)} class="closeModal">
                    </div>
                </header>
            </CSSTransition>
            {but ? <Button setgo={setgo}/> : null}
        </>
    )
}

const Button = (props) => {
    return (
        <button className="openButton" onClick={() => props.setgo(go => !go)}>CLICK</button>
    )
}

export default AppHeader;