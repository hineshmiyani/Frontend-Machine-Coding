import {
  Dispatch,
  SetStateAction,
  useState,
  useRef,
  useEffect,
  FormEvent,
} from "react";
import { Data, Item } from "../constants";
import FileExplorer from "./FileExplorer";

type FileExplorerItemProps = {
  item: Item;
  setData: Dispatch<SetStateAction<Data>>;
};

type AdditionType = "none" | "folder" | "file";

function insertItemById(data: Data, parentId: string, newItem: Item): Data {
  const updateData = structuredClone(data);

  // BFS
  // const queue = [updateData];

  // while (queue.length > 0) {
  //   const children = queue.shift();

  //   for (const item of children as Data) {
  //     if (item?.isFolder && item?.id === parentId) {
  //       item.children.push(newItem);
  //     }

  //     if (item?.isFolder && item.children) queue.push(item.children);
  //   }
  // }

  // return updateData;

  // ------------
  // DFS:
  return data.map((item) => {
    if (item.id === parentId && "children" in item) {
      return { ...item, children: [...item.children, newItem] };
    }

    if ("children" in item) {
      return {
        ...item,
        children: insertItemById(item.children, parentId, newItem),
      };
    }

    return item;
  });
}

const removeItemById = (data: Data, targetId: string): Data => {
  // BFS
  // const updatedData = structuredClone(data);
  // const queue = [updatedData];

  // while (queue.length > 0) {
  //   const children = queue.shift();

  //   if (!children || children.length === 0) continue;

  //   children.forEach((child, index) => {
  //     if (child.id === targetId) {
  //       children.splice(index, 1);
  //       return;
  //     }
  //     if ("children" in child) queue.push(child?.children);
  //   });
  // }
  // return updatedData;

  // ------------
  // DFS:
  return data
    .filter((item) => item.id !== targetId)
    .map((item) => {
      if (item.isFolder && item.children) {
        return { ...item, children: removeItemById(item?.children, targetId) };
      }
      return item;
    });
};

const FileExplorerItem = ({ item, setData }: FileExplorerItemProps) => {
  const [isFolderExpanded, setIsFolderExpanded] = useState(false);
  const [additionType, setAdditionType] = useState<AdditionType>("none");

  const inputRef = useRef<HTMLInputElement>(null);

  // Reset adding state if folder is collapsed
  useEffect(() => {
    if (isFolderExpanded === false) {
      setAdditionType("none");
    }
  }, [isFolderExpanded]);

  const handleFolderOpen = () => {
    setIsFolderExpanded((isExpanded) => !isExpanded);
  };

  const addFile = () => {
    setIsFolderExpanded(true);
    setAdditionType("file");

    inputRef.current?.focus();
  };

  const addFolder = () => {
    setIsFolderExpanded(true);
    setAdditionType("folder");

    inputRef.current?.focus();
  };

  const insertItem = (parentId: string, value: string) => {
    const newItem = {
      id: crypto.randomUUID(),
      name: value,
      isFolder: additionType === "folder",
      ...(additionType === "folder" ? { children: [] } : {}),
    } as Item;

    setData((prevData) => insertItemById(prevData, parentId, newItem));
  };

  const deleteItem = () => {
    setData((prevData) => removeItemById(prevData, item?.id));
  };

  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const value = inputRef.current?.value;
    if (value) {
      insertItem(item?.id, value);
    }

    setAdditionType("none");
  };

  return (
    <div className="file-explorer-item">
      <div className="file-explorer-item-action">
        <button className="item-name" onClick={handleFolderOpen}>
          {item?.isFolder ? <>{isFolderExpanded ? "📂" : "📁"} </> : "🗂️"}{" "}
          {item?.name}
        </button>

        {item?.isFolder ? (
          <>
            <button className="add-file-btn" onClick={addFile}>
              <img
                src="https://cdn-icons-png.flaticon.com/512/8406/8406667.png"
                alt="add-file-icon"
                width={20}
                height={20}
              />
            </button>
            <button className="add-folder-btn" onClick={addFolder}>
              <img
                src="https://cdn-icons-png.flaticon.com/512/6374/6374386.png"
                alt="add-folder-icon"
                width={20}
                height={20}
              />
            </button>
          </>
        ) : null}

        <button className="delete-btn" onClick={deleteItem}>
          <img
            src="https://cdn-icons-png.flaticon.com/512/10065/10065140.png"
            alt="delete-icon"
            width={20}
            height={20}
          />
        </button>
      </div>

      {isFolderExpanded && item.isFolder && item?.children?.length > 0 ? (
        <FileExplorer data={item.children as Data} setData={setData} />
      ) : null}

      {isFolderExpanded && additionType !== "none" ? (
        <form className="input-ctn" onSubmit={handleFormSubmit}>
          <span>{additionType === "folder" ? "📁" : "🗂️"}</span>{" "}
          <input
            name="name"
            type="text"
            ref={inputRef}
            placeholder={additionType === "file" ? "Add File" : "Add Folder"}
            autoFocus={true}
            onBlur={() => setAdditionType("none")}
          />
        </form>
      ) : null}
    </div>
  );
};

export default FileExplorerItem;
