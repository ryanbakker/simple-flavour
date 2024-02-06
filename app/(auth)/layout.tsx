const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="md:grid grid-cols-2">
      <section className="flex-center h-screen">{children}</section>

      <h2 className="flex-center h-screen">SimpleFlavour</h2>
    </main>
  );
};

export default Layout;
