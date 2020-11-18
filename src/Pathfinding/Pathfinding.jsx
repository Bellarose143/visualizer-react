import React from "react";
import "./Pathfinding.css";
import Node from "./Node";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import Button from "react-bootstrap/Button";
import {
  dijkstra,
  BFS,
  DFS,
  AStar,
  getShortestPath,
  primMaze,
  primMaze2,
} from "./Algorithms";

export default class Pathfinder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      grid: [],
      SR: 7,
      SC: 5,
      FR: 35,
      FC: 65,
      numRow: 40,
      numCol: 70,
      mouseIsPressed: false,
      changingStart: false,
      changingFinish: false,
      visualized: false,
      rendering: false,
      speed: "Medium",
      delays: { Slow: 17, Medium: 7, Fast: 3 },
      currentAlgorithm: 0,
      algorithms: ["BFS", "Dijkstra", "A Star", "DFS"],
      pathfindingAlgorithms: [BFS, dijkstra, AStar, DFS],
    };
    this.visualizePathfinding = this.visualizePathfinding.bind(this);
    this.clearVisualizer = this.clearVisualizer.bind(this);
    this.setAlgorithm = this.setAlgorithm.bind(this);
    // this.props.getFunctions(
    //   this.visualizePathfinding,
    //   this.clearVisualizer,
    //   this.setAlgorithm,
    //   this.state.algorithms
    // );
  }

  initializeGrid(clearWall) {
    const grid = [];
    for (let row = 0; row < this.state.numRow; row++) {
      const currentRow = [];
      for (let col = 0; col < this.state.numCol; col++) {
        let isWall = false;
        const element = document.getElementById(`node-${row}-${col}`);
        if (
          element &&
          (element.className === "node node-path" ||
            element.className === "node node-visited")
        ) {
          element.className = "node";
        }
        if (!clearWall && element && element.className === "node node-wall") {
          isWall = true;
        }
        currentRow.push(this.createNode(row, col, isWall));
      }
      grid.push(currentRow);
    }
    return grid;
  }

  setAlgorithm(algoId) {
    this.setState({ currentAlgorithm: algoId });
  }

  setSpeed(speed) {
    this.setState({ speed: speed });
  }

  clearVisitedAndPath() {
    for (let row = 0; row < this.state.numRow; row++) {
      for (let col = 0; col < this.state.numCol; col++) {
        let n = document.getElementById(`node-${row}-${col}`);
        if (
          n &&
          (n.className === "node node-visited" ||
            n.className === "node node-path")
        ) {
          n.className = "node";
        }
      }
    }
  }

  componentDidMount() {
    const grid = this.initializeGrid(false);
    this.setState({
      grid: grid,
      currentAlgorithm: 0,
    });
    this.state.grid = grid;
  }

  createNode(row, col, isW) {
    return {
      col,
      row,
      isStart: row === this.state.SR && col === this.state.SC,
      isFinish: row === this.state.FR && col === this.state.FC,
      distance: Infinity,
      heuristic: Infinity,
      isVisited: false,
      isWall: isW,
      previousNode: null,
    };
  }

  changeRenderingState(rendering) {
    this.setState({ rendering: rendering });
  }

  visualizePathfinding() {
    if (this.state.currentAlgorithm === -1) return;
    if (this.state.rendering) return;

    this.setState({ visualized: true, rendering: true });
    this.changeRenderingState(true);
    let g = this.initializeGrid(false);
    this.setState({
      grid: g,
    });
    this.state.grid = g;
    const grid = this.state.grid;
    const start = grid[this.state.SR][this.state.SC];
    const finish = grid[this.state.FR][this.state.FC];
    const visitedInOrder = this.state.pathfindingAlgorithms[
      this.state.currentAlgorithm
    ](grid, start, finish);
    const shortedPath = getShortestPath(finish);
    for (let i = 0; i < visitedInOrder.length; i++) {
      setTimeout(() => {
        const node = visitedInOrder[i];
        if (!node.isStart && !node.isFinish)
          document.getElementById(`node-${node.row}-${node.col}`).className =
            "node node-visited";
      }, this.state.delays[this.state.speed] * i);
    }

    for (let i = 0; i < shortedPath.length; i++) {
      setTimeout(() => {
        const node = shortedPath[i];
        if (!node.isStart && !node.isFinish)
          document.getElementById(`node-${node.row}-${node.col}`).className =
            "node node-path";
      }, this.state.delays[this.state.speed] * visitedInOrder.length + 50 * i);
    }
    setTimeout(() => {
      this.setState({ rendering: false });
      this.changeRenderingState(false);
    }, this.state.delays[this.state.speed] * visitedInOrder.length + 50 * shortedPath.length);
  }

  clearVisualizer() {
    if (!this.state.rendering)
      this.setState({ grid: this.initializeGrid(true), visualized: false });
  }

  updateGridWithWall(grid, row, col) {
    const node = grid[row][col];
    const newNode = {
      ...node,
      isWall: !node.isWall,
    };
    grid[row][col] = newNode;
  }

  handleMouseDown(row, col) {
    if (row === this.state.SR && col === this.state.SC) {
      this.setState({ changingStart: true });
    } else if (row === this.state.FR && col === this.state.FC) {
      this.setState({ changingFinish: true });
    } else if (!this.state.rendering) {
      this.updateGridWithWall(this.state.grid, row, col);
      this.setState({ mouseIsPressed: true });
      this.clearVisitedAndPath();
    }
  }

  handleMouseEnter(row, col) {
    if (this.state.mouseIsPressed) {
      this.updateGridWithWall(this.state.grid, row, col);
      this.setState({ mouseIsPressed: true });
    } else if (
      this.state.changingStart &&
      !(row === this.state.FR && col === this.state.FC)
    ) {
      const start = document.getElementById(
        `node-${this.state.SR}-${this.state.SC}`
      );
      if (start) {
        start.className = "node";
        start.isStart = false;
        this.state.grid[this.state.SR][this.state.SC].isStart = false;
      }
      const newStart = document.getElementById(`node-${row}-${col}`);
      if (newStart) {
        newStart.isStart = true;
        newStart.className = "node node-start";
        this.state.grid[row][col].isStart = true;
      }
      this.setState({ SR: row, SC: col });
      this.clearVisitedAndPath();
    } else if (
      this.state.changingFinish &&
      !(row === this.state.SR && col === this.state.SC)
    ) {
      const finish = document.getElementById(
        `node-${this.state.FR}-${this.state.FC}`
      );
      if (finish) {
        finish.className = "node";
        finish.isFinish = false;
        this.state.grid[this.state.FR][this.state.FC].isFinish = false;
      }
      const newFinish = document.getElementById(`node-${row}-${col}`);
      if (newFinish) {
        newFinish.isFinish = true;
        newFinish.className = "node node-finish";
        this.state.grid[row][col].isFinish = true;
      }
      this.setState({ FR: row, FC: col });
      this.clearVisitedAndPath();
    }
  }

  handleMouseUp() {
    this.setState({
      changingStart: false,
      changingFinish: false,
      mouseIsPressed: false,
    });
  }

  generateRandomMaze() {
    if (this.state.rendering || this.state.generatingMaze) {
      return;
    }
    this.setState({ rendering: true });
    setTimeout(() => {
      const { grid } = this.state;
      const startNode = grid[this.state.SR][this.state.SC];
      const finishNode = grid[this.state.FR][this.state.FC];
      const walls = primMaze(grid, startNode, finishNode);
      this.animateMaze(walls);
    }, 7);
  }

  generateRecursiveDivisionMaze() {
    if (this.state.rendering || this.state.generatingMaze) {
      return;
    }
    this.setState({ rendering: true });
    setTimeout(() => {
      const { grid } = this.state;
      const startNode = grid[this.state.SR][this.state.SC];
      const finishNode = grid[this.state.FR][this.state.FC];
      const walls = primMaze2(grid, startNode, finishNode);
      this.animateMaze(walls);
    }, 5);
  }

  animateMaze = (walls) => {
    for (let i = 0; i <= walls.length; i++) {
      if (i === walls.length) {
        setTimeout(() => {
          this.clearVisualizer();
          let newGrid = getNewGridWithMaze(this.state.grid, walls);
          this.setState({ grid: newGrid, rendering: false });
        }, i * 7);
        return;
      }
      let wall = walls[i];
      let node = this.state.grid[wall[0]][wall[1]];
      setTimeout(() => {
        //Walls
        document.getElementById(`node-${node.row}-${node.col}`).className =
          "node node-wall";
      }, i * 7);
    }
  };

  render() {
    const grid = this.state.grid;
    return (
      <>
        <div className="grid">
          {grid.map((row, rowId) => {
            return (
              <div key={rowId}>
                {row.map((node, nodeId) => {
                  const { row, col, isFinish, isStart, isWall } = node;
                  return (
                    <Node
                      key={nodeId}
                      row={row}
                      col={col}
                      isStart={isStart}
                      isFinish={isFinish}
                      isWall={isWall}
                      mouseIsPressed={this.state.mouseIsPressed}
                      onMouseDown={(row, col) => this.handleMouseDown(row, col)}
                      onMouseEnter={(row, col) =>
                        this.handleMouseEnter(row, col)
                      }
                      onMouseUp={() => this.handleMouseUp()}
                    ></Node>
                  );
                })}
              </div>
            );
          })}
        </div>
        <div
          class={"pathButtons"}
          style={{ marginTop: "10px", display: "block" }}
        >
          <aside>
            <DropdownButton
              id="dropdown-basic-button"
              title={`Algorithm: ${
                this.state.algorithms[this.state.currentAlgorithm]
              }`}
              disabled={this.state.rendering}
            >
              <Dropdown.Item onClick={() => this.setAlgorithm("0")}>
                Breadth First
              </Dropdown.Item>
              <Dropdown.Item onClick={() => this.setAlgorithm("1")}>
                Dijkstra
              </Dropdown.Item>
              <Dropdown.Item onClick={() => this.setAlgorithm("2")}>
                A Star
              </Dropdown.Item>
              <Dropdown.Item onClick={() => this.setAlgorithm("3")}>
                Depth First
              </Dropdown.Item>
            </DropdownButton>
            <DropdownButton
              id="dropdown-basic-button"
              title={`Speed: ${this.state.speed}`}
            >
              <Dropdown.Item onClick={() => this.setSpeed("Slow")}>
                Slow
              </Dropdown.Item>
              <Dropdown.Item onClick={() => this.setSpeed("Medium")}>
                Medium
              </Dropdown.Item>
              <Dropdown.Item onClick={() => this.setSpeed("Fast")}>
                Fast
              </Dropdown.Item>
            </DropdownButton>
            <Button
              variant="primary"
              onClick={() => {
                this.clearVisitedAndPath();
                this.visualizePathfinding();
              }}
              style={{ marginLeft: "5px", height: "40px" }}
              disabled={this.state.rendering}
            >
              Visualize
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                this.clearVisualizer();
                this.generateRandomMaze();
                this.setState({ finish: false });
                this.clearVisitedAndPath();
              }}
              style={{ marginLeft: "5px", height: "40px" }}
              disabled={this.state.rendering}
            >
              Generate Random Maze
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                this.clearVisualizer();
                this.generateRecursiveDivisionMaze();
                this.setState({ finish: false });
                this.clearVisitedAndPath();
              }}
              style={{ marginLeft: "5px", height: "40px" }}
              disabled={this.state.rendering}
            >
              Generate Recursive Maze
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                this.setState({ finish: false });
                this.clearVisitedAndPath();
                this.clearVisualizer();
              }}
              style={{ marginLeft: "5px", height: "40px" }}
              disabled={this.state.rendering}
            >
              Clear
            </Button>
          </aside>
        </div>
      </>
    );
  }
}

const getNewGridWithMaze = (grid, walls) => {
  let newGrid = grid.slice();
  for (let wall of walls) {
    let node = grid[wall[0]][wall[1]];
    let newNode = {
      ...node,
      isWall: true,
    };
    newGrid[wall[0]][wall[1]] = newNode;
  }
  return newGrid;
};
