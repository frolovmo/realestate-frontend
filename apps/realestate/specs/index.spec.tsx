import React from 'react';
import { render } from '@testing-library/react';
import Default from '../app/default';

describe('Default', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Default />);
    expect(baseElement).toBeTruthy();
  });
});
