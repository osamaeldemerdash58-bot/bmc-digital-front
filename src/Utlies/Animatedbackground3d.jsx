import { useEffect, useRef } from 'react';
import * as THREE from 'three';

/**
 * AnimatedBackground3D
 * ─────────────────────
 * خلفية ثلاثية الأبعاد — جزيئات عائمة + أشكال هندسية دوارة
 *
 * Props:
 *   particleCount  — عدد الجزيئات          (default: 120)
 *   shapeCount     — عدد الأشكال الهندسية   (default: 18)
 *   primaryColor   — اللون الأساسي hex      (default: '#B8A472')
 *   accentColor    — لون التمييز hex        (default: '#4A90D9')
 *   speed          — سرعة الحركة 0.1–2     (default: 0.6)
 *   opacity        — شفافية الكانفاس 0–1   (default: 1)
 *   style          — styles إضافية على الـ wrapper
 *
 * Usage:
 *   import AnimatedBackground3D from '../components/AnimatedBackground3D';
 *
 *   // في أي صفحة:
 *   <div style={{ position: 'relative' }}>
 *     <AnimatedBackground3D primaryColor="#B8A472" speed={0.5} />
 *     <YourContent style={{ position: 'relative', zIndex: 1 }} />
 *   </div>
 */

export default function AnimatedBackground3D({
  shapeCount   = 10,
  primaryColor = '#B8A472',
  accentColor  = '#4A90D9',
  speed        = 0.45,
  opacity      = 1,
  style        = {},
}) {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    /* ── Renderer ── */
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.25));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    /* ── Scene & Camera ── */
    const scene  = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, mount.clientWidth / mount.clientHeight, 0.1, 1000);
    camera.position.z = 28;

    /* ── Color helpers ── */
    const primary = new THREE.Color(primaryColor);
    const accent  = new THREE.Color(accentColor);

    /* ─────────────────────────────────────────
       أشكال خفيفة: Cube + Diamond فقط
    ───────────────────────────────────────── */
    const geoFns = [
      () => new THREE.BoxGeometry(1.1, 1.1, 1.1),      // cube
      () => new THREE.OctahedronGeometry(0.95, 0),      // diamond
    ];

    const shapes = [];
    for (let i = 0; i < shapeCount; i++) {
      const geoFn   = geoFns[i % geoFns.length];
      const geo     = geoFn();
      const usePrim = Math.random() > 0.4;
      const col     = usePrim ? primary.clone() : accent.clone();

      const mat = new THREE.MeshBasicMaterial({
        color:       col,
        wireframe:   true,
        transparent: true,
        opacity:     0.12 + Math.random() * 0.12,
      });

      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set(
        (Math.random() - 0.5) * 44,
        (Math.random() - 0.5) * 30,
        (Math.random() - 0.5) * 16 - 4,
      );

      // نصف الحجم السابق تقريبًا
      const s = 0.4 + Math.random() * 0.9;
      mesh.scale.setScalar(s);

      // store per-shape animation data
      mesh.userData = {
        rotSpeedX: (Math.random() - 0.5) * 0.004 * speed,
        rotSpeedY: (Math.random() - 0.5) * 0.005 * speed,
        rotSpeedZ: (Math.random() - 0.5) * 0.003 * speed,
        floatAmp:   0.06 + Math.random() * 0.1,
        floatSpeed: 0.35 + Math.random() * 0.6,
        floatOff:   Math.random() * Math.PI * 2,
        baseY:      mesh.position.y,
      };

      scene.add(mesh);
      shapes.push(mesh);
    }

    /* ─────────────────────────────────────────
       Mouse Parallax
    ───────────────────────────────────────── */
    const mouse    = { x: 0, y: 0 };
    const targetCam = { x: 0, y: 0 };

    const onMouseMove = (e) => {
      mouse.x = (e.clientX / window.innerWidth  - 0.5) * 2;
      mouse.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', onMouseMove);

    /* ─────────────────────────────────────────
       Animation Loop
    ───────────────────────────────────────── */
    let frameId;
    let t = 0;

    const animate = () => {
      frameId = requestAnimationFrame(animate);
      t += 0.016;

      /* camera parallax */
      targetCam.x += (mouse.x * 1.8 - targetCam.x) * 0.04;
      targetCam.y += (-mouse.y * 1.2 - targetCam.y) * 0.04;
      camera.position.x = targetCam.x;
      camera.position.y = targetCam.y;
      camera.lookAt(scene.position);

      /* rotate + float */
      shapes.forEach(mesh => {
        const d = mesh.userData;
        mesh.rotation.x += d.rotSpeedX;
        mesh.rotation.y += d.rotSpeedY;
        mesh.rotation.z += d.rotSpeedZ;
        mesh.position.y  = d.baseY + Math.sin(t * d.floatSpeed + d.floatOff) * d.floatAmp;
      });

      renderer.render(scene, camera);
    };

    animate();

    /* ─────────────────────────────────────────
       Resize Handler
    ───────────────────────────────────────── */
    const onResize = () => {
      if (!mount) return;
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', onResize);

    /* ─────────────────────────────────────────
       CLEANUP
    ───────────────────────────────────────── */
    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);

      // dispose geometries & materials
      shapes.forEach(m => { m.geometry.dispose(); m.material.dispose(); });

      renderer.dispose();
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
    };
  }, [shapeCount, primaryColor, accentColor, speed]);

  return (
    <div
      ref={mountRef}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
        opacity,
        ...style,
      }}
    />
  );
}
