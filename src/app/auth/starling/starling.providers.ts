import { Connection } from "mongoose";
import { StarlingSchema } from "./starling.schema";

export const  starlingProviders = [
    {
        provide: 'STARLING_MODEL',
        useFactory: (connection: Connection) => connection.model('Starling', StarlingSchema),
        inject: ['DATABASE_CONNECTION']
    }
]