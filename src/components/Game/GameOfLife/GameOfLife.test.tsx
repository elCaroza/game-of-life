import React from 'react';
import { render, screen } from '@testing-library/react';
import GameOfLife from './';

test('renders learn react link', () => {
  render(<GameOfLife />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
