import { useEffect, useState } from "react";
import Card from "../global/Card";
import { DragDropContext } from "react-beautiful-dnd";
import { useSelector, useDispatch } from "react-redux";
// import { reorderDeals, setStage } from "../../state/features/dealSlice";
import {
  addTempItemToStage,
  getAllStages,
  removeTempItemFromStage,
} from "../../state/features/stageSlice";
import { Icon } from "@iconify/react";
import AddDeal from "../global/AddDeal";
import Model from "../models/Model";
import Column from "./Column";
import Row from "./Row";
import { toast } from "react-toastify";
import CreateKanbanModel from "../models/CreateStageModel";
import Loader from "../global/Loader";
import { updateDealStage } from "../../state/features/dealSlice";

const Kanban = ({ setIsKanBanEdit }) => {
  const dispatch = useDispatch();
  const deals = useSelector((state) => state.deals);
  const { data, loading, success, error } = useSelector(
    (state) => state.stages
  );
  const [editDealModelDisplay, setEditDealModelDisplay] = useState(false);
  const [addDealModelDisplay, setAddDealModelDisplay] = useState(false);
  const [createStageModelDisplay, setCreateStageModelDisplay] = useState(false);

  const onDragEnd = (result) => {
    if (!result.destination) return;
    const { source, destination, draggableId } = result;
    if (source.droppableId !== destination.droppableId) {
      dispatch(
        addTempItemToStage({
          stageId: destination.droppableId,
          item: draggableId,
        })
      );
      dispatch(
        removeTempItemFromStage({
          stageId: source.droppableId,
          itemPosition: source.index,
        })
      );
      dispatch(
        updateDealStage({
          cardId: result.draggableId,
          prevStageId: result.source.droppableId,
          newStageId: result.destination.droppableId,
        })
      );
    }
  };

  useEffect(() => {
    dispatch(getAllStages());
    console.count("Rendered");
  }, [deals.success]);

  return (
    <>
      {error && toast.error("Some thing went wrong.")}
      <Models
        editDealModelDisplay={editDealModelDisplay}
        setEditDealModelDisplay={setEditDealModelDisplay}
        addDealModelDisplay={addDealModelDisplay}
        setAddDealModelDisplay={setAddDealModelDisplay}
        createStageModelDisplay={createStageModelDisplay}
        setCreateStageModelDisplay={setCreateStageModelDisplay}
      />
      <section className="flex items-center justify-between px-5 py-2 border-b">
        <div>
          <button
            onClick={() => setAddDealModelDisplay(true)}
            className="btn-filled btn-small"
          >
            <Icon icon={"uil:plus"} className="text-xl" />
            Deal
          </button>
        </div>
        <div>
          <div></div>
          <div>
            <button
              className="btn-filled btn-small"
              onClick={() => setIsKanBanEdit(true)}
            >
              edit
            </button>
          </div>
        </div>
      </section>
      {data.length ? (
        <section className="h-[calc(100%-120px)]">
          <div className="flex overflow-x-auto h-full">
            <DragDropContext onDragEnd={(result) => onDragEnd(result)}>
              {data &&
                data.map((stage) => {
                  return (
                    <Column stage={stage} key={stage._id} loading={loading} />
                  );
                })}
            </DragDropContext>
          </div>
        </section>
      ) : (
        <section className="md:p-10 p-5">
          <p>
            No stages has been created yet.{" "}
            <button
              onClick={() => setCreateStageModelDisplay(true)}
              className="underline"
            >
              Create One
            </button>
          </p>
        </section>
      )}
    </>
  );
};

const Models = ({
  editDealModelDisplay,
  setEditDealModelDisplay,
  addDealModelDisplay,
  setAddDealModelDisplay,
  setCreateStageModelDisplay,
  createStageModelDisplay,
}) => {
  return (
    <>
      <Model
        title={"Add Deal"}
        isOpen={addDealModelDisplay}
        setIsOpen={setAddDealModelDisplay}
      >
        <AddDeal setIsOpen={setAddDealModelDisplay} />
      </Model>
      <Model
        title={"Edit Deal"}
        isOpen={editDealModelDisplay}
        setIsOpen={setEditDealModelDisplay}
      ></Model>
      <Model
        title="Create Stage"
        isOpen={createStageModelDisplay}
        setIsOpen={setCreateStageModelDisplay}
      >
        <CreateKanbanModel setIsOpen={setCreateStageModelDisplay} />
      </Model>
    </>
  );
};

export default Kanban;
