import React, {useState, useCallback} from 'react';
import {Button, View, Alert} from 'react-native';
import YoutubePlayer from 'react-native-youtube-iframe';

const Vids = () => {

  const [playing, setPlaying] = useState(false);

  const togglePlaying = () => {
    setPlaying((prev) => !prev);
  }

  return (
    <View>
      <YoutubePlayer
        height={660}
        width={1200}
        play={playing}
        videoId={'cacwri2wio4'}
      />
    </View>
  );
};

export default Vids;
