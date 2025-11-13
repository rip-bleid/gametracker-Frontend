export default function Juegos() {
  const juegos = [
    { id: 1, nombre: "Minecraft" },
    { id: 2, nombre: "GTA V" },
    { id: 3, nombre: "Valorant" },
  ];

  return (
    <div>
      <h2>Lista de Juegos</h2>
      <ul>
        {juegos.map((juego) => (
          <li key={juego.id}>{juego.nombre}</li>
        ))}
      </ul>
    </div>
  );
}
