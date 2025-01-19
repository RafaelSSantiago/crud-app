import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BadRequestException, INestApplication, ValidationPipe } from '@nestjs/common';

const cors = {
    origens: ['http://localhost:4200']
};

export const adicionaCors = (app: INestApplication, cors): void => {
    app.enableCors({
        origin: cors.origens,
        methods: 'GET, HEAD, PUT, PATCH, POST, DELETE, OPTIONS',
        preflightContinue: false,
        optionsSuccessStatus: 204,
        credentials: true,
        maxAge: 86400
    });
};

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            forbidNonWhitelisted: true,
            transform: true,
            exceptionFactory: (errors) => {
                const messages = errors.map((error) => Object.values(error.constraints));
                return new BadRequestException(messages);
            }
        })
    );
    adicionaCors(app, cors);
    await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
