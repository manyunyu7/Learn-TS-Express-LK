import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";

class PasswordHash {

    public static hashPassword(password: string): Promise<string> {
        return bcrypt.hash(password, 10);
    }

    public static hash = (password: string): Promise<string> => {
        return bcrypt.hash(password, 10);
    }

    public static comparePassword(password: string, hashedPassword: string): Promise<boolean> {
        return bcrypt.compare(password, hashedPassword);
    }

    public static verifyToken(token: string): any | object {
        try {
            const secretKey: string = process.env.JWT_SECRET_KEY as string;

            const decoded: any = jwt.verify(token, secretKey);
            return decoded;
        } catch (error) {
            return null;
        }
    }

    public static generateToken(id: number, username: string, password: string): string {
        const secretKey: string = process.env.JWT_SECRET_KEY as string;

        const token: string = jwt.sign({ id, username, password }, secretKey, {
            expiresIn: "1d"
        });
        return token;
    }



}


export default PasswordHash;