"use client";
import React, { FC, useState } from "react";
import Heading from "./utils/Heading";
import { ThemeProvider } from "@/components/Theme-provider";
import Header from "../components/Header";
import Hero from "../components/Hero";

interface Props {}

const Page: FC<Props> = (props) => {
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(0);
  const [route, setRoute] = useState("Login");

  return (
    <div className="h-full">
      <Heading
        title="Learning Platforms"
        description="Platform to learn and have fun"
        keywords="films,movies"
      />
      <Header
        open={open}
        setOpen={setOpen}
        activeItem={activeItem}
        setRoute={setRoute}
        route={route}
      />
      <Hero />
    </div>
  );
};

export default Page;
