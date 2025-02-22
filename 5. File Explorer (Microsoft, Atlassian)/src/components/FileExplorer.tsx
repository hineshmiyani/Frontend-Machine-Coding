import { Dispatch, SetStateAction } from "react";
import { Data } from "../constants";
import FileExplorerItem from "./FIleExplorerItem";

type FileExplorerProps = {
  data: Data;
  setData: Dispatch<SetStateAction<Data>>;
};

const FileExplorer = ({ data, setData }: FileExplorerProps) => {
  return (
    <div className="file-explorer-container">
      {data.map((item) => (
        <FileExplorerItem key={item?.id} item={item} setData={setData} />
      ))}
    </div>
  );
};

export default FileExplorer;
