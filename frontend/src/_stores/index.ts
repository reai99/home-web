import { RouterStore } from 'mobx-react-router';

import admin from './admin';
import common from './common';
import classtree from './classtree';

export default {
  admin,
  common,
  classtree,
  routing: new RouterStore(),
}