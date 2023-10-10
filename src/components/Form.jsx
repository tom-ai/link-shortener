import { useState } from 'react';

export default function Form() {
  const [link, setLink] = useState('');
  const [shortenedLink, setShortenedLink] = useState(null);

  const [status, setStatus] = useState('submitting' | 'success');
  const [error, setError] = useState(null);

  function handleChange(e) {
    e.preventDefault();
    setLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    setStatus('submitting');
    fetch('https://api-ssl.bitly.com/v4/shorten', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_BITLY_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        long_url: link,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setStatus('success');
        setShortenedLink(data.id);
      })
      .catch((error) => {
        setError(error);
      });
  }

  let buttonText = 'Shorten';
  if (status === 'submitting') buttonText = 'Working...';
  if (status === 'success') buttonText = 'Copy!';
  if (error) buttonText = 'Try again';

  let statusText = 'Paste a link... https://dev.bitly.com/';
  if (status === 'success') statusText = 'Looking good!';
  if (error !== null) statusText = 'Something went wrong :(';

  return (
    <>
      <p>{statusText}</p>
      <form onSubmit={handleSubmit}>
        <input
          disabled={status === 'submitting'}
          onChange={(e) => handleChange(e)}
          type="text"
          value={status === 'success' ? shortenedLink : link}
        />
        <button disabled={link.length === 0}> {buttonText}</button>
      </form>
    </>
  );
}
