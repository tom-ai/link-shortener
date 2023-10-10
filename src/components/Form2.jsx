export default function Form2({ status = 'empty' }) {
  return (
    <form>
      <input disabled={status === 'submitting'} type="text" />
      <button disabled={status === 'empty' || status === 'submitting'}>
        {status === 'submitting' ? 'Working...' : 'Shorten'}
      </button>
      {status === 'error' && <p>Something went wrong. Try again.</p>}
      {status === 'success' && (
        <>
          <p>Here is your shortened link:</p>
          <a href="/">https://rel.ink/abc123</a>
        </>
      )}
    </form>
  );
}

// empty
// typing - onChange
// submitting - onSubmit
// success - shortenedLink
// error - error
