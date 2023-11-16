import { Connection } from "mongoose";
import { UserSchema } from "./user/user.schema";

export const  authProviders = [
    {
        provide: 'USER_MODEL',
        useFactory: (connection: Connection) => connection.model('User', UserSchema),
        inject: ['DATABASE_CONNECTION']
    }
]