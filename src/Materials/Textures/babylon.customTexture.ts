/// <reference path="babylon.texture.ts" />

module BABYLON {
    export class CustomTexture extends Texture {
        constructor(name: string, scene: Scene, width: number, height: number, depth: number | undefined, generateMipMaps: boolean = false, samplingMode: number = Texture.TRILINEAR_SAMPLINGMODE) {
            super(null, scene, !generateMipMaps, undefined, samplingMode);
            this.name = name;

            this.wrapU = Texture.CLAMP_ADDRESSMODE;
            this.wrapV = Texture.CLAMP_ADDRESSMODE;

            this._texture = this.getScene().getEngine().createCustomTexture(width, height, depth, generateMipMaps, this._samplingMode);
        }

        public resize(width: number, height: number, depth?: number): void {
            this.releaseInternalTexture();
            this._texture = this.getScene().getEngine().createCustomTexture(width, height, depth, !this.noMipmap, this._samplingMode);
        }
    }
}
