
import emptyImg from "../../assets/images/download.jpeg";
import { Link } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";
import { useQuery } from "@tanstack/react-query";
import Loading from "../Loading/Loading";
import toast from "react-hot-toast";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

const Feed = ({ category }) => {
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
  const fetchCategories = async () => {
    try {
      const { data } = await axiosInstance.get("videos", {
        params: {
          part: "snippet,contentDetails,statistics",
          chart: "mostPopular",
          maxResults: 50,
          regionCode: "US",
          videoCategoryId: category,
        },
      });

      console.log("Videos:", data.items);
      localStorage.setItem("allVideos", JSON.stringify(data.items));
      return data.items;
    } catch (error) {
      console.error("Error fetching videos:", error);
      throw error;
    }
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: ["videos", category],
    queryFn: fetchCategories,
  });

  if (isLoading) return <Loading />;
  if (isError) {
    toast.error("Error in Getting Data.");
    return <Loading />;
  }
  return (
    <>
      {data ? (
        <>
          <div className="feed mb-7 grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 px-2 pt-4 bg-[var(--bg-feed)]">
            {data.map((video, index) => (
              <Link to={`/video/${video.snippet.categoryId}/${video.id}`} key={index}>
                <div className="flex flex-col rounded-xl h-full overflow-hidden cursor-pointer">
                  
                  <img
                    src={video.snippet?.thumbnails?.medium?.url || emptyImg}
                    alt="Thumbnail"
                    className="w-full h-[180px] object-cover rounded-lg"
                  />

                 
                  <div className="flex gap-3 mt-3 p-2">
                    
                    <img
                      src={`https://ui-avatars.com/api/?name=${video.snippet?.channelTitle}`}
                      alt={video.snippet?.channelTitle}
                      className="w-7 h-7 rounded-full object-cover"
                    />

                    <div className="flex flex-col">
                      <h2 className="text-[15px] font-semibold text-[var(--text-primary)] line-clamp-2">
                        {video.snippet?.title}
                      </h2>
                      <p className="text-[13px] text-[var(--text-secondary)] mt-1">
                        {video.snippet?.channelTitle}
                      </p>
                      <p className="text-[12px] text-[var(--text-secondary)] mt-[7px]">
                        {formatNumber(video.statistics?.viewCount)} views •{" "}
                       <span className="ml-4"> {dayjs(video.snippet?.publishedAt).fromNow()}</span>
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default Feed;
