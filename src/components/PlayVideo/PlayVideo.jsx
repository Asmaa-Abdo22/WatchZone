import { ThumbsUp, ThumbsDown, Share2, Bookmark } from "lucide-react";
import { Avatar } from "flowbite-react";
import myVideo from "../../assets/videos/11949507_3840_2160_60fps.mp4";
import axiosInstance from "../../api/axiosInstance";
import { useQuery } from "@tanstack/react-query";
import Loading from "../Loading/Loading";
import toast from "react-hot-toast";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Link } from "react-router-dom";
const PlayVideo = ({ categoryId, videoId }) => {
  const formatNumber = (num) => {
    if (!num) return "0";

    if (num >= 1_000_000) {
      return (num / 1_000_000).toFixed(1).replace(/\.0$/, "") + "M";
    }
    if (num >= 1_000) {
      return (num / 1_000).toFixed(1).replace(/\.0$/, "") + "K";
    }
    return num.toString();
  };

  dayjs.extend(relativeTime);
  const getvideoData = async () => {
    try {
      const { data } = await axiosInstance.get("/videos", {
        params: {
          part: "snippet,contentDetails,statistics",
          id: videoId,
        },
      });
      console.log("video details data", data.items[0]);
      return data.items[0];
    } catch (error) {
      console.log("video details error");
      throw error;
    }
  };
  const {
    data: videoDetailss,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["videoDetails", videoId],
    queryFn: getvideoData,
  });

  if (isError) {
    toast.error("Oops");
    return <Loading />;
  }

  const getChannelData = async () => {
    try {
      const { data } = await axiosInstance.get("/channels", {
        params: {
          part: "snippet,statistics",
          id: videoDetailss?.snippet?.channelId,
        },
      });
      console.log("channel data info", data.items[0]);
      return data.items[0];
    } catch (error) {
      console.log("channel data error ");
      throw error;
    }
  };
  const { data: channelInfo, isLoading: isChannelLoading } = useQuery({
    queryKey: ["channelInfo", videoDetailss?.snippet?.channelId],
    queryFn: getChannelData,
    enabled: !!videoDetailss?.snippet?.channelId,
  });

  const getComments = async () => {
    try {
      const { data } = await axiosInstance.get("/commentThreads", {
        params: {
          part: "snippet,replies",
          videoId: videoId,
          maxResults: 25,
        },
      });
      console.log("All Comments", data.items);
      return data.items;
    } catch (error) {
      console.log(error, "comments error");
      throw error;
    }
  };
  const { data: comments, isLoading: iscommentsLoading } = useQuery({
    queryKey: ["comments", videoId],
    queryFn: getComments,
  });

  const getRecommendedVideos = async () => {
    try {
      const { data } = await axiosInstance.get("/videos", {
        params: {
          part: "snippet,contentDetails,statistics",
          chart: "mostPopular",
          maxResults: 25,
          regionCode: "US",
          videoCategoryId: categoryId,
        },
      });
      console.log("recommended videos", data.items);
      return data.items;
    } catch (error) {
      console.log("recommended error", error);
      throw error;
    }
  };
  const { data: recommendedVideos, isLoading: isRecommendedLoading } = useQuery(
    {
      queryKey: ["recommendedVideos", categoryId],
      queryFn: getRecommendedVideos,
    }
  );

  if (
    isLoading ||
    isChannelLoading ||
    iscommentsLoading ||
    isRecommendedLoading
  ) {
    return <Loading />;
  }

  return videoDetailss ? (
    <div className="flex flex-col gap-4 lg:flex-row mt-6 px-7 lg:px-10 text-[var(--text-primary)] overflow-x-hidden">
      {/*======= Video Player Section ======= */}
      <div className="w-full lg:w-[70%] mt-14 md:mt-1">
        <iframe
          width="100%"
          height="522"
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          className="rounded-3xl block"
        ></iframe>

        {/* ======= Video Info ======= */}
        <h2 className="text-xl font-semibold my-5">
          {videoDetailss.snippet?.title}
        </h2>
        <div className="flex flex-wrap justify-between items-center text-sm text-[var(--text-secondary)] mt-2">
          <span className="mb-4">
            {formatNumber(videoDetailss?.statistics?.viewCount)} views •{" "}
            {dayjs(videoDetailss?.snippet?.publishedAt).fromNow()}
          </span>

          <div className="flex items-center gap-4 text-[var(--text-primary)] ">
            <button className="flex items-center gap-1 hover:text-red-500 transition cursor-pointer">
              <ThumbsUp size={18} />{" "}
              {formatNumber(videoDetailss?.statistics?.likeCount)}
            </button>
            <button className="flex items-center gap-1 hover:text-blue-500 transition cursor-pointer">
              <ThumbsDown size={18} /> 30
            </button>
            <button className="flex items-center gap-1 hover:text-green-500 transition cursor-pointer">
              <Share2 size={18} /> Share
            </button>
            <button className="flex items-center gap-1 hover:text-yellow-500 transition cursor-pointer">
              <Bookmark size={18} /> Save
            </button>
          </div>
        </div>

        {/* ======= Channel Info ======= */}
        <div className="flex items-center justify-between mt-5">
          <div className="flex items-center gap-3">
            <Avatar
              img={channelInfo?.snippet?.thumbnails?.default?.url}
              rounded
            />

            <div>
              <h3 className="font-semibold">{channelInfo?.snippet?.title}</h3>
              <p className="text-[var(--text-secondary)] text-sm">
                {formatNumber(channelInfo?.statistics?.subscriberCount)}{" "}
                subscribers
              </p>
            </div>
          </div>
          <button className="cursor-pointer bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors">
            Subscribe
          </button>
        </div>

        {/* ======= Description ======= */}
        <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-lg p-3 mt-4 text-sm">
          <p className="line-clamp-5">{videoDetailss?.snippet?.description}</p>
        </div>

        {/* ======= Comments Section ======= */}
        <div className="mt-6">
          <h3 className="font-semibold mb-3">
            Comments • {formatNumber(videoDetailss?.statistics?.commentCount)}
          </h3>

          {/* Example Comment */}

          {comments.map((comment, index) => {
            const snippet = comment.snippet.topLevelComment.snippet;
            return (
              <div className="flex items-start gap-3 mb-4 " key={index}>
                <Avatar
                  className="shrink-0"
                  img={snippet.authorProfileImageUrl}
                  rounded
                  size="sm"
                />
                <div>
                  <p className="font-semibold">{snippet.authorDisplayName}</p>
                  <p
                    className={`text-sm   text-[var(--text-secondary)] ${
                      snippet.textDisplay.length > 20 ? "line-clamp-5" : ""
                    }`}
                  >
                    {snippet.textDisplay}
                  </p>
                  <div className="commentInteractions flex items-center mt-2 gap-6 cursor-pointer text-[var(--text-secondary)]">
                    <div className="flex gap-2 items-center -mt-1">
                      <ThumbsUp size={16} />
                      <span>{formatNumber(snippet.likeCount)}</span>
                    </div>
                    <ThumbsDown size={16} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ======= Suggested Videos Section ======= */}
      <div className="w-full lg:w-[30%] flex flex-col gap-4 mt-6 mb-4 lg:mt-0">
        {recommendedVideos?.map((video, i) => {
          const snippet = video.snippet;
          return (
            <Link
              to={`/video/${snippet.categoryId}/${video.id}`}
              key={i}
              className="flex gap-3 cursor-pointer hover:bg-[var(--bg-card)] p-2 rounded-lg transition"
            >
              <img
                src={snippet?.thumbnails?.medium?.url}
                alt={snippet?.title}
                className="h-24 w-40 object-cover rounded-lg"
              />
              <div>
                <h4 className="font-semibold text-sm line-clamp-2">
                  {snippet?.title}
                </h4>
                <p className="text-xs text-[var(--text-secondary)] my-2">
                  {snippet?.channelTitle}
                </p>
                <p className="text-xs text-[var(--text-secondary)]">
                  {dayjs(snippet?.publishedAt).fromNow()}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default PlayVideo;
