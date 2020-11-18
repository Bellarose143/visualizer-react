function dijkstra(grid, start, finish) {
  const visitedInOrder = [];
  start.distance = 0;
  const unvisited = allNodes(grid);
  while (unvisited.length) {
    sortNodes(unvisited);
    const closest = unvisited.shift();
    if (closest === finish) {
      return visitedInOrder;
    }
    if (closest.isWall) continue;
    if (closest.distance === Infinity) return visitedInOrder;
    closest.isVisited = true;
    visitedInOrder.push(closest);

    updateUnvisitedNeighbors(closest, grid);
  }
  return visitedInOrder;
}

function DFS(grid, start, finish) {
  const visitedInOrder = [];
  let unvisited = [];
  unvisited.push(start);
  while (unvisited.length) {
    const node = unvisited.pop();
    if (node === finish) {
      return visitedInOrder;
    }
    if (node.isWall) continue;
    node.isVisited = true;
    visitedInOrder.push(node);

    unvisited = unvisited.concat(getUNeighbors(node, grid));
  }

  return visitedInOrder;
}

function BFS(grid, start, finish) {
  const visitedInOrder = [];
  let unvisited = [];
  unvisited.push(start);
  while (unvisited.length) {
    const node = unvisited.shift();
    if (node === finish) {
      return visitedInOrder;
    }
    if (node.isWall) continue;
    node.isVisited = true;
    visitedInOrder.push(node);

    unvisited = unvisited.concat(getUNeighbors(node, grid));
  }

  return visitedInOrder;
}

function getUNeighbors(node, grid) {
  const neighbors = [];
  const reN = [];
  const { row, col } = node;
  if (row > 0) neighbors.push(grid[row - 1][col]);
  if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
  if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
  if (col > 0) neighbors.push(grid[row][col - 1]);

  for (let index = 0; index < neighbors.length; index++) {
    const neighbor = neighbors[index];
    if (!neighbor.isVisited) {
      neighbor.previousNode = node;
      neighbor.isVisited = true;
      reN.push(neighbor);
    }
  }
  return reN;
}

function AStar(grid, start, finish) {
  const visitedInOrder = [];
  start.distance = 0;
  start.heuristic = 0;
  const unvisited = allNodes(grid);
  while (unvisited.length) {
    sortNodesStar(unvisited);
    const cur = unvisited.shift();
    if (cur === finish) {
      return visitedInOrder;
    }
    if (cur.isWall) continue;
    if (cur.distance + cur.heuristic === Infinity) return visitedInOrder;
    cur.isVisited = true;
    visitedInOrder.push(cur);

    updateUnvisitedNeighborsStar(cur, grid, finish);
  }
  return visitedInOrder;
}

function updateUnvisitedNeighborsStar(cur, grid, finish) {
  const neighbors = [];
  const { row, col } = cur;
  if (row > 0) neighbors.push(grid[row - 1][col]);
  if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
  if (col > 0) neighbors.push(grid[row][col - 1]);
  if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
  for (const neighbor of neighbors) {
    if (!neighbor.isVisited) {
      neighbor.distance = cur.distance + 1;
      neighbor.heuristic = manhattanDistance(neighbor, finish);
      neighbor.previousNode = cur;
    }
  }
}

function manhattanDistance(a, b) {
  let { row: ar, col: ac } = a;
  let { row: br, col: bc } = b;
  return Math.abs(ar - br) + Math.abs(ac - bc);
}

function allNodes(grid) {
  const re = [];
  for (const row of grid) {
    for (const node of row) {
      re.push(node);
    }
  }
  return re;
}

function sortNodesStar(nodes) {
  nodes.sort((a, b) => a.distance + a.heuristic - (b.distance + b.heuristic));
}

function sortNodes(nodes) {
  nodes.sort((a, b) => a.distance - b.distance);
}

function updateUnvisitedNeighbors(closest, grid) {
  const neighbors = [];
  const { row, col } = closest;
  if (row > 0) neighbors.push(grid[row - 1][col]);
  if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
  if (col > 0) neighbors.push(grid[row][col - 1]);
  if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
  for (const neighbor of neighbors) {
    if (!neighbor.isVisited) {
      neighbor.distance = closest.distance + 1;
      neighbor.previousNode = closest;
    }
  }
}

function getShortestPath(finish) {
  const path = [];
  let cur = finish;
  while (cur !== null) {
    path.unshift(cur);
    cur = cur.previousNode;
  }
  return path;
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function primMaze(grid, startNode, finishNode) {
  if (!startNode || !finishNode || startNode === finishNode) {
    return false;
  }
  let walls = [];
  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[0].length; col++) {
      if (
        (row === startNode.row && col === startNode.col) ||
        (row === finishNode.row && col === finishNode.col)
      )
        continue;
      if (Math.random() < 0.25) {
        walls.push([row, col]);
      }
    }
  }
  walls.sort(() => Math.random() - 0.5);
  return walls;
}

let walls;

