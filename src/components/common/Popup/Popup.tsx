"use client";

import {useSelector, useDispatch} from 'react-redux'
import { DP } from "@/common/types";
import { motion } from "framer-motion";
import { store, useAppSelector } from '@/redux/store';
import { popupActions } from './slice';

interface Props extends DP {}

const animTransition = { duration: 4, times: [0, 0.1, 0.95, 1] };

const Popup = (props: Props) => {
  const message = useAppSelector((s) => s.popupReducer.message)
	const dispatch = useDispatch()

  if (!message) return null;

  const handleAnimEnd = () => {
    dispatch(popupActions.setMessage(undefined))
  };

  return (
    <motion.div
      className={`absolute overflow-hidden rounded-md shadow-2xl shadow-cyan-600/95 text-xs bg-cyan-2 top-5 py-2 px-3 max-w-[10rem] min-h-[2rem] ${
        props.className ?? ""
      }`}
      animate={{ y: ["-120%", "0%", "0%", "-120%"], scale: [0.6, 1, 1, 0.6], opacity: [0, 1, 1, 1] }}
      transition={animTransition}
      layout
      onAnimationComplete={handleAnimEnd}
    >
      <p>{message}</p>
      <motion.div
        className="bg-neutral-300/95 absolute bottom-0 left-0 right-0 h-[0.1rem]"
        animate={{ scaleX: [1, 1, 0, 0], originX: 0 }}
        transition={{ ...animTransition, ease: "linear" }}
      ></motion.div>
    </motion.div>
  );
};

export default Popup;
