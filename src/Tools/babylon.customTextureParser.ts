module BABYLON.Internals {
    /*
     * Helper interface to pass class constructor into functions.
     * Engine is really just a way to get the WebGLRenderingContext we are using
     */
    export interface CustomTextureParserConstructor {
        new (engine: Engine, arrayBuffer: any): CustomTextureParser;
    }

    /*
     * Implement this interface and pass into createTexture to parse custom texture files
     */
    export interface CustomTextureParser {
        target : number;
        level : number;
        internalFormat : number;
        height : number;
        width : number;
        depth : number;
        border : number;
        format : number;
        type : number;
        src : any;
        /*
         * Parse arrayBuffer and call *texImage*D using this data.
         * It is assumed that the texture has already been created & is currently bound
         */
        upload: () => void;
    }
} 
