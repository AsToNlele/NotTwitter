import { FeedTopMobile } from "./feed-top-mobile";

export const FeedTop = () => (
  <div className="sticky top-0 z-10 border-b p-4 backdrop-blur">
    <FeedTopMobile />
    <div className="hidden xs:block">
      <span className="text-xl font-semibold">Home</span>
    </div>
  </div>
);
