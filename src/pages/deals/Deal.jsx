import { Icon } from "@iconify/react";
import Header from "../../components/global/Header";
import Tabs from "../../components/global/Tabs";
import Notes from "../../components/deal/Notes";
import Activity from "../../components/deal/Activity";
import File from "../../components/deal/File";
import Email from "../../components/deal/Email";
import DealSideBar from "../../components/deal/DealSideBar";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  getDealById,
  updateDealStage,
} from "../../state/features/dealFeatures/dealSlice";
import { getAllStages } from "../../state/features/stageSlice";
import Loader from "../../components/global/Loader";

const Deal = () => {
  const { data, loading, error, success } = useSelector((state) => state.deals);
  const stages = useSelector((state) => state.stages);
  const params = useParams();
  const dispatch = useDispatch();
  const { id } = params;
  const tabs = [
    {
      id: 1,
      name: "notes",
      icon: "material-symbols:sticky-note-2-outline",
      component: <Notes cardId={id} />,
    },
    {
      id: 2,
      name: "activity",
      icon: "material-symbols:calendar-month-outline",
      component: <Activity />,
    },
    {
      id: 3,
      name: "File",
      icon: "material-symbols:attach-file",
      component: <File />,
    },
    {
      id: 4,
      name: "Email",
      icon: "uil:envelope",
      component: <Email />,
    },
  ];
  console.log(data);
  function updateDealStageFn(cardId, prevStageId, newStageId) {
    dispatch(
      updateDealStage({
        cardId,
        prevStageId,
        newStageId,
      })
    );
  }

  useEffect(() => {
    let isMounted = true;
    isMounted && dispatch(getDealById(id));
    isMounted && dispatch(getAllStages());
    return () => (isMounted = false);
  }, [id]);
  return data &&
    data.clientDetails &&
    !loading &&
    !stages.loading &&
    stages.data ? (
    <>
      <Header title={"Deal"} />
      <section className="header border-b border-collapse px-5 py-3 h-[120px]">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h1 className="text-2xl font-semibold">
              {data.clientDetails.title}
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex gap-1">
              <button className="btn-filled bg-green-600 border-0">Won</button>
              <button className="btn-filled bg-red-600 border-0">Lost</button>
            </div>
            <div>
              <button className="btn-outlined text-xl">
                <Icon icon="uil:arrow-down" />
              </button>
            </div>
          </div>
        </div>
        <div className="w-full flex gap-1">
          {stages.data &&
            stages.data.map((stage, index) => {
              return (
                <button
                  key={index}
                  className={`px-2 py-1 flex-1 text-center ${
                    data.stages[index]?.active
                      ? "text-white bg-primary"
                      : "bg-paper hover:bg-primary hover:text-white"
                  }`}
                  onClick={() =>
                    updateDealStageFn(
                      data._id,
                      data.stages[index].active ? data.stages[index] : null._id,
                      stage._id
                    )
                  }
                >
                  <p>{stage.name}: 29 Days</p>
                </button>
              );
            })}
        </div>
      </section>
      <section className="flex min-h-[calc(100%-180px)]">
        <DealSideBar data={data} />
        <div className="flex-1 p-5 bg-paper">
          <Tabs tabs={tabs} />
        </div>
      </section>
    </>
  ) : (
    <section className="h-screen w-full flex items-center justify-center">
      <Loader />
    </section>
  );
};

export default Deal;
