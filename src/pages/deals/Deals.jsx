import { lazy, useState } from "react";
import Header from "../../components/global/Header";

const Kanban = lazy(() => import("../../components/kanban/Kanban"));
const EditKanban = lazy(() => import("../../components/kanban/EditKanban"));

const Deals = () => {
  const [isKanBanEdit, setIsKanBanEdit] = useState(false);
  return (
    <>
      <Header title={"Deals"} />
      {isKanBanEdit ? (
        <EditKanban setIsKanBanEdit={setIsKanBanEdit} />
      ) : (
        <Kanban setIsKanBanEdit={setIsKanBanEdit} />
      )}
    </>
  );
};

export default Deals;
