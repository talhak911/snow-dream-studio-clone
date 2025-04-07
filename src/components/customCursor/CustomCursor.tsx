"use client";
import React, { useState, useEffect } from "react";
import Cursor from "../icons/cursor";
import VideoPlayCursor from "../icons/videoPlayCursor";

type CursorType =
  | "default"
  | "hover"
  | "click"
  | "scroll-up"
  | "scroll-down"
  | "disabled"
  | "loading"
  | "middle-click"
  | "video-hover"; // ← added this

const CustomCursor: React.FC = () => {
  const [targetPosition, setTargetPosition] = useState({ x: 0, y: 0 });
  const [currentPosition, setCurrentPosition] = useState({ x: 0, y: 0 });
  const [cursorType, setCursorType] = useState<CursorType>("default");

  // Mouse tracking
  useEffect(() => {
    const updateMouse = (e: MouseEvent) => {
      setTargetPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseDown = (e: MouseEvent) => {
      if (e.button === 0) setCursorType("click");
      if (e.button === 1) setCursorType("middle-click");
      if (e.button === 2) setCursorType("click");
    };

    const handleMouseUp = () => setCursorType("default");

    window.addEventListener("mousemove", updateMouse);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", updateMouse);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  // Animate cursor position
  useEffect(() => {
    let animationFrameId: number;

    const lerp = (a: number, b: number, n: number) => a + (b - a) * n;

    const animate = () => {
      setCurrentPosition((prev) => ({
        x: lerp(prev.x, targetPosition.x, 0.15),
        y: lerp(prev.y, targetPosition.y, 0.15),
      }));

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => cancelAnimationFrame(animationFrameId);
  }, [targetPosition]);

  // Link and button hover
  useEffect(() => {
    const handleHover = () => setCursorType("hover");
    const handleLeave = () => setCursorType("default");

    document.querySelectorAll("a, button").forEach((el) => {
      el.addEventListener("mouseenter", handleHover);
      el.addEventListener("mouseleave", handleLeave);
    });

    return () => {
      document.querySelectorAll("a, button").forEach((el) => {
        el.removeEventListener("mouseenter", handleHover);
        el.removeEventListener("mouseleave", handleLeave);
      });
    };
  }, []);

  // Video hover
  useEffect(() => {
    const handleVideoHover = () => setCursorType("video-hover");
    const handleVideoLeave = () => setCursorType("default");

    document.querySelectorAll("video").forEach((el) => {
      el.addEventListener("mouseenter", handleVideoHover);
      el.addEventListener("mouseleave", handleVideoLeave);
    });

    return () => {
      document.querySelectorAll("video").forEach((el) => {
        el.removeEventListener("mouseenter", handleVideoHover);
        el.removeEventListener("mouseleave", handleVideoLeave);
      });
    };
  }, []);

  // Scroll transition
  useEffect(() => {
    let lastScrollY = window.scrollY;
    let scrollTimeout: NodeJS.Timeout | null = null;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const newCursorType =
        currentScrollY > lastScrollY ? "scroll-down" : "scroll-up";

      if (newCursorType !== cursorType) {
        setCursorType(newCursorType);
      }

      lastScrollY = currentScrollY;

      if (scrollTimeout) clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        setCursorType("default");
      }, 500);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      if (scrollTimeout) clearTimeout(scrollTimeout);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [cursorType]);

  // Choose cursor icon
  const getCursorIcon = () => {
    switch (cursorType) {
      case "video-hover":
        return <VideoPlayCursor />;
      default:
        return <Cursor />;
    }
  };

  return (
    <div
      className="custom-cursor-wrapper jiggle"
      style={{
        position: "fixed",
        top: `${currentPosition.y}px`,
        left: `${currentPosition.x}px`,
        pointerEvents: "none",
        transform: "translate(-50%, -50%)",
        zIndex: 9999,
      }}
    >
      {getCursorIcon()}
    </div>
  );
};

export default CustomCursor;
