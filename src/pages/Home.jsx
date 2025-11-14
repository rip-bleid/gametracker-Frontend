import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Slider from "react-slick";
import styled from "styled-components";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100vh;
  padding: 0 5rem;
  color: #fff;

  /* 🔥 Fondo animado */
  background: linear-gradient(135deg, #000428, #004e92, #001b44, #003060);
  background-size: 400% 400%;
  animation: moverFondo 12s ease infinite;

  @keyframes moverFondo {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
`;

const InfoSection = styled(motion.div)`
  max-width: 500px;
`;

const Title = styled.h1`
  font-size: 3rem;
  margin-bottom: 1rem;
  color: #00bcd4;
`;

const Description = styled.p`
  font-size: 1.2rem;
  line-height: 1.6;
  margin-bottom: 2rem;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;

  @media (max-width: 900px) {
    justify-content: center;
  }
`;

const Button = styled(motion.button)`
  background-color: ${(props) => (props.primary ? "#00bcd4" : "transparent")};
  color: ${(props) => (props.primary ? "#fff" : "#00bcd4")};
  border: 2px solid #00bcd4;
  padding: 0.8rem 2rem;
  font-size: 1rem;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: ${(props) => (props.primary ? "#0097a7" : "#00bcd4")};
    color: #fff;
  }
`;

const CarouselSection = styled(motion.div)`
  width: 45%;
  max-width: 500px;

  @media (max-width: 900px) {
    width: 90%;
    margin-top: 2rem;
  }
`;

const Image = styled.img`
  width: 100%;
  border-radius: 15px;
  box-shadow: 0px 0px 20px rgba(0, 188, 212, 0.4);
`;

export default function Inicio() {
  const navigate = useNavigate();

  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
    arrows: false,
  };

  const images = [
    "https://i.imgur.com/VfRjF9q.jpeg",
    "https://i.imgur.com/Tm8YEVF.jpeg",
    "https://i.imgur.com/iqIdfDr.jpeg",
  ];

  return (
    <Container>
      <InfoSection
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
      >
        <Title>🎮 GameTracker</Title>
        <Description>
          Descubre, guarda y comparte tus videojuegos favoritos.  
          Lleva un registro de tus horas jugadas, reseñas y progreso.  
          ¡Tu mundo gamer en un solo lugar!
        </Description>
        <ButtonGroup>
          <Button
            primary
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/login")}
          >
            Iniciar Sesión
          </Button>
          <Button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/registro")}
          >
            Registrarse
          </Button>
        </ButtonGroup>
      </InfoSection>

      <CarouselSection
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
      >
        <Slider {...settings}>
          {images.map((img, i) => (
            <div key={i}>
              <Image src={img} alt={`imagen-${i}`} />
            </div>
          ))}
        </Slider>
      </CarouselSection>
    </Container>
  );
}
