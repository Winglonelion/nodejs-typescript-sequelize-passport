import { Optional, Sequelize } from "sequelize/types";
import { Model, DataTypes } from "sequelize"
import bcrpyt from "bcrypt";
import sequelize from './sequelize'

const saltRounds = 10;



// These are all the attributes in the User model
interface UserAttributes {
  id: number;
  email: string;

  encrypted_password?: string;
  verified?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

interface UserCreationAttributes extends Optional<UserAttributes, "id"> {

}


export default class User extends Model<UserAttributes, UserCreationAttributes>  implements UserAttributes {

  public id!: number;

  public email!: string;
  public first_name?: string;

  public last_name?: string;

  public encrypted_password?: string;

  public verified?: boolean;

  public createdAt?: Date;

  public updatedAt?: Date;




  static initial(sequelize: Sequelize) {
     User.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          validate: {
            len: [1, 12]
          }
        },
        email: {
          type: DataTypes.STRING,
          unique: true,
          validate: {
            isEmail: true,
          },
        },
        encrypted_password: {
          type: DataTypes.STRING,
          allowNull: true,
          defaultValue: '',
        },
        verified: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
        createdAt: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: () => {return new Date()}
        },
        updatedAt: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: () => {return new Date()}
        },
      },
      {
        modelName: "user",
        sequelize,
      }
    );

    User.sync()
  }


  async validatePassword(password: string) {
    if (!password) return false;
    const stored_pw = this.getDataValue("encrypted_password") ?? '';
    return await bcrpyt.compare(password, stored_pw);
  }

  async setPassword(newPassword: string) {
    const encrypted_password = await bcrpyt.hash(newPassword, saltRounds);
    await this.setDataValue("encrypted_password", encrypted_password);
    await this.save();
  }
}


User.initial(sequelize)
