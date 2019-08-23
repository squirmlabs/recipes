// Configuration
import { $isLocal } from '../../config';

export default () => ($isLocal() ? 'cheap-module-source-map' : false);
