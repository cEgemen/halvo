import type { NextFunction, Request, Response } from "express";

const register = async (req: Request, res: Response, next: NextFunction) => {
    const {body} = req;
    return res.json({success: true, message: "Kayıt başarılı"})
};

const login = async (req: Request, res: Response, next: NextFunction) => {

};

const refresh = async (req: Request, res: Response, next: NextFunction) => {

};

const logout = async (req: Request, res: Response, next: NextFunction) => {

};

export {
   register,
   login,
   refresh,
   logout
}