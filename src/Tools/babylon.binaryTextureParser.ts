module BABYLON.Internals {
    /*
     * Simple example class for static 32x32 textures.
     * 
     */
    export class BinaryTextureParser implements CustomTextureParser {
        public height : number;
        public width : number;
        public depth : number;

        public target : number;
        public level : 0;
        public internalFormat : number;
        public border : number;
        public format : number;
        public type : number;
        public src : any;

        /**
         * @param {gl} WebGlRenderingContext to get glenums
         * @param {ArrayBuffer} Binary file to load as a texture
         */
        public constructor (public gl : WebGLRenderingContext, arrayBuffer : any,) {
            this.target = (this.depth === undefined) ? gl.TEXTURE_2D : gl.TEXTURE_3D;
            this.level = 0;
            this.internalFormat = gl.RGBA;
            this.height = 32;
            this.width = 32;
            this.depth = undefined;
            this.border = 0;
            this.format = gl.RED;
            this.type = gl.UNSIGNED_BYTE;
            this.src = new Uint8Array(arrayBuffer)
        }

        public upload() {
          console.log("uploading!!!");
          
          this.gl.texImage2D(this.target,
                       this.level,
                       this.internalFormat,
                       this.width,
                       this.height,
                       this.border,
                       this.internalFormat,
                       this.type,
                       this.src);
          //gl.texImage2D(target, 0, internalFormat, width, height, 0, internalFormat, gl.UNSIGNED_BYTE, data);
          //gl.texImage2D(target, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, document.getElementById('sumimg'));
        }

    }
} 
