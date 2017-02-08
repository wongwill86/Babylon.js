module BABYLON.Internals {
    /*
     * Helper interface to pass class constructor into functions.
     * This constructor must set height/width/depth.
     */
    export interface CustomTextureParserConstructor {
        new (gl: WebGLRenderingContext, arrayBuffer: any): CustomTextureParser;
    }

    /*
     * Implement this interface and pass into creatTexture to parse custom texture files
     */
    export interface CustomTextureParser {
        gl : WebGLRenderingContext;

        target : number;
        level : 0;
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
