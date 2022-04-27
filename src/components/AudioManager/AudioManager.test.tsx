import React from 'react';
import { render, screen } from '@testing-library/react';
import AudioManager from './';

test('renders learn react link', () => {
  render(<AudioManager />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
