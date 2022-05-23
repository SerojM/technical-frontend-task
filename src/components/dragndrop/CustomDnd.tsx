import React, { ReactElement, useState } from 'react';
import { retry } from '@reduxjs/toolkit/query';
import LeftSideBar from '../Layouts/LeftSideBar';

interface IItems {
    id: number,
    title: string,
}

interface IBoardState{
    id: number,
    title: string,
    items: IItems[] | []
}

export default function CustomDnd(): ReactElement {
  const [boards, setBoards] = useState<IBoardState[]>([
    { id: 1, title: 'ToDo', items: [{ id: 1, title: 'Todo1' }, { id: 2, title: 'Todo2' }, { id: 3, title: 'Todo3' }] },
    { id: 2, title: 'Test', items: [{ id: 4, title: 'Test1' }, { id: 5, title: 'Test2' }, { id: 6, title: 'Test3' }] },
    { id: 3, title: 'Done', items: [{ id: 7, title: 'Done1' }, { id: 8, title: 'Done2' }, { id: 9, title: 'Done3' }] },
  ]);

  const [currentBoard, setCurrentBoard] = useState<any>();
  const [currentItem, setCurrentItem] = useState<any>();

  const dragOverHandler = (e: any) => {
    e.preventDefault();
    if (e.target.className.includes('item')) {
      e.target.style.boxShadow = '0 4px 3px blue';
    }
  };

  const dragLeaveHandler = (e: any) => {
    e.target.style.boxShadow = 'none';
  };

  const dragStartHandler = (e: React.DragEvent<HTMLDivElement>, board: IBoardState, item: IItems) => {
    setCurrentBoard(board);
    setCurrentItem(item);
  };

  const dragEndHandler = (e: any) => {
    e.target.style.boxShadow = 'none';
  };

  const dropHandler = (e: any, board: any, item:any) => {
    e.preventDefault();
    const myBoard = { ...board };
    const myItem = { ...item };
    const currentIndex = currentBoard.items.indexOf(currentItem);
    currentBoard.items.splice(currentIndex, 1);
    const dropIndex = myBoard.items.indexOf(myItem);
    myBoard.items.splice(dropIndex + 1, 0, currentItem);
    setBoards(boards.map((b) => {
      if (b.id === board.id) {
        return board;
      }
      if (b.id === currentBoard.id) {
        return currentBoard;
      }
      return b;
    }));
    e.target.style.boxShadow = 'none';
  };

  return (
    <LeftSideBar>
      <div className="custom__dnd__wrapper">
        {boards.map((board) => (
          <div className="board">
            <div
              className="board_title"
            >
              {board.title}

            </div>

            {board.items.map((item) => (
              <div
                onDragOver={(e) => dragOverHandler(e)}
                onDragLeave={(e) => dragLeaveHandler(e)}
                onDragStart={(e) => dragStartHandler(e, board, item)}
                onDragEnd={(e) => dragEndHandler(e)}
                onDrop={(e) => dropHandler(e, board, item)}
                className="item todo"
                draggable
              >
                {item.title}
              </div>
            ))}
          </div>
        ))}
      </div>
    </LeftSideBar>
  );
}
