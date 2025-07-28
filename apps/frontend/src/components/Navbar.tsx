// import { Link } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { Button } from "./ui/button";

const Navbar = () => {
  return (
    <div className="w-full p-4 rounded-sm flex justify-between items-center">
      <div>
        <h2 className="text-2xl tracking-wide font-bold">
          <span className="text-primary">E</span>cho
        </h2>
      </div>

      <div className="flex gap-x-2">
        <Button variant="secondary">
          <Link to="/login">Login</Link>
        </Button>
        <Button>
          <Link to="/register">Get Started</Link>
        </Button>
      </div>
    </div>
  );
};

export default Navbar;
