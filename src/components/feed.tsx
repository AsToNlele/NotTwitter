import { FeedTop } from "./feed-top";
import { Tweeter } from "./tweeter";

export const Feed = () => {
  return (
    <div className="flex grow items-start md:grow">
      <div className="w-full xl:w-[900px]">
        <div className="h-screen w-full break-all border-x md:w-[650px]">
          <FeedTop />
          <Tweeter />
        </div>
      </div>
    </div>
  );
};
