/* eslint-disable testing-library/no-debugging-utils */
import '@testing-library/jest-dom';
import '@testing-library/user-event';
import { render, screen, fireEvent } from '@testing-library/react';
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
        link: shortenedLink,
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

// test('returns error message if ', () => {

// });

describe('UI tests', () => {
  it('renders a URL input with corresponding label', () => {
    render(<Shortener />);
    const input = screen.getByLabelText('Long URL:');
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('type', 'url');
  });

  it('renders a button with the text "Shorten"', () => {
    render(<Shortener />);
    const button = screen.getByRole('button', {
      name: 'Shorten',
    });
    expect(button).toBeInTheDocument();
  });
});

describe('Shortener interactions', () => {
  it('should render a disabled button if input is empty', () => {
    render(<Shortener />);
    const input = screen.getByRole('textbox', {
      name: /long url:/i,
    });
    fireEvent.change(input, {
      target: { value: '' },
    });

    const button = screen.getByRole('button', {
      name: 'Shorten',
    });

    expect(button).toHaveProperty('disabled', true);
  });

  it('should render an enabled button if input has text', () => {
    render(<Shortener />);

    const input = screen.getByRole('textbox', {
      name: /long url:/i,
    });
    fireEvent.change(input, {
      target: { value: 'some input' },
    });

    const button = screen.getByRole('button', {
      name: 'Shorten',
    });

    expect(button).toHaveProperty('disabled', false);
  });

  it('should disable the shorten button when Shorten is submitting', () => {
    render(<Shortener />);
    const input = screen.getByLabelText(/long url:/i);
    fireEvent.change(input, { target: { value: 'www.mytestlink.com' } });
    const button = screen.getByRole('button', { name: /shorten/i });

    userEvent.click(button, { name: /shorten/i });
  });
});
