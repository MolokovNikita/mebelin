import { useLocation } from "react-router-dom";
export default function ProductPage() {
  const location = useLocation();
  return (
    <div>
      This is productPage
      <h1>{location.pathname}</h1>
    </div>
  );
}
