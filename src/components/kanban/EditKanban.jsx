import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { createStage } from "../../state/features/stageSlice";
// import { reorderStages, addDeal } from "../../state/features/dealSlice";

const EditKanban = ({ setIsKanBanEdit }) => {
  const { data, loading, error, success } = useSelector(
    (state) => state.stages
  );
  const [currentStages, setCurrentStages] = useState(data);
  const dispatch = useDispatch();

  const onDragComplete = (result) => {
    if (!result.destination) return;

    let arr = [...currentStages];
    //Changing the position of Array element
    let removedItem = arr.splice(result.source.index, 1)[0];
    arr.splice(result.destination.index, 0, removedItem);

    //Updating the list
    setCurrentStages(arr);
  };

  function addStage(position) {
    dispatch(createStage({ name: "New Stage", position: position + 1 }));
  }
  function handleKanBanSave() {
    dispatch(reorderStages(currentStages));
    setIsKanBanEdit(false);
  }
  function handleCancelKanBanEdit() {
    setIsKanBanEdit(false);
  }

  useEffect(() => {
    if (error) {
      toast.error("Something went wrong");
    }
  }, [error]);

  return !loading && data ? (
    <>
      <section className="h-[60px] flex items-center justify-between px-5 py-3 border-b">
        <h3>Edit Stages</h3>
        <div className="flex items-center gap-2">
          <button className="btn-outlined" onClick={handleCancelKanBanEdit}>
            cancel
          </button>
          <button className="btn-filled" onClick={handleKanBanSave}>
            save
          </button>
        </div>
      </section>
      <section className="h-[calc(100%-120px)] bg-paper">
        <DragDropContext onDragEnd={onDragComplete}>
          <div className="overflow-x-auto h-full">
            <Droppable droppableId="drag-drop-list" direction="horizontal">
              {(provided, snapshot) => (
                <div
                  className="flex overflow-x-auto h-full"
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {currentStages.length
                    ? currentStages.map((item) => (
                        <Draggable
                          key={item._id}
                          draggableId={item._id}
                          index={item._id}
                        >
                          {(provided) => (
                            <div
                              className={`border-r shrink-0 relative bg-bg flex flex-col ${
                                currentStages.length > 3
                                  ? "flex-1"
                                  : "w-[300px]"
                              }`}
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                            >
                              <header
                                {...provided.dragHandleProps}
                                className="p-4 hover:cursor-move bg-primary text-white"
                              >
                                <h2 className="text-xl font-semibold capitalize">
                                  {item.name}
                                </h2>
                              </header>
                              <div className="p-5">
                                <div className="input-group">
                                  <label htmlFor="name" className="mb-2 block">
                                    Name
                                  </label>
                                  <input
                                    type="text"
                                    className="input"
                                    value={item.name}
                                    placeholder="Stage Name"
                                  />
                                </div>
                                <div className="flex mt-5 gap-2">
                                  <button className="btn-outlined py-1 px-3">
                                    cancel
                                  </button>
                                  <button className="btn-filled py-1 px-3">
                                    save
                                  </button>
                                </div>
                              </div>
                              <button
                                onClick={() => addStage(item.position)}
                                className="create-stage btn-filled bg-bg border-black w-[30px] p-0 h-[30px] rounded-full text-textColor flex items-center justify-center text-xl absolute top-0 z-10 -right-[15px]"
                              >
                                <Icon icon={"uil:plus"} />
                              </button>
                            </div>
                          )}
                        </Draggable>
                      ))
                    : null}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        </DragDropContext>
      </section>
    </>
  ) : (
    <section className="p-5">
      <p>Loading...</p>
    </section>
  );
};

export default EditKanban;
