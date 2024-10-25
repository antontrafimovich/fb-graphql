export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="bg-slate-800 text-white">
        <div>This is news layout</div>
      {children}
    </div>
  );
}
