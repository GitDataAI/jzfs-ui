import React, { useState, useEffect, useRef } from 'react';

const Carousel: React.FC<{children:React.ReactElement[]}> = ({ children }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const slidesRef = useRef(null);
    const totalSlides = React.Children.count(children);

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % totalSlides);
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + totalSlides) % totalSlides);
    };

    useEffect(() => {
        const intervalId = setInterval(() => nextSlide(), 3000);
        return () => clearInterval(intervalId);
    }, [totalSlides]);

    const handleKeyDown = (event: React.KeyboardEvent) => {
        if (event.key === 'ArrowRight') {
            nextSlide();
        } else if (event.key === 'ArrowLeft') {
            prevSlide();
        }
    };

    return (
        <div
            className="relative overflow-hidden w-full h-28"
            tabIndex={0}
            onKeyDown={handleKeyDown}
            ref={slidesRef}
            onMouseMove={(event) => event.preventDefault()}
            onTouchMove={(event) => event.preventDefault()}
        >
            {React.Children.map(children, (child, index) => (
                <div
                    key={index}
                    className={`absolute top-0 left-0 w-full h-full duration-700 ease-in-out ${index === currentIndex ? 'opacity-100' : 'opacity-0'}`}
                >
                    {child}
                </div>
            ))}
            <button className="absolute inset-y-0 h-10 w-8 mt-10 left-0 z-10 text-white bg-black bg-opacity-20 text-lg hover:bg-opacity-100 hover:text-white transition duration-300" onClick={prevSlide}>‹</button>
            <button className="absolute inset-y-0 h-10 w-8 mt-10 right-0 z-10 text-white bg-black bg-opacity-20 text-lg hover:bg-opacity-100 hover:text-white transition-duration-300" onClick={nextSlide}>›</button>
        </div>
    );
};

export default Carousel;