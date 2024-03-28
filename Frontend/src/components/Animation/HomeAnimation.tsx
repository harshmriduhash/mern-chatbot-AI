import { TypeAnimation } from "react-type-animation";

export const HomeAnimation = () => {
  return (
    <TypeAnimation
      sequence={[
        "Engage in fascinating conversations 🌟",
        1000,
        "Stay ahead with personalized recommendations 🚀",
        1000,
        " Get instant assistance 💡",
        1000,
        "Built using OPEN AI",
        1000,
      ]}
      speed={50}
      style={{ fontSize: "80px", color: "white", display: "inline-block" }}
      repeat={Infinity}
    />
  );
};
