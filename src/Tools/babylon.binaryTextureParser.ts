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
        public level : number;
        public internalFormat : number;
        public border : number;
        public format : number;
        public type : number;
        public src : any;

        /**
         * @param {gl} WebGlRenderingContext to get glenums
         * @param {ArrayBuffer} Binary file to load as a texture
         * 
         * This function can parse the arrayBuffer for gl texture arguments.
         */
        public constructor (public gl : WebGLRenderingContext, arrayBuffer : any) {
            this.level = 0;
            this.internalFormat = gl.R8UI;
            this.height = 32;
            this.width = 32;
            this.depth = undefined;
            this.border = 0;
            this.format = gl.RED_INTEGER;
            this.type = gl.UNSIGNED_BYTE;
            this.src = new Uint8Array(arrayBuffer);
        
            this.target = (this.depth === undefined) ? gl.TEXTURE_2D : gl.TEXTURE_3D;
        }

        public upload() {
          this.gl.texImage2D(this.target,
                             this.level,
                             this.internalFormat,
                             this.width,
                             this.height,
                             this.border,
                             this.format,
                             this.type,
                             this.src);
        }

    }
} 
