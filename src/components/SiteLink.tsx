import { Link, type LinkProps } from "react-router-dom";

export default function SiteLink(props: LinkProps) {
  return (
    <Link reloadDocument {...props} />
  );
}
