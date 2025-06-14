import{r as ve,j as me}from"./index-D8IPMQpI.js";function je({SIM_RESOLUTION:V=128,DYE_RESOLUTION:H=1440,CAPTURE_RESOLUTION:W=512,DENSITY_DISSIPATION:k=3.5,VELOCITY_DISSIPATION:K=2,PRESSURE:j=.1,PRESSURE_ITERATIONS:q=20,CURL:J=3,SPLAT_RADIUS:Q=.2,SPLAT_FORCE:Z=6e3,SHADING:$=!0,COLOR_UPDATE_SPEED:ee=10,BACK_COLOR:te={r:.5,g:0,b:0},TRANSPARENT:re=!0}){const ie=ve.useRef(null);return ve.useEffect(()=>{const l=ie.current;if(!l)return;function de(){this.id=-1,this.texcoordX=0,this.texcoordY=0,this.prevTexcoordX=0,this.prevTexcoordY=0,this.deltaX=0,this.deltaY=0,this.down=!1,this.moved=!1,this.color=[0,0,0]}let v={SIM_RESOLUTION:V,DYE_RESOLUTION:H,CAPTURE_RESOLUTION:W,DENSITY_DISSIPATION:k,VELOCITY_DISSIPATION:K,PRESSURE:j,PRESSURE_ITERATIONS:q,CURL:J,SPLAT_RADIUS:Q,SPLAT_FORCE:Z,SHADING:$,COLOR_UPDATE_SPEED:ee,PAUSED:!1,BACK_COLOR:te,TRANSPARENT:re},R=[new de];const{gl:t,ext:E}=he(l);E.supportLinearFiltering||(v.DYE_RESOLUTION=256,v.SHADING=!1);function he(e){const r={alpha:!0,depth:!1,stencil:!1,antialias:!1,preserveDrawingBuffer:!1};let i=e.getContext("webgl2",r);const o=!!i;o||(i=e.getContext("webgl",r)||e.getContext("experimental-webgl",r));let a,n;o?(i.getExtension("EXT_color_buffer_float"),n=i.getExtension("OES_texture_float_linear")):(a=i.getExtension("OES_texture_half_float"),n=i.getExtension("OES_texture_half_float_linear")),i.clearColor(0,0,0,1);const u=o?i.HALF_FLOAT:a&&a.HALF_FLOAT_OES;let f,s,T;return o?(f=S(i,i.RGBA16F,i.RGBA,u),s=S(i,i.RG16F,i.RG,u),T=S(i,i.R16F,i.RED,u)):(f=S(i,i.RGBA,i.RGBA,u),s=S(i,i.RGBA,i.RGBA,u),T=S(i,i.RGBA,i.RGBA,u)),{gl:i,ext:{formatRGBA:f,formatRG:s,formatR:T,halfFloatTexType:u,supportLinearFiltering:n}}}function S(e,r,i,o){if(!xe(e,r,i,o))switch(r){case e.R16F:return S(e,e.RG16F,e.RG,o);case e.RG16F:return S(e,e.RGBA16F,e.RGBA,o);default:return null}return{internalFormat:r,format:i}}function xe(e,r,i,o){const a=e.createTexture();e.bindTexture(e.TEXTURE_2D,a),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.NEAREST),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.NEAREST),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE),e.texImage2D(e.TEXTURE_2D,0,r,4,4,0,i,o,null);const n=e.createFramebuffer();return e.bindFramebuffer(e.FRAMEBUFFER,n),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,a,0),e.checkFramebufferStatus(e.FRAMEBUFFER)===e.FRAMEBUFFER_COMPLETE}class ge{constructor(r,i){this.vertexShader=r,this.fragmentShaderSource=i,this.programs=[],this.activeProgram=null,this.uniforms=[]}setKeywords(r){let i=0;for(let a=0;a<r.length;a++)i+=ke(r[a]);let o=this.programs[i];if(o==null){let a=x(t.FRAGMENT_SHADER,this.fragmentShaderSource,r);o=oe(this.vertexShader,a),this.programs[i]=o}o!==this.activeProgram&&(this.uniforms=ae(o),this.activeProgram=o)}bind(){t.useProgram(this.activeProgram)}}class D{constructor(r,i){this.uniforms={},this.program=oe(r,i),this.uniforms=ae(this.program)}bind(){t.useProgram(this.program)}}function oe(e,r){let i=t.createProgram();return t.attachShader(i,e),t.attachShader(i,r),t.linkProgram(i),t.getProgramParameter(i,t.LINK_STATUS)||console.trace(t.getProgramInfoLog(i)),i}function ae(e){let r=[],i=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let o=0;o<i;o++){let a=t.getActiveUniform(e,o).name;r[a]=t.getUniformLocation(e,a)}return r}function x(e,r,i){r=pe(r,i);const o=t.createShader(e);return t.shaderSource(o,r),t.compileShader(o),t.getShaderParameter(o,t.COMPILE_STATUS)||console.trace(t.getShaderInfoLog(o)),o}function pe(e,r){if(!r)return e;let i="";return r.forEach(o=>{i+="#define "+o+`
`}),i+e}const p=x(t.VERTEX_SHADER,`
        precision highp float;
        attribute vec2 aPosition;
        varying vec2 vUv;
        varying vec2 vL;
        varying vec2 vR;
        varying vec2 vT;
        varying vec2 vB;
        uniform vec2 texelSize;

        void main () {
            vUv = aPosition * 0.5 + 0.5;
            vL = vUv - vec2(texelSize.x, 0.0);
            vR = vUv + vec2(texelSize.x, 0.0);
            vT = vUv + vec2(0.0, texelSize.y);
            vB = vUv - vec2(0.0, texelSize.y);
            gl_Position = vec4(aPosition, 0.0, 1.0);
        }
      `),Te=x(t.FRAGMENT_SHADER,`
        precision mediump float;
        precision mediump sampler2D;
        varying highp vec2 vUv;
        uniform sampler2D uTexture;

        void main () {
            gl_FragColor = texture2D(uTexture, vUv);
        }
      `),Re=x(t.FRAGMENT_SHADER,`
        precision mediump float;
        precision mediump sampler2D;
        varying highp vec2 vUv;
        uniform sampler2D uTexture;
        uniform float value;

        void main () {
            gl_FragColor = value * texture2D(uTexture, vUv);
        }
     `),Ee=`
      precision highp float;
      precision highp sampler2D;
      varying vec2 vUv;
      varying vec2 vL;
      varying vec2 vR;
      varying vec2 vT;
      varying vec2 vB;
      uniform sampler2D uTexture;
      uniform sampler2D uDithering;
      uniform vec2 ditherScale;
      uniform vec2 texelSize;

      vec3 linearToGamma (vec3 color) {
          color = max(color, vec3(0));
          return max(1.055 * pow(color, vec3(0.416666667)) - 0.055, vec3(0));
      }

      void main () {
          vec3 c = texture2D(uTexture, vUv).rgb;
          #ifdef SHADING
              vec3 lc = texture2D(uTexture, vL).rgb;
              vec3 rc = texture2D(uTexture, vR).rgb;
              vec3 tc = texture2D(uTexture, vT).rgb;
              vec3 bc = texture2D(uTexture, vB).rgb;

              float dx = length(rc) - length(lc);
              float dy = length(tc) - length(bc);

              vec3 n = normalize(vec3(dx, dy, length(texelSize)));
              vec3 l = vec3(0.0, 0.0, 1.0);

              float diffuse = clamp(dot(n, l) + 0.7, 0.7, 1.0);
              c *= diffuse;
          #endif

          float a = max(c.r, max(c.g, c.b));
          gl_FragColor = vec4(c, a);
      }
    `,De=x(t.FRAGMENT_SHADER,`
        precision highp float;
        precision highp sampler2D;
        varying vec2 vUv;
        uniform sampler2D uTarget;
        uniform float aspectRatio;
        uniform vec3 color;
        uniform vec2 point;
        uniform float radius;

        void main () {
            vec2 p = vUv - point.xy;
            p.x *= aspectRatio;
            vec3 splat = exp(-dot(p, p) / radius) * color;
            vec3 base = texture2D(uTarget, vUv).xyz;
            gl_FragColor = vec4(base + splat, 1.0);
        }
      `),Se=x(t.FRAGMENT_SHADER,`
        precision highp float;
        precision highp sampler2D;
        varying vec2 vUv;
        uniform sampler2D uVelocity;
        uniform sampler2D uSource;
        uniform vec2 texelSize;
        uniform vec2 dyeTexelSize;
        uniform float dt;
        uniform float dissipation;

        vec4 bilerp (sampler2D sam, vec2 uv, vec2 tsize) {
            vec2 st = uv / tsize - 0.5;
            vec2 iuv = floor(st);
            vec2 fuv = fract(st);

            vec4 a = texture2D(sam, (iuv + vec2(0.5, 0.5)) * tsize);
            vec4 b = texture2D(sam, (iuv + vec2(1.5, 0.5)) * tsize);
            vec4 c = texture2D(sam, (iuv + vec2(0.5, 1.5)) * tsize);
            vec4 d = texture2D(sam, (iuv + vec2(1.5, 1.5)) * tsize);

            return mix(mix(a, b, fuv.x), mix(c, d, fuv.x), fuv.y);
        }

        void main () {
            #ifdef MANUAL_FILTERING
                vec2 coord = vUv - dt * bilerp(uVelocity, vUv, texelSize).xy * texelSize;
                vec4 result = bilerp(uSource, coord, dyeTexelSize);
            #else
                vec2 coord = vUv - dt * texture2D(uVelocity, vUv).xy * texelSize;
                vec4 result = texture2D(uSource, coord);
            #endif
            float decay = 1.0 + dissipation * dt;
            gl_FragColor = result / decay;
        }
      `,E.supportLinearFiltering?null:["MANUAL_FILTERING"]),ye=x(t.FRAGMENT_SHADER,`
        precision mediump float;
        precision mediump sampler2D;
        varying highp vec2 vUv;
        varying highp vec2 vL;
        varying highp vec2 vR;
        varying highp vec2 vT;
        varying highp vec2 vB;
        uniform sampler2D uVelocity;

        void main () {
            float L = texture2D(uVelocity, vL).x;
            float R = texture2D(uVelocity, vR).x;
            float T = texture2D(uVelocity, vT).y;
            float B = texture2D(uVelocity, vB).y;

            vec2 C = texture2D(uVelocity, vUv).xy;
            if (vL.x < 0.0) { L = -C.x; }
            if (vR.x > 1.0) { R = -C.x; }
            if (vT.y > 1.0) { T = -C.y; }
            if (vB.y < 0.0) { B = -C.y; }

            float div = 0.5 * (R - L + T - B);
            gl_FragColor = vec4(div, 0.0, 0.0, 1.0);
        }
      `),Fe=x(t.FRAGMENT_SHADER,`
        precision mediump float;
        precision mediump sampler2D;
        varying highp vec2 vUv;
        varying highp vec2 vL;
        varying highp vec2 vR;
        varying highp vec2 vT;
        varying highp vec2 vB;
        uniform sampler2D uVelocity;

        void main () {
            float L = texture2D(uVelocity, vL).y;
            float R = texture2D(uVelocity, vR).y;
            float T = texture2D(uVelocity, vT).x;
            float B = texture2D(uVelocity, vB).x;
            float vorticity = R - L - T + B;
            gl_FragColor = vec4(0.5 * vorticity, 0.0, 0.0, 1.0);
        }
      `),_e=x(t.FRAGMENT_SHADER,`
        precision highp float;
        precision highp sampler2D;
        varying vec2 vUv;
        varying vec2 vL;
        varying vec2 vR;
        varying vec2 vT;
        varying vec2 vB;
        uniform sampler2D uVelocity;
        uniform sampler2D uCurl;
        uniform float curl;
        uniform float dt;

        void main () {
            float L = texture2D(uCurl, vL).x;
            float R = texture2D(uCurl, vR).x;
            float T = texture2D(uCurl, vT).x;
            float B = texture2D(uCurl, vB).x;
            float C = texture2D(uCurl, vUv).x;

            vec2 force = 0.5 * vec2(abs(T) - abs(B), abs(R) - abs(L));
            force /= length(force) + 0.0001;
            force *= curl * C;
            force.y *= -1.0;

            vec2 velocity = texture2D(uVelocity, vUv).xy;
            velocity += force * dt;
            velocity = min(max(velocity, -1000.0), 1000.0);
            gl_FragColor = vec4(velocity, 0.0, 1.0);
        }
      `),Ae=x(t.FRAGMENT_SHADER,`
        precision mediump float;
        precision mediump sampler2D;
        varying highp vec2 vUv;
        varying highp vec2 vL;
        varying highp vec2 vR;
        varying highp vec2 vT;
        varying highp vec2 vB;
        uniform sampler2D uPressure;
        uniform sampler2D uDivergence;

        void main () {
            float L = texture2D(uPressure, vL).x;
            float R = texture2D(uPressure, vR).x;
            float T = texture2D(uPressure, vT).x;
            float B = texture2D(uPressure, vB).x;
            float C = texture2D(uPressure, vUv).x;
            float divergence = texture2D(uDivergence, vUv).x;
            float pressure = (L + R + B + T - divergence) * 0.25;
            gl_FragColor = vec4(pressure, 0.0, 0.0, 1.0);
        }
      `),be=x(t.FRAGMENT_SHADER,`
        precision mediump float;
        precision mediump sampler2D;
        varying highp vec2 vUv;
        varying highp vec2 vL;
        varying highp vec2 vR;
        varying highp vec2 vT;
        varying highp vec2 vB;
        uniform sampler2D uPressure;
        uniform sampler2D uVelocity;

        void main () {
            float L = texture2D(uPressure, vL).x;
            float R = texture2D(uPressure, vR).x;
            float T = texture2D(uPressure, vT).x;
            float B = texture2D(uPressure, vB).x;
            vec2 velocity = texture2D(uVelocity, vUv).xy;
            velocity.xy -= vec2(R - L, T - B);
            gl_FragColor = vec4(velocity, 0.0, 1.0);
        }
      `),h=(t.bindBuffer(t.ARRAY_BUFFER,t.createBuffer()),t.bufferData(t.ARRAY_BUFFER,new Float32Array([-1,-1,-1,1,1,1,1,-1]),t.STATIC_DRAW),t.bindBuffer(t.ELEMENT_ARRAY_BUFFER,t.createBuffer()),t.bufferData(t.ELEMENT_ARRAY_BUFFER,new Uint16Array([0,1,2,0,2,3]),t.STATIC_DRAW),t.vertexAttribPointer(0,2,t.FLOAT,!1,0,0),t.enableVertexAttribArray(0),(e,r=!1)=>{e==null?(t.viewport(0,0,t.drawingBufferWidth,t.drawingBufferHeight),t.bindFramebuffer(t.FRAMEBUFFER,null)):(t.viewport(0,0,e.width,e.height),t.bindFramebuffer(t.FRAMEBUFFER,e.fbo)),r&&(t.clearColor(0,0,0,1),t.clear(t.COLOR_BUFFER_BIT)),t.drawElements(t.TRIANGLES,6,t.UNSIGNED_SHORT,0)});let d,c,z,C,y;const ne=new D(p,Te),M=new D(p,Re),F=new D(p,De),g=new D(p,Se),G=new D(p,ye),Y=new D(p,Fe),A=new D(p,_e),w=new D(p,Ae),U=new D(p,be),L=new ge(p,Ee);function ue(){let e=fe(v.SIM_RESOLUTION),r=fe(v.DYE_RESOLUTION);const i=E.halfFloatTexType,o=E.formatRGBA,a=E.formatRG,n=E.formatR,u=E.supportLinearFiltering?t.LINEAR:t.NEAREST;t.disable(t.BLEND),d?d=ce(d,r.width,r.height,o.internalFormat,o.format,i,u):d=N(r.width,r.height,o.internalFormat,o.format,i,u),c?c=ce(c,e.width,e.height,a.internalFormat,a.format,i,u):c=N(e.width,e.height,a.internalFormat,a.format,i,u),z=b(e.width,e.height,n.internalFormat,n.format,i,t.NEAREST),C=b(e.width,e.height,n.internalFormat,n.format,i,t.NEAREST),y=N(e.width,e.height,n.internalFormat,n.format,i,t.NEAREST)}function b(e,r,i,o,a,n){t.activeTexture(t.TEXTURE0);let u=t.createTexture();t.bindTexture(t.TEXTURE_2D,u),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,n),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MAG_FILTER,n),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_S,t.CLAMP_TO_EDGE),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_T,t.CLAMP_TO_EDGE),t.texImage2D(t.TEXTURE_2D,0,i,e,r,0,o,a,null);let f=t.createFramebuffer();t.bindFramebuffer(t.FRAMEBUFFER,f),t.framebufferTexture2D(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,u,0),t.viewport(0,0,e,r),t.clear(t.COLOR_BUFFER_BIT);let s=1/e,T=1/r;return{texture:u,fbo:f,width:e,height:r,texelSizeX:s,texelSizeY:T,attach(_){return t.activeTexture(t.TEXTURE0+_),t.bindTexture(t.TEXTURE_2D,u),_}}}function N(e,r,i,o,a,n){let u=b(e,r,i,o,a,n),f=b(e,r,i,o,a,n);return{width:e,height:r,texelSizeX:u.texelSizeX,texelSizeY:u.texelSizeY,get read(){return u},set read(s){u=s},get write(){return f},set write(s){f=s},swap(){let s=u;u=f,f=s}}}function we(e,r,i,o,a,n,u){let f=b(r,i,o,a,n,u);return ne.bind(),t.uniform1i(ne.uniforms.uTexture,e.attach(0)),h(f),f}function ce(e,r,i,o,a,n,u){return e.width===r&&e.height===i||(e.read=we(e.read,r,i,o,a,n,u),e.write=b(r,i,o,a,n,u),e.width=r,e.height=i,e.texelSizeX=1/r,e.texelSizeY=1/i),e}function Ue(){let e=[];v.SHADING&&e.push("SHADING"),L.setKeywords(e)}Ue(),ue();let le=Date.now(),B=0;function P(){const e=Le();Be()&&ue(),Pe(e),Xe(),ze(e),Ce(null),requestAnimationFrame(P)}function Le(){let e=Date.now(),r=(e-le)/1e3;return r=Math.min(r,.016666),le=e,r}function Be(){let e=m(l.clientWidth),r=m(l.clientHeight);return l.width!==e||l.height!==r?(l.width=e,l.height=r,!0):!1}function Pe(e){B+=e*v.COLOR_UPDATE_SPEED,B>=1&&(B=We(B,0,1),R.forEach(r=>{r.color=X()}))}function Xe(){R.forEach(e=>{e.moved&&(e.moved=!1,Ge(e))})}function ze(e){t.disable(t.BLEND),Y.bind(),t.uniform2f(Y.uniforms.texelSize,c.texelSizeX,c.texelSizeY),t.uniform1i(Y.uniforms.uVelocity,c.read.attach(0)),h(C),A.bind(),t.uniform2f(A.uniforms.texelSize,c.texelSizeX,c.texelSizeY),t.uniform1i(A.uniforms.uVelocity,c.read.attach(0)),t.uniform1i(A.uniforms.uCurl,C.attach(1)),t.uniform1f(A.uniforms.curl,v.CURL),t.uniform1f(A.uniforms.dt,e),h(c.write),c.swap(),G.bind(),t.uniform2f(G.uniforms.texelSize,c.texelSizeX,c.texelSizeY),t.uniform1i(G.uniforms.uVelocity,c.read.attach(0)),h(z),M.bind(),t.uniform1i(M.uniforms.uTexture,y.read.attach(0)),t.uniform1f(M.uniforms.value,v.PRESSURE),h(y.write),y.swap(),w.bind(),t.uniform2f(w.uniforms.texelSize,c.texelSizeX,c.texelSizeY),t.uniform1i(w.uniforms.uDivergence,z.attach(0));for(let i=0;i<v.PRESSURE_ITERATIONS;i++)t.uniform1i(w.uniforms.uPressure,y.read.attach(1)),h(y.write),y.swap();U.bind(),t.uniform2f(U.uniforms.texelSize,c.texelSizeX,c.texelSizeY),t.uniform1i(U.uniforms.uPressure,y.read.attach(0)),t.uniform1i(U.uniforms.uVelocity,c.read.attach(1)),h(c.write),c.swap(),g.bind(),t.uniform2f(g.uniforms.texelSize,c.texelSizeX,c.texelSizeY),E.supportLinearFiltering||t.uniform2f(g.uniforms.dyeTexelSize,c.texelSizeX,c.texelSizeY);let r=c.read.attach(0);t.uniform1i(g.uniforms.uVelocity,r),t.uniform1i(g.uniforms.uSource,r),t.uniform1f(g.uniforms.dt,e),t.uniform1f(g.uniforms.dissipation,v.VELOCITY_DISSIPATION),h(c.write),c.swap(),E.supportLinearFiltering||t.uniform2f(g.uniforms.dyeTexelSize,d.texelSizeX,d.texelSizeY),t.uniform1i(g.uniforms.uVelocity,c.read.attach(0)),t.uniform1i(g.uniforms.uSource,d.read.attach(1)),t.uniform1f(g.uniforms.dissipation,v.DENSITY_DISSIPATION),h(d.write),d.swap()}function Ce(e){t.blendFunc(t.ONE,t.ONE_MINUS_SRC_ALPHA),t.enable(t.BLEND),Me(e)}function Me(e){let r=t.drawingBufferWidth,i=t.drawingBufferHeight;L.bind(),v.SHADING&&t.uniform2f(L.uniforms.texelSize,1/r,1/i),t.uniform1i(L.uniforms.uTexture,d.read.attach(0)),h(e)}function Ge(e){let r=e.deltaX*v.SPLAT_FORCE,i=e.deltaY*v.SPLAT_FORCE;se(e.texcoordX,e.texcoordY,r,i,e.color)}function Ye(e){const r=X();r.r*=10,r.g*=10,r.b*=10;let i=10*(Math.random()-.5),o=30*(Math.random()-.5);se(e.texcoordX,e.texcoordY,i,o,r)}function se(e,r,i,o,a){F.bind(),t.uniform1i(F.uniforms.uTarget,c.read.attach(0)),t.uniform1f(F.uniforms.aspectRatio,l.width/l.height),t.uniform2f(F.uniforms.point,e,r),t.uniform3f(F.uniforms.color,i,o,0),t.uniform1f(F.uniforms.radius,Ne(v.SPLAT_RADIUS/100)),h(c.write),c.swap(),t.uniform1i(F.uniforms.uTarget,d.read.attach(0)),t.uniform3f(F.uniforms.color,a.r,a.g,a.b),h(d.write),d.swap()}function Ne(e){let r=l.width/l.height;return r>1&&(e*=r),e}function I(e,r,i,o){e.id=r,e.down=!0,e.moved=!1,e.texcoordX=i/l.width,e.texcoordY=1-o/l.height,e.prevTexcoordX=e.texcoordX,e.prevTexcoordY=e.texcoordY,e.deltaX=0,e.deltaY=0,e.color=X()}function O(e,r,i,o){e.prevTexcoordX=e.texcoordX,e.prevTexcoordY=e.texcoordY,e.texcoordX=r/l.width,e.texcoordY=1-i/l.height,e.deltaX=Oe(e.texcoordX-e.prevTexcoordX),e.deltaY=Ve(e.texcoordY-e.prevTexcoordY),e.moved=Math.abs(e.deltaX)>0||Math.abs(e.deltaY)>0,e.color=o}function Ie(e){e.down=!1}function Oe(e){let r=l.width/l.height;return r<1&&(e*=r),e}function Ve(e){let r=l.width/l.height;return r>1&&(e/=r),e}function X(){let e=He(Math.random(),1,1);return e.r*=.15,e.g*=.15,e.b*=.15,e}function He(e,r,i){let o,a,n,u,f,s,T,_;switch(u=Math.floor(e*6),f=e*6-u,s=i*(1-r),T=i*(1-f*r),_=i*(1-(1-f)*r),u%6){case 0:o=i,a=_,n=s;break;case 1:o=T,a=i,n=s;break;case 2:o=s,a=i,n=_;break;case 3:o=s,a=T,n=i;break;case 4:o=_,a=s,n=i;break;case 5:o=i,a=s,n=T;break}return{r:o,g:a,b:n}}function We(e,r,i){const o=i-r;return(e-r)%o+r}function fe(e){let r=t.drawingBufferWidth/t.drawingBufferHeight;r<1&&(r=1/r);const i=Math.round(e),o=Math.round(e*r);return t.drawingBufferWidth>t.drawingBufferHeight?{width:o,height:i}:{width:i,height:o}}function m(e){const r=window.devicePixelRatio||1;return Math.floor(e*r)}function ke(e){if(e.length===0)return 0;let r=0;for(let i=0;i<e.length;i++)r=(r<<5)-r+e.charCodeAt(i),r|=0;return r}window.addEventListener("mousedown",e=>{let r=R[0],i=m(e.clientX),o=m(e.clientY);I(r,-1,i,o),Ye(r)}),document.body.addEventListener("mousemove",function e(r){let i=R[0],o=m(r.clientX),a=m(r.clientY),n=X();P(),O(i,o,a,n),document.body.removeEventListener("mousemove",e)}),window.addEventListener("mousemove",e=>{let r=R[0],i=m(e.clientX),o=m(e.clientY),a=r.color;O(r,i,o,a)}),document.body.addEventListener("touchstart",function e(r){const i=r.targetTouches;let o=R[0];for(let a=0;a<i.length;a++){let n=m(i[a].clientX),u=m(i[a].clientY);P(),I(o,i[a].identifier,n,u)}document.body.removeEventListener("touchstart",e)}),window.addEventListener("touchstart",e=>{const r=e.targetTouches;let i=R[0];for(let o=0;o<r.length;o++){let a=m(r[o].clientX),n=m(r[o].clientY);I(i,r[o].identifier,a,n)}}),window.addEventListener("touchmove",e=>{const r=e.targetTouches;let i=R[0];for(let o=0;o<r.length;o++){let a=m(r[o].clientX),n=m(r[o].clientY);O(i,a,n,i.color)}},!1),window.addEventListener("touchend",e=>{const r=e.changedTouches;let i=R[0];for(let o=0;o<r.length;o++)Ie(i)}),P()},[V,H,W,k,K,j,q,J,Q,Z,$,ee,te,re]),me.jsx("div",{className:"fixed top-0 left-0 z-50 pointer-events-none",children:me.jsx("canvas",{ref:ie,id:"fluid",className:"w-screen h-screen"})})}export{je as SplashCursor};
