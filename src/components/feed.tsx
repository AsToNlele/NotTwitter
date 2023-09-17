import { FeedTop } from "./feed-top";
import { Tweeter } from "./tweeter";
import { TweeterDialog } from "./tweeter-dialog";
import { Tweets } from "./tweets";

export const Feed = () => {
  return (
    <div className="flex grow items-start md:grow">
      <div className="w-full xl:w-[900px]">
        <div className="flex min-h-screen w-full flex-col break-all border-none xs:border-l xs:border-solid md:w-[650px] md:border-x ">
          <TweeterDialog />
          <FeedTop />
          <Tweeter />
          <Tweets />
        </div>
      </div>
    </div>
  );
};
