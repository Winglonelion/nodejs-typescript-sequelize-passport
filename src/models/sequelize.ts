import { Sequelize } from 'sequelize';
import { CONFIGS } from 'constants/config';

const opt =
  process.env.NODE_ENV === 'test' ? { logging: false } : { logging: console.log, timezone: 'UTC' };
const sequelize = new Sequelize(CONFIGS.DB.URI, opt);

export default sequelize;
