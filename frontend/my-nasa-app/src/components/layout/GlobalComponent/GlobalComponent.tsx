import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { OBJLoader } from 'three-stdlib';  // Updated loader import

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

    if (!currentMountRef || !currentTooltipRef) {
      console.error('Mount ref or tooltip ref is not set.');
      return;
    }

    const width = currentMountRef.clientWidth;
    const height = currentMountRef.clientHeight;

    console.log('Initializing Three.js scene...');
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    currentMountRef.appendChild(renderer.domElement);

    // Add lighting for better visibility
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5);
    directionalLight.position.set(1, 1, 1).normalize();
    scene.add(directionalLight);

    // Load the .obj model for the Earth
    const objLoader = new OBJLoader();
    console.log('Attempting to load .obj file...');
    
    objLoader.load(
      '/earth_fig.obj', 
      (object) => {
        object.scale.set(3, 3, 3); // Adjust scale
        object.position.set(0, 0, 0); // Center the object
        scene.add(object);
        console.log('Successfully loaded .obj file:', object);
      },
      undefined,
      (error) => {
        console.error('An error occurred while loading the .obj file:', error);
      }
    );

    camera.position.z = 40; // Adjust camera distance

    // Function to convert lat/lon to 3D coordinates
    const convertLatLonToVector3 = (lat: number, lon: number, radius: number) => {
      const phi = (90 - lat) * (Math.PI / 180);
      const theta = (lon + 180) * (Math.PI / 180);
      const x = -(radius * Math.sin(phi) * Math.cos(theta));
      const y = radius * Math.cos(phi);
      const z = radius * Math.sin(phi) * Math.sin(theta);
      return new THREE.Vector3(x, y, z);
    };

    // Add markers for each image (data points)
    images.forEach((image) => {
      const markerGeometry = new THREE.SphereGeometry(0.4, 10, 10); // Adjusted size of markers
      const markerMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
      const markerMesh = new THREE.Mesh(markerGeometry, markerMaterial);

      const markerPosition = convertLatLonToVector3(image.lat, image.lon, 20); // Adjusted radius
      markerMesh.position.copy(markerPosition);
      markerMesh.userData = { caption: image.caption, lat: image.lat, lon: image.lon };

      scene.add(markerMesh);
      console.log(`Marker added for: ${image.caption} at [Lat: ${image.lat}, Lon: ${image.lon}]`);
    });

    // Tooltip display logic
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
          currentTooltipRef.style.display = 'block';
          currentTooltipRef.style.left = `${event.clientX + 10}px`;
          currentTooltipRef.style.top = `${event.clientY + 10}px`;
          currentTooltipRef.innerText = `Lat: ${lat}, Lon: ${lon}\n${caption}`;
          currentTooltipRef.style.background = '#fff';
          currentTooltipRef.style.color = '#000';
        }
      } else {
        currentTooltipRef.style.display = 'none';
      }
    };

    currentMountRef?.addEventListener('mousemove', handleMouseMove);

    // Handle window resize for responsiveness
    const handleResize = () => {
      const newWidth = currentMountRef.clientWidth;
      const newHeight = currentMountRef.clientHeight;
      renderer.setSize(newWidth, newHeight);
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
    };
    window.addEventListener('resize', handleResize);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      if (currentMountRef) {
        currentMountRef.removeChild(renderer.domElement);
        currentMountRef.removeEventListener('mousemove', handleMouseMove);
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
          background: '#fff',
          color: '#000',
          padding: '5px',
          borderRadius: '5px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          pointerEvents: 'none',
        }}
      ></div>
      <div ref={mountRef} className="w-full h-full" />
    </>
  );
};

export default GlobeComponent;
