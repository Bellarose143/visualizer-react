export function mergeSort(array) {
  const animations = [];
  if (array.length <= 1) return array;

  //Dupe the array
  const auxiliaryArray = array.slice();

  mergeSortHelper(array, 0, array.length - 1, auxiliaryArray, animations);
  return animations;
}

function mergeSortHelper(
  mainArray,
  startIndex,
  endIndex,
  auxiliaryArray,
  animations
) {
  if (startIndex === endIndex) return;
  const middleIdx = Math.floor((startIndex + endIndex) / 2);
  mergeSortHelper(auxiliaryArray, startIndex, middleIdx, mainArray, animations);
  mergeSortHelper(
    auxiliaryArray,
    middleIdx + 1,
    endIndex,
    mainArray,
    animations
  );
  doMerge(
    mainArray,
    startIndex,
    middleIdx,
    endIndex,
    auxiliaryArray,
    animations
  );
}

function doMerge(
  mainArray,
  startIndex,
  middleIdx,
  endIndex,
  auxiliaryArray,
  animations
) {
  let k = startIndex;
  let i = startIndex;
  let j = middleIdx + 1;
  while (i <= middleIdx && j <= endIndex) {
    // Change their color.
    animations.push([i, j]);
    // Revert their color.
    animations.push([i, j]);
    if (auxiliaryArray[i] <= auxiliaryArray[j]) {
      // We overwrite the value at index k in the original array with the
      // value at index i in the auxiliary array.
      animations.push([k, auxiliaryArray[i]]);
      mainArray[k++] = auxiliaryArray[i++];
    } else {
      // We overwrite the value at index k in the original array with the
      // value at index j in the auxiliary array.
      animations.push([k, auxiliaryArray[j]]);
      mainArray[k++] = auxiliaryArray[j++];
    }
  }
  while (i <= middleIdx) {
    // These are the values that we're comparing; we push them once
    // to change their color.
    animations.push([i, i]);
    // These are the values that we're comparing; we push them a second
    // time to revert their color.
    animations.push([i, i]);
    // We overwrite the value at index k in the original array with the
    // value at index i in the auxiliary array.
    animations.push([k, auxiliaryArray[i]]);
    mainArray[k++] = auxiliaryArray[i++];
  }
  while (j <= endIndex) {
    // These are the values that we're comparing; we push them once
    // to change their color.
    animations.push([j, j]);
    // These are the values that we're comparing; we push them a second
    // time to revert their color.
    animations.push([j, j]);
    // We overwrite the value at index k in the original array with the
    // value at index j in the auxiliary array.
    animations.push([k, auxiliaryArray[j]]);
    mainArray[k++] = auxiliaryArray[j++];
  }
}

export function bubbleSort(array) {
  let animations = [];
  let auxiliaryArray = array.slice();
  doBubble(auxiliaryArray, animations);
  array = auxiliaryArray;
  return [animations, array];
}

function doBubble(auxiliaryArray, animations) {
  const N = auxiliaryArray.length;
  let iters = N - 1;
  while (iters > 0) {
    let swapped = false;
    for (let i = 0; i < iters; ++i) {
      animations.push(["comparision1", i, i + 1]);
      animations.push(["comparision2", i, i + 1]);
      if (auxiliaryArray[i] > auxiliaryArray[i + 1]) {
        swapped = true;
        animations.push(["swap", i, auxiliaryArray[i + 1]]);
        animations.push(["swap", i + 1, auxiliaryArray[i]]);
        swap(auxiliaryArray, i, i + 1);
      }
    }
    if (swapped === false) break;
    iters--;
  }
}

export function quickSort(array) {
  let animations  = [];
    let auxilliaryArray = array.slice();
    doQuick(auxilliaryArray, 0, auxilliaryArray.length - 1, animations);
    array = auxilliaryArray;
    return [animations, array];
}

function doQuick(auxilliaryArray, startIndex, endIndex, animations) {
  let pivotIndex;
    if (startIndex < endIndex) {
        pivotIndex = partitionArray(auxilliaryArray, startIndex, endIndex, animations);
        doQuick(auxilliaryArray, startIndex, pivotIndex - 1, animations);
        doQuick(auxilliaryArray, pivotIndex + 1, endIndex, animations);
    }
}

function partitionArray(auxilliaryArray, startIndex, endIndex, animations) {
  let pivotIndex = randomIntFromInterval(startIndex, endIndex);
    
    animations.push(["comparision1", pivotIndex, endIndex]);
    animations.push(["swap", pivotIndex, auxilliaryArray[endIndex]]);
    animations.push(["swap", endIndex, auxilliaryArray[pivotIndex]]);
    animations.push(["comparision2", pivotIndex, endIndex]);
    swap(auxilliaryArray, pivotIndex, endIndex);

    let lessTailIndex = startIndex;

    for(let i = startIndex; i < endIndex; ++i) {
        animations.push(["comparision1", i, endIndex]);
        animations.push(["comparision2", i, endIndex]);
        if(auxilliaryArray[i] <= auxilliaryArray[endIndex]) {
            animations.push(["comparision1", i, lessTailIndex]);
            animations.push(["swap", i, auxilliaryArray[lessTailIndex]]);
            animations.push(["swap", lessTailIndex, auxilliaryArray[i]]);
            animations.push(["comparision2", i, lessTailIndex]);
            swap(auxilliaryArray, i, lessTailIndex);
            lessTailIndex++;
        }
    }
    animations.push(["comparision1", lessTailIndex, endIndex]);
    animations.push(["swap", endIndex, auxilliaryArray[lessTailIndex]]);
    animations.push(["swap", lessTailIndex, auxilliaryArray[endIndex]]);
    animations.push(["comparision2", lessTailIndex, endIndex]);
    
    swap(auxilliaryArray, lessTailIndex, endIndex);
    return lessTailIndex;
}

export function selectionSort(array) {
  let animations  = [];
  let auxilliaryArray = array.slice();
  doSelection(auxilliaryArray, animations);
  array = auxilliaryArray;
  return [animations, array];
}

function doSelection(auxilliaryArray, animations) {
  const N = auxilliaryArray.length;
    for (let i = 0; i < N - 1; i++) {
        let minIndex = i; 
        for (let j = i + 1; j < N; j++) {
            animations.push(["comparision1", j, minIndex]);
            animations.push(["comparision2", j, minIndex]);
            if (auxilliaryArray[j] < auxilliaryArray[minIndex]) {
                minIndex = j;
            }
        }
        animations.push(["swap", minIndex, auxilliaryArray[i]]);
        animations.push(["swap", i, auxilliaryArray[minIndex]]);
        swap(auxilliaryArray, minIndex, i);
    }
}

function swap(secondArray, firstIndex, secondIndex) {
  let temp = secondArray[firstIndex];
  secondArray[firstIndex] = secondArray[secondIndex];
  secondArray[secondIndex] = temp;
}

function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
