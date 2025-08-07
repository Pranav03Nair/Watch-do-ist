import mongoose, { Document, Types } from "mongoose";
export interface UserInterface extends Document {
    _id: Types.ObjectId;
    email: string;
    password: string;
    comparePassword: (candidatePassword: string) => Promise<boolean>;
}
export declare const User: mongoose.Model<UserInterface, {}, {}, {}, mongoose.Document<unknown, {}, UserInterface, {}, {}> & UserInterface & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
}, any>;
//# sourceMappingURL=user.model.d.ts.map