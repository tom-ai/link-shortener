import Form from './components/Form';
import Form2 from './components/Form2';

export default function App() {
  const statuses = ['empty', 'typing', 'submitting', 'success', 'error'];

  return (
    <main className="container">
      <h1>Link Shortener</h1>
      <p>Enter a URL to shorten it.</p>
      {statuses.map((status) => {
        return (
          <section>
            <h2>Form: {status}</h2>
            <Form2 status={status} />
          </section>
        );
      })}
    </main>
  );
}
