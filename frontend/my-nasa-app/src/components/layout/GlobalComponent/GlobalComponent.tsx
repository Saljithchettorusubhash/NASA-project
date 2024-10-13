import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import earthImage from '../../../assets/images/exoplanets/earth_imagery.jpg';

interface Coordinates {
  lat: number;
  lon: number;
  caption: string;
}

const GlobeComponent: React.FC<{ images: Coordinates[] }> = ({ images }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const currentMountRef = mountRef.current;
    const currentTooltipRef = tooltipRef.current;

    if (!currentMountRef || !currentTooltipRef) return;

    const width = currentMountRef.clientWidth;
    const height = currentMountRef.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    currentMountRef.appendChild(renderer.domElement);

    const sphereGeometry = new THREE.SphereGeometry(15, 50, 50);
    const textureLoader = new THREE.TextureLoader();
    const earthTexture = textureLoader.load(earthImage);
    const sphereMaterial = new THREE.MeshBasicMaterial({ map: earthTexture });
    const earthMesh = new THREE.Mesh(sphereGeometry, sphereMaterial);
    scene.add(earthMesh);

    camera.position.z = 30;

    const convertLatLonToVector3 = (lat: number, lon: number, radius: number) => {
      const phi = (90 - lat) * (Math.PI / 180);
      const theta = (lon + 180) * (Math.PI / 180);
      const x = -(radius * Math.sin(phi) * Math.cos(theta));
      const y = radius * Math.cos(phi);
      const z = radius * Math.sin(phi) * Math.sin(theta);
      return new THREE.Vector3(x, y, z);
    };

    images.forEach((image) => {
      const markerGeometry = new THREE.SphereGeometry(0.3, 10, 10);
      const markerMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
      const markerMesh = new THREE.Mesh(markerGeometry, markerMaterial);

      const markerPosition = convertLatLonToVector3(image.lat, image.lon, 15);
      markerMesh.position.copy(markerPosition);
      markerMesh.userData = { caption: image.caption, lat: image.lat, lon: image.lon };

      scene.add(markerMesh);

      const raycaster = new THREE.Raycaster();
      const mouse = new THREE.Vector2();

      const handleMouseMove = (event: MouseEvent) => {
        const bounds = currentMountRef?.getBoundingClientRect();
        if (!bounds) return;

        mouse.x = ((event.clientX - bounds.left) / width) * 2 - 1;
        mouse.y = -((event.clientY - bounds.top) / height) * 2 + 1;

        raycaster.setFromCamera(mouse, camera);
        const intersects = raycaster.intersectObjects(scene.children);

        if (intersects.length > 0) {
          const intersect = intersects[0];
          const { caption, lat, lon } = intersect.object.userData;
          if (caption) {
            if (currentTooltipRef) {
              currentTooltipRef.style.display = 'block';
              currentTooltipRef.style.left = `${event.clientX + 10}px`;
              currentTooltipRef.style.top = `${event.clientY + 10}px`;
              currentTooltipRef.innerText = `Lat: ${lat}, Lon: ${lon}\n${caption}`;
              currentTooltipRef.style.background = '#fff';  // White background
              currentTooltipRef.style.color = '#000';  // Black text
            }
          }
        } else {
          if (currentTooltipRef) {
            currentTooltipRef.style.display = 'none';
          }
        }
      };

      currentMountRef?.addEventListener('mousemove', handleMouseMove);
    });

    const animate = () => {
      requestAnimationFrame(animate);
      earthMesh.rotation.y += 0.001;
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      if (currentMountRef) {
        currentMountRef.removeChild(renderer.domElement);
      }
    };
  }, [images]);

  return (
    <>
      <div
        ref={tooltipRef}
        style={{
          position: 'absolute',
          display: 'none',
          background: '#fff',  // White background
          color: '#000',  // Black text
          padding: '5px',
          borderRadius: '5px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', // Slight shadow for style
          pointerEvents: 'none',
        }}
      ></div>
      <div ref={mountRef} className="w-full h-full" />
    </>
  );
};

export default GlobeComponent;
