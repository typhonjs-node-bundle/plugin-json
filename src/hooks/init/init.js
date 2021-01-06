const PluginLoader = require('../../loader/PluginLoader');

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
      global.$$pluginManager.add({ name: '@typhonjs-node-rollup/plugin-json', instance: PluginLoader });

      global.$$eventbus.trigger('log:debug', `plugin-json init hook running '${opts.id}'.`);
   }
   catch (error)
   {
      this.error(error);
   }
};
