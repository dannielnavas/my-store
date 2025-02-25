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

  async sendRecoveryPassword(email) {
    const user = await service.findByEmail(email);
    if (!user) {
      throw boom.unauthorized();
    }

    const payload = {
      sub: user.id,
    };

    const token = jwt.sign(payload, config.jwtSecret, {
      expiresIn: '15m',
    }); // el secreto pude cambiar y este si expira en 15 minutos

    const link = `http:localhost:3000/recovery?token=${token}`;

    await service.update(user.id, { recoveryToken: token });

    const mail = {
      from: config.smtpUser, // sender address
      to: user.email,
      subject: 'Email para recuperar contraseña', // Subject line
      text: `Hola ${user.name}`, // plain text body
      html: `<b>Ingresa en este link = ${link} </b>`, // html body
    };

    return await this.sendEmil(mail);
  }

  async sendEmil(infoMail) {
    let transporter = nodemailer.createTransport({
      host: config.smtpHost,
      secure: true, // true for 465, false for other ports
      port: config.smtpPort,
      auth: {
        user: config.smtpUser,
        pass: config.smtpPassword,
      },
    });
    await transporter.sendMail(infoMail);
    return { message: 'Email enviado' };
  }
}

module.exports = AuthServices;
