import { Routes } from "@angular/router";
import { TestComponent } from "./test.component";
import { LoginTestComponent } from "./login-test/login-test.component";
import { MemberTestComponent } from "./member-test/member-test.component";
import { NameInputComponent } from "./name-input/name-input.component";
import { AuthGuard } from "../../auth.guard";
import { UploadFileComponent } from "./upload-file/upload-file.component";
import { ResultTestComponent } from "./result-test/result-test.component";

export const testRoutes: Routes = [
  {
    path: 'test',
    component: TestComponent,
    children: [
      {
        path: 'login',
        component: LoginTestComponent,
      },
      {
        path: 'member',
        component: MemberTestComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'name-input',
        component: NameInputComponent,
      },
      {
        path: 'upload-file',
        component: UploadFileComponent,
      },
      {
        path: 'result',
        component: ResultTestComponent,
      },
    ],
  },
];