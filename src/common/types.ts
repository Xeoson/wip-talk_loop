import { ButtonHTMLAttributes, DetailedHTMLProps, HTMLAttributes, InputHTMLAttributes } from "react";

export type DP<T extends HTMLElement = HTMLDivElement> = DetailedHTMLProps<HTMLAttributes<T>, T>

export type DPInput = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
export type DPButton = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>