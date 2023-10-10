import { useState } from 'react';

export default function Form2() {
  const [url, setUrl] = useState('');
  const [link, setLink] = useState('');
  const [error, setError] = useState(null);

  const [status, setStatus] = useState(''); // typing, submitting, success

  function handleChange(e) {
    e.preventDefault();
    setStatus('typing');
    setUrl(e.target.value);
  }

  return (
    <form>
      <input
        onChange={(e) => handleChange(e)}
        disabled={status === 'submitting'}
        type="text"
      />
      <button disabled={url.length === 0 || status === 'submitting'}>
        {status === 'submitting' ? 'Working...' : 'Shorten'}
      </button>
      {error !== null ? (
        <p>Something went wrong. Try again.</p>
      ) : (
        status === 'success' && (
          <>
            <p>Here is your shortened link:</p>
            <a href="/">https://rel.ink/abc123</a>
          </>
        )
      )}
    </form>
  );
}

// empty
// typing - human/typing/onChange
// submitting - human/pressed button/onSubmit
// success - network/200/shortenedLink
// error - network/error/403/catch block

// longUrl
// error

// typing/.length === 0 || submitting || success
