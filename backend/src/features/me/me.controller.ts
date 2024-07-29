import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { MeService } from './me.service';
import { AuthUser } from '../../decorators/auth-user.decorator'

@Controller('me')
@UseGuards(AuthGuard)
export class MeController {
  constructor(private meService: MeService) {}

  // @Get()
  // hello(AuthUser() authUser) {
  //   return authUser
  // }
}
