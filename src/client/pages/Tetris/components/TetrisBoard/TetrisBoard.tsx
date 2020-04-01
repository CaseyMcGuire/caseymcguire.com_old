import * as React from "react";
import ImmutableBoard from "../../models/ImmutableBoard";
import {createUseStyles} from "react-jss";

type Props = {
  board: ImmutableBoard<string>
};

const createStyles = createUseStyles({
  tetrisBoard: {
    borderCollapse: 'collapse'
  },
  tetrisSquare: {
    border: '1px solid black',
    height: '50px',
    width: '50px'
  }
});

export default function TetrisBoard(props: Props) {
  const styles = createStyles();
  const board = props.board.getBoard().map(row => {
    return (
      <tr>
        {
          row.map(elem => <td className={styles.tetrisSquare} style={{backgroundColor: elem}}/>)
        }
      </tr>
    );
  });


  return (
    <div>
      <table className={styles.tetrisBoard}>
        <tbody>
        {board}
        </tbody>
      </table>
    </div>
  );
}