import { useRef } from 'react';
import useIsomorphicLayoutEffect from 'use-isomorphic-layout-effect';

const useSSRHelpers = () => {
  const firstUpdateAfterSSR = useRef(!!window.__PRELOADED_DATA__);

  useIsomorphicLayoutEffect(() => {
    firstUpdateAfterSSR.current = false;
  }, []);

  return {
    firstUpdateAfterSSR: firstUpdateAfterSSR.current,
  };
};

export default useSSRHelpers;
