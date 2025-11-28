"use client";

import { Toaster as Sonner, ToasterProps } from "sonner@2.0.3";

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      theme="dark"
      className="toaster group"
      style={
        {
          "--normal-bg": "#1a1f2e",
          "--normal-text": "#ffffff",
          "--normal-border": "#374151",
        } as React.CSSProperties
      }
      {...props}
    />
  );
};

export { Toaster };
