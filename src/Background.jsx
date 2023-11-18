import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export function Background(props) {
  const { nodes, materials } = useGLTF('./background.glb')
  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes.平面.geometry} material={nodes.平面.material} position={[0, -13.494, 0]} rotation={[0, -0.787, 0]} scale={14.51} />
    </group>
  )
}

useGLTF.preload('./background.glb')
