import Logo from "@/components/Logo";
import Image from "next/image";
import Link from "next/link";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="md:grid grid-cols-2 flex-1 bg-neutral-900 text-white">
      <section className="flex h-screen flex-col">
        <header className="max-w-7xl lg:mx-auto p-5 md:px-10 w-full">
          <Logo />
        </header>
        <div className="flex-center h-full">{children}</div>
        <footer className="max-w-7xl lg:mx-auto p-5 md:px-10 w-full">
          <Link
            href="/"
            className="text-white/70 hover:text-white transition-all"
          >
            Return Home
          </Link>
        </footer>
      </section>

      <section className="relative flex-1 min-w-0">
        <Image
          src="/assets/images/testImg.jpg"
          alt="Gourmet Food"
          width={1000}
          height={1000}
          className="object-cover object-center h-screen"
        />
      </section>
    </main>
  );
};

export default Layout;
