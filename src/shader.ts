export const vertexShader = `
    void main() {
        gl_Position = vec4(position, 1.0);
    }
`

export const fragmentShader = `
    uniform vec2 u_resolution;
    
    void main() {
        vec2 st = gl_FragCoord.xy / u_resolution;
        vec3 color = vec3(st.x, st.y, 0.5);
        gl_FragColor = vec4(color, 3.0);
    }
`
