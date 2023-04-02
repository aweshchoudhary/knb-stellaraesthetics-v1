import { Droppable } from "react-beautiful-dnd";

const Column = ({ children, stage }) => {
  return (
    <div className={"border-r shrink-0 flex flex-col flex-1"} key={stage._id}>
      <header
        className={
          "border-b px-3 py-1 sticky top-0 left-0 text-white" + " bg-primary"
        }
      >
        <h2 className="font-medium capitalize text-sm">{stage.name}</h2>
        <p className="text-sm">
          Rs{stage.amount} - {stage.deals} Deals
        </p>
      </header>
      <div className="flex-1">
        <Droppable droppableId={stage._id} key={stage._id}>
          {(provided, snapshot) => {
            return (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className={`p-2 h-full ${
                  snapshot.isDraggingOver ? "bg-paper" : "bg-bg"
                }`}
              >
                {children}
                {provided.placeholder}
              </div>
            );
          }}
        </Droppable>
      </div>
    </div>
  );
};

export default Column;
