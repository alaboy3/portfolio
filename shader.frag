#ifdef GL_ES
precision highp float;
#endif

uniform vec2 res; // values from the js

uniform float power;
uniform float angle;

vec3 toSpherical(vec3 v) {
  float r = sqrt(v.x * v.x + v.y * v.y + v.z * v.z); // x^2 + y^2 + z^2
  float theta = atan(sqrt(v.x * v.x + v.y * v.y), v.z); // glsl doesn't have an atan2 function, you just pass to args to the regular atan function to get the same result! arctan(sqrt(x^2+y^2) / z)
  float phi = atan(v.y, v.x); // arctan(y / x)
  return vec3(r, theta, phi);
}

// formula from http://celarek.at/wp/wp-content/uploads/2014/05/realTimeFractalsReport.pdf
float distEst(vec3 pos, float pow_, const int max_itr) {
  vec3 zeta = pos; // copy position inte zeta!
  float dr = 1.0; // magic variable
  float r = 0.0; // the radius
  
  for (int n = 0; n > -1; n++) { // using infinite for loop because while loops throw errors for sone reason
    if(n > max_itr) break; // limit num of intrs
    vec3 spherical = toSpherical(zeta); // convert to spherical coords
    r = spherical.x; // here x=r, y=theta, z=phi

    if (r > 2.0) {
      break;
    }
    
    dr = pow(r, pow_ - 1.0) * pow_ * dr + 1.0; // magic formula i don't fully understand

    float powx = pow(spherical.x, pow_) * sin(spherical.y * pow_) * cos(spherical.z * pow_);
    float powy = pow(spherical.x, pow_) * sin(spherical.y * pow_) * sin(spherical.z * pow_);
    float powz = pow(spherical.x, pow_) * cos(spherical.y * pow_); // raise everything to the power of pow_

    zeta.x = powx + pos.x; // update zeta
    zeta.y = powy + pos.y;
    zeta.z = powz + pos.z;
  }

  return 0.5 * log(r) * r / dr; // more magic to compute distance
}

mat3 rotY(float angle) { // this makes a rotation matrix around the y axis for a specific angle
  float s = sin(angle);
  float c = cos(angle);
  
  return mat3( // https://en.wikipedia.org/wiki/Rotation_matrix#Basic_rotations
    c, 0.0, -s,
    0.0, 1.0, 0.0,
    s, 0.0, c
  );
}

void main() {
    mat3 rot = rotY(angle); // calculate rotation matrix around y-axis!
  
    vec3 pos = vec3(gl_FragCoord.xy / res.xy, 1.0); // get the start pos
    pos.xy = pos.xy * 3.0 - 1.5; // set it between -1.5 and 1.5, using 1.5 instead of 1 to zoom out!
  
    pos = rot * pos; // apply rotation matrix to position
    vec3 forward = rot * vec3(0, 0, 1); // get rotated forward direction
  
    float dist_est = 1.0;
    float n = 0.0;
    float total_dist = 0.0;
  
    for(int i = 0; i > -1; i++) { // again, using infinite for loop because while loops throw errors for some reason on some devices
        if(!(dist_est > 0.001 && total_dist < 2.0)) break; // break if we have moved behind the bulb or if we are sufficiently close to it
        dist_est = distEst(pos, power, 10); // compute new distance estimate
        total_dist += dist_est;
        pos -= forward * dist_est; // move in the rotated forward direction
        n += 1.0;
    }
  
    if(n > 255.0) n = 255.0; // make sure n ranges between 0 and 255
    if(total_dist >= 2.0) n = 255.0; // if we got behind the bulb we set n to the largest possible amount
    float color = abs(n / 255.0 - 1.0); // normalize and invert n

    gl_FragColor = vec4(color, color, color, 1.0);
}