export default async function submitFormData(url) {
  const response = await fetch('https://api-ssl.bitly.com/v4/shorten', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.REACT_APP_BITLY_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      long_url: url,
    }),
  });

  if (response.ok) {
    return response.json();
  } else throw new Error('Something went wrong!');
}
