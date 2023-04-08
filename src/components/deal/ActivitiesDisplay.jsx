import { Icon } from "@iconify/react";
import moment from "moment";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteNote } from "../../state/features/dealFeatures/noteSlice";

const ActivitiesDisplay = () => {
  const [activeTab, setActiveTab] = useState("notes");
  const tabs = ["notes", "files"];
  return (
    <div className="my-5">
      <h2 className="mb-2 text-lg font-medium">History</h2>
      <div className="tabs flex items-center gap-2">
        {tabs.map((item, index) => (
          <button
            className={`capitalize py-1 px-4 rounded transition ${
              activeTab === item ? "bg-bg" : "hover:bg-bg"
            }`}
            onClick={() => setActiveTab(item)}
            key={index}
          >
            {item}
          </button>
        ))}
      </div>
      <div className="body my-4">
        <Activites name={activeTab} />
      </div>
    </div>
  );
};

const Activites = ({ name }) => {
  const { data, loading, error, success } = useSelector((state) => state.deals);
  console.log(data);
  return data && !loading ? (
    <div>
      <ul>
        {name === "notes" && data.notes.length ? (
          data.notes.map((note, index) => {
            return (
              <li key={index}>
                <Note note={note} cardId={data._id} />
              </li>
            );
          })
        ) : (
          <p>This deal has 0 notes</p>
        )}
        <li className="flex">
          <div className="w-[60px] flex flex-col items-center">
            <span className="w-[40px] h-[40px] rounded-full bg-bg flex items-center justify-center">
              <Icon icon={"uil:plus"} />
            </span>
            {/* <div className="line border-l-2 flex-1"></div> */}
          </div>
          <div className="mt-2 p-3 text-sm flex-1">
            <h3 className="font-medium mb-2">Deal Created</h3>
            <p className="flex gap-4">
              <span>{moment(data.createdAt).fromNow()}</span>
              <span>{moment(data.createdAt).format("DD-MM-YYYY")}</span>
              <span>Awesh Choudhary</span>
            </p>
          </div>
        </li>
      </ul>
    </div>
  ) : null;
};

const Note = ({ note, cardId }) => {
  const dispatch = useDispatch();
  function deleteNoteFn() {
    dispatch(deleteNote({ cardId, noteId: note._id }));
  }
  return (
    <div className="flex">
      <div className="w-[60px] flex flex-col items-center">
        <span className="w-[40px] h-[40px] rounded-full bg-bg flex items-center justify-center">
          <Icon icon={"material-symbols:sticky-note-2-outline"} />
        </span>
        <div className="line border-l-2 flex-1"></div>
      </div>
      <div className="bg-bg mb-2 p-3 text-sm flex-1">
        <header className="flex items-center justify-between text-gray-600">
          <div className="flex gap-2">
            <span>{moment(note.createdAt).fromNow()}</span>
            <span>Awesh Choudhary</span>
          </div>
          <div className="flex gap-1">
            <button className="btn-outlined btn-small">
              <Icon icon={"uil:pen"} />
            </button>
            <button onClick={deleteNoteFn} className="btn-outlined btn-small">
              <Icon icon={"uil:trash"} />
            </button>
          </div>
        </header>
        <div
          className="mt-2"
          dangerouslySetInnerHTML={{ __html: note.body }}
        ></div>
      </div>
    </div>
  );
};

export default ActivitiesDisplay;
