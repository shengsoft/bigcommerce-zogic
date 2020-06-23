import PageManager from './page-manager';
import haloProductsByCategory from './halothemes/halo-products-by-category';

export default class Home extends PageManager {
   loaded(next) {
 
      // HaloThemes functions
      haloProductsByCategory();
   }
}
