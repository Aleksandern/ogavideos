
import React from 'react';
import { Dimensions } from 'react-native';

const ORIENTATION = {
  LANDSCAPE: 'LANDSCAPE',
  PORTRAIT: 'PORTRAIT',
};

const getWindowOrientation = () => {
  const { width, height } = Dimensions.get('window');

  return height >= width ? ORIENTATION.PORTRAIT : ORIENTATION.LANDSCAPE;
};

const useDeviceOrientaion = () => {
  const [deviceOrientation, setDeviceOrientation] = React.useState(getWindowOrientation);

  React.useEffect(() => {
    function updateState() {
      setDeviceOrientation(getWindowOrientation());
    }

    Dimensions.addEventListener('change', updateState);
    return () => {
      Dimensions.removeEventListener('change', updateState);
    };
  }, []);

  return deviceOrientation;
};

export default useDeviceOrientaion;
