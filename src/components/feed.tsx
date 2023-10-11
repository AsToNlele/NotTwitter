import { FeedTop } from "./feed-top";
import { Tweeter } from "../features/Tweeter/tweeter";
import { Tweets } from "./tweets";

export const Feed = () => {
  return (
    <div className="flex grow items-start md:grow">
      <div className="w-full xl:w-[900px]">
        <div className="flex min-h-screen w-full flex-col break-all border-none xs:border-l xs:border-solid md:w-[650px] md:border-x ">
          <FeedTop />
          <Tweeter />
          <Tweets />
        </div>
      </div>
    </div>
  );
};
