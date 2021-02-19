
import {
  createStyle,
  cls,
} from 'src/Styles';

export default createStyle({
  container: {
    justifyContent: 'center',
    backgroundColor: cls.black,
  },
  video: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
});
