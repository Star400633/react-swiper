/**
 * Created by shemei
 * @flow
 */

import {Dispatcher} from 'flux';
import type {ImallActions} from '../actions/imall/ImallActions';

const dispatcher: Dispatcher<ImallActions> = new Dispatcher();

export default dispatcher