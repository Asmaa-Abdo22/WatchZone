import { Card } from "flowbite-react";
import emptyImg from "../../assets/images/download.jpeg";
import { Link } from "react-router-dom";
const Feed = () => {
  return (
    <>
      <div className="feed grid gap-5 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 p-2 ">
        <Link to="/video/20/2489">
          <Card
            className="!bg-[var(--bg-card)] border !border-[var(--border-color)] shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer"
            imgSrc={emptyImg}
            imgAlt="Thumbnail"
          >
            <div>
              <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-1">
                Video Title
              </h2>
              <p className="text-sm text-[var(--text-secondary)] line-clamp-2 mb-2">
                This is a short video description that briefly explains the
                content in an engaging way.
              </p>
              <div className="flex items-center justify-between text-xs text-[var(--text-secondary)]">
                <span>10K views</span>
                <span>2 days ago</span>
              </div>
            </div>
          </Card>
        </Link>
      </div>
    </>
  );
};

export default Feed;
