import Vue from 'vue'
import { raport_to_bb } from '~/utils/helpers'

import 'core-js/fn/object/assign';
import 'core-js/fn/array/find';
import 'core-js/modules/es6.promise';
import 'core-js/modules/es6.array.iterator';
import 'core-js/modules/es6.array.find';
import closest from 'element-closest'

closest(window)

window.raport_to_bb = raport_to_bb;

export default ({ $axios }, inject) =>
{
	const bus = new Vue
	inject('bus', bus)
}