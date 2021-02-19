
import React from 'react';
import {
  VirtualizedList,
  useWindowDimensions,
  Alert,
} from 'react-native';
import _ from 'lodash';

import {
  VideoItem,
} from 'src/Common/Types/VideoTypes';
import {
  useDeviceOrientation,
  usePrevious,
} from 'src/Common/hooks';

import dataVideos from 'src/Fixtures/simple-feed.json';

import VideosPlayer from './VideosPlayer';

const Videos = () => {
  const listRef = React.useRef<VirtualizedList<VideoItem> | null>(null);
  const { width, height }  = useWindowDimensions();
  const deviceOrientation = useDeviceOrientation();
  const [currentIndex, setCurrentIndex] = React.useState<number | null>(0);
  const { data } = dataVideos;

  const deviceOrientationPrev = usePrevious(deviceOrientation);
  React.useEffect(() => {
    if (_.isNil(deviceOrientationPrev)) {
      return;
    }

    if (deviceOrientationPrev === deviceOrientation) {
      return;
    }

    if (currentIndex !== null) {
      setTimeout(() => {
        listRef.current?.scrollToIndex({
          index: currentIndex,
          animated: false,
        });
      }, 100);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deviceOrientation]);

  const renderItem = ({ item, index  }: { item: VideoItem, index: number }) => {
    const isActive = (currentIndex === index);

    return (
      <VideosPlayer
        width={width}
        height={height}
        data={item}
        isActive={isActive}
        onVideoEnd={() => {
          const nextIndex = index + 1;
          if (data[nextIndex]) {
            listRef.current?.scrollToIndex({
              index: nextIndex,
            });
          } else {
            Alert.alert('no videos anymore');
          }
        }}
      />
    );
  };

  return (
    <VirtualizedList
      ref={listRef}
      initialNumToRender={3}
      maxToRenderPerBatch={3}
      keyExtractor={({ id }) => id}
      data={data}
      getItem={(dataInp, index) => dataInp[index]}
      getItemCount={dataInp => dataInp.length}
      renderItem={renderItem}
      pagingEnabled
      viewabilityConfig={{
        itemVisiblePercentThreshold: 50,
      }}
      onViewableItemsChanged={({ viewableItems }) => {
        if (viewableItems.length < 1) {
          return;
        }

        const { index } = viewableItems[0];

        setCurrentIndex(index);
      }}
    />
  );
};

export default Videos;
