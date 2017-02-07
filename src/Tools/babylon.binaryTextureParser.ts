module BABYLON.Internals {
    export class BinaryTextureParser implements CustomTextureParser {
        /**
         * @param {ArrayBuffer} binary data as an array buffer
         * @param {height} binary data as an array buffer
         * @param {width} binary data as an array buffer
         * @param {depth} binary data as an array buffer
         * @param {type} binary data as an array buffer
         */
        public constructor (public arrayBuffer : any, public height : number, public width: number, public depth: number, public type: number) {
            this.height = 128;
            this.width = 128;
            this.depth = undefined;
        }

        public upload(gl: WebGLRenderingContext) {
          console.log("uploading!!!");
          let target : number = (this.depth === undefined) ? gl.TEXTURE_2D : gl.TEXTURE_3D;
          let level : number = 0;
          let internalFormat : number = gl.R8UI;
          let width : number = this.width;
          let height : number = this.height;
          let depth : number = this.depth;
          let border : number = 0;
          let format : number = gl.RED_INTEGER;
          let type : number = gl.UNSIGNED_BYTE;
          let src : ArrayBufferView = new Uint8Array(this.arrayBuffer)
          
          gl.texImage2D(target, level, internalFormat, width, height, border, format, type, src);
          //gl.texImage2D(target, 0, internalFormat, width, height, 0, internalFormat, gl.UNSIGNED_BYTE, data);
          //gl.texImage2D(target, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, document.getElementById('sumimg'));
        }

    }
} 
