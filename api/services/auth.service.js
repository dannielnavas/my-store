const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');

const { config } = require('./../../config/config');
const UserServices = require('./user.service');

const service = new UserServices();

class AuthServices {
  async getUser(email, password) {
    const user = await service.findByEmail(email);
    if (!user) {
      throw boom.unauthorized();
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw boom.unauthorized();
    }
    delete user.dataValues.password;
    return user;
  }

  signToken(user) {
    const payload = {
      sub: user.id,
      role: user.role,
    };
    const token = jwt.sign(payload, config.jwtSecret);
    return {
      user,
      token,
    };
  }

  async sendEmil(email) {
    const user = await service.findByEmail(email);
    if (!user) {
      throw boom.unauthorized();
    }
    let transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      secure: true, // true for 465, false for other ports
      port: 465,
      auth: {
        user: 'dannielnavas@gmail.com',
        pass: '',
      },
    });
    await transporter.sendMail({
      from: 'dannielnavas@gmail.com', // sender address
      to: user.email,
      subject: 'Este es un nuevo correo', // Subject line
      text: `Hola ${user.name}`, // plain text body
      html: `<b>Hola ${user.name}</b>`, // html body
    });
    return { message: 'Email enviado' };
  }
}

module.exports = AuthServices;
