// Fragment Shader for P5.js - Improved Fragmented Video Effect

precision mediump float;
uniform sampler2D tex0;  // Video texture
uniform float fragmentSize;  // Size of the fragments
uniform vec2 resolution;  // Canvas resolution
varying vec2 vTexCoord;

// Random function to create variation
float random(vec2 p) {
    return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
}

void main() {
    // Calculate fragment size based on uniform
    vec2 fragCoord = vTexCoord * resolution;
    vec2 fragmentOffset = mod(fragCoord, fragmentSize);

    // Calculate the top-left corner of the current fragment
    vec2 fragmentOrigin = fragCoord - fragmentOffset;

    // Generate random shifts for position, scale, and rotation
    float randShift = random(fragmentOrigin);
    float randScale = mix(0.8, 1.2, random(fragmentOrigin + vec2(0.5)));
    float randAngle = random(fragmentOrigin + vec2(1.0)) * 6.28318;

    // Translate to fragment center
    vec2 center = fragmentOrigin + fragmentSize * 0.5;
    vec2 pos = fragCoord - center;

    // Rotate and scale to avoid edge artifacts
    float s = sin(randAngle);
    float c = cos(randAngle);
    pos = vec2(c * pos.x - s * pos.y, s * pos.x + c * pos.y) * randScale;

    // Avoid edge lines by normalizing the texture coordinates correctly
    //vec2 shiftedCoord = (pos + center) / resolution;
    vec2 shiftedCoord = vTexCoord + offset * randomShift * 0.00001;

    // Fetch color from video texture with clamped coordinates
    vec4 color = texture2D(tex0, clamp(shiftedCoord, vec2(0.0), vec2(1.0)));
    gl_FragColor = color;
}
