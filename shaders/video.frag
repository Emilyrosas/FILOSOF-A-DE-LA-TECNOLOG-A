#ifdef GL_ES
precision mediump float;
#endif
// coordenadas de textura que nos manda el vertex shader
varying vec2 vTexCoord;
// textura de video que viene desde p5.js
uniform sampler2D u_videoTex;
void main() {
  // leer el color del video en las coordenadas de textura
  vec4 texColor = texture2D(u_videoTex, vTexCoord);
  // aquí podrías hacer efectos, por ejemplo escala de grises, invertir, etc.
  // por ahora solo lo mostramos tal cual:
  gl_FragColor = texColor;
}