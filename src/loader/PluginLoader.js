import json from '@rollup/plugin-json';

const s_CONFLICT_PACKAGES = ['@rollup/plugin-json'];
const s_PACKAGE_NAME = '@typhonjs-oclif-rollup/plugin-json';

/**
 * Handles interfacing with the plugin manager adding event bindings to pass back a configured
 * instance of `@rollup/plugin-json`.
 */
export default class PluginLoader
{
   /**
    * Returns the any modules that cause a conflict.
    *
    * @returns {string[]} An array of conflicting packages.
    */
   static get conflictPackages() { return s_CONFLICT_PACKAGES; }

   /**
    * Returns the `package.json` module name.
    *
    * @returns {string} Package name.
    */
   static get packageName() { return s_PACKAGE_NAME; }

   /**
    * Returns the configured input plugin for `@rollup/plugin-json`.
    *
    * @returns {object} Rollup plugin
    */
   static getInputPlugin()
   {
      return json();
   }

   /**
    * Wires up PluginLoader on the plugin eventbus.
    *
    * @param {object} ev - PluginInvokeEvent - The plugin event.
    *
    * @see https://www.npmjs.com/package/@typhonjs-plugin/manager
    *
    * @ignore
    */
   static async onPluginLoad(ev)
   {
      ev.eventbus.on('typhonjs:oclif:bundle:plugins:main:input:get', PluginLoader.getInputPlugin, PluginLoader);
   }
}
