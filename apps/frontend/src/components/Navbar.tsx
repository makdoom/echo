import { Link } from "@tanstack/react-router";
import { Button } from "./ui/button";

const Navbar = () => {
  return (
    <div className="w-full p-4 rounded-sm flex justify-between">
      <div>
        <h2 className="text-xl tracking-widest font-bold">
          <span className="text-primary">E</span>cho
        </h2>
      </div>

      <Button size="sm">
        <Link to="/login">Login</Link>
      </Button>
    </div>
  );
};

export default Navbar;
