import { ChevronRightIcon } from "@/components/svg";
import { TAnimeStaffs } from "@/components/types/anime";
import { Button } from "@/components/ui/button";
import { cardVariant } from "@/components/variants/motion";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { useState } from "react";

type TStaffCard = {
  position: string;
  person: TAnimeStaffs[];
  index: number;
};

export const StaffCard = ({ person, position, index }: TStaffCard) => {
  const [show, setShow] = useState(index === 0 ? true : false);

  return (
    <motion.div
      className={cn(" rounded-lg border", show && "bg-gray-accent")}
      variants={cardVariant}
      initial="initial"
      whileInView="visible"
      transition={{ duration: 0.3 }}
      viewport={{ once: true }}
    >
      <div
        className="flex cursor-pointer items-center justify-between gap-4 p-4"
        onClick={() => setShow(!show)}
      >
        <h3
          className={cn(
            "transition-all duration-300 font-mono",
            show ? "text-violet-foreground" : "text-gray-foreground",
          )}
        >
          {position} ({person.length})
        </h3>
        <Button variant={"outline"} size={"icon"}>
          <ChevronRightIcon
            className={cn(
              "rotate-270 transition-all duration-300",
              !show && "rotate-90",
            )}
          />
        </Button>
      </div>
      <AnimatePresence>
        {show && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{
              duration: 0.3,
              ease: "linear",
            }}
            className="overflow-clip"
          >
            <div className="grid grid-cols-2 gap-4 p-4 lg:grid-cols-3 xl:grid-cols-4">
              {person.map(({ person }) => (
                <div key={person.mal_id} className="">
                  {person.images.jpg.image_url && (
                    <div className="size-14 overflow-clip rounded-full border">
                      <Image
                        src={person.images.jpg.image_url}
                        alt={`${person.name} image`}
                        height={480}
                        width={640}
                        loading="lazy"
                        className="size-full object-cover object-center"
                      />
                    </div>
                  )}

                  <p className="mt-1 text-sm">{person.name} </p>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
