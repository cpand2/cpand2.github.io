"use strict";

import * as glSys from "../core/gl.js";
import TextureRenderable from "./texture_renderable.js";
import * as shaderResources from "../core/shader_resources.js";
import * as texture from "../resources/texture.js";

class NormalMapRenderable extends TextureRenderable {
  constructor(texture, normalMapTexture, lightSources = null) {
    super(texture);
    this.mNormalTexture = normalMapTexture;
    this.mLightSources = lightSources;

    super._setShader(shaderResources.getNormalMapShader());
  }

  draw(camera) {
    let gl = glSys.get();
    texture.activate(this.mTexture);
    texture.activate(this.mNormalTexture, glSys.get().TEXTURE1);

    this.mShader.activate(
      this.mColor,
      this.mXform.getTRSMatrix(),
      camera,
      this.mLightSources
    ); // always activate the shader first!
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
  }

  getNormalMapTexture() {
    return this.mSecondTexture;
  }

  getLightSources() {
    return this.mLightSources;
  }

  addLightSource(light) {
    if (this.mLightSources.length < 8) {
      this.mLightSources.push(light);
    }
  }
}

export default NormalMapRenderable;
