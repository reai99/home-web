import { useAsObservableSource, Observer, observer, useLocalStore } from 'mobx-react';
import Store from '../_stores';
import _ from 'lodash';

// 引用store
const useStore = (...stores: string[]) => {
  return useAsObservableSource(_.pick(Store, stores));
}

export {
  useStore,
  Observer,
  observer,
  useLocalStore,
  useAsObservableSource,
}
