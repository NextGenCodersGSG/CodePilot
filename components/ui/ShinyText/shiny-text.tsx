import React from 'react';
import styles from './ShinyText.module.css'; // Import the CSS module

interface ShinyTextProps {
    text: string;
    disabled?: boolean;
    speed?: number;
    className?: string;
}

const ShinyText: React.FC<ShinyTextProps> = ({ text, disabled = false, speed = 5, className = '' }) => {
    return (
        <div
            className={`${styles.shinyText} ${!disabled ? styles.animateShine : ''} ${className}`}
            style={{ animationDuration: `${speed}s` }}
        >
            {text}
        </div>
    );
};

export default ShinyText;
