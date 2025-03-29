import bcrypt from "bcryptjs";

export const hashPassword = async (plainText: string): Promise<string> => {
    return await bcrypt.hash(plainText, Number(process.env.SALT_ROUNDS)  || 10);
};

export const comparePassword = async (planText: string, hashedText: string): Promise<boolean> => {
    return await bcrypt.compare(planText, hashedText);
};