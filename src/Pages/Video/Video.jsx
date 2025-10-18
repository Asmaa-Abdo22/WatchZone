import React from "react";
import PlayVideo from "../../components/PlayVideo/PlayVideo";
import { useParams } from "react-router-dom";

const Video = () => {
  const { categoryId, videoId } = useParams();
  return (
    <>
      <div className="video-container">
        <PlayVideo categoryId={categoryId} videoId={videoId} />
      </div>
    </>
  );
};

export default Video;
