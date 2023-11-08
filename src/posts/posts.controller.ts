import { Post as PostData } from './../../node_modules/.prisma/client/index.d';
import { Body, Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  createPost(
    @Body() postData: { authorId: number; title: string },
  ): Promise<PostData> {
    const { authorId, title } = postData;
    return this.postsService.createPost({
      title,
      author: { connect: { id: authorId } },
    });
  }

  @Get()
  getPosts(): Promise<PostData[]> {
    return this.postsService.getPosts();
  }

  @Patch()
  updatePost(
    @Body('where') where: { id: number },
    @Body('data') data: { title: string },
  ): Promise<PostData> {
    return this.postsService.updatePost({ where, data });
  }

  @Delete()
  deletePost(@Body() where: { id: number }): Promise<PostData> {
    return this.postsService.deletePost(where);
  }
}
