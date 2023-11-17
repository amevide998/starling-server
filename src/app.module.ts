import { Module } from '@nestjs/common';
import {AuthModule} from "./app/auth/auth.module";
import {StarlingModule} from "./app/starling/starling.module";
import {UserModule} from "./app/user/user.module";

@Module({
  imports: [AuthModule, StarlingModule, UserModule]
})
export class AppModule {}
