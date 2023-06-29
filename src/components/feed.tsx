import { FeedBottomMobile } from "./feed-bottom-mobile";
import { FeedTop } from "./feed-top";
import { Tweeter } from "./tweeter";
import { TweeterMobile } from "./tweeter-mobile";
import { Tweets } from "./tweets";

export const Feed = () => {
  return (
    <div className="flex grow items-start md:grow">
      <div className="w-full xl:w-[900px]">
        <div className="min-h-screen w-full break-all border-none xs:border-l xs:border-solid md:w-[650px] md:border-x ">
          <TweeterMobile />
          <FeedBottomMobile />
          <FeedTop />
          <Tweeter />
          <Tweets />
        </div>
      </div>
    </div>
  );
};
