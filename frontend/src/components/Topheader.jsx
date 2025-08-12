export default function TopHeader() {
  return (
    <header className="flex justify-between items-center p-4 border-b shadow-sm">
      <div>
        <img src="/logo.png" alt="Logo" className="h-10 w-auto" />
      </div>
      <div className="text-center">
        <h1 className="text-2xl font-semibold">An Online Microdata Library</h1>
      </div>
      <div>
        <img src="/logo2.png" alt="Logo" className="h-10 w-auto" />
      </div>
    </header>
  );
}

