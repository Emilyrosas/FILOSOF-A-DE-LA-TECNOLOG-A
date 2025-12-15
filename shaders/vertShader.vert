// attribute vec3 aPosition;
// varying vec2 vTexCoord;

// void main() {
//     vTexCoord = aPosition.xy * 0.5 + 0.5;
//     gl_Position = vec4(aPosition, 1.0);
// }

// our vertex data
attribute vec3 aPosition;
attribute vec2 aTexCoord;

// we need our texcoords again
varying vec2 vTexCoord;

void main() {
  // copy the texcoords
  //vTexCoord = aTexCoord;
  vTexCoord = vec2(aTexCoord.x, 1.0 - aTexCoord.y); // flip aquí

  // copy the position data into a vec4, using 1.0 as the w component
  vec4 positionVec4 = vec4(aPosition, 1.0);
  positionVec4.xy = positionVec4.xy * 2.0 - 1.0;

  // send the vertex information on to the fragment shader
  gl_Position = positionVec4;
}