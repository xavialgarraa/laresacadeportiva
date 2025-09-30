import { useEffect, useState } from "react";

export const StarBackground = () => {
  const [stars, setStars] = useState([]);
  const [meteors, setMeteors] = useState([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      createStars();
      createMeteors();

      const handleResize = () => {
        createStars();
      };

      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
      };

    }
  }, []);

  const createStars = () => {
    const newStars = [];
    const starCount = Math.floor((window.innerWidth * window.innerHeight) / 10000);

    for (let i = 0; i < starCount; i++) {
      const star = {
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3 + 1,
        opacity: Math.random() * 0.5 + 0.5,
        animationDuration: Math.random() * 4 + 2,
      };
      newStars.push(star);
    }

    setStars(newStars);
  };

  const createMeteors = () => {
    const newMeteors = [];
    const meteorsCount = 20; // Number of meteors

    for (let i = 0; i < meteorsCount; i++) {
      const meteor = {
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 2 + 1,
        delay: Math.random() * 5,
        opacity: Math.random() * 0.2 + 0.5,
        animationDuration: Math.random() * 4 + 3,
      };
      newMeteors.push(meteor);
    }

    setMeteors(newMeteors);
  };

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {stars.map((star) => (
        <div
          key={star.id}
          className="star animate-pulse-subtle"
          style={{
            width: `${star.size}px`,
            height: `${star.size}px`,
            left: `${star.x}%`,
            top: `${star.y}%`,
            opacity: star.opacity,
            animationDuration: `${star.animationDuration}s`,
            position: "absolute",
          }}
        />
      ))}

      {meteors.map((meteor) => (
        <div
          key={meteor.id}
          className="meteor animate-meteor"
          style={{
            width: `${meteor.size * 2}px`,
            height: `${meteor.size}px`,
            left: `${meteor.x}%`,
            top: `${meteor.y}%`,
            opacity: meteor.opacity,
            animationDelay: `${meteor.delay}s`,
            animationDuration: `${meteor.animationDuration}s`,
            position: "absolute",
            backgroundColor: "white",
            borderRadius: "9999px",
          }}
        />
      ))}
    </div>
  );
};
