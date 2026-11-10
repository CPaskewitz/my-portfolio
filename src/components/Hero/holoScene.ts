/**
 * The hero hologram: Corey's cut-out portrait displaced by a depth map into a 2.5D relief,
 * rendered as light (rose/mint gradient, scan lines, rim glow, chromatic fringes, the odd
 * glitch slice), materialising from the emitter on start, plus a cone of rising particles.
 *
 * Loaded as its own chunk only after load + idle, on hardware WebGL, without reduced motion
 * (see HoloStage). Never blocks clicks: the canvas is pointer-events: none and the pointer is
 * read from window.
 */
import {
  AdditiveBlending,
  BufferAttribute,
  BufferGeometry,
  Color,
  Group,
  LinearFilter,
  Mesh,
  PerspectiveCamera,
  PlaneGeometry,
  Points,
  Scene,
  ShaderMaterial,
  SRGBColorSpace,
  TextureLoader,
  WebGLRenderer,
} from 'three';

const MINT = new Color('#5cffc8');
const ROSE = new Color('#ff3d7f');

const holoVertex = /* glsl */ `
  uniform sampler2D uDepth;
  uniform float uTime;
  uniform float uGlitch;
  varying vec2 vUv;
  varying float vDepth;
  void main() {
    vUv = uv;
    float d = texture2D(uDepth, uv).r;
    vDepth = d;
    vec3 p = position;
    p.z += d * 0.32;
    p.x += sin(p.y * 38.0 + uTime * 30.0) * 0.006 * uGlitch;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
  }
`;

const holoFragment = /* glsl */ `
  uniform sampler2D uMap;
  uniform float uTime;
  uniform float uGlitch;
  uniform float uReveal;
  uniform vec3 uMint;
  uniform vec3 uRose;
  varying vec2 vUv;
  varying float vDepth;

  float hash(float n) { return fract(sin(n) * 43758.5453); }

  void main() {
    vec2 uv = vUv;
    // glitch: displace a few horizontal slices
    float slice = floor(uv.y * 36.0);
    float hit = step(0.93, hash(slice + floor(uTime * 14.0))) * uGlitch;
    uv.x += hit * (hash(slice * 3.1 + floor(uTime * 20.0)) - 0.5) * 0.08;

    vec4 tex = texture2D(uMap, uv);
    float a = tex.a;
    float l = dot(tex.rgb, vec3(0.299, 0.587, 0.114));

    // rim glow from the alpha gradient
    float o = 0.006;
    float aN = texture2D(uMap, uv + vec2(0.0, o)).a;
    float aS = texture2D(uMap, uv - vec2(0.0, o)).a;
    float aE = texture2D(uMap, uv + vec2(o, 0.0)).a;
    float aW = texture2D(uMap, uv - vec2(o, 0.0)).a;
    float rim = clamp(a * 4.0 - (aN + aS + aE + aW), 0.0, 1.0);

    // chromatic fringes
    float fr = texture2D(uMap, uv + vec2(0.006 + hit * 0.02, 0.0)).a;
    float fl = texture2D(uMap, uv - vec2(0.006 + hit * 0.02, 0.0)).a;

    // body colour: mint at the top shading to rose at the bottom, drifting slowly
    float g = smoothstep(0.15, 0.95, 1.0 - uv.y + 0.12 * sin(uTime * 0.4));
    vec3 base = mix(uMint, uRose, g);
    vec3 col = base * (0.18 + 1.5 * l) + uMint * vDepth * 0.25;
    col += uMint * rim * 1.6;
    col += uRose * max(fr - a, 0.0) * 0.9 + uMint * max(fl - a, 0.0) * 0.9;

    // scan lines + a slow bright sweep
    float scan = 0.72 + 0.28 * sin(vUv.y * 520.0 - uTime * 5.0);
    float sweepPos = fract(uTime * 0.11);
    float sweep = smoothstep(0.025, 0.0, abs((1.0 - vUv.y) - sweepPos));
    col = col * scan + uMint * sweep * 0.7;

    float flicker = 0.93 + 0.07 * hash(floor(uTime * 24.0));

    // materialise from the bottom up
    float edge = uReveal * 1.15;
    float revealed = smoothstep(edge, edge - 0.08, 1.0 - vUv.y);
    float front = smoothstep(0.03, 0.0, abs((1.0 - vUv.y) - edge)) * step(uReveal, 0.999);

    float alpha = (a * (0.28 + 0.75 * l + rim) + max(fr - a, 0.0) * 0.5 + max(fl - a, 0.0) * 0.5) * flicker;
    alpha = alpha * scan * revealed + front * a * 0.9;
    col += uMint * front;
    alpha = clamp(alpha, 0.0, 1.0);
    gl_FragColor = vec4(col * alpha, alpha);
  }
`;

