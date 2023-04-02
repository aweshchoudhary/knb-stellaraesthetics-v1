import { EditorState } from "draft-js";
import { useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const RichTextEditor = () => {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  //   function handleChange(state) {
  //     console.log(state);
  //   }
  return (
    <div>
      <Editor
        editorState={editorState}
        onEditorStateChange={setEditorState}
        toolbarClassName="toolbarClassName border bg-bg text-textColor"
        wrapperClassName="wrapperClassName w-full bg-bg"
        editorClassName="border px-3 min-h-[100px] max-w-full overflow-x-auto"
      />
    </div>
  );
};

export default RichTextEditor;
