import { RouterStore } from 'mobx-react-router';

import common from './common';

export default {
  common,
  routing: new RouterStore(),
}