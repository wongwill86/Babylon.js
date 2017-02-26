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
        public constructor (public engine : Engine, arrayBuffer : any) {
            this.level = 0;
            this.internalFormat = this.engine._gl.R8UI;
            this.height = 32;
            this.width = 32;
            this.depth = undefined;
            this.border = 0;
            this.format = this.engine._gl.RED_INTEGER;
            this.type = this.engine._gl.UNSIGNED_BYTE;
            this.src = new Uint8Array(arrayBuffer);
        
            this.target = (this.depth === undefined) ? this.engine._gl.TEXTURE_2D : this.engine._gl.TEXTURE_3D;
        }

        public upload() {
          this.engine._gl.texImage2D(this.target,
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
