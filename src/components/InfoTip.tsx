import { DP } from "@/common/types";
import { motion } from "framer-motion";
import { AiOutlineInfoCircle } from "react-icons/ai";

interface InfoTipProps extends DP {
  text: string;
}

const animTransition = { duration: 0.4 };

const InfoTip = ({ text, ...props }: InfoTipProps) => {
  return (
    <motion.div
      initial={"hide"}
      variants={{ hide: { opacity: 0 }, show: { opacity: 1 } }}
      animate={"show"}
      transition={animTransition}
      className={`flex items-center space-x-0.5 text-[0.60rem] whitespace-nowrap ${
        props.className ?? ""
      }`}
    >
      <AiOutlineInfoCircle />
      <motion.span
        className="overflow-hidden text-xxs"
      >
        {text}
      </motion.span>
    </motion.div>
  );
};

export default InfoTip;
