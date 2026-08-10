import { usePageContext } from "vike-react/usePageContext";
import App from "../App";
import "../index.css";

export default function MarketingPage() {
  const pageContext = usePageContext();
  return <App serverPath={pageContext.urlPathname} />;
}