const particleVertex = /* glsl */ `
  attribute float aSeed;
  uniform float uTime;
  uniform float uPixelRatio;
  varying float vSeed;
  varying float vLife;
  void main() {
    vSeed = aSeed;
    float life = fract(aSeed * 7.13 + uTime * (0.05 + aSeed * 0.08));
    vLife = life;
    vec3 p = position;
    // rise from the emitter, widening into a cone
    p.y = -1.08 + life * 2.1;
    p.x *= 0.25 + life * 0.9;
    p.z *= 0.25 + life * 0.9;
    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_PointSize = (1.4 + aSeed * 2.2) * uPixelRatio * (3.2 / -mv.z);
    gl_Position = projectionMatrix * mv;
  }
`;

const particleFragment = /* glsl */ `
  uniform vec3 uMint;
  uniform vec3 uRose;
  varying float vSeed;
  varying float vLife;
  void main() {
    float d = length(gl_PointCoord - 0.5);
    float a = smoothstep(0.5, 0.0, d) * sin(vLife * 3.14159) * 0.55;
    vec3 c = mix(uMint, uRose, step(0.72, vSeed));
    gl_FragColor = vec4(c * a, a);
  }
`;

export interface HoloOptions {
  photo: string;
  depth: string;
  /** Coarse pointer: drift on its own instead of following the pointer. */
  autoSway: boolean;
  onReady?: () => void;
}

