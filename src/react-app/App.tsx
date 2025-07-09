import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

function Home() {
  return <div className="p-4">Welcome to Manic Miners!</div>;
}
function Levels() {
  return <div className="p-4">Level downloader coming soon.</div>;
}
function Library() {
  return <div className="p-4">Your library will appear here.</div>;
}
function MapGenerator() {
  return <div className="p-4">Map generator coming soon.</div>;
}

export default function App() {
  return (
    <BrowserRouter>
      <header className="bg-gray-800 text-white p-4 flex justify-between">
        <span className="font-bold">Manic Miners</span>
        <nav className="space-x-4">
          <Link to="/">Home</Link>
          <Link to="/levels">Levels</Link>
          <Link to="/library">Library</Link>
          <Link to="/map-generator">Map Generator</Link>
        </nav>
      </header>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/levels" element={<Levels />} />
        <Route path="/library" element={<Library />} />
        <Route path="/map-generator" element={<MapGenerator />} />
      </Routes>
    </BrowserRouter>
  );
}
