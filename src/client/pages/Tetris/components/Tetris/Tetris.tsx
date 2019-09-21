import TetrisBoard from "../TetrisBoard/TetrisBoard";
import * as React from "react";
import {useEffect, useReducer} from "react";
import {initialState, reducer} from "../../reducers/TetrisReducer";

export default function Tetris() {

  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    window.setInterval(() => {
      dispatch({type: "TICK"});
    }, 400);

    window.onkeydown = (event: KeyboardEvent) => {
      switch (event.keyCode) {
        case Move.Spin:
          dispatch({type: "ROTATE_PIECE"});
          break;
        case Move.Left:
          dispatch({type: "MOVE_PIECE_LEFT"});
          break;
        case Move.Right:
          dispatch({type: "MOVE_PIECE_RIGHT"});
          break;
        case Move.Drop:
          dispatch({type: "DROP_PIECE"});
          break;
      }
    }
  },[dispatch]);


  return (
    <TetrisBoard board={state.board}/>
  );
}

enum Move {
  // These are key codes
  Spin = 38, // up key
  Left = 37,
  Right = 39,
  Drop = 40,
  Pause = 80,
}