import styles from "./CityLights.module.css";

const LIGHTS = [
  // Precise window/mast locations on the skyscraper skyline in your image
  { x: "24.2%", y: "24.5%", size: 4, color: "rgba(255, 220, 140, 0.95)", delay: 0.2 },
  { x: "28.5%", y: "22.0%", size: 3, color: "rgba(255, 190, 100, 0.85)", delay: 0.7 },
  { x: "32.0%", y: "17.0%", size: 4, color: "rgba(255, 255, 255, 0.95)", delay: 1.1 },
  { x: "46.2%", y: "22.5%", size: 3, color: "rgba(255, 170, 80, 0.8)",   delay: 0.4 },
  { x: "47.8%", y: "14.5%", size: 4, color: "rgba(255, 245, 180, 0.9)",  delay: 1.5 },
  { x: "52.8%", y: "24.0%", size: 5, color: "rgba(255, 255, 255, 0.9)",  delay: 0.9 },
  { x: "58.2%", y: "18.0%", size: 4, color: "rgba(255, 205, 120, 0.95)", delay: 1.8 },
  { x: "65.5%", y: "23.5%", size: 3, color: "rgba(255, 255, 220, 0.85)", delay: 0.5 },
  { x: "76.2%", y: "21.5%", size: 4, color: "rgba(255, 180, 90, 0.9)",   delay: 1.3 },
  { x: "78.8%", y: "26.0%", size: 3, color: "rgba(255, 255, 255, 0.9)",  delay: 0.8 },
];

export default function CityLights() {
  return (
    <>
      {LIGHTS.map((l, i) => (
        <div
          key={i}
          className={styles.light}
          style={{
            left: l.x,
            top: l.y,
            width: `${l.size}px`,
            height: `${l.size}px`,
            backgroundColor: l.color,
            animationDelay: `${l.delay}s`,
            boxShadow: `0 0 ${l.size * 1.5}px ${l.size / 2}px ${l.color.replace('0.9', '0.4').replace('0.8', '0.3')}`,
          }}
        />
      ))}
    </>
  );
}
