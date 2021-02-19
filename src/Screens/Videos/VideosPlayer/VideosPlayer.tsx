
import React from 'react';
import {
  View,
  ActivityIndicator,
} from 'react-native';

import Video from 'react-native-video';

import {
  VideoItem,
} from 'src/Common/Types/VideoTypes';

import {
  cls,
} from 'src/Styles';

import styles from './styles';

interface PropTypes {
  width: number,
  height: number,
  data: VideoItem,
  isActive: boolean,
  onVideoEnd: () => void,
}

const VideosPlayer: React.FC<PropTypes> = ({
  width,
  height,
  data,
  isActive,
  onVideoEnd,
}) => {
  const [loading, setLoading] = React.useState(true);
  const { meta: {
    s3video,
  }} = data;

  const renderVideo = () => (
    <Video
      poster="https://cdn.oga.fit/footer-logo.png" // "data.channel.logo" doesn't exist
      posterResizeMode="contain"
      source={{ uri: s3video }}
      paused={!isActive}
      onEnd={onVideoEnd}
      onBuffer={({ isBuffering }) => {
        setLoading(isBuffering);
      }}
      style={styles.video}
    />
  );

  const renderLoading = () => {
    if (!loading) {
      return null;
    }

    return (
      <ActivityIndicator
        size="large"
        color={cls.blue}
      />
    );
  };

  return (
    <View
      style={[styles.container, { width, height }]}
    >
      {renderVideo()}
      {renderLoading()}
    </View>
  );
};

export default VideosPlayer;
