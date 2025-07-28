import { MoveRight } from "lucide-react";
import { Button } from "./ui/button";
import { Link } from "@tanstack/react-router";

const Hero = () => {
  return (
    <div className="text-center space-y-8">
      <h1 className="text-5xl font-extrabold">Every Message Leaves an Echo.</h1>
      <p className="text-lg text-muted-foreground font-medium">
        A real-time chat platform built for speed, privacy, and connection.
        <br />
        Say it once, say it loud — Echo listens.
      </p>

      <div className="mt-16">
        <Button className="group py-6 !px-8 tracking-normal fill-primary drop-shadow-xl drop-shadow-primary/50">
          <Link
            to="/login"
            className="flex items-center gap-x-2 justify-center"
          >
            Start Chatting
            <MoveRight className="group-hover:ml-2 transition-all duration-300" />
          </Link>
        </Button>
      </div>
    </div>
  );
};
export default Hero;
