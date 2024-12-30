import React from "react";
import NavBar from "./components/NavBar";
import ImageSlider from "./components/ImageSlider";
import Cards from "./components/Cards";
import Gallery from "./components/Gallery";
import Footer from "./components/Footer"
import Logo from "../../assets/logo.png";
import image9 from "../../assets/school/image9.jpg";
import image4 from "../../assets/school/image4.jpg";
import image8 from "../../assets/school/image8.jpg";
import image3 from "../../assets/school/image3.jpg";
import image7 from "../../assets/school/image7.jpg";
import image5 from "../../assets/school/image5.jpg";

function Landing() {

  return (
    <>

      <NavBar logo={Logo} />
      <ImageSlider />

      {/* Facilities */}
      <h2
        id="facilities"
        className="text-center text-main font-extrabold text-5xl mt-9"
      >
        Facilities
      </h2>
      <Cards
        source={image9}
        order={0}
        heading="Computer Lab"
        detail="A room where there are computers for people to use, for example in a school, college, or library."
      />
      <Cards
        source={image8}
        order={1}
        heading="Bio Lab"
        detail="Biolab supports biological experiments on micro-organisms, cells, tissue cultures, and small plants."
      />
      <Cards
        source={image7}
        order={0}
        heading="Chemistry Lab"
        detail="This lab has the necessary equipment for sample preparation and various liquid and solid analyses."
      />
      <Cards
        source={image5}
        order={1}
        heading="Sport Room"
        detail="A large public room with various sports facilities: squash courts, weight training rooms, etc."
      />




      {/* Events */}
      <h2
        id="events"
        className="text-center text-main font-extrabold text-5xl mt-9"
      >
        Events
      </h2>
      <Cards
        source={image4}
        order={0}
        heading="Culture Day"
        detail="Cultural Day is held at SWCON to showcase Pakistan's diverse and rich cultures."
      />
      <Cards
        source={image3}
        order={1}
        heading="ISA"
        detail="A competitive science exhibition where students illustrate experiments and projects."
      />
      <Cards
        source={image5}
        order={0}
        heading="Sports"
        detail="Punjabis play a variety of traditional and modern sports, such as hockey, cricket, and wrestling."
      />
      <Gallery />
      <Footer />
    </>
  );
}

export default Landing;
