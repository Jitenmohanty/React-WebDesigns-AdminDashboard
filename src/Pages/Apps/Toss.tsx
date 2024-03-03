import { useState } from "react";
import AdminSidebar from "../../Components/AdminSidebar";

const Toss = () => {
  const [angle, setAngle] = useState<number>(0);
  const [head, setHead] = useState<string>("Head");

  const flipcoin = () => {
    let random = Math.random();
    if (random > 0.5) {
      setAngle((prev) => {
        return prev + 180;
      });
     setTimeout(()=>{
      setHead((prev) => {
        if (prev === "Head") return (prev = "Tail");
        return (prev = "Head");
      });
     },200)
    } else {
      setAngle((prev) => {
        setHead((prev) => prev);
        return prev + 360;
      });
    }
  };

  return (
    <div className="adminContainer">
      <AdminSidebar />
      <main className="app-container">
        <h1>Toss</h1>
        <section>
          <article
            className="tosscoin"
            onClick={flipcoin}
            style={{ transform: `rotateY(${angle}deg)` }}
          >
            <div></div>
            <div></div>
          </article>
          {angle > 0 &&
            (head === "Tail" ? (
              <h2 className="hfirst">Tail call win</h2>
            ) : (
              <h2 className="hsec">Head call won</h2>
            ))}
        </section>
      </main>
    </div>
  );
};

export default Toss;
