import React, { Component } from 'react';
import './Header.css';

class Header extends Component {
    render() {
        return (
            <header className="header">
                <div className="header-content">
                    <div className="header-content-title">心情墙</div>
                    <div className="header-content-menu">定格开心，撒出愁肠，在这里。</div>
                </div>
            </header>
        );
    }
}

export default Header;