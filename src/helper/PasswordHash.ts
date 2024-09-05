import bcrypt from 'bcrypt';


class PasswordHash {

    public static hashPassword(password: string): Promise<string>{
        return bcrypt.hash(password, 10);
    }

    public static hash = (password: string): Promise<string> => {
        return bcrypt.hash(password, 10);
    }
}


export default PasswordHash;