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
import hotkeys from "hotkeys-js";
import MobileDrawer from "./drawer";

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
  hotKey: string | null;
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
    hotKey: "Delete",
  },
  {
    label: <DeleteIcon />,
    onClick: () => {
      state.buffer = state.buffer.slice(0, -1);
    },
    bg: "#6EACDA",
    fg: "#FFFFFF",
    hotKey: "Backspace",
  },
  {
    label: <PercentIcon />,
    onClick: () => {
      state.buffer += "%";
    },
    bg: "#6EACDA",
    fg: "#FFFFFF",
    hotKey: "shift+5",
  },
  {
    label: <DivideIcon />,
    onClick: () => {
      state.buffer += "/";
    },
    bg: "#6EACDA",
    fg: "#FFFFFF",
    hotKey: "NumpadDivide,Slash",
  },
  {
    label: "7",
    onClick: () => {
      state.buffer += "7";
    },
    bg: "#FFFFFF",
    fg: "#000000",
    hotKey: "7",
  },
  {
    label: "8",
    onClick: () => {
      state.buffer += "8";
    },
    bg: "#FFFFFF",
    fg: "#000000",
    hotKey: "8",
  },
  {
    label: "9",
    onClick: () => {
      state.buffer += "9";
    },
    bg: "#FFFFFF",
    fg: "#000000",
    hotKey: "9",
  },
  {
    label: <XIcon />,
    onClick: () => {
      state.buffer += "x";
    },
    bg: "#6EACDA",
    fg: "#FFFFFF",
    hotKey: "NumpadMultiply",
  },
  {
    label: "4",
    onClick: () => {
      state.buffer += "4";
    },
    bg: "#FFFFFF",
    fg: "#000000",
    hotKey: "4",
  },
  {
    label: "5",
    onClick: () => {
      state.buffer += "5";
    },
    bg: "#FFFFFF",
    fg: "#000000",
    hotKey: "5",
  },
  {
    label: "6",
    onClick: () => {
      state.buffer += "6";
    },
    bg: "#FFFFFF",
    fg: "#000000",
    hotKey: "6",
  },
  {
    label: <MinusIcon />,
    onClick: () => {
      state.buffer += "-";
    },
    bg: "#6EACDA",
    fg: "#FFFFFF",
    hotKey: "-",
  },
  {
    label: "1",
    onClick: () => {
      state.buffer += "1";
    },
    bg: "#FFFFFF",
    fg: "#000000",
    hotKey: "1",
  },
  {
    label: "2",
    onClick: () => {
      state.buffer += "2";
    },
    bg: "#FFFFFF",
    fg: "#000000",
    hotKey: "2",
  },
  {
    label: "3",
    onClick: () => {
      state.buffer += "3";
    },
    bg: "#FFFFFF",
    fg: "#000000",
    hotKey: "3",
  },
  {
    label: <PlusIcon />,
    onClick: () => {
      state.buffer += "+";
    },
    bg: "#6EACDA",
    fg: "#FFFFFF",
    hotKey: "+,NumpadAdd",
  },

  {
    label: <DotIcon />,
    onClick: () => {
      state.buffer += ".";
    },
    bg: "#6EACDA",
    fg: "#FFFFFF",
    hotKey: ".",
  },
  {
    label: "0",
    onClick: () => {
      state.buffer += "0";
    },
    bg: "#FFFFFF",
    fg: "#000000",
    hotKey: "0",
  },
  {
    label: null,
    onClick: () => null,
    bg: "#6EACDA",
    fg: "#FFFFFF",
    hotKey: null,
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
    hotKey: "enter",
  },
];

hotkeys("*", (e) => {
  console.log(e);
});

basic_buttons
  .filter((b) => b.hotKey)
  .forEach((item) => {
    window.addEventListener("keydown", (e) => {
      const hks = (item.hotKey as string)
        .split(",")
        .map((hk) => hk.trim().toLowerCase());
      if (
        hks.some(
          (hk) => hk === e.key.toLowerCase() || hk === e.code.toLowerCase()
        )
      ) {
        item.onClick();
      }
    });
  });

function App() {
  const snapshot = useSnapshot(state);

  return (
    <main className="bg-[#021526]  w-full max-w-md m-auto min-h-[100svh] flex flex-col p-3 gap-5">
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
        <MobileDrawer />
      </section>
    </main>
  );
}

export default App;
