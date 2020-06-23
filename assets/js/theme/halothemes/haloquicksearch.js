import Hooks from '@bigcommerce/stencil-utils/src/hooks';
import Base from '@bigcommerce/stencil-utils/src/api/base';


export default class HaloQuickSearch extends Base
{
    /**
     * @Constructor
     */
    constructor(version) {
        // call parent
        super(version);

        // set up class variables
        this.endpoint = '/search.php?search_query=';
    }

    /**
     * Get search results
     * @param {String} query
     * @param {Object} params
     * @param {Function} callback
     */
    search(query, category, params, callback) {
        
        if(category == "")
            var url = this.endpoint + encodeURIComponent(query);
        else
            var url = this.endpoint + encodeURIComponent(query) + '&category=' + encodeURIComponent(category);
        let paramsArg = params;
        let callbackArg = callback;

        if (typeof paramsArg === 'function') {
            callbackArg = paramsArg;
            paramsArg = {};
        }

        Hooks.emit('search-quick-remote', query);
        this.makeRequest(url, 'GET', paramsArg, false, callbackArg);
    }
}
