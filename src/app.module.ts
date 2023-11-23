import { Module } from '@nestjs/common';
import {AuthModule} from "./app/auth/auth.module";
import {StarlingModule} from "./app/starling/starling.module";
import {UserModule} from "./app/user/user.module";
import {AdminModule} from "./app/admin/admin.module";

@Module({
  imports: [AuthModule, StarlingModule, UserModule, AdminModule]
})
export class AppModule {}
