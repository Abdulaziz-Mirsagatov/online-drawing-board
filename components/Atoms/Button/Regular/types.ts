import React from "react";

export interface RegularButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  icon?: string;
  size?: string;
}
