
import { EyeIcon } from "lucide-react";

const Eye = ({ className = "", ...props }: { className?: string }) => {
  return <EyeIcon className={className} {...props} />;
};

export default Eye;
