import * as React from "react";
import "./TetrisBoard.scss"
import ImmutableBoard from "../../models/ImmutableBoard";


type Props = {
  board: ImmutableBoard<string>
};

export default function TetrisBoard(props: Props) {
  const board = props.board.getBoard().map(row => {
    return (
      <tr>
        {
          row.map(elem => <td className={"tetris-square"} style={{backgroundColor: elem}}/>)
        }
      </tr>
    );
  });


  return (
    <div className={"tetris-board"}>
      <table>
        <tbody>
        {board}
        </tbody>
      </table>
    </div>
  );
}