import { RouterStore } from 'mobx-react-router';

import admin from './admin';
import common from './common';

export default {
  admin,
  common,
  routing: new RouterStore(),
}