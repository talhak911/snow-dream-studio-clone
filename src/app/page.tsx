"use client";
import { useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import LogoIcon from "../components/icons/logo";
import { useGSAP } from "@gsap/react";
import Marquee from "react-fast-marquee";
import { WELCOMES } from "@/constants/constants";
import NavBar from "@/components/navbar/Navbar";
import Slider from "@/components/slider/Slider";
import ClientCards from "@/components/slider/Slider";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const logoRef = useRef<HTMLImageElement>(null);
  const welcomesRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef(null);
  const videoRef2 = useRef(null);
  const videoRef2View = useRef(null);
  const videoContainerRef = useRef(null);
  const section2Ref = useRef(null);

  useGSAP(() => {
    if (!logoRef.current) return;

    const logoTl = gsap.timeline({
      scrollTrigger: {
        trigger: "body",
        start: "top top",
        end: "+=1000",
        scrub: true,
        onUpdate: (self) => {
          const progress = self.progress;
          if (progress > 0.5) {
            if (logoRef.current) {
              logoRef.current.classList.add("bg-primary"); // Apply color change
            }
          } else {
            if (logoRef.current) {
              logoRef.current.classList.remove("bg-primary"); // Remove color
            }
          }
        },
      },
    });

    if (videoRef2.current && videoContainerRef && videoRef2View.current) {
      // Set initial state
      gsap.set(videoRef2.current, {
        width: "50vw",
        height: "50vh",
        borderRadius: "8px",
      });

      gsap.to(videoRef2.current, {
        width: "100vw",
        height: "100vh",
        borderRadius: "0",
        scrollTrigger: {
          trigger: videoContainerRef.current,
          start: "top bottom",
          end: "center center",
          scrub: true,
          markers: false,
        },
        ease: "power2.inOut",
      });

      gsap.to(".hide", {
        opacity: 0,
        y: -20,
        duration: 0.5,
        ease: "power2.out",
        scrollTrigger: {
          trigger: section2Ref.current,
          start: "top top",
          end: "center bottom",
          scrub: true,
          toggleActions: "play none none reverse",
        },
      });

      gsap.to(videoRef2View.current, {
        width: "100%",
        height: "100%",
        borderRadius: "0",
        scrollTrigger: {
          trigger: videoRef2.current,
          start: "center bottom",
          end: "center center",
          scrub: true,
          markers: false,
        },
        ease: "power2.inOut",
      });
    }

    // Animation for the logo
    logoTl.fromTo(
      logoRef.current,
      {
        // scale: 1,
        height: 260,
        width: 260,
        x: 0,
        y: 0,
      },
      {
        height: 100,
        width: 100,
        color: "#00CFF7",
        // backgroundColor: "blue",
        // scale: 0.5,
        // x: -80,
        // y: -80,
        duration: 1,
        onComplete: () => {
          if (welcomesRef.current) {
            welcomesRef.current.style.opacity = "0"; // Show the welcomesRef
          }
        },
        onReverseComplete: () => {
          if (welcomesRef.current) {
            welcomesRef.current.style.opacity = "1"; // Hide the welcomesRef
          }
        },
      }
    );

    // Section 2
    if (section2Ref.current) {
      const section2Tl = gsap.timeline({
        scrollTrigger: {
          trigger: section2Ref.current,
          start: "top bottom",
          end: "top top",
          scrub: true,
          markers: false,
        },
      });

      gsap.set(section2Ref.current, {
        width: "80%",
        height: "90%",
        x: "20%",
        y: "50%",
      });

      section2Tl.to(section2Ref.current, {
        width: "100%",
        height: "100vh",
        borderRadius: 0,
        x: 0,
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power2.inOut",
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div className="relative min-h-screen w-full bg-secondary/90">
      {/* Fixed Logo */}
      {/* <div className="fixed flex top-0 left-10 z-50 p-4 px-8">
        <div ref={logoRef} className="w-fit">
          <LogoIcon className="size-12 lg:text-secondary relative lg:size-[260px]" />
        </div>
        <div className="w-full relative py-4 mr-10">
          <Marquee loop={0}>
            <div className="flex items-center justify-between" role="region">
              {WELCOMES.map((item) => (
                <div key={item}>
                  <div className="text-white px-[3vh] text-[1.8vh]">{item}</div>
                </div>
              ))}
            </div>
          </Marquee>
          <div className="h-1 top-6 mr-10 w-full bg-pink-500 absolute" />
        </div>
        <NavBar />
      </div> */}
      <div className="fixed lg:top-6 py-4 px-2 max-w-[1800px] mx-auto inset-x-0 z-50 bg-secondary lg:bg-transparent">
        <div className="flex lg:items-start items-center  w-full justify-between">
          <img
            alt="logo_sds"
            width={50}
            height={50}
            decoding="async"
            data-nimg={1}
            className="mr-4 block lg:hidden"
            style={{ color: "transparent" }}
            src="/logo.svg"
          />
          <div className="mr-4 relative hidden lg:block ">
            {/* <div style={{ opacityShow: 0 }}>
              <img
                alt="logo"
                loading="lazy"
                ref={logoRef}
                width={360}
                height={360}
                decoding="async"
                data-nimg={1}
                className="w-full absolute top-0 left-0 right-0 bottom-0 transition-all ease-in-out duration-500"
                style={{ color: "transparent" }}
                src="/logo.svg"
              />
            </div> */}
            <div
              ref={logoRef}
              className="w-[100px] lg:w-[260px] text-secondary "
              style={{ opacity: 1 }}
            >
              {/* <Image
                alt="logo"
                ref={logoRef}
                width={360}
                height={360}
                className="w-full absolute top-0 left-0 right-0 bottom-0 transition-all ease-in-out duration-500"
                // style={{ color: "transparent" }}
                src="/logo.svg"
              /> */}
              <LogoIcon className="h-full w-full" />
              {/* <img
                alt="logo"
                loading="lazy"
                width={360}
                height={360}
                decoding="async"
                data-nimg={1}
                className="w-full absolute top-0 left-0 right-0 bottom-0 transition-all ease-in-out duration-500"
                style={{ color: "red" }}
                src="/logo.svg"
              /> */}
            </div>
          </div>
          <div
            ref={welcomesRef}
            className="md:flex hidden transition-all duration-700  justify-between items-center w-full overflow-hidden relative lg:mt-5 mt-1"
            style={{ opacity: 1 }}
          >
            <div className="flex justify-around whitespace-nowrap marquee">
              {WELCOMES.map((item, index) => (
                <div key={index} className="text-white px-[3vh] text-[1.8vh]">
                  {item}
                </div>
              ))}
            </div>
            <div className="absolute bg-[#b32b7a] mt-[0.5px] h-[5px] left-0 right-0 z-[-1]" />
          </div>
          <div className="flex justify-items-end items-center gap-2 ml-3 lg:mt-3">
            <div className="relative text-left">
              <button className="group uppercase bg-secondary border border-primary px-2 py-[1px] text-primary hover:bg-primary hover:text-white transition-all flex items-center text-[13px] font-bold mr-2">
                en
                <svg
                  className="ml-2 mr-1 fill-[#05CAFA] group-hover:fill-white"
                  width={12}
                  height={8}
                  viewBox="0 0 12 8"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M5.65375 7.35398L0 1.70024L1.05375 0.646484L5.65375 5.24649L10.2537 0.646484L11.3075 1.70024L5.65375 7.35398Z" />
                </svg>
              </button>
            </div>
            {/* <div> */}
            {/* <button className="inline-block mt-1" type="button"> */}
            <NavBar />
            {/* </button> */}
            {/* </div> */}
          </div>
        </div>
      </div>

      {/* Background Video - Using ref to access video element */}
      <video
        ref={videoRef}
        playsInline
        preload="auto"
        autoPlay
        loop
        muted
        className="fixed inset-0 w-full h-full object-cover z-[-1]"
      >
        <source src="/video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className=" hide lg:flex hidden flex-col justify-between space-y-4 fixed z-20 left-[10%] top-1/2">
        <div style={{ position: "relative", transform: "none" }}>
          <a
            className="group border border-[#626262] hover:border-white w-8 h-8 flex justify-center items-center bg-secondary hover:bg-primary transition-all ease-out duration-500"
            href="https://www.behance.net/snowdreamstudios"
          >
            <svg
              width="20"
              height="14"
              viewBox="0 0 20 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                className="fill-[#626262] group-hover:fill-white transition-all ease-out duration-500"
                d="M10.3025 9.45583C10.3025 7.91583 9.57 6.7775 8.05667 6.35083C9.16083 5.825 9.73667 5.02833 9.73667 3.78917C9.73667 1.34583 7.91 0.75 5.8025 0.75H0V13.0175H5.965C8.20167 13.0175 10.3025 11.9483 10.3025 9.45583ZM2.705 2.84417H5.24333C6.21917 2.84417 7.0975 3.1175 7.0975 4.24583C7.0975 5.2875 6.41417 5.70667 5.4475 5.70667H2.705V2.84417ZM2.70417 10.9342V7.55583H5.6525C6.84333 7.55583 7.59667 8.05083 7.59667 9.3075C7.59667 10.5467 6.6975 10.9342 5.59667 10.9342H2.70417ZM15.6633 13.25C17.7917 13.25 19.17 12.2942 19.8333 10.2625H17.6733C17.4408 11.0208 16.4825 11.4217 15.7392 11.4217C14.305 11.4217 13.5517 10.5842 13.5517 9.16083H19.9792C20.1825 6.3125 18.5958 3.885 15.6625 3.885C12.9467 3.885 11.1033 5.92 11.1033 8.58583C11.1033 11.3525 12.85 13.25 15.6633 13.25ZM15.5867 5.72833C16.8158 5.72833 17.4342 6.44833 17.5375 7.62583H13.555C13.6358 6.45833 14.4133 5.72833 15.5867 5.72833ZM13.0558 1.39417H18.0458V2.6025H13.0558V1.39417Z"
              ></path>
            </svg>
          </a>
        </div>
        <div style={{ position: "relative", transform: "none" }}>
          <a
            className="group border border-[#626262] hover:border-white w-8 h-8 flex justify-center items-center bg-secondary hover:bg-primary transition-all ease-out duration-500"
            href="https://www.linkedin.com/company/snow-dream-studios"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                className="fill-[#626262] group-hover:fill-white transition-all ease-out duration-500"
                d="M16 16V10.14C16 7.26 15.38 5.06 12.02 5.06C10.4 5.06 9.32 5.94 8.88 6.78H8.84V5.32H5.66V16H8.98V10.7C8.98 9.3 9.24 7.96 10.96 7.96C12.66 7.96 12.68 9.54 12.68 10.78V15.98H16V16ZM0.26 5.32H3.58V16H0.26V5.32ZM1.92 0C0.86 0 0 0.86 0 1.92C0 2.98 0.86 3.86 1.92 3.86C2.98 3.86 3.84 2.98 3.84 1.92C3.84 0.86 2.98 0 1.92 0Z"
              ></path>
            </svg>
          </a>
        </div>
        <div style={{ position: "relative", transform: "none" }}>
          <a
            className="group border border-[#626262] hover:border-white w-8 h-8 flex justify-center items-center bg-secondary hover:bg-primary transition-all ease-out duration-500"
            href="https://x.com/snowdreamstudios"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clip-path="url(#clip0_120_98)">
                <path
                  className="fill-[#626262] group-hover:fill-white transition-all ease-out duration-500"
                  d="M11.8616 8.46864L19.147 0H17.4206L11.0947 7.3532L6.04225 0H0.214844L7.85515 11.1193L0.214844 20H1.94134L8.62162 12.2348L13.9574 20H19.7848L11.8612 8.46864H11.8616ZM9.49695 11.2173L8.72283 10.1101L2.56342 1.29967H5.21521L10.1859 8.40994L10.9601 9.51718L17.4214 18.7594H14.7696L9.49695 11.2177V11.2173Z"
                ></path>
              </g>
              <defs>
                <clipPath id="clip0_120_98">
                  <rect width="20" height="20" fill="white"></rect>{" "}
                </clipPath>
              </defs>
            </svg>
          </a>
        </div>
        <div style={{ position: "relative", transform: "none" }}>
          <a
            className="group border border-[#626262] hover:border-white w-8 h-8 flex justify-center items-center bg-secondary hover:bg-primary transition-all ease-out duration-500"
            href="https://www.facebook.com/snowdreamstudios"
          >
            <svg
              width="12"
              height="20"
              viewBox="0 0 12 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                className="fill-[#626262] group-hover:fill-white transition-all ease-out duration-500"
                d="M7.54626 20V10.8777H10.607L11.0662 7.32156H7.54626V5.05147C7.54626 4.0222 7.8309 3.32076 9.30855 3.32076L11.1901 3.31999V0.13923C10.8647 0.0969453 9.74777 0 8.44777 0C5.73317 0 3.87471 1.65697 3.87471 4.69927V7.32156H0.804688V10.8777H3.87471V20H7.54626Z"
              ></path>
            </svg>
          </a>
        </div>
        <div style={{ position: "relative", transform: "none" }}>
          <a
            className="group border border-[#626262] hover:border-white w-8 h-8 flex justify-center items-center bg-secondary hover:bg-primary transition-all ease-out duration-500"
            href="https://www.instagram.com/snowdreamstudios/"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                className="fill-[#626262] group-hover:fill-white transition-all ease-out duration-500"
                d="M10.0028 4.86523C9.32883 4.86512 8.66148 4.99778 8.03883 5.25564C7.41617 5.51349 6.85042 5.89148 6.37388 6.36802C5.89734 6.84456 5.51935 7.41032 5.2615 8.03297C5.00364 8.65562 4.87098 9.32297 4.87109 9.9969C4.87098 10.6708 5.00364 11.3382 5.2615 11.9608C5.51935 12.5835 5.89734 13.1492 6.37388 13.6258C6.85042 14.1023 7.41617 14.4803 8.03883 14.7382C8.66148 14.996 9.32883 15.1287 10.0028 15.1286C10.6767 15.1287 11.344 14.996 11.9667 14.7382C12.5893 14.4803 13.1551 14.1023 13.6316 13.6258C14.1082 13.1492 14.4862 12.5835 14.744 11.9608C15.0019 11.3382 15.1345 10.6708 15.1344 9.9969C15.1345 9.32297 15.0019 8.65562 14.744 8.03297C14.4862 7.41032 14.1082 6.84456 13.6316 6.36802C13.1551 5.89148 12.5893 5.51349 11.9667 5.25564C11.344 4.99778 10.6767 4.86512 10.0028 4.86523ZM10.0028 13.3277C9.34422 13.3276 8.70051 13.1321 8.15303 12.7662C7.60554 12.4002 7.17885 11.8801 6.92692 11.2717C6.67498 10.6632 6.6091 9.99376 6.73762 9.34788C6.86613 8.702 7.18327 8.10873 7.64893 7.64307C8.11459 7.17741 8.70786 6.86028 9.35374 6.73176C9.99962 6.60325 10.6691 6.66912 11.2775 6.92106C11.886 7.17299 12.4061 7.59968 12.772 8.14717C13.138 8.69465 13.3334 9.33836 13.3336 9.9969C13.3338 10.4344 13.2478 10.8676 13.0805 11.2718C12.9132 11.676 12.6678 12.0433 12.3585 12.3526C12.0492 12.662 11.6819 12.9073 11.2777 13.0746C10.8735 13.2419 10.4402 13.328 10.0028 13.3277Z"
              ></path>
              <path
                className="fill-[#626262] group-hover:fill-white transition-all ease-out duration-500"
                d="M14.1235 0.0637988C12.2835 -0.0220346 7.72602 -0.0178679 5.88436 0.0637988C4.26602 0.139632 2.83852 0.530465 1.68769 1.6813C-0.235644 3.60463 0.0101894 6.1963 0.0101894 9.99713C0.0101894 13.8871 -0.206477 16.4188 1.68769 18.313C3.61852 20.243 6.24769 19.9905 10.0035 19.9905C13.8569 19.9905 15.1869 19.993 16.5494 19.4655C18.4019 18.7463 19.8002 17.0905 19.9369 14.1163C20.0235 12.2755 20.0185 7.7188 19.9369 5.87713C19.7719 2.3663 17.8877 0.237132 14.1235 0.0637988ZM17.036 17.0405C15.7752 18.3013 14.026 18.1888 9.97936 18.1888C5.81269 18.1888 4.14186 18.2505 2.92269 17.028C1.51852 15.6305 1.77269 13.3863 1.77269 9.9838C1.77269 5.37963 1.30019 2.0638 5.92102 1.82713C6.98269 1.78963 7.29519 1.77713 9.96769 1.77713L10.0052 1.80213C14.446 1.80213 17.9302 1.33713 18.1394 5.95713C18.1869 7.0113 18.1977 7.32797 18.1977 9.9963C18.1969 14.1146 18.2752 15.7955 17.036 17.0405Z"
              ></path>
              <path
                className="fill-[#626262] group-hover:fill-white transition-all ease-out duration-500"
                d="M15.3398 5.8622C16.0021 5.8622 16.539 5.32532 16.539 4.66303C16.539 4.00075 16.0021 3.46387 15.3398 3.46387C14.6775 3.46387 14.1406 4.00075 14.1406 4.66303C14.1406 5.32532 14.6775 5.8622 15.3398 5.8622Z"
              ></path>
            </svg>
          </a>
        </div>
      </div>

      <div className="hide w-[62px] fixed top-2/3 z-20 left-[20%] -translate-x-1/2 lg:block hidden">
        <p className="text-[11px] whitespace-nowrap pb-1 text-white font-light tracking-wide">
          Scroll Down
        </p>
        <div className="w-full h-[62px] border border-primary flex justify-center items-center group cursor-pointer">
          <Image
            alt="arrow-forward"
            loading="lazy"
            width="21"
            height="21"
            decoding="async"
            data-nimg="1"
            className="bounce-delay group-hover:animate-none"
            style={{ color: "transparent" }}
            src="arrow_downward.svg"
          />
        </div>
      </div>

      <div className="min-h-screen py-9 px-2  lg:px-14 backdrop-blur-sm max-w-[1800px] mx-auto flex z-50 items-center md:justify-end justify-center">
        {/* <div className="sm:w-1/2 w-0"></div> */}

        <div className="w-full md:w-[665px] md:border-l border-[#373737] pl-5 py-8">
          <Marquee pauseOnHover>
            <div
              className="mt-14 flex items-center overflow-hidden justify-between"
              role="region"
            >
              {Array.from([1, 2, 3, 4, 5]).map((_, index) => (
                <div
                  key={index}
                  className="w-full px-3 lg:px-[30px] pb-10 xl:px-10"
                  aria-label={`Project ${index + 1}`}
                >
                  <div className="relative w-full sm:w-[400px] h-[309px] overflow-hidden">
                    <Image
                      src={"/SDS.webp"}
                      alt=""
                      width={400}
                      height={309}
                      className="object-cover w-full h-full transition-transform duration-700 hover:scale-110"
                    />
                  </div>

                  <h3 className="text-white pt-3 text-xl font-semibold">
                    Try Boosting
                  </h3>
                  <p className="text-[#7C7C7C] pt-1">
                    ZOA provides a complete solution for veterinary ...
                  </p>
                </div>
              ))}
            </div>
          </Marquee>
          <div className="pt-5">
            <h2 className="text-white w-auto  md:w-[665px] -mt-0">
              <strong className="text-primary">
                Building digital strategies
              </strong>{" "}
              that turn brand dreams into reality. <br /> Helping brands build
              their vision, dream big, and execute winning strategies.
            </h2>
            <a
              className="text-white relative mt-5 px-8 w-fit flex py-2 bg-primary isolation-auto z-10 before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-left-full before:hover:left-0 before:rounded-full before:bg-purple before:-z-10 before:aspect-square before:hover:scale-150 overflow-hidden before:hover:duration-700"
              href="/studio/"
            >
              About Us
              <img
                alt="arrow-forward"
                loading="lazy"
                width="15"
                height="15"
                decoding="async"
                data-nimg="1"
                className="min-w-[15px] ml-2"
                src="/arrow_right.svg"
                style={{ color: "transparent" }}
              />
            </a>
          </div>
        </div>
      </div>

      {/* Section 2 */}
      <div className="min-h-screen flex items-center  px-2 lg:px-14 justify-center overflow-hidden">
        <div
          ref={videoContainerRef}
          className="relative w-full h-1/2 md:h-full flex items-center justify-center"
        >
          <div ref={videoRef2} className="bg-secondary ">
            <video
              ref={videoRef2View}
              playsInline
              preload="auto"
              autoPlay
              loop
              muted
              className="h-full lg:h-40 w-full lg:w-52 object-cover"
            >
              <source src="/video2.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </div>

      {/* <div className="min-h-screen bg-green-300/30 backdrop-blur-sm flex items-center justify-center">
        <h1 className="text-4xl font-bold">Section 3</h1>

      </div> */}

      <div className="lg:block hidden  bg-secondary ">
        <div className="w-full max-w-[1800px] mx-auto relative z-10">
          <div className=" pt-20 sticky top-0">
            <h3 className="text-[58px] text-white font-semibold max-w-[60%] text-center mx-auto leading-none">
              Our Clients Can't Say Anything Bad About Us
            </h3>
            <div className="h-[700px] overflow-hidden mt-20 relative flex justify-center gap-20 items-center">
              <ClientCards />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
