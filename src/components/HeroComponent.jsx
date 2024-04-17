// HeroComponent.js
import React from 'react';
import { Button } from 'react-bootstrap';


const HeroComponent = () => {
    return (
        <div className="hero-section">
            <div className="container py-5">
                <h1>Welcome to Our Company Training Solutions</h1>
                <p className="lead">
                    Founded by a dedicated father and his two sons, we bring you the finest in professional and personal development training. Experience learning made personal.
                </p>
                <Button variant="primary" href="#services">Explore Our Services</Button>
            </div>
        </div>
    );
};

export default HeroComponent;

