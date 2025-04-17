import { useState } from "react";
import Image from "next/image";

const Clients = () => {
  // Original client data
  const allClients = [
    {
      name: "Al-Nabwi Travels",
      description: "A travel agency specializing in pilgrimage tours.",
      quote:
        "We are very happy with our design, which is too easy to navigate and optimized for conversions. Within three months, we saw a 23% increase in traffic and leads.",
      logo: "/_next/static/media/Client Logos-03.319a97ca.svg",
    },
    {
      name: "E-store Foam",
      description: "The UK's largest online foam supplier since 2000.",
      quote:
        "The team at Snow Dream Studios made the app development process straightforward and efficient. They communicated clearly and delivered a high-quality product that I'm happy with.",
      logo: "/_next/static/media/Client Logos-05.a84278bc.svg",
    },
    {
      name: "ZOA",
      description:
        "A cloud-based veterinary practice management software for streamlined clinic operations.",
      quote:
        "Their team created a feature-rich app and CRM that has helped us improve client satisfaction and clinic productivity. Highly recommend their services!",
      logo: "/_next/static/media/Client Logos-02.727e009f.svg",
    },
    {
      name: "Fabrich Official",
      description: "A premium clothing brand.",
      quote:
        "Fabrich Official now has a stunning, fully optimized website thanks to the team's exceptional work in design, development, ads, and SEO. Highly recommended!",
      logo: "/_next/static/media/Client Logos-22.d687e1a0.svg",
    },
    {
      name: "Amazign",
      description: "An advertising agency for Amazon brand growth.",
      quote:
        "Our website is now modern, clean, and perfectly optimized for our needs. Their attention to detail during the WordPress development process was incredible.",
      logo: "/_next/static/media/Client Logos-04.56e6136f.svg",
    },
    {
      name: "Be the Next Success Story!",
      quote: "",
      contact: true,
    },
  ];

  // Use the array order such that index 0 is the front (visible) card.
  const [displayedCards, setDisplayedCards] = useState([...allClients]);
  const [exitingCards, setExitingCards] = useState<
    {
      name: string;
      description?: string;
      quote: string;
      logo?: string;
      contact?: boolean;
    }[]
  >([]);
  const [enteringCard, setEnteringCard] = useState<{
    name: string;
    description?: string;
    quote: string;
    logo?: string;
    contact?: boolean;
  } | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  // Style arrays (the best style is at index 5)
  const topOffsets = ["-28px", "0", "28px", "60px", "95px", "130px"];
  const scales = ["0.5", "0.6", "0.7", "0.8", "0.9", "1"];
  const bgColors = [
    "rgb(0, 12, 13)",
    "rgb(0, 19, 22)",
    "rgb(0, 47, 57)",
    "rgb(3, 104, 129)",
    "rgb(1, 155, 192)",
    "rgb(5, 202, 250)",
  ];

  // Unified transition string, now including background-color
  const baseTransition =
    "transform 0.7s ease, top 0.7s ease, opacity 0.7s ease, background-color 0.7s ease";

  // Pop (remove top card)
  const pop = () => {
    if (isAnimating || displayedCards.length === 0) return;
    setIsAnimating(true);

    // Front card is at index 0
    const cardToExit = displayedCards[0];
    setExitingCards((prev) => [...prev, cardToExit]);

    // Delay before removing to allow the exit animation to play
    setTimeout(() => {
      // Remove the first element
      setDisplayedCards((prev) => prev.slice(1));

      setTimeout(() => {
        setExitingCards((prev) =>
          prev.filter((card) => card.name !== cardToExit.name)
        );
        setIsAnimating(false);
      }, 200);
    }, 300);
  };

  // Push a new card to the front of the stack (prepend to the array)
  const push = () => {
    if (isAnimating || displayedCards.length >= allClients.length) return;
    setIsAnimating(true);

    const displayedNames = new Set(displayedCards.map((card) => card.name));
    const availableCards = allClients.filter(
      (card) => !displayedNames.has(card.name)
    );

    if (availableCards.length === 0) {
      setIsAnimating(false);
      return;
    }

    const cardToAdd = availableCards[0];
    // Set entering card and add it immediately
    setEnteringCard(cardToAdd);
    setDisplayedCards((prev) => [cardToAdd, ...prev]);

    // Remove entering state after the animation finishes
    setTimeout(() => {
      setEnteringCard(null);
      setIsAnimating(false);
    }, 100);
  };

  // Compute style so that index 0 (top card) gets the best style (from index 5)
  const getCardStyle = (
    card: {
      name: string;
      description?: string;
      quote: string;
      logo?: string;
      contact?: boolean;
    },
    index: number
  ) => {
    // Calculate position: top card (index 0) gets pos = 5,
    // index 1 gets pos = 4, and so on.
    const pos = index <= 5 ? 5 - index : 0;

    // Exiting card style
    if (exitingCards.some((c) => c.name === card.name)) {
      return {
        transform:
          "scale(0.4) translateX(-100%) translateY(100%) rotate(-15deg)",
        opacity: 0,
        zIndex: 6,
        backgroundColor: bgColors[0],
        transition: baseTransition,
      };
    }

    // Entering card style
    if (enteringCard && enteringCard.name === card.name) {
      return {
        transform:
          "scale(1.2) translateX(-100%) translateY(100%) rotate(-15deg)",
        top: topOffsets[5],
        opacity: 1,
        zIndex: 6,
        backgroundColor: bgColors[5],
        transition: baseTransition,
      };
    }

    // Default stack
    return {
      transform: `scale(${scales[pos]})`,
      top: topOffsets[pos],
      opacity: 1,
      zIndex: pos + 1,
      backgroundColor: bgColors[pos],
      transition: baseTransition,
    };
  };

  return (
    <div className="lg:block hidden bg-secondary relative z-10">
      <div className="container pt-20 sticky top-0">
        <div className="h-[700px] overflow-hidden mt-20 relative flex justify-center gap-20 items-center">
          <button
            className={`border w-20 h-20 flex items-center justify-center ${
              displayedCards.length >= allClients.length
                ? "grayscale"
                : "greyscale-0"
            }`}
            onClick={push}
            disabled={isAnimating || displayedCards.length >= allClients.length}
          >
            <Image
              alt="arrow"
              width={23}
              height={23}
              className="rotate-180"
              src="/arrow_downward.svg"
            />
          </button>
          <div className="relative w-[600px] h-full">
            {/* Use a stable key for each card (client.name) so React keeps the same DOM element */}
            {displayedCards.map((client, index) => (
              <div
                key={client.name}
                style={getCardStyle(client, index)}
                className="w-[600px] h-[400px] p-10 mx-auto absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-700"
              >
                {client.contact ? (
                  <div className="w-full h-full flex flex-col items-center justify-between p-10">
                    <p className="text-[25px] text-center leading-none">
                      {client.name}
                    </p>
                    <a
                      className="text-white relative mr-10 px-8 w-fit flex py-2 bg-black isolation-auto z-10 before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-left-full before:hover:left-0 before:rounded-full before:bg-purple before:-z-10 before:aspect-square before:hover:scale-150 overflow-hidden before:hover:duration-700"
                      href="/contact-us/"
                    >
                      Contact Us
                      <Image
                        alt="arrow-forward"
                        width={15}
                        height={15}
                        className="min-w-[15px] ml-2"
                        src="/_next/static/media/arrow_forward.d190dbd2.svg"
                      />
                    </a>
                  </div>
                ) : (
                  <>
                    <div className="flex items-center border-b border-white pb-5">
                      <div className="min-w-20 w-20 h-20 bg-white flex justify-center items-center p-3 select-none">
                        <Image
                          alt="client"
                          width={80}
                          height={80}
                          className="invert"
                          src={"/logo.svg"}
                        />
                      </div>
                      <div className="ml-5">
                        <p className="text-[28px] font-semibold text-white">
                          {client.name}
                        </p>
                        <p className="text-white">{client.description}</p>
                      </div>
                    </div>
                    <p className="text-white font-normal pt-5">
                      {client.quote}
                    </p>
                    <div className="flex justify-end mt-4 space-x-2">
                      {[...Array(5)].map((_, i) => (
                        <Image
                          key={i}
                          alt="star"
                          width={17}
                          height={17}
                          src="/logo.svg"
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
          <button
            className={`border w-20 h-20 flex items-center justify-center ${
              displayedCards.length === 1 ? "grayscale" : "greyscale-0"
            }`}
            onClick={pop}
            disabled={displayedCards.length === 1}
          >
            <Image
              alt="arrow"
              width={23}
              height={23}
              className="text-white"
              src="/arrow_downward.svg"
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Clients;
