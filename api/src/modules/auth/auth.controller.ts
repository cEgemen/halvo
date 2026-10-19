import type { NextFunction, Request, Response } from "express";
import authService from "./auth.service.js"

const register = async (req: Request, res: Response, next: NextFunction) => {
    const { body } = req;
    const result = await authService.register(body)
    return res.json({ success: true, message: "Register is success" })
};

const login = async (req: Request, res: Response, next: NextFunction) => {
    const { body } = req
    const result = await authService.login(body)
    return res.json({ success: true, message: "Login is success" })
};

const refresh = async (req: Request, res: Response, next: NextFunction) => {
    const { body } = req
    const result = await authService.refresh(body)
    return res.json({ success: true, message: "Refresh is success" })
};

const logout = async (req: Request, res: Response, next: NextFunction) => {
    const { refreshToken } = req.body
    await authService.logout(refreshToken)
    return res.json({ success: true, message: "Logout is success" })
};

export {
    register,
    login,
    refresh,
    logout
}