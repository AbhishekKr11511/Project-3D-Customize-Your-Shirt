import React, { useRef } from "react";
import { easing } from "maath";
import { useFrame } from "@react-three/fiber";
import { AccumulativeShadows, RandomizedLight } from "@react-three/drei";

const Backdrop = () => {
  const shadows = useRef();

  return (
    <AccumulativeShadows
      ref={shadows}
      temporal
      frames={60}
      alphaTest={0.25}
      scale={10}
      rotation={[Math.PI / 2, 0, 0]}
      position={[0, 0, -0.14]}
    >
      <RandomizedLight 
      radius={9}
      amount={4} 
      position={[-5, 5, -10]}
      ambient={0.25}
      intensity={0.55}/>
      <RandomizedLight 
      radius={5}
      amount={4} 
      position={[5, 5, -9]}
      ambient={0.55}
      intensity={0.25}/>
    </AccumulativeShadows>
  );
};
export default Backdrop;
