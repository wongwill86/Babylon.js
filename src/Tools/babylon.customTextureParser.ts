module BABYLON.Internals {
    export interface CustomTextureParserConstructor {
        new (arrayBuffer: any): CustomTextureParser;
    }

    export interface CustomTextureParser {
        height : number;
        width : number;
        depth : number;
        arrayBuffer: any;
        /**
         * It is assumed that the texture has already been created & is currently bound
         */
        upload: (gl: WebGLRenderingContext) => void;
    }
} 
