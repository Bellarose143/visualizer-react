import React from 'react';
import {mergeSort} from './Algorithms'
import './Sorting.css'

const ARRAY_SIZE = 310;

const SPEED = 5;

const MAIN_COLOR = 'red';

const ACCENT_COLOR = 'white';


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

    merge() {
        const animations = mergeSort(this.state.array);
        for (let i = 0; i < animations.length; i++) {
          const arrayBars = document.getElementsByClassName('array-bar');
          const isColorChange = i % 3 !== 2;
          if (isColorChange) {
            const [barOneIdx, barTwoIdx] = animations[i];
            const barOneStyle = arrayBars[barOneIdx].style;
            const barTwoStyle = arrayBars[barTwoIdx].style;
            const color = i % 3 === 0 ? ACCENT_COLOR : MAIN_COLOR;
            setTimeout(() => {
              barOneStyle.backgroundColor = color;
              barTwoStyle.backgroundColor = color;
            }, i * SPEED);
          } else {
            setTimeout(() => {
              const [barOneIdx, newHeight] = animations[i];
              const barOneStyle = arrayBars[barOneIdx].style;
              barOneStyle.height = `${newHeight}px`;
            }, i * SPEED);
          }
        }
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
                <button onClick={() => this.merge()}>Merge Sort</button>
            </div>
        );
    }
}

function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }