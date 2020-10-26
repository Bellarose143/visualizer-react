import React from 'react';
import './Sorting.css'

// Change this value for the number of bars (value) in the array.
const ARRAY_SIZE = 310;

const MAIN_COLOR = 'red';

const ACCENT_COLOR = 'green';


export default class Sorting extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            array: [],
        };
    }

    componentDidMount() {
        this.resetArray();
    }

    resetArray() {
        const array = [];
        for (let i = 0; i < ARRAY_SIZE; i++){
            array.push(randomNumber(5,600));
        }
        console.log(array);
        this.setState({array});
    }

    render() {
        const {array} = this.state;

        return (
            <div className="array-container">
                {array.map((value,index) =>(
                    <div className="array-bar"
                    key={index}
                    style={{
                        backgroundColor: MAIN_COLOR,
                        height: `${value}px`,
                    }}></div>
                ))}
                <button onClick={() => this.resetArray()}>Randomize Array</button>
                <button onClick={() => this.mergeSort()}>Merge Sort</button>
            </div>
        );
    }
}

function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }