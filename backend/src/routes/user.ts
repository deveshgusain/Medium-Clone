import { Hono } from 'hono'
import { sign, verify } from "hono/jwt";

import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'

import { signupInput, signinInput } from '@devesh_g/common-app';

const userRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string
        JWT_SECRET: string
    }
}>();


userRouter.post('/signup', async (c) => {
    try {
        const prisma = new PrismaClient({
            datasourceUrl: c.env.DATABASE_URL,
        }).$extends(withAccelerate());

        const body = await c.req.json();

        const myText = new TextEncoder().encode(body.password);
        const myDigest = await crypto.subtle.digest(
            {
                name: 'SHA-256',
            },
            myText
        );
        const passwordhash = new TextDecoder("utf-8").decode(myDigest);


        const { success } = signupInput.safeParse({
            email: body.email,
            password: passwordhash,
            name: body.name
        });
        if (!success) {
            throw new Error('Inputs are incomplete.')
        }

        const user = await prisma.user.create({
            data: {
                email: body.email,
                password: passwordhash,
                name: body.name
            }
        });

        const jwt = await sign({ id: user.id }, c.env.JWT_SECRET)
        return c.json({ jwt })

    } catch (error: any) {
        console.log(error);
        c.status(400);
        return c.json({
            error: error.message
        })
    }

})

userRouter.post('/signin', async (c) => {

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const body = await c.req.json();

    const { success } = signinInput.safeParse(body)
    if (!success) {
        c.status(400);
        return c.json({ error: "Invalid inputs" });
    }
    try {
        console.log("body:-", body);

        const user = await prisma.user.findUnique({
            where: {
                email: body.email
            }
        })


        if (!user) {
            c.status(403);
            return c.json({ error: "user not found" });
        }


        const myText = new TextEncoder().encode(body.password);

        const myDigest = await crypto.subtle.digest(
            {
                name: 'SHA-256',
            },
            myText
        );

        const passwordhash = new TextDecoder("utf-8").decode(myDigest);

        if (passwordhash != user.password) {
            c.status(401);
            return c.json({ error: "password didn't matched" });
        }

        const token = await sign({ id: user.id }, c.env.JWT_SECRET)
        return c.json({
            jwt: token
        })
    } catch (error) {
        console.log(error);
        c.status(400);
        return c.json({ error: "user not found" });

    }
})

export default userRouter;