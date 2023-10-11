import { useState } from 'react';
import submitFormData from '../api/submitFormData';

export default function Form() {
  const [longUrl, setLongUrl] = useState('');
  const [link, setLink] = useState('');
  const [error, setError] = useState(null);

  const [status, setStatus] = useState(null); // typing, submitting, success

  function handleChange(e) {
    e.preventDefault();
    setStatus('typing');
    setLongUrl(e.target.value);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus('submitting');

    try {
      const data = await submitFormData(longUrl);
      if (data) {
        setError(null);
        setStatus('success');
        setLink(data.id);
      }
    } catch (error) {
      setTimeout(() => {
        setError(error.message);
        setStatus(null);
      }, 1000);
    }
  }

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <label htmlFor="longUrl">Long URL:</label>
      <input
        id="longUrl"
        name="longUrl"
        onChange={(e) => handleChange(e)}
        disabled={status === 'submitting'}
        type="url"
      />
      <button disabled={longUrl.length === 0 || status === 'submitting'}>
        {status === 'submitting' ? 'Working...' : 'Shorten'}
      </button>
      {error !== null ? (
        <p>Something went wrong. Try again.</p>
      ) : (
        status === 'success' && (
          <>
            <p>Here is your shortened link:</p>
            <a target="_blank" rel="noreferrer" href={link}>
              {link}
            </a>
          </>
        )
      )}
    </form>
  );
}

// error handlling notes

// 400 bad request
// 404 not found
// look at docs

// test for all of these with mocks
