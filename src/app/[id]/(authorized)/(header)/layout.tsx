const Header = () => {
  return (
    <div className="w-full h-16 flex items-center px-5 border-b-2 border-neutral-100">
      <span className="flex-1">
        You&apos;re <span className="font-semibold">andou</span>
      </span>
      <span className="flex-1 text-center">
        <span className="font-semibold">Yuchen</span> has joined
      </span>
      <span className="flex-1 text-end">
        Room <span className="font-semibold">AB912K</span>
      </span>
    </div>
  );
};

export default function HeaderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col h-full">
      <Header />
      <div className="flex-1">{children}</div>
    </div>
  );
}
