import Avatar from "@/components/Avatar";
import styles from "./OnboardingAvatar.module.css";
import { useEffect, useRef, useState } from "react";
import { useAtom } from "jotai";
import onboardingUserDataAtom from "@/src/atoms/onboardingUserDataAtom";
import rgb2hex from "rgb2hex";

// there's a better way to do this but i'm too bothered
const OnboardingAvatar = () => {
  const [dragging, setDragging] = useState(false);
  const [handlePos, setHandlePos] = useState({ x: 86.1, y: 10.6 });
  const [color, setColor] = useState<[number, number, number]>([0, 0, 0]);
  const wheelRef = useRef<HTMLCanvasElement>(null);
  const [userData, setUserData] = useAtom(onboardingUserDataAtom);

  // original wheel diameter is 12.875
  const wheelRadius = 75.5; // 4.71875rem

  // draw wheel
  useEffect(() => {
    if (!wheelRef.current) return;
    const ctx = wheelRef.current.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, wheelRef.current.width, wheelRef.current.height);

    const gradient = ctx.createConicGradient(0, 100, 100);

    // Add five color stops
    gradient.addColorStop(0, "rgba(244, 211, 94, 1)");
    gradient.addColorStop(0.25, "rgba(237, 111, 199, 1)");
    gradient.addColorStop(0.5, "rgba(69, 103, 191, 1)");
    gradient.addColorStop(0.75, "rgba(20, 178, 180, 1)");
    gradient.addColorStop(1, "rgba(244, 211, 94, 1)");

    // Set the fill style and draw a rectangle
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(103, 103, 103, 0, 2 * Math.PI);
    ctx.fill();
    ctx.closePath();

    // draw middle thing
    ctx.fillStyle = "#161616";
    ctx.beginPath();
    ctx.arc(103, 103, 50, 0, 2 * Math.PI);
    ctx.fill();
    ctx.closePath();
  }, [wheelRef.current]);

  useEffect(() => {
    if (!dragging) return;

    document.body.style.userSelect = "none";

    const moveController = new AbortController();
    const upController = new AbortController();

    function handleMove(this: Window, e: MouseEventInit) {
      if (!wheelRef.current || !e.clientX || !e.clientY) return;
      // find circle center
      const centerX = wheelRef.current.getBoundingClientRect().x
        + wheelRef.current.getBoundingClientRect().width / 2;
      const centerY = wheelRef.current.getBoundingClientRect().y
        + wheelRef.current.getBoundingClientRect().height / 2;

      const angle = Math.atan2(centerY - e.clientY, e.clientX - centerX);

      const x = wheelRadius + wheelRadius * Math.cos(angle);
      const y = wheelRadius - wheelRadius * Math.sin(angle);

      setHandlePos({ x: x + 27.5 - 16, y: y + 27.5 - 16 });
    }

    function handleUp(e: MouseEventInit) {
      setDragging(false);
      document.body.style.userSelect = "";
    }

    window.addEventListener("mousemove", handleMove, { signal: moveController.signal });

    window.addEventListener("mouseup", handleUp, { signal: upController.signal });
    return () => {
      moveController.abort();
      upController.abort();
    };
  }, [dragging]);

  useEffect(() => {
    if (!wheelRef.current) return;
    const ctx = wheelRef.current.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    const p = ctx.getImageData(handlePos.x, handlePos.y, 1, 1).data;
    setColor([p[0], p[1], p[2]]);
  }, [wheelRef.current, handlePos]);

  useEffect(() => {
    setUserData({
      ...userData,
      avatarColor: rgb2hex(`rgb(${color[0]}, ${color[1]}, ${color[2]})`).hex
    });
  }, [color]);

  return (
    <div>
      <h1>Let{"'"}s create an avatar.</h1>
      <h3 className={"mt-6"}>Customize the color of your Capybara</h3>
      <div className={"flex mt-[7.75rem] mb-[9rem] gap-x-[7.75rem] px-[8rem] text-center"}>
        <div>
          <strong className={"block mb-5"}>Your Avatar</strong>
          <Avatar c={color} className={"w-[12.875rem] h-[12.875rem]"} />
        </div>
        <div>
          <strong className={"block mb-5"}>Drag on Color of Choice</strong>
          <div className={"relative w-[206px] h-[206[x]"}>
            <canvas className={styles.ColorWheel} ref={wheelRef} height={206} width={206} />
            <div className={styles.Handle} onMouseDown={() => {
              setDragging(true);
            }} style={{
              transform: `translate(${handlePos.x}px, ${handlePos.y}px)`
            }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnboardingAvatar;