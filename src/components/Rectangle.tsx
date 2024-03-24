import React from 'react';
import '../css/Rectangle.css';
import { RectangleProps } from '../utils/Structure';

const Rectangle = (props: RectangleProps) => {
    const { weight, value, name, eachWeightPerRow , rowNumber} = props;
    const percent = Math.round(value * 100);
    const backgroundColor = percent < 0 ? 'red' : 'green';

    return (
        <div
            className="rectangleContainer"
            style={{ backgroundColor: backgroundColor, width: `${Math.floor(weight/eachWeightPerRow * 10000)/100}%`, height: `${Math.floor(10000/rowNumber)/100}%`  }}
        >
            <div className='textContainer'>
                <div className="title">{name}</div>
                <div className="text">{`${percent}%`}</div>
            </div>
        </div>
    );
};

export default Rectangle;
