import React from "react";
import { animated, useSpring } from "@react-spring/web";
import { useDrag } from "@use-gesture/react";

interface Profile {
  name: string;
  age: number;
  bio: string;
  image?: string;
}

interface SwipeCardProps {
  profile: Profile;
  onSwipe: (direction: "left" | "right") => void;
}

export const SwipeCard: React.FC<SwipeCardProps> = ({ profile, onSwipe }) => {
  const [{ x, rotate }, api] = useSpring(() => ({ x: 0, rotate: 0 }));

  const bind = useDrag(
    ({ down, movement: [mx], direction: [xDir], velocity: [vx] }) => {
      const trigger = vx > 0.1;
      const dir = xDir > 0 ? 1 : -1; 

      if (!down && trigger) {
        api.start({
          x: dir * window.innerWidth,
          rotate: dir * 50,
          config: { friction: 40, tension: 250 },
          onRest: () => {
            onSwipe(dir === 1 ? "right" : "left");
            api.start({ x: 0, rotate: 0, immediate: true });
          },
        });
      } else {
        api.start({
          x: down ? mx : 0,
          rotate: down ? mx / 10 : 0,
          config: { friction: 40, tension: 600 },
        });
      }
    }
  );

  return (
    <animated.div
      style={{
        transform: x.to((val) => `translate3d(${val}px, 0, 0)`),
        rotate: rotate.to((val) => `${val}deg`),
        touchAction: "none",
      }}
      className="relative"
      {...(bind() as any)}
    >
      <div className="w-72 h-96 shadow-xl bg-white rounded-lg overflow-hidden ">
        <img
          src={profile.image || "/placeholder.svg"}
          alt={profile.name}
          className="w-full h-3/4 object-cover unselectable img"
        />
        <div className="p-4">
          <h2 className="text-xl font-bold unselectable">
            {profile.name}, {profile.age}
          </h2>
          <p className="text-sm text-gray-600 unselectable">{profile.bio}</p>
        </div>
      </div>
    </animated.div>
  );
};
