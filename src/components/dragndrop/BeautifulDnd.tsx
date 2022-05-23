import React, { ReactElement, useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import LeftSideBar from '../Layouts/LeftSideBar';

const MyKnowledge = [
  {
    id: '1',
    name: 'JavaScript',
  },
  {
    id: '2',
    name: 'ReactJS',
  },
  {
    id: '3',
    name: 'TypeScript',
  },
  {
    id: '4',
    name: 'ElectronJs',
  },
  {
    id: '5',
    name: 'NextJS',
  },
];

export default function BeautifulDnd(): ReactElement {
  const [title, setTitle] = useState(MyKnowledge);

  const handleOnDragEnd = (result: any) => {
    if (!result.destination) return;

    const items = Array.from(title);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setTitle(items);
  };
  return (
    <LeftSideBar>
        <div className="dnd__wrapper">
          <h2> React Beautiful DND  </h2>
          <DragDropContext onDragEnd={handleOnDragEnd}>
            <Droppable droppableId="knowledge">
              {(provided) => (
                <ul className="knowledge" {...provided.droppableProps} ref={provided.innerRef}>
                  {title.map(({ id, name }, index) => (
                    <Draggable key={id} draggableId={id} index={index}>
                      {(dragProvided) => (
                        <li ref={dragProvided.innerRef} {...dragProvided.draggableProps} {...dragProvided.dragHandleProps}>
                          <p>
                            { name }
                          </p>
                        </li>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </ul>
              )}
            </Droppable>
          </DragDropContext>
      </div>
    </LeftSideBar>
  );
}
