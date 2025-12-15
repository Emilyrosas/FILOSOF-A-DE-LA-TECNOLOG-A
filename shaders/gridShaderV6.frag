// Fragment Shader for P5.js - Improved Fragmented Video Effect

precision mediump float;
uniform sampler2D texturaA;  // Video texture
uniform sampler2D texturaB;
uniform float fragmentSize;  // Size of the fragments
uniform float fragmentAngle;  // Rot of the fragments
uniform float mixAmount;
uniform vec2 resolution;  // Canvas resolution
varying vec2 vTexCoord;

// Random function to create variation
float random(vec2 p) {
    return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
}

float randomF() {
    vec2 p = gl_FragCoord.xy;
    return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
}

// vec3 invertColor(vec3 color) {
//     return vec3(0.5) - color;
// }

vec4 invertColor(vec4 color) {
    return vec4(vec3(1.0) - color.rgb, color.a);
}

void main() {
    // Calculate fragment size based on uniform
    vec2 fragCoord = vTexCoord * resolution;
    vec2 fragmentOffset = mod(fragCoord, fragmentSize);

    // Calculate the top-left corner of the current fragment
    vec2 fragmentOrigin = fragCoord - fragmentOffset;

    // Generate random shifts for position, scale, and rotation
    float randShift = 0.0; //random(fragmentOrigin);
    float randScale = 0.5; //random(fragmentOffset); //0.5; //mix(0.8, 1.2, random(fragmentOrigin + vec2(0.5)));
    float randAngle = fragmentAngle; //random(fragmentOrigin + vec2(1.0)) * 6.28318; //random(fragmentOffset); //0.5; //random(fragmentOrigin + vec2(1.0)) * 6.28318;

    // Translate to fragment center
    vec2 center = fragmentOrigin + fragmentSize * 0.5;
    vec2 pos = fragCoord - center;

    // Rotate and scale to avoid edge artifacts
    float s = sin(randAngle);
    float c = cos(randAngle);
    pos = vec2(c * pos.x - s * pos.y, s * pos.x + c * pos.y) * randScale;

    // Avoid edge lines by normalizing the texture coordinates correctly
    vec2 shiftedCoord = (pos + center) / resolution;

    //tex0 = invertColor(color) 
    // Fetch color from video texture with clamped coordinates
    
    vec4 colorA = texture2D(texturaA, clamp(shiftedCoord, vec2(0.0), vec2(1.0)));
    vec4 colorB = texture2D(texturaB, clamp(shiftedCoord, vec2(0.0), vec2(1.0)));
    vec4 mixedColor = mix(colorA, colorB, mixAmount);
    // vec4 color = texture2D(mixedColor, clamp(shiftedCoord, vec2(0.0), vec2(1.0)));
    // vec4 color = texture2D(tex0, clamp(shiftedCoord, vec2(0.0), vec2(1.0)));
    //vec4 color2 = invertColor(color) 
    // gl_FragColor = invertColor(color*1.5) ;
    gl_FragColor = (mixedColor*1.0) ;
}
