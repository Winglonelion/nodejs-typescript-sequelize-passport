import {Sequelize} from 'sequelize';
import config from 'config'
import { CONFIGS } from 'constants/config';
import User from './User'


const opt =
  process.env.NODE_ENV === "test"
    ? { logging: false }
    : { logging: console.log, timezone: "UTC" };
const sequelize = new Sequelize(CONFIGS.DB.URI, opt);

export default sequelize

