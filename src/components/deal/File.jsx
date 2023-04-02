import { useRef, useState } from "react";
import FileInput from "../customFields/Fields/FileInput";

const File = () => {
  const [files, setFiles] = useState([]);
  function handleChange(file) {
    setFiles((prev) => [...prev, file]);
  }
  function handleDeleteFile(filename) {
    const modifiedFiles = files.filter((file) => file.name !== filename);
    setFiles(modifiedFiles);
  }
  return (
    <section className="p-5">
      <FileInput
        files={files}
        setFiles={files}
        handleChangeFn={handleChange}
        handleDeleteItem={handleDeleteFile}
      />
    </section>
  );
};

export default File;
