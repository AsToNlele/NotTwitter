import { Loader2 } from "lucide-react";

type LoaderProps<absolute = boolean> = absolute extends true
  ? {
      absolute: true;
    }
  : {
      absolute?: false;
      top?: boolean;
    };

const Loader = (props: LoaderProps) => (
  <div
    className={`${
      !props.absolute
        ? props.top
          ? "flex grow items-start justify-center"
          : "flex grow items-center justify-center"
        : "absolute left-1/2 top-1/3"
    } mt-4  text-lg`}
  >
    <Loader2 className="animate-spin" />
  </div>
);

export default Loader;
