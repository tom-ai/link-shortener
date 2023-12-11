import { useState } from 'react';
import submitFormData from '../api/submitFormData';

export default function Shorten() {
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
    setLink(null);

    fetch('https://api-ssl.bitly.com/v4/shorten', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_BITLY_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        long_url: longUrl,
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((data) => {
        setError(null);
        setStatus('success');
        setLink(data.link);
      })
      .catch((err) => {
        setTimeout(() => {
          setError(err.message);
          setStatus(null);
        }, 1000);
      });
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
        value={longUrl}
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
            <a rel="noreferrer" href={link}>
              {link}
            </a>
          </>
        )
      )}
    </form>
  );
}
