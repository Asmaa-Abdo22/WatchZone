import { BeatLoader } from "react-spinners";

const Loading = () => {
  return (
    <>
      <div className="loadingg z-50 bg-opacity-50 w-full min-h-screen fixed top-0 left-0 flex items-center justify-center bg-[var(--bg-main)]">
        <BeatLoader
          color="#ff0000"
          size={15}
          speedMultiplier={1}
          loading={true}
        />
      </div>
    </>
  );
};

export default Loading;