function primMaze2(grid, startNode, finishNode) {
  if (!startNode || !finishNode || startNode === finishNode) {
    return false;
  }
  let vertical = range(grid[0].length);
  let horizontal = range(grid.length);
  walls = [];
  getRecursiveWalls(vertical, horizontal, grid, startNode, finishNode);
  return walls;
}

function getRecursiveWalls(vertical, horizontal, grid, startNode, finishNode) {
  if (vertical.length < 2 || horizontal.length < 2) {
    return;
  }
  let dir;
  let num;
  if (vertical.length > horizontal.length) {
    dir = 0;
    num = generateOddRandomNumber(vertical);
  }
  if (vertical.length <= horizontal.length) {
    dir = 1;
    num = generateOddRandomNumber(horizontal);
  }

  if (dir === 0) {
    addWall(dir, num, vertical, horizontal, startNode, finishNode);
    getRecursiveWalls(
      vertical.slice(0, vertical.indexOf(num)),
      horizontal,
      grid,
      startNode,
      finishNode
    );
    getRecursiveWalls(
      vertical.slice(vertical.indexOf(num) + 1),
      horizontal,
      grid,
      startNode,
      finishNode
    );
  } else {
    addWall(dir, num, vertical, horizontal, startNode, finishNode);
    getRecursiveWalls(
      vertical,
      horizontal.slice(0, horizontal.indexOf(num)),
      grid,
      startNode,
      finishNode
    );
    getRecursiveWalls(
      vertical,
      horizontal.slice(horizontal.indexOf(num) + 1),
      grid,
      startNode,
      finishNode
    );
  }
}

function range(len) {
  let result = [];
  for (let i = 0; i < len; i++) {
    result.push(i);
  }
  return result;
}

function generateRandomNumber(max) {
  let randomNum =
    Math.floor(Math.random() * (max / 2)) +
    Math.floor(Math.random() * (max / 2));
  if (randomNum % 2 !== 0) {
    if (randomNum === max) {
      randomNum -= 1;
    } else {
      randomNum += 1;
    }
  }
  return randomNum;
}

function addWall(dir, num, vertical, horizontal, startNode, finishNode) {
  let isStartFinish = false;
  let tempWalls = [];
  if (dir === 0) {
    if (horizontal.length === 2) return;
    for (let temp of horizontal) {
      if (
        (temp === startNode.row && num === startNode.col) ||
        (temp === finishNode.row && num === finishNode.col)
      ) {
        isStartFinish = true;
        continue;
      }
      tempWalls.push([temp, num]);
    }
  } else {
    if (vertical.length === 2) return;
    for (let temp of vertical) {
      if (
        (num === startNode.row && temp === startNode.col) ||
        (num === finishNode.row && temp === finishNode.col)
      ) {
        isStartFinish = true;
        continue;
      }
      tempWalls.push([num, temp]);
    }
  }
  if (!isStartFinish) {
    tempWalls.splice(generateRandomNumber(tempWalls.length), 1);
  }
  for (let wall of tempWalls) {
    walls.push(wall);
  }
}

function generateOddRandomNumber(array) {
  let max = array.length - 1;
  let randomNum =
    Math.floor(Math.random() * (max / 2)) +
    Math.floor(Math.random() * (max / 2));
  if (randomNum % 2 === 0) {
    if (randomNum === max) {
      randomNum -= 1;
    } else {
      randomNum += 1;
    }
  }
  return array[randomNum];
}

function randomSelect(path) {
  return randomInt(0, path.length - 1);
}

function validate(grid, points) {
  let height = grid.length,
    width = grid[0].length;
  let pRe = [];
  for (let index = 0; index < points.length; index++) {
    let { row, col } = points[index];
    if (0 <= row && row < height && 0 <= col && col < width) {
      pRe.push(points[index]);
    }
  }
  return pRe;
}

function isVisited(visited, node) {
  let { row: nr, col: nc } = node;
  for (let index = 0; index < visited.length; index++) {
    let { row: ir, col: ic } = visited[index];
    if (nr === ir && nc === ic) {
      return true;
    }
  }
  return false;
}

function getNeighbors(grid, visited, node) {
  let { row, col } = node;
  let neighbors = [
    { row: row + 2, col: col },
    { row: row - 2, col: col },
    { row: row, col: col + 2 },
    { row: row, col: col - 2 },
  ];
  neighbors = validate(grid, neighbors.slice());
  let connected = [];
  let unconnected = [];
  neighbors.forEach((neighbor) => {
    if (isVisited(visited, neighbor)) {
      connected.push(neighbor);
    } else {
      unconnected.push(neighbor);
    }
  });
  return { c: connected, u: unconnected };
}

function connect(grid, a, b) {
  let { row: ar, col: ac } = a;
  let { row: br, col: bc } = b;
  let row = (ar + br) / 2;
  let col = (ac + bc) / 2;
  makeWall(grid, row, col, false);
}

function makeWall(grid, row, col, isW) {
  const node = grid[row][col];
  const newNode = {
    ...node,
    isWall: isW,
  };
  grid[row][col] = newNode;
}

export { dijkstra, BFS, DFS, AStar, getShortestPath, primMaze, primMaze2 };
