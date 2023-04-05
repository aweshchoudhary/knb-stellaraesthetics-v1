import { useState } from "react";
import RichTextEditor from "../global/RichTextEditor";
import { useDispatch, useSelector } from "react-redux";
import { addNote } from "../../state/features/dealFeatures/noteSlice";
import Loader from "../../components/global/Loader";

const Notes = ({ cardId }) => {
  const { loading, error, success } = useSelector((state) => state.note);
  const [noteBody, setNoteBody] = useState("");
  const dispatch = useDispatch();

  function handleAddNote() {
    dispatch(addNote({ noteBody, cardId }));
    setNoteBody("");
  }
  function handleClear() {
    setNoteBody("");
  }
  return (
    <section className="p-5">
      <div>
        <RichTextEditor setContent={setNoteBody} />
        <div className="flex items-center mt-3 gap-2">
          <button
            disabled={loading}
            className="btn-outlined"
            onClick={handleClear}
          >
            clear
          </button>
          <button
            className="btn-filled flex items-center justify-center"
            onClick={handleAddNote}
            disabled={loading}
          >
            {loading ? "Loading..." : "add note"}
          </button>
        </div>
      </div>
      <div></div>
    </section>
  );
};

export default Notes;
