import React, {useState, useEffect} from 'react';
import ArtworkUtils from './utils/ArtworkUtils';

const ArtFrame = () => {
  const [image, setImage] = useState<any>();

  const fetchImage = async () => {
    let response = await ArtworkUtils.getS3File();
    setImage(response);
  }

  useEffect(() => {
    fetchImage();
    setInterval(() => fetchImage(), 43200000);
  }, []);

  return (
    <div id="frame">
      <img src={image} alt='' />
    </div>
  )
}

export default ArtFrame;
