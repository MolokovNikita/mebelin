const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const TokenService = require("./token.js");
const RefreshSessionRepository = require("../repositories/refreshSession.js");
const UserRepository = require("../repositories/user.js");
const ACCESS_TOKEN_EXPIRATION = 18e5;

class AuthService {
  static async signIn({ email, pass }) {
    const userData = await UserRepository.getClientData(email);
    if (!userData) {
      throw new Error("Неверный email или пароль");
    }
    const isPasswordValid = bcrypt.compareSync(pass, userData.password);
    if (!isPasswordValid) {
      throw new Error("Неверный email или пароль");
    }
    const payload = { access: "client", id: userData.id_client, email };
    const accessToken = await TokenService.generateAccessToken(payload);
    const refreshToken = await TokenService.generateRefreshToken(payload);

    await RefreshSessionRepository.createRefreshSession({
      id: userData.id_client,
      refreshToken,
    });
    return {
      accessToken,
      refreshToken,
      accessTokenExpiration: ACCESS_TOKEN_EXPIRATION,
      id: userData.id_client,
      name_client: userData.name_client,
      surname_client: userData.surname_client,
      patronymic_client: userData.patronymic_client,
      email: userData.email,
      phone_number: userData.phone,
    };
  }

  static async signUp({ f_name, pass, email }) {
    try{
        const userData = await UserRepository.getClientData(email);
    if (userData) {
      throw new Error("Пользователь с таким email уже существует");
    }
    const hashedPassword = bcrypt.hashSync(pass, 8);
    const { id_client } = await UserRepository.createClient({
      f_name,
      hashedPassword,
      email,
    });
    const payload = { access: "client", email, id: id_client };
    const accessToken = await TokenService.generateAccessToken(payload);
    const refreshToken = await TokenService.generateRefreshToken(payload);
    await RefreshSessionRepository.createRefreshSession({
        id: id_client,
      refreshToken,
    });
    return {
      accessToken,
      refreshToken,
      accessTokenExpiration: ACCESS_TOKEN_EXPIRATION,
      id: id_client,
      f_name,
      email,
    };
    }
    catch(e){
        console.log(e);
        throw new Error(e);
    }
  }

  static async logOut(refreshToken) {
    await RefreshSessionRepository.deleteRefreshSession(refreshToken);
  }

  static async refresh({ currentRefreshToken }) {
    if (!currentRefreshToken) {
      throw new Error("Unauthorized");
    }
    const refreshSession =
      await RefreshSessionRepository.getRefreshSession(currentRefreshToken);

    if (!refreshSession) {
      throw new Error("Unauthorized");
    }

    await RefreshSessionRepository.deleteRefreshSession(currentRefreshToken);
    let payload;
    try {
      payload = await TokenService.verifyRefreshToken(currentRefreshToken);
    } catch (error) {
      throw new Error(error);
    }

    const { id_client, name_client, surname_client,patronymic_client, email, phone } =
      await UserRepository.getClientData(payload.email);
      const clientData = await UserRepository.getClientData(payload.email);

    const actualPayload = { access: "client", email, id:id_client };
    const accessToken = await TokenService.generateAccessToken(actualPayload);
    const refreshToken = await TokenService.generateRefreshToken(actualPayload);

    await RefreshSessionRepository.createRefreshSession({
      id:id_client,
      refreshToken,
    });
    return {
        ...clientData,
      accessToken,
      refreshToken,
      accessTokenExpiration: ACCESS_TOKEN_EXPIRATION,
      id: id_client,
      name_client,
      surname_client,
      patronymic_client,
      email,
      phone_number: phone,
    };
  }
}

module.exports = AuthService;
