import MOBILE_SCREEN_WIDTH from '../constants/screenSize';
import useWindowSize from './useWindowSize';

// Hook
function useMobileDevice() {
  const { windowWidth } = useWindowSize();
  return windowWidth < MOBILE_SCREEN_WIDTH;
}

export default useMobileDevice;
