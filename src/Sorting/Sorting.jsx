import React from "react";
import { mergeSort } from "./Algorithms";
import { bubbleSort } from "./Algorithms";
import { quickSort } from "./Algorithms";
import { selectionSort } from "./Algorithms";
import "./Sorting.css";

const ARRAY_SIZE = 150;

const SPEED = 5;

const MAIN_COLOR = "red";

const ACCENT_COLOR = "white";

var stopAnimations = false;

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
    for (let i = 0; i < ARRAY_SIZE; i++) {
      array.push(randomNumber(10, 800));
    }
    this.setState({ array });
    document.getElementById("algoDesc").innerText =
      "Select a Sorting Algorithm to see a description of it.";
    document.getElementById("algoCases").innerHTML = "";
    document.getElementsByClassName("restore")[0].disabled = true;
    document.getElementsByClassName("restore")[0].hidden = true;
  }

  disableButtons() {
    var buttons = document.getElementsByClassName("sortButtons");
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].disabled = true;
    }
    document.getElementsByClassName("restore")[0].disabled = false;
    document.getElementsByClassName("restore")[0].hidden = false;
  }

  restoreButtons() {
    var buttons = document.getElementsByClassName("sortButtons");
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].disabled = false;
    }
    document.getElementsByClassName("restore")[0].disabled = true;
    document.getElementsByClassName("restore")[0].hidden = true;
  }

  merge() {
    this.disableButtons();
    document.getElementById(
      "algoDesc"
    ).innerText = `Merge Sort is an efficient, stable sorting algorithm that makes use of the divide and conquer strategy. It will merge N sublists of one element, 
    which are naturally sorted already, which ends in the original list being fully sorted.`;
    document.getElementById("algoCases").innerHTML =
      "Worst Case Time: O(n log n) Avergae Time: O(n log n) Best Case Time: O(n log n)";
    const animations = mergeSort(this.state.array);
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName("array-bar");
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

  quick() {
    this.disableButtons();
    document.getElementById(
      "algoDesc"
    ).innerText = `Quick Sort is an efficient, in-place sorting algorithm that in practice is faster than MergeSort and HeapSort. However, it is not a stable
    sorting algorithm, meaning that the relative positioning of equal sort items is not preserved.Quicksort is a divide andconquer algorithm. 
    Quicksort first divides a large array into two smaller sub-arrays: the low elements and the high elements. Quicksort can then recursively sort the sub-arrays.`;
    document.getElementById("algoCases").innerHTML =
      "Worst Case Time: O(n" +
      "2".sup() +
      "Avergae Time: O(n log n) Best Case Time: O(n log n)";
    const [animations, sortArray] = quickSort(this.state.array);
    for (let i = 0; i < animations.length; i++) {
      const isColorChange =
        animations[i][0] == "comparision1" ||
        animations[i][0] == "comparision2";
      const arrayBars = document.getElementsByClassName("array-bar");
      if (isColorChange === true) {
        const color =
          animations[i][0] == "comparision1" ? ACCENT_COLOR : MAIN_COLOR;
        const [comparision, barOneIndex, barTwoIndex] = animations[i];
        const barOneStyle = arrayBars[barOneIndex].style;
        const barTwoStyle = arrayBars[barTwoIndex].style;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * SPEED);
      } else {
        const [swap, barIndex, newHeight] = animations[i];
        if (barIndex === -1) {
          continue;
        }
        const barStyle = arrayBars[barIndex].style;
        setTimeout(() => {
          barStyle.height = `${newHeight}px`;
        }, i * SPEED);
      }
    }
  }

  bubble() {
    this.disableButtons();
    document.getElementById(
      "algoDesc"
    ).innerText = `Bubble Sort is a simple sorting algorithm that repeatedly steps through the list, compares adjacent elements and swaps them if they are in the
    wrong order. The pass through the list is repeated until the list is sorted. The algorithm, which is a comparison sort, is named for
    the way smaller or larger elements "bubble" to the top of the list. Although the algorithm is simple, it is too slow and impractical for most problems.`;
    document.getElementById("algoCases").innerHTML =
      "Worst Case Time: O(n" +
      "2".sup() +
      ") Avergae Time: O(n" +
      "2".sup() +
      ") Best Case Time: O(n)";
    const [animations, sortArray] = bubbleSort(this.state.array);
    for (let i = 0; i < animations.length; i++) {
      if (stopAnimations) {
        stopAnimations = false;
        return;
      }
      const isColorChange =
        animations[i][0] == "comparision1" ||
        animations[i][0] == "comparision2";
      const arrayBars = document.getElementsByClassName("array-bar");
      if (isColorChange === true) {
        const color =
          animations[i][0] == "comparision1" ? ACCENT_COLOR : MAIN_COLOR;
        const [comparision, barOneIndex, barTwoIndex] = animations[i];
        const barOneStyle = arrayBars[barOneIndex].style;
        const barTwoStyle = arrayBars[barTwoIndex].style;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * SPEED);
      } else {
        const [swap, barIndex, newHeight] = animations[i];
        if (barIndex === -1) {
          continue;
        }
        const barStyle = arrayBars[barIndex].style;
        setTimeout(() => {
          barStyle.height = `${newHeight}px`;
        }, i * SPEED);
      }
    }
  }

  selection() {
    this.disableButtons();
    document.getElementById(
        "algoDesc"
      ).innerText = `Selection Sort is an in-place comparison sorting algorithm that divides the input list into two parts: 
      The sublist of items already sorted, which is built up from left to right at the front (left) of the list, and
      The sublist of items remaining to be sorted that occupy the rest of the list. Initially, the sorted sublist is empty and the
      unsorted sublist is the entire input list. The algorithm proceeds by finding the smallest element in the unsorted sublist, exchanging (swapping) 
      it with the leftmost unsorted element (putting it in sorted order), and moving the sublist boundaries one element to the right.`;
      document.getElementById("algoCases").innerHTML =
      "Worst Case Time: O(n" +
      "2".sup() +
      ") Avergae Time: O(n" +
      "2".sup() +
      ") Best Case Time: O(n" +
      "2".sup() +
      ")";
    const [animations,sortArray] = selectionSort(this.state.array);
    for (let i = 0; i < animations.length; i++) {
        const isColorChange = (animations[i][0] === "comparision1") || (animations[i][0] === "comparision2");
        const arrayBars = document.getElementsByClassName('array-bar');
        if(isColorChange === true) {
            const color = (animations[i][0] === "comparision1") ? ACCENT_COLOR : MAIN_COLOR;
            const [temp, barOneIndex, barTwoIndex] = animations[i];
            const barOneStyle = arrayBars[barOneIndex].style;
            const barTwoStyle = arrayBars[barTwoIndex].style;
            setTimeout(() => {
                barOneStyle.backgroundColor = color;
                barTwoStyle.backgroundColor = color;
            },i * SPEED);
        }
        else {
            const [temp, barIndex, newHeight] = animations[i];
            const barStyle = arrayBars[barIndex].style;
            setTimeout(() => {
                barStyle.height = `${newHeight}px`;
            },i * SPEED);  
        }
    }
}

  render() {
    const { array } = this.state;

    return (
      <div className="array-container">
        <div className="sorterButtons">
          <button className="restore" onClick={() => this.restoreButtons()}>
            Enable Buttons
          </button>
          <br />
          <button className="sortButtons" onClick={() => this.resetArray()}>
            Randomize Array
          </button>
          <br />
          <button className="sortButtons" onClick={() => this.merge()}>
            Merge Sort
          </button>
          <br />
          <button className="sortButtons" onClick={() => this.bubble()}>
            Bubble Sort
          </button>
          <br />
          <button className="sortButtons" onClick={() => this.quick()}>
            Quick Sort
          </button>
          <br/>
          <button className="sortButtons" onClick={() => this.selection()}>
            Selection Sort
          </button>
        </div>
        <div style={{ height: 5 + "%" }}></div>
        <div id="bars">
          {array.map((value, index) => (
            <div
              className="array-bar"
              key={index}
              style={{
                backgroundColor: MAIN_COLOR,
                height: `${value}px`,
              }}
            ></div>
          ))}
        </div>
        <div className="algoInfo">
          <h3>Performance and Information</h3>
          <h4 id="algoDesc">
            Select a Sorting Algorithm to see a description of it.
          </h4>
          <br />
          <h4 id="algoCases"></h4>
        </div>
      </div>
    );
  }
}

function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
