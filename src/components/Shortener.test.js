/* eslint-disable testing-library/no-debugging-utils */
import '@testing-library/jest-dom';
import '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import Shortener from './Shortener';
import userEvent from '@testing-library/user-event';
import 'whatwg-fetch';

beforeAll(() => jest.spyOn(window, 'fetch'));

test('clicking "shorten" displays a shortened link', async () => {
  const testUrl = 'https://dev.bitly.com/';

  render(<Shortener />);

  await userEvent.type(screen.getByLabelText(/long url:/i), testUrl);

  const shortenedLink = 'bitly.is/3ZGRxW1';
  window.fetch.mockResolvedValueOnce({
    ok: true,
    json: async () =>
      Promise.resolve({
        id: shortenedLink,
      }),
  });

  await userEvent.click(
    screen.getByRole('button', {
      name: /shorten/i,
    })
  );

  expect(window.fetch).toHaveBeenCalled();

  const mockApiUrl = 'https://api-ssl.bitly.com/v4/shorten';

  expect(window.fetch).toHaveBeenCalledWith(
    mockApiUrl,
    expect.objectContaining({
      method: 'POST',
      body: JSON.stringify({
        long_url: testUrl,
      }),
    })
  );

  expect(
    await screen.findByRole('link', {
      name: shortenedLink,
    })
  ).toBeInTheDocument();
});

test('returns error message if ', () => {
  

});

