// this is the fragment (or pixel) shader

precision mediump float;
    // sets the precision for floating point computation

// The object that fetches data from texture.
// Must be set outside the shader.
uniform sampler2D textureSampler;
uniform sampler2D normalSampler;

// Color of pixel
// uniform vec4 uPixelColor;
uniform vec3 uCameraPos;
uniform vec3 uLightPos;

uniform float uIntensity;

// The "varying" keyword is for signifying that the texture coordinate will be
// interpolated and thus varies. 
varying vec2 vTexCoord;
varying vec3 vFragPos;

vec3 lightColor = vec3(1.0, 1.0, 1.0);
vec3 normalZero = vec3(0.5, 0.5, 0.5);

void main(void)  {
    vec4 textureColor = texture2D(textureSampler, vec2(vTexCoord.s, vTexCoord.t));
    vec3 normal = vec3(texture2D(normalSampler, vec2(vTexCoord.s, vTexCoord.t)));
    normal = normalize(normal - normalZero);
    
    vec4 result = textureColor;
    if (textureColor.a > 0.9) {
        vec3 lightIncident = normalize(vFragPos - uLightPos);
        vec3 lightReflect = reflect(lightIncident, normal);

        vec3 ambient = uIntensity * lightColor;
        vec3 diffuse = max(0.0, dot(normal, normalize(uLightPos - vFragPos))) * lightColor;
        vec3 specular = max(0.0, dot(normalize(uCameraPos - vFragPos), lightReflect)) * max(0.0, dot(normalize(uCameraPos - vFragPos), lightReflect)) * 0.5 * lightColor;
        result = vec4((ambient + diffuse) * vec3(result), 1.0);
    }
    
    gl_FragColor = result;
}
