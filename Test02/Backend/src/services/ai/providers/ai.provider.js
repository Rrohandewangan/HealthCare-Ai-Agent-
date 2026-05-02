/**
 * AIProvider — abstract interface. All providers must implement `complete`.
 * Implementations should be model/vendor-agnostic from the caller's perspective.
 */
export class AIProvider {
  /**
   * @param {{system:string, messages:Array<{role:string,content:string}>, schema?:object, signal?:AbortSignal}} _input
   * @returns {Promise<{content:string, usage?:object, model?:string}>}
   */
  // eslint-disable-next-line no-unused-vars
  async complete(_input) {
    throw new Error("AIProvider.complete not implemented");
  }
}
