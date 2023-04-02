import { useEffect, useState } from "react";
import Card from "../global/Card";
import { DragDropContext } from "react-beautiful-dnd";
import { useSelector, useDispatch } from "react-redux";
// import { reorderDeals, setStage } from "../../state/features/dealSlice";
import { getAllStages } from "../../state/features/stageSlice";
import { Icon } from "@iconify/react";
import AddDeal from "../global/AddDeal";
import Model from "../models/Model";
import Column from "./Column";
import Row from "./Row";
import { toast } from "react-toastify";
import CreateKanbanModel from "../models/CreateStageModel";
import Loader from "../global/Loader";

const Kanban = ({ setIsKanBanEdit }) => {
  const dispatch = useDispatch();
  const deals = useSelector((state) => state.deals.data);
  const { data, loading, success, error } = useSelector(
    (state) => state.stages
  );
  const [editDealModelDisplay, setEditDealModelDisplay] = useState(false);
  const [addDealModelDisplay, setAddDealModelDisplay] = useState(false);
  const [createStageModelDisplay, setCreateStageModelDisplay] = useState(false);

  const onDragEnd = (result) => {
    // if (!result.destination) return;
    // const { source, destination } = result;
    // if (source.droppableId !== destination.droppableId) {
    //   const stageArr = dealStages.filter(
    //     (item) => item.id === destination.droppableId
    //   );
    //   const stage = stageArr[0];
    //   const numOfDeals = stage.deals + 1;
    //   const amount = stage.amount + deals[source.index].value.value;
    //   const copiedItems = [...deals];
    //   const [removed] = copiedItems.splice(destination.index, 1);
    //   copiedItems.splice(source.index, 0, removed);
    //   dispatch(reorderDeals(copiedItems));
    //   dispatch(
    //     setStage({ id: deals[source.index].id, stage: destination.droppableId })
    //   );
    //   dispatch(
    //     updateDealStage({
    //       id: stage._id,
    //       updateFeilds: [
    //         { name: "deals", value: numOfDeals },
    //         { name: "amount", value: amount },
    //       ],
    //     })
    //   );
    // } else {
    //   const copiedItems = [...deals];
    //   const [removed] = copiedItems.splice(source.index, 1);
    //   copiedItems.splice(destination.index, 0, removed);
    //   dispatch(reorderDeals(copiedItems));
    // }
  };

  useEffect(() => {
    dispatch(getAllStages());
  }, []);
  return !loading ? (
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
      {data.length ? (
        <>
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
          <section className="h-[calc(100%-120px)]">
            <div className="flex overflow-x-auto h-full">
              <DragDropContext onDragEnd={(result) => onDragEnd(result)}>
                {data &&
                  data.map((stage) => {
                    return (
                      <Column stage={stage} key={stage._id}>
                        {/* {deals.map((item, i) => {
                          return (
                            item?.stage === stage._id && (
                              <Row itemId={item.id} index={i} key={i}>
                                <Card
                                  setEditDealModelDisplay={
                                    setEditDealModelDisplay
                                  }
                                  data={item}
                                />
                              </Row>
                            )
                          );
                        })} */}
                      </Column>
                    );
                  })}
              </DragDropContext>
            </div>
          </section>
        </>
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
  ) : (
    <section className="h-full w-full">
      <Loader />
    </section>
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
