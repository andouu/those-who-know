const Header = () => {
  return null;
};

export default function HeaderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="">
      <Header />
      {children}
    </div>
  );
}
