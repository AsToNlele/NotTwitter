import { FeedTop } from "./feed-top";
import { Tweeter } from "./tweeter";
import { Tweets } from "./tweets";
import { FeedBottomMobile } from "./feed-bottom-mobile";

export const Feed = () => {
  return (
    <div className="flex grow items-start md:grow">
      <div className="w-full xl:w-[900px]">
        <div className="min-h-screen w-full break-all border-none xs:border-l xs:border-solid md:w-[650px] md:border-x ">
          <FeedBottomMobile />
          <FeedTop />
          <Tweeter />
          <Tweets />
        </div>
      </div>
    </div>
  );
};
