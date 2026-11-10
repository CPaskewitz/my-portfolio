"""
Build a pseudo depth map for the hero hologram from the portrait's alpha channel.

    python3 scripts/art/depth_from_alpha.py public/myImage.webp public/holo/depth.webp

Depth = a soft "inflation" of the silhouette (repeated blurs of the alpha mask, so the
middle of the body sits forward of the edges) plus an ellipsoid bump for the head and a
smaller one for the nose/glasses line. It only drives a small 2.5D parallax in the shader,
so it doesn't need to be anatomically exact. Needs numpy + Pillow.
"""
import sys

import numpy as np
from PIL import Image, ImageFilter

src, out = sys.argv[1], sys.argv[2]
size = 256

im = Image.open(src).convert("RGBA")
alpha = im.getchannel("A").resize((size, size), Image.LANCZOS)
a = np.asarray(alpha, dtype=np.float32) / 255.0

# Inflate the silhouette: sum of progressively wider blurs, masked by the silhouette.
inflate = np.zeros_like(a)
for radius, weight in ((2, 0.15), (6, 0.25), (12, 0.3), (24, 0.3)):
    blurred = np.asarray(alpha.filter(ImageFilter.GaussianBlur(radius)), dtype=np.float32) / 255.0
    inflate += blurred * weight
inflate *= a

yy, xx = np.mgrid[0:size, 0:size].astype(np.float32) / size


def ellipsoid(cx, cy, rx, ry):
    d = ((xx - cx) / rx) ** 2 + ((yy - cy) / ry) ** 2
    return np.sqrt(np.clip(1.0 - d, 0.0, 1.0))


# Head centre/size measured on the 600px portrait (face ~x 310, y 230).
head = ellipsoid(0.515, 0.38, 0.15, 0.21)
nose = ellipsoid(0.515, 0.40, 0.035, 0.08)

depth = 0.55 * inflate + 0.35 * head + 0.15 * nose
depth *= a
depth /= depth.max()

img = Image.fromarray((depth * 255).astype(np.uint8), "L").filter(ImageFilter.GaussianBlur(1.5))
img.save(out, "WEBP", quality=80)
print(f"wrote {out} ({img.size[0]}x{img.size[1]})")
