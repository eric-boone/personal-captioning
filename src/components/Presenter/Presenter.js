import React from 'react'
import { Link } from "react-router-dom";

export const Presenter = () => {
  return (
    <div className="text-light">
      <p>
        <Link
          to={{
            pathname: "/"
          }}
        >
          <span role="img" aria-label="home">
            🏡
          </span>
        </Link>
        <span role="img" aria-label="home">
          | Presenter 🎭
        </span>
      </p>
    </div>
  );
}

export default Presenter;
