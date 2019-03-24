import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { Rectangle } from '../out/Rectangle';
// import { action } from '@storybook/addon-actions';
// import { linkTo } from '@storybook/addon-links';

storiesOf('Rectangle', module).add('to Storybook', () => {
  return <Rectangle />;
});
