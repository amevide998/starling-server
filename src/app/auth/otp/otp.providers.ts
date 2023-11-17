import { Connection } from "mongoose";
import { OtpSchema } from "./otp.schema";

export const  otpProviders = [
    {
        provide: 'OTP_MODEL',
        useFactory: (connection: Connection) => connection.model('Otp', OtpSchema),
        inject: ['DATABASE_CONNECTION']
    }
]