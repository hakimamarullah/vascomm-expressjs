const User = require("../models/user")
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")
exports.createUser = (req, res) => {
    const {username, email, password, role = 'USER'} = req.body || {};

    User.create({
        username,
        email,
        password: bcrypt.hashSync(password, 8),
        role: role.trim()
    }).then(r => {
        const {password, ...others} = r.dataValues;
        return res.status(201).json({code: 201, message: "register successful", data: others})
    }).catch(err => {
        return res.status(500).json({code: 500, message: err.message, data: undefined})
    })
}


exports.signIn = (req, res) => {
    const {username, password} = req.body;

    User.findOne({
        where: {
            username: username
        }
    })
        .then(user => {
            if (!user) {
                return res.status(404).json({code: 404, message: "User not found", data: undefined});
            }


            let passwordIsValid = bcrypt.compareSync(password, user.password);
            if (!passwordIsValid) {
                return res.status(401).json({
                    token: null,
                    message: "Invalid password!"
                });
            }

            const token = jwt.sign({ id: user.id, role: user.role, username: user.username }, "secret", {
                expiresIn: 86400
            });

            return res.status(200).json({code: 200, message: "User fetched successfully", data: {token}});
        })
        .catch(err => {
            return res.status(500).json({code: 500, message: err.message, data: undefined});
        });
};

exports.updateUser = (req, res) => {
    const {id} = req.params;
    const {username, email, password, role, enabled, pictureUrl} = req.body || {};

    User.findByPk(id)
        .then(user => {
            if (!user) {
                return res.status(404).json({code: 404, message: "User not found", data: undefined});
            }
            return user.update({
                username: username || user.username,
                email: email || user.email,
                password: password ? encryptAES(password) : user.password,
                role: role || user.role,
                enabled: typeof enabled === 'boolean' ? enabled : user.enabled,
                pictureUrl: pictureUrl || user.pictureUrl
            });
        })
        .then(updatedUser => {
            const {password, ...others} = updatedUser.dataValues;
            return res.status(200).json({code: 200, message: "User updated successfully", data: others});
        })
        .catch(err => {
            return res.status(500).json({code: 500, message: err.message, data: undefined});
        });
};

exports.deleteUserById = (req, res) => {
    const {id} = req.params;

    User.findByPk(id)
        .then(user => {
            if (!user) {
                return res.status(404).json({code: 404, message: "User not found", data: undefined});
            }
            return user.update({enabled: false});
        })
        .then(() => {
            return res.status(200).json({
                code: 200,
                message: "User deleted (soft delete) successfully",
                data: undefined
            });
        })
        .catch(err => {
            return res.status(500).json({code: 500, message: err.message, data: undefined});
        });
};

