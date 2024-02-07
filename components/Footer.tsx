import Link from "next/link";
import Logo from "./Logo";

const Footer = () => {
  return (
    <footer className="border-t border-gray-200">
      <div className="wrapper flex items-center justify-between">
        <Logo />

        <p className="text-gray-500 text-sm">© 2024 Ryan Bakker</p>

        <Link
          href="https://github.com/ryanbakker/simple-flavour"
          className="text-gray-500 hover:text-rose-600 font-medium transition-all"
        >
          GitHub Repo
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
