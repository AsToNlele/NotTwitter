import { Heart, MessageCircle, Repeat2 } from "lucide-react";
import { MyAvatar } from "./my-avatar";
import { UserTag } from "./user-tag";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

export const Tweets = () => (
  <>
    <Tweet />
    <Tweet />
  </>
);

const Tweet = () => (
  <div className="flex gap-2 border-b p-4">
    <MyAvatar />
    <div className="flex">
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-1">
          <UserTag horizontal />
          <span className="text-slate-500">·</span>
          <span className="text-sm text-slate-500">
            {dayjs("2023-06-25").fromNow(true)}
          </span>
        </div>
        <div className="flex">
          <span>Hello there!</span>
        </div>
        <div className="mt-1 flex gap-6">
          <div className="group flex cursor-pointer gap-2 py-1 pr-2 text-slate-500 hover:text-blue-500">
            <MessageCircle size={18} />
            <span className="text-sm">25</span>
          </div>
          <div className="group flex cursor-pointer gap-2 py-1 pr-2 text-slate-500 hover:text-green-500">
            <Repeat2 size={18} />
            <span className="text-sm">4</span>
          </div>
          <div className="group flex cursor-pointer gap-2 py-1 pr-2 text-slate-500 hover:text-red-500">
            <Heart size={18} />
            <span className="text-sm">105</span>
          </div>
        </div>
      </div>
    </div>
  </div>
);
