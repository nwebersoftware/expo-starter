import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';

import PrimaryButton from '../PrimaryButton';

describe('PrimaryButton', () => {
  it('calls onPress when pressed', async () => {
    const onPress = jest.fn();
    const { getByTestId } = await render(
      <PrimaryButton title="Tap" onPress={onPress} testID="btn" />,
    );
    await fireEvent.press(getByTestId('btn'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('does not call onPress when disabled', async () => {
    const onPress = jest.fn();
    const { getByTestId } = await render(
      <PrimaryButton title="Tap" onPress={onPress} testID="btn" disabled />,
    );
    await fireEvent.press(getByTestId('btn'));
    expect(onPress).not.toHaveBeenCalled();
  });
});
