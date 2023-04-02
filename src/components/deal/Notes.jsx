import RichTextEditor from "../global/RichTextEditor";

const Notes = () => {
  return (
    <section className="p-5">
      <div>
        <RichTextEditor />
        <div className="flex items-center mt-3 gap-2">
          <button className="btn-outlined">cancel</button>
          <button className="btn-filled">save</button>
        </div>
      </div>
      <div></div>
    </section>
  );
};

export default Notes;
