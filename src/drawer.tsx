import { CircleHelpIcon, ExternalLinkIcon } from "lucide-react";
import { Drawer } from "vaul";

export default function MobileDrawer({
  title,
  body,
  buttonLabel,
}: {
  title: string;
  body: React.ReactNode;
  buttonLabel: React.ReactNode;
}) {
  return (
    <Drawer.Root shouldScaleBackground>
      <Drawer.Trigger asChild>
        <button
          type="button"
          className="bg-white col-span-full h-full p-3 flex justify-center items-center rounded-lg"
        >
          {buttonLabel}
        </button>
      </Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/40" />
        <Drawer.Content className="bg-gray-100 flex flex-col rounded-t-[10px] h-full mt-24 max-h-[96%] fixed bottom-0 left-0 right-0">
          <Drawer.Description></Drawer.Description>
          <div className="p-4 bg-white rounded-t-[10px] flex-1">
            <Drawer.Handle className="bg-gray-300 mb-8" />
            <div className="max-w-md mx-auto">
              <Drawer.Title className="font-medium mb-4">{title}</Drawer.Title>
              {body}
            </div>
          </div>
          <div className="p-4 bg-gray-100 border-t border-gray-200 mt-auto">
            <div className="flex gap-6 justify-end max-w-md mx-auto">
              <a
                className="text-xs text-gray-600 flex items-center justify-center gap-1"
                href="https://github.com/ilawy/microcalc"
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
  );
}
