"use client";
import Link from "next/link";
import { Card, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { timeAgo } from "@/utils/timeAgo";
import { DotFilledIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { BsThreeDotsVertical } from "react-icons/bs";
import { IBlog } from "@/interfaces/blog";
import { FC, MouseEvent } from "react";

interface IProps {
  blog: IBlog;
}

const BlogCard: FC<IProps> = ({ blog }) => {
  const { id, title, slug, thumbnail, userName, reads, createdAt } = blog;

  const handleOptionClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    e.preventDefault();
  };

  return (
    <Link href={`/blogs/${slug}?id=${id}`}>
      <Card className="w-full border-none bg-background text-foreground shadow-none">
        {/* ---> Thumbnail  */}
        <div className="overflow-hidden rounded-lg">
          <Image
            src={thumbnail}
            alt={title}
            width={250}
            height={200}
            className="w-full object-cover"
          />
        </div>

        {/* ---> Card footer  */}
        <div className="flex gap-3 py-2">
          {/* ---> Avatar  */}
          <div className="flex gap-3">
            <Avatar className="h-8 w-8">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>
          {/* ---> Title and user name  */}
          <div className="font-sans">
            <div className="flex">
              <CardTitle className="line-clamp-2 leading-5">{title}</CardTitle>
              {/* ---> Options three dots  */}
              <div className="translate-x-2">
                <Button
                  onClick={handleOptionClick}
                  className="relative h-10 w-10 rounded-full bg-background text-muted-foreground shadow-none hover:bg-muted"
                >
                  <BsThreeDotsVertical className="absolute text-lg" />
                </Button>
              </div>
            </div>
            <div className="mt-2 text-muted-foreground">
              <p className="text-sm font-medium">{userName}</p>
              <div className="flex items-center text-sm">
                <p className="text-nowrap">{reads}K reads</p>
                <DotFilledIcon />
                <p className="text-nowrap">{timeAgo(createdAt)}</p>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
};

export default BlogCard;
