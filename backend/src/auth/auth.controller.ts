import { BadRequestException, Body, Controller, Get, Param, Put, Query } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UpdateCustomClaimDto } from './dto/update-custom-claim.dto';
import { UpdateUserCustomClaimDto } from './dto/update-user-custom-claim.dto';

/**
 * Auth Controller no deploy on public server
 */
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('users')
  getUserEmail(@Query('email') email, @Query('pageToken') pageToken) {
    if (email) {
      return this.authService.getUser({ email });
    }
    return this.authService.listUser(pageToken);
  }

  @Get('users/:uid')
  getUser(@Param('uid') uid) {
    return this.authService.getUser({ uid });
  }

  @Put('users/:uid/custom-claim')
  setUserCustomClaim(@Param('uid') uid, @Body() body: UpdateCustomClaimDto) {
    return this.authService.setCustomClaim({uid}, body);
  }

  @Put('custom-claim')
  setCustomClaim(@Body() body: UpdateUserCustomClaimDto) {
    if (!body.email && !body.uid) {
      throw new BadRequestException('Need email or uid');
    }
    const { email , uid } = body;
    return this.authService.setCustomClaim({ email, uid }, body.data);
  }
}
