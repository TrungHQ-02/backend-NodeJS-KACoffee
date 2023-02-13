import userService from "../services/userService";

let handleUserLogin = async (req, res) => {
    let phone = req.body.phone;
    let user_password = req.body.user_password;
    if (!phone || !user_password) {
        return res.status(500).json({
            code: 1,
            message: 'Missing required parameters'
        })
    }

    let userData = await userService.handleLogin(phone, user_password);
    return res.status(200).json({
        code: userData.code,
        message: userData.message,
        user: userData.user ? userData.user : {}
    })
}

let handleCreateNewUser = async (req, res) => {
    let msg = await userService.createNewUSer(req.body);
    return res.status(200).json({
        msg
    })
}
let handleDeleteUser = async (req, res) => {
    if (!req.body.id) return res.status(200).json({
        code: 1,
        message: 'Missing required parameters'
    })

    let msg = await userService.deleteUser(req.body.id);
    return res.status(200).json({
        msg
    })
}

let handleEditUserInfoByPhone = async (req, res) => {
    if (!req.body.phone) return res.status(200).json({
        code: 1,
        message: 'Missing required parameters'
    })
    let data = req.body;
    let message = await userService.editUserInfoByPhone(data);
    return res.status(200).json({
        message
    })
}

let handleGetAllUsers = async (req, res) => {
    let users = await userService.getAllUsers();

    return res.status(200).json({
        code: 0,
        message: 'OK',
        users: users
    })
}

let handleGetUserById = async (req, res) => {
    let id = req.body.id;
    if (!id) {
        return res.status(200).json({
            code: 1,
            message: 'Missing required parameters'
        })
    }

    let user = await userService.getUserById(id);

    if (user) {
        return res.status(200).json({
            code: 0,
            message: 'OK',
            user: user
        })
    } else {
        return res.status(200).json({
            code: 2,
            message: 'user with input id not exist'
        })
    }
}

let handleGetUserByPhone = async (req, res) => {
    let phone = req.body.phone;
    if (!phone) {
        return res.status(200).json({
            code: 1,
            message: 'Missing required parameters'
        })
    }

    let user = await userService.getUserByPhone(phone);
    if (user) {
        return res.status(200).json({
            code: 0,
            message: 'OK',
            user: user
        })
    } else {
        return res.status(200).json({
            code: 2,
            message: 'user with input phone not exist'
        })
    }
}

let handleGetAllUsersByRole = async (req, res) => {
    let role = req.body.role;
    if (!role) {
        return res.status(200).json({
            code: 1,
            message: 'Missing required parameters'
        })
    }

    let users = await userService.getAllUsersByRole(role);

    if (users) {
        return res.status(200).json({
            code: 0,
            message: 'OK',
            users: users
        })
    } else {
        return res.status(200).json({
            code: 2,
            message: 'role with input id not exist'
        })
    }
}

module.exports = {
    handleUserLogin: handleUserLogin,
    handleCreateNewUser: handleCreateNewUser,
    handleDeleteUser: handleDeleteUser,
    handleEditUserInfoByPhone: handleEditUserInfoByPhone,
    handleGetAllUsers: handleGetAllUsers,
    handleGetUserById: handleGetUserById,
    handleGetUserByPhone: handleGetUserByPhone,
    handleGetAllUsersByRole: handleGetAllUsersByRole
}