import { a } from "@react-spring/three";
import { useEffect, useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";

import islandScene from "../assets/3d/island.glb";

export function Island({
  isRotating,
  setIsRotating,
  setCurrentStage,
  currentFocusPoint,
  ...props
}) {
  const islandRef = useRef();
  const { gl, viewport } = useThree();
  const { nodes, materials } = useGLTF(islandScene);

  const lastX = useRef(0);
  const rotationSpeed = useRef(0);
  const dampingFactor = 0.95;

  const handlePointerDown = (event) => {
    event.stopPropagation();
    event.preventDefault();
    setIsRotating(true);

    const clientX = event.touches ? event.touches[0].clientX : event.clientX;
    lastX.current = clientX;
  };

  const handlePointerUp = (event) => {
    event.stopPropagation();
    event.preventDefault();
    setIsRotating(false);
  };

  const handlePointerMove = (event) => {
    event.stopPropagation();
    event.preventDefault();
    if (isRotating) {
      const clientX = event.touches ? event.touches[0].clientX : event.clientX;
      const delta = (clientX - lastX.current) / viewport.width;

      islandRef.current.rotation.y += delta * 0.01 * Math.PI;
      lastX.current = clientX;
      rotationSpeed.current = delta * 0.01 * Math.PI;
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "ArrowLeft") {
      if (!isRotating) setIsRotating(true);

      islandRef.current.rotation.y += 0.005 * Math.PI;
      rotationSpeed.current = 0.007;
    } else if (event.key === "ArrowRight") {
      if (!isRotating) setIsRotating(true);

      islandRef.current.rotation.y -= 0.005 * Math.PI;
      rotationSpeed.current = -0.007;
    }
  };

  const handleKeyUp = (event) => {
    if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
      setIsRotating(false);
    }
  };

  const handleTouchStart = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setIsRotating(true);

    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    lastX.current = clientX;
  };

  const handleTouchEnd = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setIsRotating(false);
  };

  const handleTouchMove = (e) => {
    e.stopPropagation();
    e.preventDefault();

    if (isRotating) {
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const delta = (clientX - lastX.current) / viewport.width;

      islandRef.current.rotation.y += delta * 0.4 * Math.PI;
      lastX.current = clientX;
      rotationSpeed.current = delta * 0.01 * Math.PI;
    }
  };

  useEffect(() => {
    const canvas = gl.domElement;
    canvas.addEventListener("pointerdown", handlePointerDown);
    canvas.addEventListener("pointerup", handlePointerUp);
    canvas.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    canvas.addEventListener("touchstart", handleTouchStart);
    canvas.addEventListener("touchend", handleTouchEnd);
    canvas.addEventListener("touchmove", handleTouchMove);

    return () => {
      canvas.removeEventListener("pointerdown", handlePointerDown);
      canvas.removeEventListener("pointerup", handlePointerUp);
      canvas.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
      canvas.removeEventListener("touchstart", handleTouchStart);
      canvas.removeEventListener("touchend", handleTouchEnd);
      canvas.removeEventListener("touchmove", handleTouchMove);
    };
  }, [gl, handlePointerDown, handlePointerUp, handlePointerMove]);

  useFrame(() => {
    if (!isRotating) {
      rotationSpeed.current *= dampingFactor;

      if (Math.abs(rotationSpeed.current) < 0.001) {
        rotationSpeed.current = 0;
      }

      islandRef.current.rotation.y += rotationSpeed.current;
    } else {
      const rotation = islandRef.current.rotation.y;
      const normalizedRotation =
        ((rotation % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);

      switch (true) {
        case normalizedRotation >= 5.45 && normalizedRotation <= 5.85:
          setCurrentStage(4);
          break;
        case normalizedRotation >= 0.85 && normalizedRotation <= 1.3:
          setCurrentStage(3);
          break;
        case normalizedRotation >= 2.4 && normalizedRotation <= 2.6:
          setCurrentStage(2);
          break;
        case normalizedRotation >= 4.25 && normalizedRotation <= 4.75:
          setCurrentStage(1);
          break;
        default:
          setCurrentStage(null);
      }
    }
  });

  return (
    <a.group 
  ref={islandRef} 
  {...props} 
  scale={[7, 6, 6]} 
  rotation={[Math.PI / 1, 4, 1.6]}
>
  <mesh
    castShadow
    receiveShadow
    geometry={nodes.Plane003.geometry}
    material={materials["Material.001"]}
  />
  <mesh
    castShadow
    receiveShadow
    geometry={nodes.Plane003_1.geometry}
    material={materials.circle}
  />
  <mesh
    castShadow
    receiveShadow
    geometry={nodes.Plane003_2.geometry}
    material={materials["badan kayu cat"]}
  />
  <mesh
    castShadow
    receiveShadow
    geometry={nodes.Plane003_3.geometry}
    material={materials["kiri kanan"]}
  />
  <mesh
    castShadow
    receiveShadow
    geometry={nodes.Plane003_4.geometry}
    material={materials["depan belakang atap hijau"]}
  />
  <mesh
    castShadow
    receiveShadow
    geometry={nodes.Plane003_5.geometry}
    material={materials["badan kayu"]}
  />
  <mesh
    castShadow
    receiveShadow
    geometry={nodes.Plane003_6.geometry}
    material={materials["Forest Branches Neadles PBR Scan"]}
  />
  <mesh
    castShadow
    receiveShadow
    geometry={nodes.Plane003_7.geometry}
    material={materials["toraja batu"]}
  />
  <mesh
    castShadow
    receiveShadow
    geometry={nodes.Plane003_8.geometry}
    material={materials["atap rumah kayu"]}
  />
  <mesh
    castShadow
    receiveShadow
    geometry={nodes.Plane003_9.geometry}
    material={materials["atap rumah "]}
  />
  <mesh
    castShadow
    receiveShadow
    geometry={nodes.Plane003_10.geometry}
    material={materials["Grassy Rocks"]}
  />
  <mesh
    castShadow
    receiveShadow
    geometry={nodes.Plane003_11.geometry}
    material={materials.PaletteMaterial001}
  />
  <mesh
    castShadow
    receiveShadow
    geometry={nodes.Plane003_12.geometry}
    material={materials.COM_Nature_TreeA_BananaTree01_MIT01}
  />
  <mesh
    castShadow
    receiveShadow
    geometry={nodes.Plane003_13.geometry}
    material={materials["COM_Nature_TreeA_PalmTree01_MIT01.001"]}
  />
</a.group>

  );
}
