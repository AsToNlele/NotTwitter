import { Tweets } from "../../components/tweets";
import { Tweeter } from "../Tweeter/tweeter";
import { FeedTop } from "./feed-top";

export const Feed = () => {
  return (
    <>
      <FeedTop />
      <Tweeter />
      <Tweets />
    </>
  );
};
