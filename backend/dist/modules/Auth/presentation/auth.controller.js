import ResponseHttp from "../../../app/http/response.http.js";
import AppError from "../../../shared/errors/AppError.js";
import BaseController from "../../../presentation/base.controller.js";
const COOKIE_OPTIONS = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: 'strict',
    maxAge: 7 * 24 * 60 * 60 * 1000,
    path: '/'
};
const REFRESH_TOKEN_COOKIE_NAME = "refreshToken";
export class AuthController extends BaseController {
    loginUseCase;
    refreshTokenUseCase;
    getProfileUseCase;
    logoutUseCase;
    constructor(loginUseCase, refreshTokenUseCase, getProfileUseCase, logoutUseCase) {
        super();
        this.loginUseCase = loginUseCase;
        this.refreshTokenUseCase = refreshTokenUseCase;
        this.getProfileUseCase = getProfileUseCase;
        this.logoutUseCase = logoutUseCase;
    }
    login = async (req, res, next) => {
        try {
            const { email, password } = req.body;
            const auditContext = this.getAuditContext(req, res);
            const { accessToken, refreshToken, user } = await this.loginUseCase.execute({ email, password }, auditContext);
            res.cookie(REFRESH_TOKEN_COOKIE_NAME, refreshToken, COOKIE_OPTIONS);
            return res.status(200).json(ResponseHttp.success("Login successful", { accessToken, user }));
        }
        catch (error) {
            next(error);
        }
    };
    logout = async (req, res, next) => {
        try {
            const userCtx = res.locals.user;
            const auditContext = this.getAuditContext(req, res);
            if (userCtx?.id) {
                await this.logoutUseCase.execute(userCtx.id, auditContext);
            }
            res.clearCookie(REFRESH_TOKEN_COOKIE_NAME, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: 'strict',
                path: '/'
            });
            return res.status(200).json(ResponseHttp.success("Logout successful", null));
        }
        catch (error) {
            next(error);
        }
    };
    refresh = async (req, res, next) => {
        try {
            const tokenReceived = req.cookies.refreshToken;
            if (!tokenReceived) {
                throw new AppError("You must log in again", "MISSING_COOKIE", 401);
            }
            const { accessToken, refreshToken, user } = await this.refreshTokenUseCase.execute(tokenReceived);
            res.cookie(REFRESH_TOKEN_COOKIE_NAME, refreshToken, COOKIE_OPTIONS);
            return res.status(200).json(ResponseHttp.success("Token renewed", { accessToken, user }));
        }
        catch (error) {
            next(error);
        }
    };
    getProfile = async (req, res, next) => {
        try {
            const userCtx = res.locals.user;
            if (!userCtx) {
                throw new AppError("Unauthenticated user", "UNAUTHORIZED", 401);
            }
            const profile = await this.getProfileUseCase.execute(userCtx.id);
            return res.status(200).json(ResponseHttp.success("Profile fetched", profile));
        }
        catch (error) {
            next(error);
        }
    };
}
//# sourceMappingURL=auth.controller.js.map