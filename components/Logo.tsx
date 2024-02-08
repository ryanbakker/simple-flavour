import Link from "next/link";

const Logo = () => {
  return (
    <Link href="/">
      <p className="text-2xl font-light text-slate-800/80">
        simple<span className="font-bold text-rose-500">Flavour</span>
      </p>
    </Link>
  );
};

export default Logo;
