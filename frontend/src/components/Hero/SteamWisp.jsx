import styles from "./SteamWisp.module.css";

export default function SteamWisp({ x, y }) {
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        transform: "translate(-50%, -100%)",
        pointerEvents: "none",
        zIndex: 5,
      }}
    >
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className={styles.wisp}
          style={{
            animationDelay: `${i * 1.1}s`,
            left: `${(i - 1) * 8}px`, // Offset each wisp horizontally
          }}
        />
      ))}
    </div>
  );
}
