import { FC } from "react";
import Link from "next/link";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { BsThreeDots } from "react-icons/bs";
import { DotFilledIcon } from "@radix-ui/react-icons";
import { FaBookReader, FaCommentDots } from "react-icons/fa";
import { AiFillLike } from "react-icons/ai";
import RenderMarkdown from "./RenderMarkdown";
import { axiosClient } from "@/utils/axiosClient";
import apiEndpoints from "@/api/apiEndpoints";
import { IBlogPost } from "@/interfaces/IBlogPost";
import { errorLog } from "@/utils/errorLog";

interface IProps {
  params: {
    slug: string;
  };
}

const Blog: FC<IProps> = async ({ params: { slug } }) => {
  // const query = useSearchParams();
  // const decodedSlug = decodeURIComponent(slug);
  // const localBlogs = JSON.parse(localStorage.getItem("blogs") ?? "[]") as IBlog[];
  // const blog = blogs.find((blog) => blog.id === query.get("id"));

  try {
    const res = await axiosClient.get(apiEndpoints.blogs.getBlog("67125bc0c80b84425e78a512"));
    const blog = res.data.blog as IBlogPost;
    console.log(slug); // eslint-disable-line

    return (
      <div className="container flex min-h-[90vh] flex-col py-20 sm:px-5 md:px-10 lg:px-52">
        {!blog && (
          <div className="flex h-[60vh] items-center justify-center">
            <p className="text-muted-foreground">This Blog is not exists or unavailable</p>
          </div>
        )}
        {blog && (
          <>
            {/* ---> Blog header  */}
            <div>
              <h1 className="py-5 text-4xl font-bold tracking-wider">{blog.title}</h1>

              <div className="flex items-center justify-between py-5">
                <div className="flex items-center gap-5">
                  <Link href={`/u/@theabhipatel`}>
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={""} />
                      <AvatarFallback className="bg-indigo-500 text-xl font-bold capitalize text-white">
                        {blog.user.userProfile.firstName.slice(0, 1)}
                      </AvatarFallback>
                    </Avatar>
                  </Link>
                  <div>
                    <p className="text-base font-semibold tracking-wider sm:text-2xl">
                      <Link href={`/u/@theabhipatel`}>
                        {blog.user.userProfile.firstName} {blog.user.userProfile.lastName}
                      </Link>
                    </p>
                    <div className="flex items-center gap-1">
                      <p className="text-sm text-muted-foreground">6 min read</p>
                      <DotFilledIcon className="text-xs text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">
                        {new Date(blog.createdAt).toDateString()}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Button
                    variant={"outline"}
                    className="rounded-full"
                  >
                    Follow
                  </Button>
                  <BsThreeDots className="text-xl" />
                </div>
              </div>

              <div className="flex h-12 items-center gap-5 border-y border-muted-foreground/20 py-2">
                <div className="flex items-center gap-3">
                  <FaBookReader /> {blog.reads.length}k reads
                </div>
                <div className="h-full border-r border-muted-foreground/20" />
                <div className="flex items-center gap-3">
                  <AiFillLike /> 400
                </div>
                <div className="h-full border-r border-muted-foreground/20" />
                <div className="flex items-center gap-3">
                  <FaCommentDots /> 120
                </div>
              </div>
            </div>

            {/* ---> Blog thumbnail */}
            <div className="flex items-center justify-center py-5">
              <div>
                <Image
                  src={blog.thumbnail}
                  height={400}
                  width={400}
                  alt={blog.title}
                  className="h-full w-full rounded-lg object-contain"
                />
              </div>
            </div>

            <div className="mt-5">
              <RenderMarkdown content={blog.content} />
            </div>
          </>
        )}
      </div>
    );
  } catch (error) {
    errorLog(error);
    return (
      <div className="container flex min-h-[90vh] flex-col items-center justify-center pb-20 pt-24 text-center sm:px-5 md:px-10 lg:px-20">
        <h1 className="text-lg">Failed to fetch blog</h1>
        <p className="text-sm text-muted-foreground">
          There was an issue fetching the blogs. Please try again later.
        </p>
      </div>
    );
  }
};

export default Blog;

/* /** This is my research on how we can render makrdown with style using tailwind css. */

// import Markdown from "react-markdown";
// import remarkGfm from "remark-gfm";
// import rehypeHighlight from "rehype-highlight";

/* <div className="prose mt-10 min-h-96 w-full max-w-none rounded-lg p-5 prose-headings:text-primary-foreground prose-p:text-primary-foreground prose-a:text-blue-300 prose-blockquote:bg-slate-100/10 prose-blockquote:px-5 prose-blockquote:py-[1px] prose-blockquote:text-orange-600 prose-strong:text-primary-foreground prose-ul:text-primary-foreground prose-table:text-primary-foreground prose-hr:text-red-500 dark:prose-h1:text-red-500">
        <Markdown
          className={"w-full"}
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeHighlight]}
        >
          {markdown}
        </Markdown>
      </div> */
