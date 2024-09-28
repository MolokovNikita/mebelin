import { Link } from "react-router-dom";
export default function NotFoundPage() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h1>404: Page Not Found</h1>
      <p>Sorry, the page you are looking for does not exist.</p>
      <Link
        to={"/"}
        style={{
          color: "blue",
        }}
      >
        Go to main page
      </Link>
    </div>
  );
}
