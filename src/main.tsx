import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

import calcWasm from "./assets/calc.wasm?init";
import { TinyWASI } from "./lib/tinywasi.ts";

const wasi = new TinyWASI();
const instance = await calcWasm({
  ...wasi.imports,
});
// wasi.initialize(instance)

const alloc = instance.exports.mem_alloc as (size: number) => number;
const free = instance.exports.mem_free as (ptr: number) => void;
const wasmCalc = instance.exports.calc as (ptr: number, len: number) => number;
const memory = instance.exports.memory as WebAssembly.Memory;
const buffer = new Uint8Array(memory.buffer);

export function calc(expression: string) {
  expression = expression
    .replace("x", "*")
    .replace("÷", "/")
    .replace("π", "pi");
  const expressionBytes = new TextEncoder().encode(expression);
  const ptr = alloc(expressionBytes.length);
  buffer.set(expressionBytes, ptr);
  const result = wasmCalc(ptr, expressionBytes.length);
  free(ptr);
  console.log(result);

  return result;
}
