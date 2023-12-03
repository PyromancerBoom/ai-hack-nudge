import "./App.css";
import Demo from "./components/Demo";

function App() {
  return (
    <div className="App bg-black">
      <header className="App-header bg-black">
        <h1 className="mt-8 text-6xl font-bold">Nudge</h1>
        <h2>...to nudge you in the right direction</h2>
        <Demo />
      </header>
    </div>
  );
}

export default App;
