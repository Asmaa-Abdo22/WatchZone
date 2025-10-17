import {
  ThumbsUp,
  ThumbsDown,
  Share2,
  Bookmark,
} from "lucide-react";
import { Avatar } from "flowbite-react";
import myVideo from "../../assets/videos/11949507_3840_2160_60fps.mp4";

const PlayVideo = () => {
  return (
    <div className="flex flex-col gap-4 lg:flex-row mt-6 px-7 lg:px-10 text-[var(--text-primary)]">
      {/*======= Video Player Section ======= */}
      <div className="w-full lg:w-[70%] mt-14 md:mt-1">
        <video
          src={myVideo}
          controls
          className="w-full rounded-xl shadow-lg"
        ></video>

        {/* ======= Video Info ======= */}
        <h2 className="text-xl font-semibold mt-3">
          Amazing Nature Video Compilation in 4K
        </h2>
        <div className="flex flex-wrap justify-between items-center text-sm text-[var(--text-secondary)] mt-2">
          <span>120,450 views • 2 days ago</span>

          <div className="flex items-center gap-4 text-[var(--text-primary)] ">
            <button className="flex items-center gap-1 hover:text-red-500 transition cursor-pointer">
              <ThumbsUp size={18} /> 1.2K
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
            <Avatar img="https://i.pravatar.cc/150?img=12" rounded />

            <div>
              <h3 className="font-semibold">Nature Channel</h3>
              <p className="text-[var(--text-secondary)] text-sm">2.4M subscribers</p>
            </div>
          </div>
          <button className="cursor-pointer bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors">
            Subscribe
          </button>
        </div>

        {/* ======= Description ======= */}
        <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-lg p-3 mt-4 text-sm">
          <p>
            Enjoy this beautiful nature video in stunning 4K resolution. Relax
            and appreciate the world’s most breathtaking landscapes. 🌿✨
          </p>
        </div>

        {/* ======= Comments Section ======= */}
        <div className="mt-6">
          <h3 className="font-semibold mb-3">Comments • 120</h3>

          {/* Example Comment */}
          <div className="flex items-start gap-3 mb-4">
            <Avatar img="https://i.pravatar.cc/150?img=54" rounded size="sm" />
            <div>
              <p className="font-semibold">User123</p>
              <p className="text-sm text-[var(--text-secondary)]">
                This video is absolutely stunning! Love the colors 🌈
              </p>
              <div className="commentInteractions  flex items-center mt-2 gap-6 cursor-pointer text-[var(--text-secondary)]">
                <div className="flex gap-2 items-center -mt-1">
                    <ThumbsUp size={16}/> 
                    <span>24</span>
                </div>
                <ThumbsDown size={16}/> 
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ======= Suggested Videos Section ======= */}
      <div className="w-full lg:w-[30%] flex flex-col gap-4 mt-6 mb-4 lg:mt-0">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="flex  gap-3 cursor-pointer hover:bg-[var(--bg-card)] p-2 rounded-lg transition"
          >
            <video
              src={myVideo}
              className=" h-24 object-cover rounded-lg"
            ></video>
            <div>
              <h4 className="font-semibold text-sm">
                Stunning Mountains in 4K
              </h4>
              <p className="text-xs text-[var(--text-secondary)]">Nature Channel</p>
              <p className="text-xs text-[var(--text-secondary)]">34K views • 1 week ago</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlayVideo;
