import { Hono } from 'hono'
import { sign, verify } from "hono/jwt";

import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'

import { createPostInput, updatePostInput } from '@devesh_g/common-app';

const blogRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string
        JWT_SECRET: string
    }, Variables: {
        userId: string
    }
}>();


blogRouter.use("/*", async (c, next) => {
    try {
        const jwt = c.req.header('Authorization');
        if (!jwt) {
            throw new Error("Not Authorized")
        }
        const token = jwt.split(' ')[1] || "";

        const payload = await verify(token, c.env.JWT_SECRET);
        c.set('userId', payload.id);
        await next();

    } catch (error) {
        c.status(401);
        return c.json({ error: "unathorized" })
    }

});

blogRouter.post('/', async (c) => {
    const userId = c.get('userId');

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const body = await c.req.json();

    const { success } = createPostInput.safeParse({
        title: body.title,
        content: body.content
    });
    if (!success) {
        c.status(411);
        return c.json({
            error: "Invalid Inputs"
        });
    }

    const post = await prisma.post.create({
        data: {
            title: body.title,
            content: body.content,
            authorId: userId
        }
    });

    return c.json({
        id: post.id
    });
});

blogRouter.put('/', async (c) => {
    const userId = c.get('userId');

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const body = await c.req.json();

    const { success } = updatePostInput.safeParse({
        title: body.title,
        content: body.content
    });

    if (!success) {
        c.status(411);
        return c.json({
            error: "Invalid Inputs"
        });
    }

    const post = await prisma.post.update({
        where: {
            id: body.id,
            authorId: userId
        },
        data: {
            title: body.title,
            content: body.content
        }
    });

    return c.text("Post Updated");
})

blogRouter.get('/bulk', async (c) => {

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const posts = await prisma.post.findMany({});
    console.log("posts:", posts);

    return c.json(posts)
})
blogRouter.get('/:id', async (c) => {
    const id = c.req.param('id');

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const post = await prisma.post.findUnique({
        where: {
            id
        }
    });

    return c.json(
        post
    )
})


export default blogRouter;