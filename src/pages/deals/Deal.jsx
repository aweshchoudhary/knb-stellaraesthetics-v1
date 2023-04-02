import { Icon } from "@iconify/react";
import Header from "../../components/global/Header";
import Tabs from "../../components/global/Tabs";
import Notes from "../../components/deal/Notes";
import Activity from "../../components/deal/Activity";
import File from "../../components/deal/File";
import Email from "../../components/deal/Email";
import DealSideBar from "../../components/deal/DealSideBar";

const Deal = () => {
  const tabs = [
    {
      id: 1,
      name: "notes",
      icon: "material-symbols:sticky-note-2-outline",
      component: <Notes />,
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
  return (
    <>
      <Header title={"Deal"} />
      <section className="header border-b border-collapse px-5 py-3 h-[120px]">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h1 className="text-2xl font-semibold">Example Company Deal</h1>
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
          <button className="px-2 py-1 flex-1 text-white bg-primary text-center">
            <p>Requested: 29 Days</p>
          </button>
          <button className="px-2 py-1 flex-1 bg-paper text-center hover:bg-primary hover:text-white">
            <p>To Do</p>
          </button>
          <button className="px-2 py-1 flex-1 bg-paper text-center hover:bg-primary hover:text-white">
            <p>In Progress</p>
          </button>
        </div>
      </section>
      <section className="flex min-h-[calc(100%-190px)]">
        <DealSideBar />
        <div className="flex-1 p-5 bg-paper">
          <Tabs tabs={tabs} />
        </div>
      </section>
    </>
  );
};

export default Deal;
