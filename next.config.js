const apiUrl =
  process.env.NODE_ENV === "production"
    ? "https://your-vercel-app-url/api/about/get"
    : "http://localhost:3000/api/about/get";
