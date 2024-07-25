import {
  CircleHelpIcon,
  CopyIcon,
  DeleteIcon,
  DivideIcon,
  DotIcon,
  EqualIcon,
  ExternalLinkIcon,
  MinusIcon,
  PercentIcon,
  PlusIcon,
  XIcon,
} from "lucide-react";
import { proxy, useSnapshot } from "valtio";
import { calc } from "./main";
import { Drawer } from "vaul";

const state = proxy({
  buffer: "",
  history: [] as HistoryEntry[],
  currentIsResult: false,
});

interface HistoryEntry {
  expression: string;
  result: string;
}

interface Button {
  label: React.ReactNode;
  onClick: () => void;
  bg: string;
  fg: string;
}

//sets currentIsResult

const basic_buttons: Button[] = [
  {
    label: "C",
    onClick: () => {
      state.buffer = "";
    },
    bg: "#6EACDA",
    fg: "#FFFFFF",
  },
  {
    label: <DeleteIcon />,
    onClick: () => {
      state.buffer = state.buffer.slice(0, -1);
    },
    bg: "#6EACDA",
    fg: "#FFFFFF",
  },
  {
    label: <PercentIcon />,
    onClick: () => {
      state.buffer += "%";
    },
    bg: "#6EACDA",
    fg: "#FFFFFF",
  },
  {
    label: <DivideIcon />,
    onClick: () => {
      state.buffer += "/";
    },
    bg: "#6EACDA",
    fg: "#FFFFFF",
  },
  {
    label: "7",
    onClick: () => {
      state.buffer += "7";
    },
    bg: "#FFFFFF",
    fg: "#000000",
  },
  {
    label: "8",
    onClick: () => {
      state.buffer += "8";
    },
    bg: "#FFFFFF",
    fg: "#000000",
  },
  {
    label: "9",
    onClick: () => {
      state.buffer += "9";
    },
    bg: "#FFFFFF",
    fg: "#000000",
  },
  {
    label: <XIcon />,
    onClick: () => {
      state.buffer += "x";
    },
    bg: "#6EACDA",
    fg: "#FFFFFF",
  },
  {
    label: "4",
    onClick: () => {
      state.buffer += "4";
    },
    bg: "#FFFFFF",
    fg: "#000000",
  },
  {
    label: "5",
    onClick: () => {
      state.buffer += "5";
    },
    bg: "#FFFFFF",
    fg: "#000000",
  },
  {
    label: "6",
    onClick: () => {
      state.buffer += "6";
    },
    bg: "#FFFFFF",
    fg: "#000000",
  },
  {
    label: <MinusIcon />,
    onClick: () => {
      state.buffer += "-";
    },
    bg: "#6EACDA",
    fg: "#FFFFFF",
  },
  {
    label: "1",
    onClick: () => {
      state.buffer += "1";
    },
    bg: "#FFFFFF",
    fg: "#000000",
  },
  {
    label: "2",
    onClick: () => {
      state.buffer += "2";
    },
    bg: "#FFFFFF",
    fg: "#000000",
  },
  {
    label: "3",
    onClick: () => {
      state.buffer += "3";
    },
    bg: "#FFFFFF",
    fg: "#000000",
  },
  {
    label: <PlusIcon />,
    onClick: () => {
      state.buffer += "+";
    },
    bg: "#6EACDA",
    fg: "#FFFFFF",
  },

  {
    label: <DotIcon />,
    onClick: () => {
      state.buffer += ".";
    },
    bg: "#6EACDA",
    fg: "#FFFFFF",
  },
  {
    label: "0",
    onClick: () => {
      state.buffer += "0";
    },
    bg: "#FFFFFF",
    fg: "#000000",
  },
  {
    label: null,
    onClick: () => null,
    bg: "#6EACDA",
    fg: "#FFFFFF",
  },
  {
    label: <EqualIcon />,
    onClick: () => {
      const last = `${state.buffer}`;
      const result = calc(state.buffer);
      state.history.push({
        expression: last,
        result: result.toString(),
      });
      state.buffer = result.toString();
      state.currentIsResult = true;
    },
    bg: "#6EACDA",
    fg: "#FFFFFF",
  },
];
function App() {
  const snapshot = useSnapshot(state);

  return (
    <main className="bg-[#021526] w-full min-h-[100svh] flex flex-col p-3 gap-5">
      <section className="relative w-full h-64 bg-white rounded-2xl flex flex-col gap-3 p-3">
        <span className="absolute top-2 right-2">
          {snapshot.currentIsResult ? <CopyIcon /> : null}
        </span>
        <textarea
          className="w-full text-[1.5lh]"
          rows={1}
          name=""
          id=""
          value={snapshot.buffer}
          readOnly
        ></textarea>
        <div className="overflow-y-auto">
          {snapshot.history.map((item) => {
            return (
              <p key={item.expression + Math.random()}>
                {item.expression} = {item.result}
              </p>
            );
          })}
        </div>
      </section>
      <section
        className="grid grid-cols-4 gap-3"
        style={{
          gridTemplateRows: "repeat(5, minmax(75px, 1fr))",
        }}
      >
        {basic_buttons.map((button) => {
          return (
            <button
              style={{
                backgroundColor: button.bg,
                color: button.fg,
              }}
              key={`${button.label}${Math.random()}`}
              className="w-full h-full  bg-[#6EACDA] text-white  border rounded-2xl flex items-center justify-center"
              onClick={button.onClick}
            >
              {button.label}
            </button>
          );
        })}
        <Drawer.Root shouldScaleBackground>
          <Drawer.Trigger asChild>
            <button
              type="button"
              className="bg-white col-span-full h-full p-3 flex justify-center items-center rounded-lg"
            >
              <CircleHelpIcon />
            </button>
          </Drawer.Trigger>
          <Drawer.Portal>
            <Drawer.Overlay className="fixed inset-0 bg-black/40" />
            <Drawer.Content className="bg-gray-100 flex flex-col rounded-t-[10px] h-full mt-24 max-h-[96%] fixed bottom-0 left-0 right-0">
              <Drawer.Description></Drawer.Description>
              <div className="p-4 bg-white rounded-t-[10px] flex-1">
                <Drawer.Handle className="bg-gray-300 mb-8" />
                <div className="max-w-md mx-auto">
                  <Drawer.Title className="font-medium mb-4">
                    µCalc
                  </Drawer.Title>
                  <p className="text-gray-600 mb-2">
                    µCalc is a simple calculator app made with React and{" "}
                    <a
                      className="text-blue-600 underline"
                      href="https://github.com/zserge/expr"
                      target="_blank"
                    >
                      zserge/expr
                    </a>
                    .
                  </p>
                  <details>
                    <summary>Special Thanks</summary>
                    <ul>
                      <li>
                        <a href="https://github.com/emilkowalski/vaul">
                          emilkowalski/vaul
                        </a>
                      </li>
                      <li>
                        <a href="https://github.com/zserge/expr">zserge/expr</a>
                      </li>
                    </ul>
                  </details>
                </div>
              </div>
              <div className="p-4 bg-gray-100 border-t border-gray-200 mt-auto">
                <div className="flex gap-6 justify-end max-w-md mx-auto">
                  <a
                    className="text-xs text-gray-600 flex items-center justify-center gap-1"
                    href="https://github.com/emilkowalski/vaul"
                    target="_blank"
                  >
                    GitHub
                    <ExternalLinkIcon size={12} />
                  </a>
                </div>
              </div>
            </Drawer.Content>
          </Drawer.Portal>
        </Drawer.Root>
      </section>
    </main>
  );
}

export default App;
