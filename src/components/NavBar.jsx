/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { navLinks } from "@/constants";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const NavBar = () => {
  return (
    <nav className="flex justify-between items-center px-8 py-4 bg-black-2 shadow-md">
      {/* Logo */}
      <Link
        to="/"
        className="text-xl sm:text-2xl font-bold text-white cursor-pointer hover:text-gray-100 transition-colors"
      >
        React Quiz
      </Link>

      <ul className="flex items-center gap-8 text-[17px]">
        {navLinks.map(({ id, name, link }) => (
          <NavItem key={id} name={name} link={link} />
        ))}

        <li className="cursor-pointer">
          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant="link"
                className="text-white cursor-pointer text-[17px] pl-0 hover:font-bold *:  hover:text-emerald-400"
              >
                How to
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-black text-white border border-gray-700">
              <DialogHeader>
                <DialogTitle>How to start?</DialogTitle>
                <DialogDescription className="text-gray-400 pt-4">
                  - Click <span className="font-bold">Start Quiz</span> button
                  to begin.
                  <br />- Answer all questions to complete the quiz.
                </DialogDescription>
              </DialogHeader>
              <DialogClose asChild>
                <Button
                  variant="ghost"
                  className="mt-4 w-full text-emerald-500
                  transition-colors hover:text-black-2 cursor-pointer hover:bg-emerald-600"
                >
                  Close
                </Button>
              </DialogClose>
            </DialogContent>
          </Dialog>
        </li>
      </ul>
    </nav>
  );
};

const NavItem = ({ name, link }) => {
  return (
    <li>
      <Link
        to={link}
        className="text-white hover:text-emerald-400 transition-colors hover:font-bold"
      >
        {name}
      </Link>
    </li>
  );
};

export default NavBar;