export function mountHolo(container: HTMLElement, opts: HoloOptions): () => void {
  const renderer = new WebGLRenderer({ alpha: true, antialias: false, powerPreference: 'low-power' });
  const pixelRatio = Math.min(window.devicePixelRatio, 2);
  renderer.setPixelRatio(pixelRatio);
  renderer.setClearColor(0x000000, 0);
  const canvas = renderer.domElement;
  canvas.className = 'holo-stage__canvas';
  canvas.setAttribute('aria-hidden', 'true');
  container.appendChild(canvas);

  const scene = new Scene();
  const camera = new PerspectiveCamera(32, 1, 0.1, 20);
  camera.position.set(0, 0.05, 4.2);

  const loader = new TextureLoader();
  const map = loader.load(opts.photo);
  map.colorSpace = SRGBColorSpace;
  map.minFilter = LinearFilter;
  const depth = loader.load(opts.depth);

  const holoUniforms = {
    uMap: { value: map },
    uDepth: { value: depth },
    uTime: { value: 0 },
    uGlitch: { value: 0 },
    uReveal: { value: 0 },
    uMint: { value: MINT },
    uRose: { value: ROSE },
  };
  const figure = new Mesh(
    new PlaneGeometry(2.1, 2.1, 160, 160),
    new ShaderMaterial({
      uniforms: holoUniforms,
      vertexShader: holoVertex,
      fragmentShader: holoFragment,
      transparent: true,
      depthWrite: false,
      premultipliedAlpha: true,
    })
  );

  // particle cone
  const count = 520;
  const positions = new Float32Array(count * 3);
  const seeds = new Float32Array(count);
  for (let i = 0; i < count; i++) {
    const r = Math.sqrt(Math.random());
    const t = Math.random() * Math.PI * 2;
    positions[i * 3] = Math.cos(t) * r;
    positions[i * 3 + 1] = 0;
    positions[i * 3 + 2] = Math.sin(t) * r * 0.5;
    seeds[i] = Math.random();
  }
  const pGeo = new BufferGeometry();
  pGeo.setAttribute('position', new BufferAttribute(positions, 3));
  pGeo.setAttribute('aSeed', new BufferAttribute(seeds, 1));
  const pUniforms = { uTime: { value: 0 }, uPixelRatio: { value: pixelRatio }, uMint: { value: MINT }, uRose: { value: ROSE } };
  const particles = new Points(
    pGeo,
    new ShaderMaterial({
      uniforms: pUniforms,
      vertexShader: particleVertex,
      fragmentShader: particleFragment,
      transparent: true,
      depthWrite: false,
      blending: AdditiveBlending,
    })
  );

  const rig = new Group();
  rig.add(particles, figure);
  scene.add(rig);

  // sizing
  const resize = () => {
    const { width, height } = container.getBoundingClientRect();
    if (!width || !height) return;
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  };
  const ro = new ResizeObserver(resize);
  ro.observe(container);
  resize();

  // pointer (read from window; the canvas never takes events)
  const target = { x: 0, y: 0 };
  const onPointer = (e: PointerEvent) => {
    target.x = (e.clientX / window.innerWidth) * 2 - 1;
    target.y = (e.clientY / window.innerHeight) * 2 - 1;
  };
  if (!opts.autoSway) window.addEventListener('pointermove', onPointer, { passive: true });

  // run only while visible
  let visible = true;
  const io = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    if (visible) loop();
  });
  io.observe(container);
  const onVisibility = () => {
    if (!document.hidden) loop();
  };
  document.addEventListener('visibilitychange', onVisibility);

  let raf = 0;
  let running = false;
  let last = performance.now();
  let time = 0;
  let nextGlitch = 2.5;
  let glitchUntil = 0;
  let ready = false;

  const frame = (now: number) => {
    if (!visible || document.hidden) {
      running = false;
      return;
    }
    const dt = Math.min((now - last) / 1000, 0.05);
    last = now;
    time += dt;

    // materialise over ~1.4 s
    holoUniforms.uReveal.value = Math.min(holoUniforms.uReveal.value + dt / 1.4, 1);

    // occasional glitch bursts
    if (time > nextGlitch) {
      glitchUntil = time + 0.12 + Math.random() * 0.12;
      nextGlitch = time + 3 + Math.random() * 4;
    }
    const glitchTarget = time < glitchUntil ? 1 : 0;
    holoUniforms.uGlitch.value += (glitchTarget - holoUniforms.uGlitch.value) * 0.5;

    const tx = opts.autoSway ? Math.sin(time * 0.35) * 0.6 : target.x;
    const ty = opts.autoSway ? Math.sin(time * 0.23) * 0.25 : target.y;
    rig.rotation.y += (tx * 0.32 - rig.rotation.y) * 0.06;
    rig.rotation.x += (ty * 0.14 - rig.rotation.x) * 0.06;
    figure.position.y = Math.sin(time * 0.9) * 0.015;

    holoUniforms.uTime.value = time;
    pUniforms.uTime.value = time;
    renderer.render(scene, camera);

    if (!ready) {
      ready = true;
      opts.onReady?.();
    }
    raf = requestAnimationFrame(frame);
  };
  function loop() {
    if (running) return;
    running = true;
    last = performance.now();
    raf = requestAnimationFrame(frame);
  }
  loop();

  return () => {
    cancelAnimationFrame(raf);
    io.disconnect();
    ro.disconnect();
    window.removeEventListener('pointermove', onPointer);
    document.removeEventListener('visibilitychange', onVisibility);
    figure.geometry.dispose();
    (figure.material as ShaderMaterial).dispose();
    pGeo.dispose();
    (particles.material as ShaderMaterial).dispose();
    map.dispose();
    depth.dispose();
    renderer.dispose();
    canvas.remove();
  };
}
