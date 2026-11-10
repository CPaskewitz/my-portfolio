/**
 * True when WebGL runs on a real GPU. `failIfMajorPerformanceCaveat` makes the browser
 * refuse a context it would have to emulate in software (no GPU, blocklisted driver,
 * headless test browsers); the renderer-name check catches the rest.
 * (Same check as corvianlabs.com app/lib/gpu.ts.)
 */
export function hasHardwareWebGL(): boolean {
  try {
    const canvas = document.createElement('canvas');
    const gl = (canvas.getContext('webgl2', { failIfMajorPerformanceCaveat: true }) ??
      canvas.getContext('webgl', { failIfMajorPerformanceCaveat: true })) as WebGLRenderingContext | null;
    if (!gl) return false;
    const ext = gl.getExtension('WEBGL_debug_renderer_info');
    const name = String(ext ? gl.getParameter(ext.UNMASKED_RENDERER_WEBGL) : gl.getParameter(gl.RENDERER));
    gl.getExtension('WEBGL_lose_context')?.loseContext();
    return !/swiftshader|llvmpipe|softpipe|software|basic render/i.test(name);
  } catch {
    return false;
  }
}

/** Run `fn` after the page has loaded and the browser is idle (or 1.5 s after load, whichever is first). */
export function afterLoadAndIdle(fn: () => void): () => void {
  let idleId: number | undefined;
  let timeoutId: ReturnType<typeof setTimeout> | undefined;
  let done = false;
  const run = () => {
    if (done) return;
    done = true;
    fn();
  };
  const schedule = () => {
    if ('requestIdleCallback' in window) idleId = window.requestIdleCallback(run, { timeout: 2500 });
    timeoutId = setTimeout(run, 1500);
  };
  if (document.readyState === 'complete') schedule();
  else window.addEventListener('load', schedule, { once: true });
  return () => {
    done = true;
    window.removeEventListener('load', schedule);
    if (idleId !== undefined && 'cancelIdleCallback' in window) window.cancelIdleCallback(idleId);
    if (timeoutId !== undefined) clearTimeout(timeoutId);
  };
}
