import db from "../models/index";
import bcrypt from 'bcryptjs';

const salt = bcrypt.genSaltSync(5);

let handleLogin = (phone, user_password) => {
    return new Promise(async (resolve, reject) => {
        let data = {};
        let checkUserExist = await checkUserPhone(phone);
        if (checkUserExist) {
            let user = await db.User.findOne({
                where: {
                    phone: phone,
                }, raw: true
            });

            if (user) {
                let checkPassword = bcrypt.compareSync(user_password, user.user_password);
                if (checkPassword) {
                    data.code = 0;
                    data.message = 'OK';
                    delete user.user_password;
                    data.user = user;
                } else {
                    data.code = 3;
                    data.message = 'Wrong password';
                }
            } else {
                data.code = 2;
                data.message = 'Your account does not exist'
            }
        } else {
            data.code = 2;
            data.message = 'Your account does not exist'
        }

        resolve(data);
    })
}

let checkUserPhone = (phone) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: {
                    phone: phone
                }, raw: true
            })

            if (user) {
                resolve(true);
            } else {
                resolve(false);
            }
        } catch (error) {
            reject(error);
        }
    })
}

let hashPassword = (user_password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashedPassword = await bcrypt.hashSync(user_password, salt);
            resolve(hashedPassword);
        } catch (error) {
            reject(error);
        }
    })
}

let createNewUSer = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let check = await checkUserPhone(data.phone);
            if (check == true) {
                resolve({
                    code: 1,
                    message: 'Phone has been used'
                })
            } else {
                let user_password = await hashPassword(data.user_password);
                await db.User.create({
                    // user field
                    // user_id: DataTypes.INTEGER,
                    // phone: DataTypes.STRING,
                    // user_name: DataTypes.STRING,
                    // email: DataTypes.STRING,
                    // user_password: DataTypes.STRING,
                    // birthday: DataTypes.DATE,
                    // gender: DataTypes.BOOLEAN,
                    // role: DataTypes.INTEGER,
                    // cart: DataTypes.STRING
                    phone: data.phone,
                    user_name: data.user_name,
                    email: data.email,
                    user_password: user_password,
                    birthday: data.birthday,
                    gender: data.gender === '1' ? true : false,
                    role: data.role,
                    cart: data.cart
                })
                resolve({
                    code: 0,
                    message: "Successfully created"
                });
            }

        } catch (error) {
            reject(error);
        }
    })
}

let deleteUser = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userToDelete = await db.User.findOne({
                where: { id: id }
            })

            if (userToDelete) {
                await db.User.destroy({
                    where: { id: id }
                })
                resolve({
                    code: 0,
                    message: "Successfully deleted"
                })
            } else {
                resolve({
                    code: 1,
                    message: "User not exist"
                })
            }
        } catch (error) {
            reject(error);
        }
    })
}

let editUserInfoByPhone = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { phone: data.phone },
                raw: false
            })

            // user field
            // user_id: DataTypes.INTEGER,
            // phone: DataTypes.STRING,
            // user_name: DataTypes.STRING,
            // email: DataTypes.STRING,
            // user_password: DataTypes.STRING,
            // birthday: DataTypes.DATE,
            // gender: DataTypes.BOOLEAN,
            // role: DataTypes.INTEGER,
            // cart: DataTypes.STRING

            if (user) {
                user.user_name = data.user_name;
                user.email = data.email;
                user.birthday = data.birthday;
                user.gender = data.gender === 1 ? true : false;
                user.cart = data.cart;

                await user.save();

                resolve({
                    code: 0,
                    message: 'Successfully updated'
                })
            } else {
                resolve({
                    code: 2,
                    message: 'phone not found'
                })
            }
        } catch (error) {
            reject(error);
        }
    })
}
let getAllUsers = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = '';
            users = await db.User.findAll({
                attributes: {
                    exclude: ['user_password']
                },
                raw: true
            });

            resolve(users);
        } catch (error) {
            reject(error);
        }
    })
}

let getUserById = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = '';
            if (id) {
                user = await db.User.findOne({
                    where: {
                        id: id
                    },
                    attributes: {
                        exclude: ['user_password']
                    },
                    raw: true
                })

                resolve(user);
            }
        } catch (error) {
            reject(error);
        }
    })
}

let getUserByPhone = (phone) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = '';
            if (phone) {
                user = await db.User.findOne({
                    where: {
                        phone: phone
                    },
                    attributes: {
                        exclude: ['user_password']
                    },
                    raw: true
                })

                resolve(user);
            }
        } catch (error) {
            reject(error);
        }
    })
}

let getAllUsersByRole = (role) => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = '';
            if (role) {
                users = await db.User.findAll({
                    where: {
                        role: role
                    },
                    attributes: {
                        exclude: ['user_password']
                    },
                    raw: true
                })

                resolve(users);
            }
        } catch (error) {
            reject(error);
        }
    })
}

module.exports = {
    handleLogin: handleLogin,
    createNewUSer: createNewUSer,
    deleteUser: deleteUser,
    editUserInfoByPhone: editUserInfoByPhone,
    getAllUsers: getAllUsers,
    getUserById: getUserById,
    getUserByPhone: getUserByPhone,
    getAllUsersByRole: getAllUsersByRole
}