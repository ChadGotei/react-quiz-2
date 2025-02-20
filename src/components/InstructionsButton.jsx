import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "./ui/button";
import { instructionContent } from "@/constants";
import { motion } from "framer-motion";

const InstructionsButton = () => {
  return (
    <div className="flex justify-end">
      {" "}
      <Sheet>
        <SheetTrigger asChild>
          <motion.div whileHover={{ scale: 1.1 }}>
            <Button
              className="bg-white text-black-1 hover:bg-black-1 hover:text-white transition-colors"
              size="lg"
            >
              Instructions
            </Button>
          </motion.div>
        </SheetTrigger>
        <SheetContent
          side="bottom"
          className="bg-black-2 text-white border-gray-700"
        >
          <SheetHeader>
            <SheetTitle className="text-2xl font-bold text-white">
              Instructions
            </SheetTitle>
          </SheetHeader>
          <div className="mt-4 space-y-2 text-white text-md font-light sm:text-lg">
            {instructionContent.map(({ id, num, content }) => (
              <p key={id}>
                <span className="font-semibold">{num}. </span>
                {content}
              </p>
            ))}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default InstructionsButton;
