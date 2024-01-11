import express from 'express';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import ms from 'ms';
import cookieparser from 'cookie-parser';

const RateLimitedMiddleware = rateLimit({
    windowMs: ms('1min'), // 1 minute
    max: 180, // Limit each IP to 180 requests per `window` (here, per minute)
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    handler: (request, response, next, options) => {
        throw new Error('Too many requests');
    }
});
export const FrameworkLoader = ({
    app
}: {
    app: express.Application;
}): void => {
    /**
     * By enabling the "trust proxy" setting via app.enable('trust proxy'),
     * Express will have knowledge that it's sitting behind a proxy
     * and that the X-Forwarded-* header fields may be trusted, which otherwise may be easily spoofed.
     */
    // app.enable('trust proxy');

    app.use(RateLimitedMiddleware);

    // app.all('*', (request, response, next) => {
    //     CoreContext.set({
    //         request_id: Snowflake.generate()
    //     });

    //     if (
    //         (typeof request.get(Config.headers.cdn_bot) === 'undefined' &&
    //             request.hostname &&
    //             request.hostname.includes(Env.variable.DOMAIN)) ||
    //         Env.variable.NODE_ENV === 'development'
    //     ) {
    //         // Handles CORS
    //         response.header(
    //             'Access-Control-Allow-Origin',
    //             request.get('origin') ||
    //             request.get('host') ||
    //             `${request.protocol}://${request.hostname}`
    //         );
    //         response.header('Access-Control-Allow-Credentials', 'true');
    //         response.header(
    //             'Access-Control-Allow-Headers',
    //             'Content-Type,Content-Length,Authorization,Accept,X-Requested-With,sentry-trace,X-Refresh-Token,X-SC-Org,X-Capture-Mode,X-Capture-Source,X-Share-Access-Token'
    //         );
    //         response.header(
    //             'Access-Control-Allow-Methods',
    //             'PUT,POST,GET,DELETE,OPTIONS'
    //         );
    //     } else if (request.get(Config.headers.cdn_bot) === '1') {
    //         // Handles CORS
    //         response.header('Access-Control-Allow-Origin', '*');
    //         response.header(
    //             'Access-Control-Allow-Headers',
    //             'Content-Type,Content-Length,Authorization,Accept,X-Requested-With,sentry-trace,X-Refresh-Token,X-SC-Org,X-Capture-Mode,X-Capture-Source,X-Share-Access-Token'
    //         );
    //         response.header(
    //             'Access-Control-Allow-Methods',
    //             'PUT,POST,GET,DELETE,OPTIONS'
    //         );
    //     }
    //     return next();
    // });

    app.use(helmet());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(cookieparser('secret'));
    // app.use(
    //     express.json({
    //         limit: '100mb',
    //         verify: (request: express.Request, res, buf, encoding) => {
    //             if (buf && buf.length) {
    //                 request.rawBody = buf.toString(
    //                     (encoding as BufferEncoding) || 'utf8'
    //                 );
    //             }
    //         }
    //     })
    // );

    // app.use(MQueryMiddleware({ limit: 10, maxLimit: 1000 }));

    // useSentry(app);
};