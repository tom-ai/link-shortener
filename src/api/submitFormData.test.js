import submitFormData from './submitFormData';

// beforeAll(() => {
//   jest.spyOn(window, 'fetch');
// });

xit('should call fetch with url argument', async () => {
  window.fetch.mockResolvedValue({
    ok: true,
    json: async () => ({ succes: true }),
  });

  const url = 'https://dev.bitly.com/';
  const resultFromForm = await submitFormData(url);

  expect(window.fetch).toHaveBeenCalled();
  expect(window.fetch).toHaveBeenCalledWith(
    'https://api-ssl.bitly.com/v4/shorten',
    expect.objectContaining({
      method: 'POST',
      body: JSON.stringify({
        long_url: url,
      }),
    })
  );
});
