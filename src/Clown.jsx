import * as THREE from "three";
import React, { Suspense, useRef, useContext } from "react";
import {
  Html,
  useGLTF,
  PerspectiveCamera,
  useAnimations,
  OrbitControls,
  useProgress,
  Environment,
} from "@react-three/drei";
import { AppContext } from "./App";
import "./Clown.css";

const Loader = () => {
  const { active, progress, errors, item, loaded, total } = useProgress();
  return (
    <Html center>
      <div className="LoadingScreen">
        <div className="ProgressBar"></div>
      </div>
    </Html>
  );
};

const Clown = () => {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF("./clown.glb");
  const { actions, names } = useAnimations(animations, group);
  const { colors, dispatch } = useContext(AppContext);

  // useLayoutEffect(() => {
  //   names.forEach((animation) => {
  //     actions?.[animation]?.play();
  //   });
  // }, [actions, names]);

  return (
    <group ref={group} dispose={null}>
      {/* <ambientLight intensity={0.5} /> */}
      <OrbitControls enableZoom={false} />
      <PerspectiveCamera
        makeDefault={true}
        far={100}
        near={0.1}
        fov={54.432}
        position={[-0.229, 8.877, -37.279]}
        rotation={[-2.883, 0.022, 3.136]}
      >
        <directionalLight
          intensity={5}
          decay={2}
          position={[-14.369, 37.079, -23.549]}
          rotation={[-2.129, -0.326, 2.321]}
        />
      </PerspectiveCamera>
      {/* <Loader /> */}
      <Suspense fallback={<Loader />}>
        <Environment files="./lebombo_1k.hdr" background />
        <mesh
          geometry={nodes.rightArm.geometry}
          material={materials.arm}
          material-color={
            new THREE.Color(colors.find((p) => p.key === "arm").color)
          }
          position={[4.919, 4.855, -0.557]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={0.197}
        />
        <mesh
          geometry={nodes.leftArm.geometry}
          material={materials.arm}
          material-color={
            new THREE.Color(colors.find((p) => p.key === "arm").color)
          }
          position={[-5.764, 3.619, -0.626]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={0.197}
        />
        <mesh
          geometry={nodes.leftLeg.geometry}
          material={materials.leg}
          material-color={
            new THREE.Color(colors.find((p) => p.key === "leg").color)
          }
          position={[-5.515, -10.008, -0.216]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={0.197}
        />
        <mesh
          geometry={nodes.body.geometry}
          material={materials.body}
          material-color={
            new THREE.Color(colors.find((p) => p.key === "body").color)
          }
          position={[0.062, -0.313, 0.182]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={0.188}
        />
        <mesh
          geometry={nodes.rightLeg.geometry}
          material={materials.leg}
          material-color={
            new THREE.Color(colors.find((p) => p.key === "leg").color)
          }
          position={[5.621, -10.017, -0.117]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={0.197}
        />
        <mesh
          geometry={nodes.leftHand.geometry}
          material={materials.hand}
          material-color={
            new THREE.Color(colors.find((p) => p.key === "hand").color)
          }
          position={[-9.109, 7.133, -0.712]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={0.197}
        />
        <mesh
          geometry={nodes.leftShoe.geometry}
          material={materials.shoe}
          material-color={
            new THREE.Color(colors.find((p) => p.key === "shoe").color)
          }
          position={[-6.044, -11.174, -0.379]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={0.197}
        />
        <mesh
          geometry={nodes.rightHand.geometry}
          material={materials.hand}
          material-color={
            new THREE.Color(colors.find((p) => p.key === "hand").color)
          }
          position={[3.303, 8.838, -0.642]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={0.197}
        />
        <mesh
          geometry={nodes.rightShoe.geometry}
          material={materials.shoe}
          material-color={
            new THREE.Color(colors.find((p) => p.key === "shoe").color)
          }
          position={[6.206, -11.144, -0.275]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={0.197}
        />
        <group
          position={[0.029, 6.215, -0.387]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={0.216}
        >
          <mesh
            geometry={nodes.head_1.geometry}
            material={materials.head}
            material-color={
              new THREE.Color(colors.find((p) => p.key === "head").color)
            }
          />
          <mesh
            geometry={nodes.head_2.geometry}
            material={materials.oilBlack}
          />
        </group>
      </Suspense>
    </group>
  );
};

useGLTF.preload("./clown.glb");

export default Clown;
