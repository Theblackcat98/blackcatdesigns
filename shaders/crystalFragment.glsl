uniform float uTime;
uniform vec2 uMouse;
uniform vec3 uAccentColor;
uniform vec3 uSecondaryColor;

varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vPosition;
varying vec3 vViewPosition;

void main() {
  vec3 normal = normalize(vNormal);
  vec3 viewDir = normalize(vViewPosition);

  // Fresnel effect for "eye glow"
  float fresnel = pow(1.0 - dot(viewDir, normal), 2.0);

  // Subtle internal animation
  float pulse = sin(uTime * 2.0) * 0.1 + 0.9;

  // Mix colors based on fresnel and pulse
  vec3 color = mix(vec3(0.1, 0.1, 0.1), uAccentColor, fresnel * 0.3);
  color = mix(color, uSecondaryColor, pulse * 0.1);

  // Edge enhancement
  float edge = pow(fresnel, 1.5) * 0.5;
  color += uAccentColor * edge;

  gl_FragColor = vec4(color, 0.9);
}