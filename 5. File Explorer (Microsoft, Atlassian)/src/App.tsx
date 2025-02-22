import { useState } from "react";
import FileExplorer from "./components/FileExplorer";
import { fileExplorerData } from "./constants";
import "./styles.css";

export default function App() {
  const [data, setData] = useState(fileExplorerData);

  return (
    <div className="App">
      <h1>File Explorer</h1>

      <FileExplorer data={data} setData={setData} />
    </div>
  );
}
