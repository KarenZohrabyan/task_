import { INestApplication } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import { UserController } from "../user.controller";
import { UserModule } from "../user.module";
import { UserService } from "../user.service";
import * as request from 'supertest';
import { AuthModule } from "../../auth/auth.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { typeOrmConfig } from '../../services/configs/postgres-config.service';

describe('User', () => {
    let app: INestApplication;
    let userService = {
        findUsers: () => ['test']
    };
    beforeAll(async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [UserModule],
            controllers: [UserController],
            providers: [UserService]
        })
        .overrideProvider(UserService)
        .useValue(userService)
        .compile()
        
        app = moduleRef.createNestApplication();
        await app.init();
    })

    it('/POST users',async () => {
        return request(app.getHttpServer())
            .post('/user')
            .expect(200)
            .expect({
                data: userService.findUsers()
            })
    })

    afterAll(async () => {
        await app.close();
    })
})