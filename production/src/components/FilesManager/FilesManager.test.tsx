import React from 'react';
import { render, screen } from '@testing-library/react';
import FilesManager from './';

test('renders learn react link', () => {
  render(<FilesManager />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
