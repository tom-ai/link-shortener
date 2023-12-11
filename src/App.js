import Shortener from './components/Shortener';

export default function App() {
  return (
    <main className="container" style={{ paddingTop: '1.5rem' }}>
      <h1>Link Shortener</h1>
      <Shortener />
    </main>
  );
}
