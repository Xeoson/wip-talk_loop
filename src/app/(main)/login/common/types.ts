import { DP } from "@/common/types";

export interface FormProps extends DP {
  isLoading: boolean;
  onSubmit: (v: any) => any;
}