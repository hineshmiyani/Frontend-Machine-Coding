type BaseItem = {
  id: `${string}-${string}-${string}-${string}-${string}`;
  name: string;
};

type FolderItem = BaseItem & {
  isFolder: true;
  children: Item[];
};

type FileItem = BaseItem & {
  isFolder: false;
};

export type Item = FolderItem | FileItem;

export type Data = Item[];

export const fileExplorerData: Data = [
  {
    id: crypto.randomUUID(),
    name: "public",
    isFolder: true,
    children: [
      {
        id: crypto.randomUUID(),
        name: "index.html",
        isFolder: false,
      },
    ],
  },
  {
    id: crypto.randomUUID(),
    name: "src",
    isFolder: true,
    children: [
      {
        id: crypto.randomUUID(),
        name: "components",
        isFolder: true,
        children: [
          {
            id: crypto.randomUUID(),
            name: "test",
            isFolder: true,
            children: [
              {
                id: crypto.randomUUID(),
                name: "file.ts",
                isFolder: false,
              },
            ],
          },
        ],
      },
      {
        id: crypto.randomUUID(),
        name: "App.tsx",
        isFolder: false,
      },
      {
        id: crypto.randomUUID(),
        name: "data.json",
        isFolder: false,
      },
      {
        id: crypto.randomUUID(),
        name: "index.tsx",
        isFolder: false,
      },
      {
        id: crypto.randomUUID(),
        name: "styles.css",
        isFolder: false,
      },
    ],
  },
  {
    id: crypto.randomUUID(),
    name: "package.json",
    isFolder: false,
  },
  {
    id: crypto.randomUUID(),
    name: "tsconfig.json",
    isFolder: false,
  },
];
