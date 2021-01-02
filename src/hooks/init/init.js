const json = require('@rollup/plugin-json');

/**
 * Handles interfacing with the plugin manager adding event bindings to pass back a configured
 * instance of `@rollup/plugin-json`.
 */
class PluginHandler
{
   /**
    * Returns the configured input plugin for `@rollup/plugin-json`
    *
    * @returns {object} Rollup plugin
    */
   static getInputPlugin()
   {
      return json();
   }

   /**
    * Wires up PluginHandler on the plugin eventbus.
    *
    * @param {PluginEvent} ev - The plugin event.
    *
    * @see https://www.npmjs.com/package/typhonjs-plugin-manager
    *
    * @ignore
    */
   static onPluginLoad(ev)
   {
      ev.eventbus.on('typhonjs:oclif:bundle:plugins:main:input:get', PluginHandler.getInputPlugin, PluginHandler);
   }
}

/**
 * Oclif init hook to add PluginHandler to plugin manager.
 *
 * @param {object} opts - options of the CLI action.
 *
 * @returns {Promise<void>}
 */
module.exports = async function(opts)
{
   try
   {
      global.$$pluginManager.add({ name: '@typhonjs-node-rollup/plugin-json', instance: PluginHandler });

      // TODO REMOVE
      process.stdout.write(`plugin-json init hook running ${opts.id}\n`);
   }
   catch (error)
   {
      this.error(error);
   }
};
