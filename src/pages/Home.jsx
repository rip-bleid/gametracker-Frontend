import styled from "styled-components";

const Container = styled.div`
  text-align: center;
  padding: 80px 20px;
`;

const Title = styled.h1`
  font-size: 3rem;
`;

const Subtitle = styled.p`
  margin-top: 20px;
  font-size: 1.3rem;
  color: #c5c6c7;
`;

export default function Home() {
  return (
    <Container>
      <Title>🎮 Bienvenido a GameTracker</Title>
      <Subtitle>Explora, guarda y reseña tus videojuegos favoritos con estilo futurista.</Subtitle>
    </Container>
  );
}
