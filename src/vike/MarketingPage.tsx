import type { ReactNode } from "react";
import { usePageContext } from "vike-react/usePageContext";
import App from "../App";
import "../index.css";

export default function MarketingPage({ children }: { children: ReactNode }) {
  const pageContext = usePageContext();
  return (
    <App serverPath={pageContext.urlPathname}>
      {children}
    </App>
  );
}
