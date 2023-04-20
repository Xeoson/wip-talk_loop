import { ButtonHTMLAttributes, DetailedHTMLProps, HTMLAttributes, InputHTMLAttributes } from "react";

export type DP<T extends HTMLElement = HTMLDivElement> = DetailedHTMLProps<HTMLAttributes<T>, T>

export type DPInput = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
export type DPButton = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>

export type ArrayKeys<T extends Record<string, any>> = {
	[K in keyof T]: T[K] extends Array<any> ? K : never
}[keyof T]