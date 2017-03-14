/// <reference path="babylon.texture.ts" />

module BABYLON {
    export interface CustomTextureOptions {
        width: number;
        height: number;
        depth?: number;
        level: number;
        internalFormat: number;
        format: number;
        type: number;
    }

    export interface CustomTextureOffsets {
        xoffset?: number;
        yoffset?: number;
        zoffset?: number;
    }

    export interface CustomTextureUpdateFunction {
        (src: any, gl: any, options: CustomTextureOptions,
         offsets: CustomTextureOffsets): void;
    }

    /*
     * Barebones Custom Babylon texture that is registered with the Babylon Engine.
     * Custom texture update functionality is exposed via the updateFunction.
     */
    export class CustomTexture extends Texture {
        public options: CustomTextureOptions;

        constructor(name: string, scene: Scene, generateMipMaps: boolean = false, samplingMode: number = Texture.TRILINEAR_SAMPLINGMODE, options: CustomTextureOptions) {
            super(null, scene, !generateMipMaps, undefined, samplingMode);
            this.name = name;
            this.wrapU = Texture.CLAMP_ADDRESSMODE;
            this.wrapV = Texture.CLAMP_ADDRESSMODE;

            this.options = options;
            this._texture = this.getScene().getEngine().createCustomTexture(!this.noMipmap, this._samplingMode, this.options);
        }

        public resize(width: number, height: number, depth?: number): void {
            this.releaseInternalTexture();
            this._texture = this.getScene().getEngine().createCustomTexture(!this.noMipmap, this._samplingMode, this.options);
        }

        public update(src: any, offsets: CustomTextureOffsets, updateFunction: CustomTextureUpdateFunction = CustomTexture.defaultUpdateFunction): void {
            this.getScene().getEngine().updateCustomTexture(this._texture, this.options, updateFunction, src, offsets);
        }

        public static defaultUpdateFunction(src: any, gl: WebGLRenderingContext, options: CustomTextureOptions, offsets: CustomTextureOffsets): void {
          if (offsets.xoffset && offsets.yoffset) {
            if (options.depth && offsets.zoffset) {
              gl.texSubImage3D(gl.TEXTURE_3D, options.level,
                               offsets.xoffset, offsets.yoffset, offsets.zoffset,
                               options.width, options.height, options.depth,
                               options.format, options.type, src);
            } else {
              gl.texSubImage2D(gl.TEXTURE_3D, options.level,
                               offsets.xoffset, offsets.yoffset,
                               options.width, options.height,
                               options.format, options.type, src);
            }
          } else {
            if (options.depth) {
              gl.texImage3D(gl.TEXTURE_3D, options.level, options.internalFormat,
                                 options.width, options.height, options.depth, 0,
                                 options.format, options.type, src);
            } else {
              gl.texImage2D(gl.TEXTURE_2D, options.level, options.internalFormat,
                                 options.width, options.height, 0,
                                 options.format, options.type, src);
            }
          }
        }
    }
}
