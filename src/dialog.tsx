import {
  Description,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { useState } from "react";

export default function DesktopDealog({
  title,
  buttonLabel,
  body,
}: {
  buttonLabel: React.ReactNode;
  title: string;
  body: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        className="bg-white col-span-full h-full p-3 flex justify-center items-center rounded-lg"
        onClick={() => setIsOpen(true)}
      >
        {buttonLabel}
      </button>
      <Dialog
        transition
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="fixed inset-0 flex w-screen items-center justify-center bg-black/30 p-4 transition duration-300 ease-out data-[closed]:opacity-0"
      >
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
          <DialogPanel className="max-w-lg space-y-4 border bg-white p-12">
            <DialogTitle className="font-bold">{title}</DialogTitle>
            <Description></Description>
            <div>{body}</div>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
}
