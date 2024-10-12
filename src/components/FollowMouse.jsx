import { useEffect, useState } from "react";

const FollowMouse = () => {
  const [enable, setEnable] = useState(false);
  const [posicion, setPosition] = useState({ x: 0, y: 0 });

  // [] -> solo se ejecuta una vez cuando se monta el componente
  // [enabled] -> se ejecuta cuando cambia enabled y cuando se monta el componente
  // undefined -> se ejecuta cada vez que se renderiza el componente
  useEffect(() => {
    console.log("efeccto", { enable });
    const handleMove = (event) => {
      //va obtner la posicion del puntero gracias el event
      const { clientX, clientY } = event;
      console.log("handleMove", { clientX, clientY });
      setPosition({ x: clientX, y: clientY });
    };
    if (enable) {
      window.addEventListener("pointermove", handleMove);
    }

    // cleanup:
    // -> cuando el componente se desmonta
    // -> cuando cambian las dependencias, antes de ejecutar
    //    el efecto de nuevo

    return () => {
      window.removeEventListener("pointermove", handleMove);
    };
  }, [enable]);
  return (
    <>
      <div
        style={{
          position: "absolute",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          border: "1px solid #fff",
          borderRadius: "50%",
          opacity: 0.8,
          pointerEvents: "none",
          left: -25,
          top: -25,
          width: 50,
          height: 50,
          transform: `translate(${posicion.x}px, ${posicion.y}px)`,
        }}
      ></div>
      <h3>FollowMouse</h3>
      <button onClick={() => setEnable(!enable)}>
        {enable ? "Desactivar" : "Activar"} seguir puntero
      </button>
    </>
  );
};
export default FollowMouse;
