import { type ReactNode } from "react";

interface ProseProps {
  children: ReactNode;
}

export default function Prose({ children }: ProseProps) {
  return <div className="prose">{children}</div>;
}
