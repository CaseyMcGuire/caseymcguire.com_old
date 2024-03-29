import Point from "../models/Point";
import Tetromino from "../models/Tetromino";
import ImmutableBoard from "../models/ImmutableBoard";

export type State = {
  currentPoint: Point,
  currentTetromino: Tetromino,
  board: ImmutableBoard<string>,
  placeNewPiece: boolean,
}

type TickAction = {
  type: "TICK",
};

type RotatePieceAction = {
  type: "ROTATE_PIECE",
};

type DropPieceAction = {
  type: "DROP_PIECE"
};

type MovePieceRightAction = {
  type: "MOVE_PIECE_RIGHT"
};

type MovePieceLeftAction = {
  type: "MOVE_PIECE_LEFT"
};

type Actions =
  TickAction
  | RotatePieceAction
  | DropPieceAction
  | MovePieceLeftAction
  | MovePieceRightAction;


const EMPTY_SQUARE_COLOR = "#FFFFFF";
const TOP_POINT = new Point(5, 0);
const DEFAULT_HEIGHT = 20;
const DEFAULT_WIDTH = 10;

export const initialState: State = {
  currentPoint: TOP_POINT,
  currentTetromino: Tetromino.getRandomPiece(),
  board: ImmutableBoard.fromArray(getInitialBoard()),
  placeNewPiece: true,
};

function getInitialBoard(): Array<Array<string>> {
  return new Array(DEFAULT_HEIGHT).fill(null).map(
    elem => new Array(DEFAULT_WIDTH).fill(EMPTY_SQUARE_COLOR)
  );
}

export const reducer = (state: State, action: Actions): State => {
  switch (action.type) {
    case "TICK":
      return tick();
    case "ROTATE_PIECE":
      return rotate();
    case "DROP_PIECE":
      return drop();
    case "MOVE_PIECE_LEFT":
      return move(-1);
    case "MOVE_PIECE_RIGHT":
      return move(1);
    default:
      return state;
  }

  function tick(): State {
    const newPoint = getNextPoint();
    if (state.placeNewPiece) {
      const canPlaceNewPiece = canPlacePiece(state.board, newPoint, state.currentTetromino);
      if (!canPlaceNewPiece) {
        return state;
      }
    }
    const clearedBoard = clearCurrentPiece();
    const canPlaceNewPiece = canPlacePiece(clearedBoard, newPoint, state.currentTetromino);
    if (!canPlaceNewPiece) {
      return {
        ...state,
        board: getBoardWithFilledRowsCleared(),
        currentTetromino: Tetromino.getRandomPiece(),
        currentPoint: TOP_POINT,
        placeNewPiece: true
      };
    }
    return {
      ...state,
      board: placePiece(clearedBoard, newPoint, state.currentTetromino),
      currentPoint: newPoint,
      placeNewPiece: false
    };
  }

  function getNextPoint(): Point {
    if (state.placeNewPiece) {
      return TOP_POINT;
    }
    else {
      return new Point(state.currentPoint.getX(), state.currentPoint.getY() + 1);
    }
  }

  function getBoardWithFilledRowsCleared(): ImmutableBoard<string> {
    const filledRows: Array<number> = [];
    for (let y = 0; y < state.board.getHeight(); y++) {
      let isFilled = true;
      for (let x = 0; x < state.board.getWidth(); x++) {
        isFilled = isFilled && state.board.get(x, y) !== EMPTY_SQUARE_COLOR;
      }
      if (isFilled) {
        filledRows.push(y);
      }
    }
    filledRows.sort();
    const boardArray = state.board.toArray();

    for (const rowIndex of filledRows) {
      boardArray[0] = new Array(DEFAULT_WIDTH).fill(EMPTY_SQUARE_COLOR);
      for (let row = rowIndex; row > 0; row--) {
        boardArray[row] = boardArray[row - 1];
      }
    }
    return ImmutableBoard.fromArray(boardArray);
  }

  function drop(): State {
    if (state.placeNewPiece) {
      return state;
    }
    for (let y = state.currentPoint.getY() + 1;; y++) {
      const nextPoint = new Point(state.currentPoint.getX(), y);
      const clearedBoard = clearCurrentPiece();
      const canPlaceNewPiece = canPlacePiece(clearedBoard, nextPoint, state.currentTetromino);
      if (!canPlaceNewPiece) {
        const previousPoint = new Point(state.currentPoint.getX(), y - 1);
        return {
          ...state,
          currentPoint: previousPoint,
          board: placePiece(clearedBoard, previousPoint, state.currentTetromino)
        }
      }
    }
  }

  function move(x: number): State {
    if (state.placeNewPiece) {
      return state;
    }
    const newPoint = new Point(state.currentPoint.getX() + x, state.currentPoint.getY());
    const clearedBoard = clearCurrentPiece();
    const canMove = canPlacePiece(clearedBoard, newPoint, state.currentTetromino);
    if (!canMove) {
      return state;
    }
    return {
      ...state,
      board: placePiece(clearedBoard, newPoint, state.currentTetromino),
      currentPoint: newPoint
    };
  }

  function rotate(): State {
    if (state.placeNewPiece) {
      return state;
    }
    const clearedBoard = clearCurrentPiece();
    const rotatedTetromino = state.currentTetromino.getRightRotation();
    const canPlaceNewPiece = canPlacePiece(clearedBoard, state.currentPoint, rotatedTetromino);
    if (!canPlaceNewPiece) {
      return state;
    }
    return {
      ...state,
      board: placePiece(clearedBoard, state.currentPoint, rotatedTetromino),
      currentTetromino: rotatedTetromino
    };
  }

  function clearCurrentPiece(): ImmutableBoard<string> {
    return state.currentTetromino.getCurrentRotation().reduce(
      (acc, point) => acc.set(state.currentPoint.getX() + point.getX(), state.currentPoint.getY() + point.getY(), EMPTY_SQUARE_COLOR),
      state.board
    );
  }

  function canPlacePiece(board: ImmutableBoard<string>, point: Point, tetromino: Tetromino): boolean {
    return tetromino.getCurrentRotation().reduce((acc, tetrominoPoint) => {
      const x = tetrominoPoint.getX() + point.getX();
      const y = tetrominoPoint.getY() + point.getY();
      if (x < 0 || x >= board.getWidth() || y < 0 || y >= board.getHeight()) {
        return false;
      }
      return acc && board.get(tetrominoPoint.getX() + point.getX(), tetrominoPoint.getY() + point.getY()) === EMPTY_SQUARE_COLOR;
    }, true);
  }

  function placePiece(board: ImmutableBoard<string>, point: Point, tetromino: Tetromino): ImmutableBoard<string> {
    return tetromino.getCurrentRotation().reduce((acc, tetrominoPoint) => {
      const x = tetrominoPoint.getX() + point.getX();
      const y = tetrominoPoint.getY() + point.getY();
      return acc.set(x, y, tetromino.color);
    }, board);
  }

};

