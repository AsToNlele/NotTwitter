import { FeedTopMobile } from "./feed-top-mobile";

export const FeedTop = () => (
  <div className="border-b p-4">
    <FeedTopMobile />
    <div className="hidden xs:block">
      <span className="text-xl font-semibold">Home</span>
    </div>
  </div>
);
