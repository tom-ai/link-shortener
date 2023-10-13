// xdescribe('Shortener UI', () => {
//   it('renders a URL input with corresponding label', () => {
//     render(<Shortener />);
//     const input = screen.getByLabelText('Long URL:');
//     expect(input).toBeInTheDocument();
//     expect(input).toHaveAttribute('type', 'url');
//   });

//   it('renders a button with the text "Shorten"', () => {
//     render(<Shortener />);
//     const button = screen.getByRole('button', {
//       name: 'Shorten',
//     });
//     expect(button).toBeInTheDocument();
//   });
// });

// xdescribe('Shortener interactions', () => {
//   it('should render a disabled button if input is empty', () => {
//     render(<Shortener />);
//     const input = screen.getByRole('textbox', {
//       name: /long url:/i,
//     });
//     fireEvent.change(input, {
//       target: { value: '' },
//     });

//     const button = screen.getByRole('button', {
//       name: 'Shorten',
//     });

//     expect(button).toHaveProperty('disabled', true);
//   });

//   it('should render an enabled button if input has text', () => {
//     render(<Shortener />);

//     const input = screen.getByRole('textbox', {
//       name: /long url:/i,
//     });
//     fireEvent.change(input, {
//       target: { value: 'some input' },
//     });

//     const button = screen.getByRole('button', {
//       name: 'Shorten',
//     });

//     expect(button).toHaveProperty('disabled', false);
//   });

//   it('should disable the shorten button when Shorten is submitting', () => {
//     render(<Shortener />);
//     const input = screen.getByLabelText(/long url:/i);
//     fireEvent.change(input, { target: { value: 'www.mytestlink.com' } });
//     const button = screen.getByRole('button', { name: /shorten/i });

//     userEvent.click(button, { name: /shorten/i });
//   });
// });
