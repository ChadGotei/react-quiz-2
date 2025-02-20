import { FaGithub, FaLinkedin, FaGlobe } from "react-icons/fa";

const Footer = () => {
  return (
    <footer
      className="bg-black-2 text-gray-400 py-6 mt-auto border-t 
    border-emerald-300 flex flex-row items-center gap-4 justify-between"
    >
      <div className="text-md font-semibold text-emerald-400 mx-5 sm:mx-10">
        &copy; {new Date().getFullYear()} Gaurav Sharma
      </div>

      <div className="flex gap-6 text-2xl mr-5 sm:mx-10">
        <a
          href="https://github.com/chadgotei"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-emerald-500 transition-colors"
        >
          <FaGithub />
        </a>
        <a
          href="https://www.linkedin.com/in/gaurav-sharma-918832165/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-emerald-500 transition-colors"
        >
          <FaLinkedin />
        </a>
        <a
          href="https://gauravsb.netlify.app"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-emerald-500 transition-colors"
        >
          <FaGlobe />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
