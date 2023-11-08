import { Injectable } from '@nestjs/common';
import { Post, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class PostsService {
  constructor(private prsima: PrismaService) {}

  async createPost(data: Prisma.PostCreateInput): Promise<Post> {
    return this.prsima.post.create({ data });
  }

  async getPosts(): Promise<Post[]> {
    return this.prsima.post.findMany({ include: { author: true } });
  }

  async updatePost(params: {
    where: Prisma.PostWhereUniqueInput;
    data: Prisma.PostUpdateInput;
  }): Promise<Post> {
    const { where, data } = params;
    console.log(where);
    console.log(data);
    return this.prsima.post.update({ where, data });
  }

  async deletePost(where: Prisma.PostWhereUniqueInput): Promise<Post> {
    return this.prsima.post.delete({ where });
  }
}
