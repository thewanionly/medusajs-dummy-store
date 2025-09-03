import { render } from '@testing-library/react';

import { Hello } from '../hello';

describe('render component', () => {
  test('renders the component with text', () => {
    const yal = render(<Hello txt="Hello World" />);

    expect(yal.getByTestId('txt')).toBeInTheDocument();
    expect(yal.getByTestId('txt')).toHaveTextContent('Hello World');
  });
});
